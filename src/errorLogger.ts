/* -------------------------------------------------------------
   Global Error Logger Service
   Captures: window.onerror, unhandledrejection, resource errors,
   console.error intercepts, and manual logs from ErrorBoundary.
   Persists entries to localStorage with a rolling cap.
   ------------------------------------------------------------- */

export interface ErrorLogEntry {
  id: string;
  timestamp: string;
  type: "runtime" | "unhandled-rejection" | "resource" | "console" | "react-boundary" | "manual";
  message: string;
  source?: string;
  lineno?: number;
  colno?: number;
  stack?: string;
  componentStack?: string;
  url: string;
  userAgent: string;
}

const STORAGE_KEY = "duta_error_log";
const MAX_ENTRIES = 200;

function generateId(): string {
  return `err_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function getStoredLogs(): ErrorLogEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function persistLogs(logs: ErrorLogEntry[]): void {
  try {
    // Keep only the most recent entries within the cap
    const trimmed = logs.slice(-MAX_ENTRIES);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    // Storage quota exceeded or unavailable — silently ignore
  }
}

function pushEntry(entry: ErrorLogEntry): void {
  const logs = getStoredLogs();
  logs.push(entry);
  persistLogs(logs);

  // Also dispatch a custom event so the viewer can update live
  window.dispatchEvent(new CustomEvent("duta-error-logged", { detail: entry }));
}

function baseEntry(type: ErrorLogEntry["type"], message: string): ErrorLogEntry {
  return {
    id: generateId(),
    timestamp: new Date().toISOString(),
    type,
    message,
    url: window.location.href,
    userAgent: navigator.userAgent,
  };
}

/* ---- Public API ---- */

/** Retrieve all stored error log entries */
export function getErrorLogs(): ErrorLogEntry[] {
  return getStoredLogs();
}

/** Clear all stored error logs */
export function clearErrorLogs(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
  window.dispatchEvent(new CustomEvent("duta-error-logged"));
}

/** Export error logs as a downloadable JSON file */
export function exportErrorLogs(): void {
  const logs = getStoredLogs();
  const blob = new Blob([JSON.stringify(logs, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `duta_error_log_${new Date().toISOString().replace(/[:.]/g, "-")}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/** Manually log an error from React Error Boundary or anywhere */
export function logError(
  type: ErrorLogEntry["type"],
  message: string,
  extra?: Partial<ErrorLogEntry>,
): void {
  const entry: ErrorLogEntry = { ...baseEntry(type, message), ...extra };
  pushEntry(entry);
}

/* ---- Global Listener Installer ---- */

let installed = false;

export function installGlobalErrorListeners(): void {
  if (installed || typeof window === "undefined") return;
  installed = true;

  // 1. Runtime JS errors
  window.addEventListener("error", (event: ErrorEvent) => {
    // Ignore resource load errors handled below
    if (event.target && (event.target as HTMLElement).tagName) return;

    pushEntry({
      ...baseEntry("runtime", event.message || "Unknown runtime error"),
      source: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      stack: event.error?.stack,
    });
  });

  // 2. Resource load failures (images, scripts, stylesheets)
  window.addEventListener(
    "error",
    (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (!target || !target.tagName) return;

      const tag = target.tagName.toLowerCase();
      const src =
        (target as HTMLImageElement).src ||
        (target as HTMLScriptElement).src ||
        (target as HTMLLinkElement).href ||
        "unknown";

      pushEntry({
        ...baseEntry("resource", `Failed to load <${tag}> resource: ${src}`),
        source: src,
      });
    },
    true, // capture phase to catch resource errors
  );

  // 3. Unhandled Promise rejections
  window.addEventListener("unhandledrejection", (event: PromiseRejectionEvent) => {
    const reason = event.reason;
    let message = "Unhandled promise rejection";
    let stack: string | undefined;

    if (reason instanceof Error) {
      message = reason.message;
      stack = reason.stack;
    } else if (typeof reason === "string") {
      message = reason;
    } else {
      try {
        message = JSON.stringify(reason);
      } catch {
        message = String(reason);
      }
    }

    pushEntry({
      ...baseEntry("unhandled-rejection", message),
      stack,
    });
  });

  // 4. Intercept console.error to capture logged errors
  const originalConsoleError = console.error;
  console.error = (...args: unknown[]) => {
    // Call original first
    originalConsoleError.apply(console, args);

    // Avoid infinite recursion from our own logging
    const message = args
      .map((a) => {
        if (a instanceof Error) return `${a.message}\n${a.stack || ""}`;
        if (typeof a === "string") return a;
        try {
          return JSON.stringify(a);
        } catch {
          return String(a);
        }
      })
      .join(" ");

    // Skip React internal warnings (too noisy)
    if (message.includes("Warning:") || message.includes("ReactDOM")) return;

    pushEntry(baseEntry("console", message));
  };
}
