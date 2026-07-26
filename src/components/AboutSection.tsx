import { motion } from "framer-motion";
import {
  Eye,
  Clock,
  ShieldCheck,
  Cpu,
  MapPin,
  BarChart3,
  Sparkles,
} from "lucide-react";

const focusAreas = [
  { label: "Production visibility", icon: Eye },
  { label: "Downtime response", icon: Clock },
  { label: "Quality monitoring", icon: ShieldCheck },
  { label: "Asset status", icon: Cpu },
  { label: "Geospatial context", icon: MapPin },
  { label: "Management reporting", icon: BarChart3 },
  { label: "AI-assisted analysis", icon: Sparkles },
];

const operatingPrinciples = [
  { title: "Understand & Act", desc: "Technology should make complex operations easier to understand and act on without friction." },
  { title: "Clarity Before Noise", desc: "Prioritize operational clarity before visual noise and extraneous dashboards." },
  { title: "Industrial Context", desc: "Respect domain physics and operator workflows — industrial context matters deeply." },
  { title: "Built for Adoption", desc: "Design interfaces for daily floor adoption and executive review." },
];

export function AboutSection() {
  return (
    <section className="page-section about-section flow" id="about">
      <div className="container">
        <div style={{ textAlign: "left", maxWidth: "840px" }}>
          <span className="section-eyebrow">ABOUT DUTA ANALYTICS</span>
          <h2 className="section-title">
            Industrial Intelligence for Teams Operating in the Physical World
          </h2>
          <p className="feature-desc" style={{ marginTop: "16px", fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)", lineHeight: "1.7" }}>
            Duta Analytics builds analytics platforms for manufacturers, infrastructure operators, consultants, and built-world teams. The focus is clearer visibility across sites, assets, production lines, and operational decisions.
          </p>
        </div>

        {/* Profile Card */}
        <motion.div
          style={{
            marginTop: "40px",
            padding: "clamp(18px, 4vw, 36px)",
            background: "var(--bg-secondary)",
            border: "0.8px solid var(--border-subtle)",
            borderRadius: "4px",
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="feature-title" style={{ fontSize: "clamp(1.1rem, 2vw, 1.3rem)" }}>
            Moving Organizations Beyond Fragmented Data
          </h3>
          <p className="feature-desc" style={{ marginTop: "12px", fontSize: "clamp(0.88rem, 1.5vw, 1rem)", lineHeight: "1.7" }}>
            We work at the intersection of manufacturing analytics, spatial intelligence, and custom software development. We help organizations move from fragmented spreadsheets, isolated machine data, manual reporting, and disconnected site information into structured decision systems.
          </p>

          <div style={{ marginTop: "28px" }}>
            <span className="section-eyebrow" style={{ fontSize: "clamp(0.68rem, 1.5vw, 0.75rem)" }}>CORE FOCUS AREAS</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "12px" }}>
              {focusAreas.map((f) => (
                <motion.span
                  key={f.label}
                  whileHover={{
                    scale: 1.06,
                    y: -2,
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                  }}
                  whileTap={{ scale: 0.96 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 17,
                  }}
                  style={{
                    padding: "8px 16px",
                    background: "transparent",
                    border: "none",
                    fontSize: "clamp(0.78rem, 1.5vw, 0.85rem)",
                    fontWeight: 600,
                    borderRadius: "6px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                    color: "var(--text-primary)",
                  }}
                >
                  <f.icon size={16} color="var(--accent-blue)" style={{ flexShrink: 0 }} />
                  {f.label}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Operating Principles Grid */}
        <div style={{ marginTop: "64px", paddingTop: "48px", borderTop: "0.8px solid var(--border-subtle)" }}>
          <span className="section-eyebrow">OUR OPERATING PRINCIPLES</span>
          <h3 className="section-title" style={{ fontSize: "clamp(1.35rem, 3.5vw, 2rem)" }}>
            Engineered for Floor Operators &amp; Executive Leadership
          </h3>

          <div className="process-grid" style={{ marginTop: "32px" }}>
            {operatingPrinciples.map((p, idx) => (
              <motion.div
                key={p.title}
                className="process-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx }}
              >
                <div className="step-num">0{idx + 1}</div>
                <h4 className="step-title">{p.title}</h4>
                <p className="step-desc">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
