export function Footer() {
  return (
    <footer className="vectr-footer">
      <div className="container" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div className="footer-content">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span className="vectr-brand-dot" />
            <span style={{ fontWeight: 800, color: "var(--text-primary)", letterSpacing: "0.05em" }}>
              DUTA ANALYTICS SDN BHD
            </span>
          </div>

          <div style={{ fontSize: "0.88rem", color: "var(--text-secondary)" }}>
            Email: <a href="mailto:admin@dutaanalytics.com" style={{ textDecoration: "underline", color: "var(--text-primary)", fontWeight: 600 }}>admin@dutaanalytics.com</a>
          </div>
        </div>

        <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: "1.6" }}>
          Manufacturing SaaS, GIS services, and industrial intelligence dashboards.
        </div>

        <div
          style={{
            paddingTop: "20px",
            borderTop: "0.8px solid var(--border-subtle)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            fontSize: "0.8rem",
            color: "var(--text-muted)",
          }}
        >
          <div>
            &copy; 2026 DUTA ANALYTICS SDN BHD - Co.No 202501029673. All rights reserved.
          </div>
          <div>
            Disclaimer: General informational purposes only; liability excluded to the fullest extent permitted by law.
          </div>
        </div>
      </div>
    </footer>
  );
}

