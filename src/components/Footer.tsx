import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const platformNavLinks = [
    { label: "Factory Monitoring", href: "#dashboard" },
    { label: "Control Room Video", href: "#dashboard-demo" },
    { label: "Platform Modules", href: "#solutions" },
    { label: "Spatial GIS & Site Map", href: "#spatial" },
    { label: "3D Digital Twins", href: "#digital-twin" },
    { label: "Enterprise A.I Vision", href: "#vision" },
  ];

  const companyNavLinks = [
    { label: "About Duta Analytics", href: "#about" },
    { label: "Field Case Studies", href: "#case-studies" },
    { label: "Technical Standards", href: "#standards" },
    { label: "Request Consultation", href: "#contact" },
  ];

  return (
    <footer className="vectr-footer" style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--bg-secondary)", padding: "80px 0 40px" }}>
      <div className="container" style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
        
        {/* Main Footer Multi-Column Navigation Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "40px",
          }}
        >
          {/* Column 1: Brand & Contact Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span className="vectr-brand-dot" />
              <span style={{ fontWeight: 800, fontSize: "clamp(0.95rem, 2vw, 1.1rem)", color: "var(--text-primary)", letterSpacing: "0.05em", fontFamily: "var(--font-heading)" }}>
                DUTA ANALYTICS SDN BHD
              </span>
            </div>

            <p style={{ fontSize: "clamp(0.8rem, 1.4vw, 0.88rem)", color: "var(--text-secondary)", lineHeight: "1.6", margin: 0 }}>
              Manufacturing SaaS, GIS site intelligence, Vision AI inspection, and 3D Digital Twins for enterprise industrial operations.
            </p>

            <div style={{ fontSize: "clamp(0.8rem, 1.4vw, 0.88rem)", color: "var(--text-secondary)", marginTop: "8px" }}>
              Email:{" "}
              <a
                href="mailto:admin@dutaanalytics.com"
                style={{
                  textDecoration: "underline",
                  color: "var(--accent-cyan)",
                  fontWeight: 600,
                  fontFamily: "var(--font-mono)",
                }}
              >
                admin@dutaanalytics.com
              </a>
            </div>
          </div>

          {/* Column 2: Platform Navigation Links */}
          <div>
            <div
              style={{
                fontSize: "clamp(0.68rem, 1.4vw, 0.78rem)",
                fontFamily: "var(--font-mono)",
                color: "var(--text-secondary)",
                fontWeight: 700,
                letterSpacing: "0.1em",
                marginBottom: "20px",
              }}
            >
              PLATFORM MODULES
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {platformNavLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onMouseEnter={() => setHoveredLink(link.label)}
                    onMouseLeave={() => setHoveredLink(null)}
                    style={{
                      fontSize: "clamp(0.82rem, 1.5vw, 0.9rem)",
                      color: hoveredLink === link.label ? "var(--accent-cyan)" : "var(--text-secondary)",
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      fontWeight: hoveredLink === link.label ? 600 : 400,
                    }}
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight size={14} style={{ opacity: hoveredLink === link.label ? 1 : 0.4, transition: "opacity 0.2s ease" }} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company & Field Proof Navigation Links */}
          <div>
            <div
              style={{
                fontSize: "clamp(0.68rem, 1.4vw, 0.78rem)",
                fontFamily: "var(--font-mono)",
                color: "var(--text-secondary)",
                fontWeight: 700,
                letterSpacing: "0.1em",
                marginBottom: "20px",
              }}
            >
              COMPANY & FIELD PROOF
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {companyNavLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onMouseEnter={() => setHoveredLink(link.label)}
                    onMouseLeave={() => setHoveredLink(null)}
                    style={{
                      fontSize: "clamp(0.82rem, 1.5vw, 0.9rem)",
                      color: hoveredLink === link.label ? "var(--accent-cyan)" : "var(--text-secondary)",
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      fontWeight: hoveredLink === link.label ? 600 : 400,
                    }}
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight size={14} style={{ opacity: hoveredLink === link.label ? 1 : 0.4, transition: "opacity 0.2s ease" }} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Quick Action CTA */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div
              style={{
                fontSize: "clamp(0.68rem, 1.4vw, 0.78rem)",
                fontFamily: "var(--font-mono)",
                color: "var(--text-secondary)",
                fontWeight: 700,
                letterSpacing: "0.1em",
              }}
            >
              EXPLORE SOLUTIONS
            </div>
            <p style={{ fontSize: "clamp(0.78rem, 1.4vw, 0.85rem)", color: "var(--text-secondary)", margin: 0, lineHeight: 1.5 }}>
              Ready to transform your plant telemetry and video feeds into automated operational decision workflows?
            </p>
            <div>
              <a
                href="#contact"
                className="btn btn-primary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "clamp(0.78rem, 1.4vw, 0.85rem)",
                  padding: "10px 18px",
                  borderRadius: "4px",
                }}
              >
                <span>REQUEST CONSULTATION</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Legal Disclaimer Bar */}
        <div
          style={{
            paddingTop: "24px",
            borderTop: "1px solid var(--border-subtle)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            fontSize: "clamp(0.72rem, 1.4vw, 0.8rem)",
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
