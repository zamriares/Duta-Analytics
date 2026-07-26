import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Trash2,
  Download,
  AlertTriangle,
  AlertOctagon,
  Bug,
  MonitorX,
  ImageOff,
  Terminal,
  RefreshCw,
} from "lucide-react";
import {
  getErrorLogs,
  clearErrorLogs,
  exportErrorLogs,
  type ErrorLogEntry,
} from "../errorLogger";

const typeConfig: Record<
  ErrorLogEntry["type"],
  { label: string; icon: typeof Bug; color: string }
> = {
  runtime: { label: "Runtime", icon: Bug, color: "rgb(255, 60, 60)" },
  "unhandled-rejection": {
    label: "Promise",
    icon: AlertOctagon,
    color: "rgb(255, 130, 0)",
  },
  resource: { label: "Resource", icon: ImageOff, color: "rgb(200, 130, 0)" },
  console: { label: "Console", icon: Terminal, color: "rgb(0, 180, 216)" },
  "react-boundary": {
    label: "React",
    icon: MonitorX,
    color: "rgb(255, 60, 60)",
  },
  manual: { label: "Manual", icon: AlertTriangle, color: "rgb(140, 145, 158)" },
};

function formatTimestamp(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  } catch {
    return iso;
  }
}

/**
 * Hidden Error Log Viewer panel.
 * Activated by pressing Ctrl+Shift+E (or Cmd+Shift+E on macOS).
 * Displays all captured errors with filtering, detail expansion,
 * export to JSON, and clear functionality.
 */
