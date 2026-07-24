import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="page-section cta-section" id="cta">
      <div className="container">
        <div className="cta-box">
          <span className="section-eyebrow">FAST RESPONSE MOBILIZATION</span>
          <h2 className="cta-title">
            Staff your outage with fast response, and crews you can rely on.
          </h2>

          <div className="cta-actions">
            <a href="#cta" className="btn-pill btn-primary btn-lg">
              Request Crews
            </a>
          </div>

          <div className="cta-links">
            <a href="#solutions" className="link-badge">
              <span>Our Industries</span>
              <ArrowRight size={16} />
            </a>
            <a href="#about" className="link-badge">
              <span>Our Mission</span>
              <ArrowRight size={16} style={{ color: "#00f0ff" }} />
            </a>
            <a href="#cta" className="link-badge">
              <span>Apply</span>
              <ArrowRight size={16} style={{ color: "#00f0ff" }} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
