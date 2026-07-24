export function Header() {
  return (
    <header className="vectr-header">
      <a href="#" className="vectr-brand">
        <span className="vectr-brand-dot" />
        <span>DUTA ANALYTICS</span>
      </a>

      <nav className="vectr-nav" aria-label="Main navigation">
        <a href="#dashboard" className="vectr-nav-link">Dashboard</a>
        <a href="#solutions" className="vectr-nav-link">Solutions</a>
        <a href="#spatial" className="vectr-nav-link">Spatial Intelligence</a>
        <a href="#digital-twin" className="vectr-nav-link">Digital Twin</a>
        <a href="#vision" className="vectr-nav-link">Vision AI</a>
        <a href="#case-studies" className="vectr-nav-link">Case Studies</a>
        <a href="#about" className="vectr-nav-link">About</a>
      </nav>

      <div className="vectr-header-actions">
        <a href="#dashboard" className="btn-pill btn-secondary">Explore Dashboard</a>
        <a href="#contact" className="btn-pill btn-primary">Request Demo</a>
      </div>
    </header>
  );
}

