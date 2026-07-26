import { Component, type ReactNode, type ErrorInfo } from "react";
import { logError } from "../errorLogger";

interface Props {
  children: ReactNode;
  /** Optional fallback UI to render when a crash is caught */
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * React Error Boundary — catches render/lifecycle crashes in the
 * component tree below it and logs them via the ErrorLogger service.
 * Shows a minimal recovery UI so the user isn't left on a white screen.
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    logError("react-boundary", error.message, {
      stack: error.stack,
      componentStack: info.componentStack ?? undefined,
    });
  }

  private handleReload = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "rgb(252, 252, 252)",
            fontFamily: "'Inter', system-ui, sans-serif",
            padding: "32px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "rgba(255, 60, 60, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "20px",
              fontSize: "1.5rem",
            }}
          >
            ⚠
          </div>

          <h2
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(1.3rem, 3vw, 1.8rem)",
              fontWeight: 800,
              color: "#0f1117",
              marginBottom: "12px",
            }}
          >
            Something went wrong
          </h2>

          <p
            style={{
              fontSize: "clamp(0.88rem, 1.8vw, 1rem)",
              color: "#5a5f6c",
              maxWidth: "520px",
              lineHeight: 1.6,
              marginBottom: "24px",
            }}
          >
            An unexpected error occurred. The issue has been logged automatically.
            Please reload the page to continue.
          </p>

          {this.state.error && (
            <pre
              style={{
                maxWidth: "640px",
                width: "100%",
                padding: "16px",
                background: "#f6f6f8",
                border: "1px solid #e6e6e8",
                borderRadius: "8px",
                fontSize: "0.78rem",
                color: "#5a5f6c",
                textAlign: "left",
                overflow: "auto",
                maxHeight: "160px",
                marginBottom: "24px",
                fontFamily: "'Space Grotesk', monospace",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {this.state.error.message}
              {this.state.error.stack && `\n\n${this.state.error.stack}`}
            </pre>
          )}

          <button
            onClick={this.handleReload}
            style={{
              padding: "12px 28px",
              background: "#0f1117",
              color: "#fcfcfc",
              border: "none",
              borderRadius: "4px",
              fontSize: "0.88rem",
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "'Inter', sans-serif",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.background = "rgb(40, 44, 55)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.background = "#0f1117";
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
