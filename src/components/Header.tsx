export function Header() {
  return (
    <header className="vectr-header">
      <a href="#" className="vectr-brand">
        <span className="vectr-brand-dot" />
        <span>Vectr / Duta Analytics</span>
      </a>

      <nav className="vectr-nav" aria-label="Main navigation">
        <a href="#solutions" className="vectr-nav-link">Our Industries</a>
        <a href="#about" className="vectr-nav-link">Our Mission</a>
        <a href="#process" className="vectr-nav-link">Process</a>
        <a href="#features" className="vectr-nav-link">Platform</a>
        <a href="#faq" className="vectr-nav-link">FAQ</a>
      </nav>

      <div className="vectr-header-actions">
        <a href="#cta" className="btn-pill btn-secondary">Apply</a>
        <a href="#cta" className="btn-pill btn-primary">Request Crews</a>
      </div>
    </header>
  );
}