export function ErrorLogViewer() {
  const [isOpen, setIsOpen] = useState(false);
  const [logs, setLogs] = useState<ErrorLogEntry[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>("all");

  const refreshLogs = useCallback(() => {
    setLogs(getErrorLogs());
  }, []);

  // Keyboard shortcut: Ctrl+Shift+E
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "E") {
        e.preventDefault();
        setIsOpen((prev) => {
          if (!prev) refreshLogs();
          return !prev;
        });
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [refreshLogs]);

  // Live update when a new error is logged
  useEffect(() => {
    const handler = () => refreshLogs();
    window.addEventListener("duta-error-logged", handler);
    return () => window.removeEventListener("duta-error-logged", handler);
  }, [refreshLogs]);

  const handleClear = () => {
    clearErrorLogs();
    setLogs([]);
    setExpandedId(null);
  };

  const handleExport = () => {
    exportErrorLogs();
  };

  const filteredLogs =
    filterType === "all"
      ? logs
      : logs.filter((l) => l.type === filterType);

  const errorCount = logs.length;

  return (
    <>
      {/* Floating error count badge — always visible when errors exist */}
      <AnimatePresence>
        {errorCount > 0 && !isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => {
              refreshLogs();
              setIsOpen(true);
            }}
            title="View Error Log (Ctrl+Shift+E)"
            style={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              zIndex: 99999,
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              background: "rgb(255, 60, 60)",
              color: "#ffffff",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 20px rgba(255, 60, 60, 0.4)",
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "0.8rem",
              fontWeight: 800,
            }}
          >
            {errorCount > 99 ? "99+" : errorCount}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Full error log panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            style={{
              position: "fixed",
              bottom: "16px",
              right: "16px",
              zIndex: 100000,
              width: "min(560px, calc(100vw - 32px))",
              maxHeight: "min(600px, calc(100vh - 32px))",
              background: "rgb(15, 17, 23)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "12px",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              boxShadow:
                "0 20px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(255, 60, 60, 0.08)",
              fontFamily: "var(--font-body, 'Inter', sans-serif)",
            }}
          >
            {/* Header Bar */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "14px 18px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                background: "rgba(255, 255, 255, 0.03)",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <Bug size={18} color="rgb(255, 60, 60)" />
                <span
                  style={{
                    fontFamily: "var(--font-heading, 'Outfit', sans-serif)",
                    fontWeight: 800,
                    fontSize: "0.95rem",
                    color: "#fcfcfc",
                    letterSpacing: "0.02em",
                  }}
                >
                  Error Log
                </span>
                <span
                  style={{
                    padding: "2px 8px",
                    borderRadius: "10px",
                    background: errorCount > 0 ? "rgba(255, 60, 60, 0.15)" : "rgba(0, 180, 100, 0.15)",
                    color: errorCount > 0 ? "rgb(255, 100, 100)" : "rgb(0, 180, 100)",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    fontFamily: "var(--font-mono, monospace)",
                  }}
                >
                  {errorCount} {errorCount === 1 ? "error" : "errors"}
                </span>
              </div>

              <div style={{ display: "flex", gap: "6px" }}>
                <button
                  onClick={refreshLogs}
                  title="Refresh"
                  style={iconBtnStyle}
                >
                  <RefreshCw size={14} />
                </button>
                <button
                  onClick={handleExport}
                  title="Export as JSON"
                  style={iconBtnStyle}
                >
                  <Download size={14} />
                </button>
                <button
                  onClick={handleClear}
                  title="Clear all logs"
                  style={iconBtnStyle}
                >
                  <Trash2 size={14} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close (Ctrl+Shift+E)"
                  style={iconBtnStyle}
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Filter Tabs */}
            <div
              style={{
                display: "flex",
                gap: "4px",
                padding: "8px 18px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
                overflowX: "auto",
                flexShrink: 0,
              }}
            >
              {["all", "runtime", "unhandled-rejection", "resource", "console", "react-boundary"].map(
                (t) => (
                  <button
                    key={t}
                    onClick={() => setFilterType(t)}
                    style={{
                      padding: "4px 10px",
                      borderRadius: "4px",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      fontFamily: "var(--font-mono, monospace)",
                      background:
                        filterType === t
                          ? "rgba(255, 255, 255, 0.1)"
                          : "transparent",
                      color:
                        filterType === t
                          ? "#fcfcfc"
                          : "rgba(255, 255, 255, 0.4)",
                      transition: "all 0.15s ease",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {t === "all"
                      ? `ALL (${logs.length})`
                      : `${(typeConfig[t as ErrorLogEntry["type"]]?.label || t).toUpperCase()} (${logs.filter((l) => l.type === t).length})`}
                  </button>
                ),
              )}
            </div>

            {/* Log Entries List */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "0",
              }}
            >
              {filteredLogs.length === 0 ? (
                <div
                  style={{
                    padding: "48px 20px",
                    textAlign: "center",
                    color: "rgba(255, 255, 255, 0.3)",
                    fontSize: "0.85rem",
                  }}
                >
                  {logs.length === 0
                    ? "No errors captured yet."
                    : "No errors match this filter."}
                </div>
              ) : (
                [...filteredLogs].reverse().map((entry) => {
                  const cfg = typeConfig[entry.type] || typeConfig.manual;
                  const Icon = cfg.icon;
                  const isExpanded = expandedId === entry.id;

                  return (
                    <div
                      key={entry.id}
                      onClick={() =>
                        setExpandedId(isExpanded ? null : entry.id)
                      }
                      style={{
                        padding: "12px 18px",
                        borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
                        cursor: "pointer",
                        transition: "background 0.15s ease",
                        background: isExpanded
                          ? "rgba(255, 255, 255, 0.03)"
                          : "transparent",
                      }}
                      onMouseEnter={(e) => {
                        if (!isExpanded)
                          (e.currentTarget as HTMLDivElement).style.background =
                            "rgba(255, 255, 255, 0.02)";
                      }}
                      onMouseLeave={(e) => {
                        if (!isExpanded)
                          (e.currentTarget as HTMLDivElement).style.background =
                            "transparent";
                      }}
                    >
                      {/* Entry summary row */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <Icon
                          size={14}
                          color={cfg.color}
                          style={{ flexShrink: 0 }}
                        />
                        <span
                          style={{
                            padding: "2px 6px",
                            borderRadius: "3px",
                            background: `${cfg.color}20`,
                            color: cfg.color,
                            fontSize: "0.65rem",
                            fontWeight: 700,
                            fontFamily: "var(--font-mono, monospace)",
                            flexShrink: 0,
                          }}
                        >
                          {cfg.label.toUpperCase()}
                        </span>
                        <span
                          style={{
                            flex: 1,
                            fontSize: "0.82rem",
                            color: "#fcfcfc",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {entry.message}
                        </span>
                        <span
                          style={{
                            fontSize: "0.68rem",
                            color: "rgba(255, 255, 255, 0.3)",
                            fontFamily: "var(--font-mono, monospace)",
                            flexShrink: 0,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {formatTimestamp(entry.timestamp)}
                        </span>
                      </div>

                      {/* Expanded detail */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{ overflow: "hidden" }}
                          >
                            <div
                              style={{
                                marginTop: "10px",
                                padding: "12px",
                                background: "rgba(255, 255, 255, 0.02)",
                                borderRadius: "6px",
                                border:
                                  "1px solid rgba(255, 255, 255, 0.06)",
                                fontSize: "0.75rem",
                                fontFamily: "var(--font-mono, monospace)",
                                color: "rgba(255, 255, 255, 0.6)",
                                display: "flex",
                                flexDirection: "column",
                                gap: "6px",
                              }}
                            >
                              <div>
                                <strong style={{ color: "rgba(255,255,255,0.8)" }}>
                                  Message:
                                </strong>{" "}
                                {entry.message}
                              </div>
                              {entry.source && (
                                <div>
                                  <strong style={{ color: "rgba(255,255,255,0.8)" }}>
                                    Source:
                                  </strong>{" "}
                                  {entry.source}
                                  {entry.lineno != null &&
                                    `:${entry.lineno}:${entry.colno ?? 0}`}
                                </div>
                              )}
                              <div>
                                <strong style={{ color: "rgba(255,255,255,0.8)" }}>
                                  URL:
                                </strong>{" "}
                                {entry.url}
                              </div>
                              <div>
                                <strong style={{ color: "rgba(255,255,255,0.8)" }}>
                                  Time:
                                </strong>{" "}
                                {entry.timestamp}
                              </div>
                              {entry.stack && (
                                <div>
                                  <strong style={{ color: "rgba(255,255,255,0.8)" }}>
                                    Stack:
                                  </strong>
                                  <pre
                                    style={{
                                      marginTop: "4px",
                                      padding: "8px",
                                      background:
                                        "rgba(0, 0, 0, 0.3)",
                                      borderRadius: "4px",
                                      overflow: "auto",
                                      maxHeight: "140px",
                                      fontSize: "0.7rem",
                                      whiteSpace: "pre-wrap",
                                      wordBreak: "break-all",
                                      color: "rgba(255,255,255,0.5)",
                                    }}
                                  >
                                    {entry.stack}
                                  </pre>
                                </div>
                              )}
                              {entry.componentStack && (
                                <div>
                                  <strong style={{ color: "rgba(255,255,255,0.8)" }}>
                                    Component Stack:
                                  </strong>
                                  <pre
                                    style={{
                                      marginTop: "4px",
                                      padding: "8px",
                                      background:
                                        "rgba(0, 0, 0, 0.3)",
                                      borderRadius: "4px",
                                      overflow: "auto",
                                      maxHeight: "120px",
                                      fontSize: "0.7rem",
                                      whiteSpace: "pre-wrap",
                                      wordBreak: "break-all",
                                      color: "rgba(255,255,255,0.5)",
                                    }}
                                  >
                                    {entry.componentStack}
                                  </pre>
                                </div>
                              )}
                              <div
                                style={{
                                  fontSize: "0.65rem",
                                  color: "rgba(255,255,255,0.25)",
                                  marginTop: "2px",
                                }}
                              >
                                ID: {entry.id}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer hint */}
            <div
              style={{
                padding: "8px 18px",
                borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                fontSize: "0.68rem",
                color: "rgba(255, 255, 255, 0.25)",
                fontFamily: "var(--font-mono, monospace)",
                textAlign: "center",
                flexShrink: 0,
              }}
            >
              Press Ctrl+Shift+E to toggle • Click entry to expand • Max {200}{" "}
              entries stored
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const iconBtnStyle: React.CSSProperties = {
  background: "rgba(255, 255, 255, 0.06)",
  border: "none",
  borderRadius: "4px",
  padding: "6px",
  cursor: "pointer",
  color: "rgba(255, 255, 255, 0.6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.15s ease",
};
