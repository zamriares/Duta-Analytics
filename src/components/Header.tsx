import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Dashboard", href: "#dashboard" },
    { label: "Solutions", href: "#solutions" },
    { label: "Spatial Intelligence", href: "#spatial" },
    { label: "Digital Twin", href: "#digital-twin" },
    { label: "Vision AI", href: "#vision" },
    { label: "Case Studies", href: "#case-studies" },
    { label: "About", href: "#about" },
  ];

  return (
    <header className="vectr-header">
      <a href="#" className="vectr-brand">
        <span className="vectr-brand-dot" />
        <span>DUTA ANALYTICS</span>
      </a>

      {/* Desktop Navigation Links */}
      <nav className="vectr-nav" aria-label="Main navigation">
        {navLinks.map((link) => (
          <a key={link.label} href={link.href} className="vectr-nav-link">
            {link.label}
          </a>
        ))}
      </nav>

      {/* Desktop Header Action Buttons */}
      <div className="vectr-header-actions desktop-only-actions">
        <a href="#dashboard" className="btn-pill btn-secondary">Explore Dashboard</a>
        <a href="#contact" className="btn-pill btn-primary">Request Demo</a>
      </div>

      {/* Mobile Hamburger Toggle Button */}
      <button
        className="mobile-menu-btn"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle Navigation Menu"
      >
        {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Mobile Navigation Dropdown Menu */}
      {isMobileMenuOpen && (
        <div
          className="mobile-nav-dropdown"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            background: "rgba(9, 10, 15, 0.96)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderBottom: "1px solid var(--border-subtle)",
            padding: "24px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.8)",
            zIndex: 999,
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                fontSize: "1rem",
                fontWeight: 600,
                color: "var(--text-primary, #ffffff)",
                textDecoration: "none",
                padding: "10px 0",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>{link.label}</span>
              <ArrowUpRight size={16} color="var(--accent-cyan)" />
            </a>
          ))}

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "12px" }}>
            <a
              href="#dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className="btn-pill btn-secondary"
              style={{ textAlign: "center", width: "100%", padding: "12px" }}
            >
              Explore Dashboard
            </a>
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="btn-pill btn-primary"
              style={{ textAlign: "center", width: "100%", padding: "12px" }}
            >
              Request Demo
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
