export function Footer() {
  return (
    <footer className="vectr-footer">
      <div className="container footer-content">
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span className="vectr-brand-dot" />
          <span style={{ fontWeight: 800, color: "#ffffff", letterSpacing: "0.05em" }}>
            Vectr / Duta Analytics
          </span>
        </div>

        <div className="footer-legal">
          <span>&copy; 2026 Vectr / Duta Analytics, Inc.</span>
          <a href="#" style={{ color: "inherit" }}>Privacy Policy</a>
          <a href="#" style={{ color: "inherit" }}>ToS</a>
          <a href="https://utsubo.com" target="_blank" rel="noopener noreferrer" style={{ color: "#00f0ff" }}>
            Made by Utsubo
          </a>
        </div>
      </div>
    </footer>
  );
}
