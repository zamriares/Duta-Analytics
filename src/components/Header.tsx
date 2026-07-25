import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navLinks = [
  { label: "Dashboard", href: "#dashboard", id: "dashboard" },
  { label: "Solutions", href: "#solutions", id: "solutions" },
  { label: "Spatial Intelligence", href: "#spatial", id: "spatial" },
  { label: "Digital Twin", href: "#digital-twin", id: "digital-twin" },
  { label: "Vision AI", href: "#vision", id: "vision" },
  { label: "Case Studies", href: "#case-studies", id: "case-studies" },
  { label: "About", href: "#about", id: "about" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("#dashboard");

  // Accurate IntersectionObserver Scroll Spy: Highlight section in monitor focal area
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -40% 0px",
      threshold: [0.1, 0.3, 0.6],
    };

    const sectionEntries = new Map<string, number>();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          sectionEntries.set(entry.target.id, entry.intersectionRatio);
        } else {
          sectionEntries.delete(entry.target.id);
        }
      });

      let mostVisibleId = "";
      let highestRatio = -1;

      sectionEntries.forEach((ratio, id) => {
        if (ratio > highestRatio) {
          highestRatio = ratio;
          mostVisibleId = id;
        }
      });

      if (mostVisibleId) {
        setActiveNav(`#${mostVisibleId}`);
      }
    }, observerOptions);

    navLinks.forEach((link) => {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="vectr-header">
      <a href="#" className="vectr-brand">
        <span>DUTA ANALYTICS</span>
      </a>

      {/* Desktop Navigation Links with Viewport-Focused Active Indicator */}
      <nav className="vectr-nav" aria-label="Main navigation">
        {navLinks.map((link) => {
          const isSelected = activeNav === link.href;
          return (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setActiveNav(link.href)}
              className={`vectr-nav-link ${isSelected ? "active" : ""}`}
            >
              {link.label}
            </a>
          );
        })}
      </nav>

      {/* Desktop Header Action Buttons */}
      <div className="vectr-header-actions desktop-only-actions">
        <a href="#dashboard" className="btn-pill btn-secondary" style={{ borderColor: "#cbd5e1", color: "#0f172a" }}>
          Explore Dashboard
        </a>
        <a href="#contact" className="btn-pill btn-primary">
          Request Demo
        </a>
      </div>

      {/* Mobile Hamburger Toggle Button */}
      <button
        className="mobile-menu-btn"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle Navigation Menu"
      >
        {isMobileMenuOpen ? <X size={26} color="#090A0F" /> : <Menu size={26} color="#090A0F" />}
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
            background: "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderBottom: "none",
            padding: "24px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
            zIndex: 999,
          }}
        >
          {navLinks.map((link) => {
            const isSelected = activeNav === link.href;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  setActiveNav(link.href);
                  setIsMobileMenuOpen(false);
                }}
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: isSelected ? "#000000" : "#475569",
                  textDecoration: "none",
                  padding: "10px 0",
                  borderBottom: isSelected ? "2.5px solid #000000" : "1px solid #cbd5e1",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  transition: "all 0.2s ease",
                }}
              >
                <span>{link.label}</span>
                <ArrowUpRight size={16} color={isSelected ? "#000000" : "#0066ff"} />
              </a>
            );
          })}

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "12px" }}>
            <a
              href="#dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className="btn-pill btn-secondary"
              style={{ textAlign: "center", width: "100%", padding: "12px", borderColor: "#cbd5e1", color: "#0f172a" }}
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
