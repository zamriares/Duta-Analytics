import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  Eye,
  MapPin,
  Boxes,
  Info,
} from "lucide-react";

const solutionCards = [
  {
    icon: Cpu,
    title: "Factory Telemetry & Process SaaS",
    desc: "Connect machine sensors, PLC signals, and downtime logs into unified operational dashboards for plant managers.",
    bullets: ["Live OEE tracking", "Downtime root cause tagging", "Shift performance metrics"],
  },
  {
    icon: Eye,
    title: "AI Computer Vision Inspection",
    desc: "Deploy neural vision models at production speed to detect surface flaws, assembly errors, and safety compliance.",
    bullets: ["Sub-millimeter defect detection", "Real-time edge inference", "Automated alert triggers"],
  },
  {
    icon: MapPin,
    title: "Spatial GIS & Site Intelligence",
    desc: "Map physical assets, logistics paths, and environmental sensors onto interactive spatial digital maps.",
    bullets: ["Geospatial asset tracking", "Site heatmaps & density", "Multi-facility overview"],
  },
  {
    icon: Boxes,
    title: "3D Asset & Digital Twin Modeling",
    desc: "Create interactive 3D digital twins of production lines to simulate workflows and monitor live equipment state.",
    bullets: ["Web-based 3D scene viewer", "Sensor-linked mesh state", "Predictive maintenance simulation"],
  },
];

function SolutionCard({ sol, idx }: { sol: typeof solutionCards[0]; idx: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = sol.icon;

  return (
    <motion.div
      className="feature-item"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 * idx, duration: 0.6, ease: "easeOut" }}
      style={{
        border: isOpen ? "1px solid var(--accent-cyan)" : "1px solid var(--border-subtle)",
        transition: "border 0.25s ease",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          title="Click icon to toggle secondary details"
          className="feature-icon-box"
          style={{
            background: isOpen ? "rgba(0, 240, 255, 0.2)" : "var(--bg-primary)",
            border: isOpen ? "1px solid var(--accent-cyan)" : "1px solid var(--border-subtle)",
            color: isOpen ? "var(--accent-cyan)" : "var(--text-primary)",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "8px 12px",
            borderRadius: "4px",
          }}
        >
          <Icon size={20} />
          <Info size={13} style={{ color: isOpen ? "var(--accent-cyan)" : "var(--text-secondary)" }} />
        </button>
      </div>

      <h3 className="feature-title" style={{ marginBottom: "8px" }}>{sol.title}</h3>

      {/* Secondary Content: Appears strictly on icon click */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: "hidden" }}
          >
            <p className="feature-desc" style={{ marginBottom: "16px", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
              {sol.desc}
            </p>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {sol.bullets.map((b) => (
                <li
                  key={b}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "0.85rem",
                    color: "var(--text-secondary)",
                    marginBottom: "8px",
                  }}
                >
                  <span style={{ width: "4px", height: "4px", background: "var(--accent-cyan)", borderRadius: "50%" }} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function SolutionsSection() {
  return (
    <section className="page-section solutions-section flow" id="solutions">
      <div className="container">
        <div style={{ textAlign: "left", maxWidth: "840px" }}>
          <span className="section-eyebrow">INTEGRATED PLATFORM MODULES</span>
          <h2 className="section-title">
            Core Modules Built for Factory Scale
          </h2>
          <p className="feature-desc" style={{ marginTop: "12px", fontSize: "1.1rem" }}>
            Four interconnected engineering layers that transform raw operational signals into high-impact control room software.
          </p>
        </div>

        {/* 4 Main Solutions Grid */}
        <div className="features-grid" style={{ marginTop: "48px" }}>
          {solutionCards.map((sol, idx) => (
            <SolutionCard key={sol.title} sol={sol} idx={idx} />
          ))}
        </div>

        {/* Implementation Path Grid */}
        <div style={{ marginTop: "80px", paddingTop: "48px", borderTop: "0.8px solid var(--border-subtle)" }}>
          <span className="section-eyebrow">IMPLEMENTATION PATH</span>
          <h3 className="section-title" style={{ fontSize: "2rem" }}>
            From Scattered Data to Operational Decision Workflows
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "24px",
              marginTop: "32px",
            }}
          >
            {[
              { step: "01", title: "Signal Capture", text: "Ingest PLC, camera streams, and GIS layers into edge gateways." },
              { step: "02", title: "Context Fusion", text: "Link telemetry to 3D spatial models and production schedules." },
              { step: "03", title: "Control Room SaaS", text: "Deliver role-based dashboards and automated action triggers." },
            ].map((st) => (
              <div
                key={st.step}
                style={{
                  padding: "24px",
                  background: "var(--bg-secondary)",
                  borderRadius: "4px",
                  border: "0.8px solid var(--border-subtle)",
                }}
              >
                <div style={{ fontSize: "1.8rem", fontWeight: 800, fontFamily: "var(--font-mono)", color: "var(--accent-cyan)", marginBottom: "8px" }}>
                  {st.step}
                </div>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 700, fontFamily: "var(--font-heading)", marginBottom: "8px" }}>
                  {st.title}
                </h4>
                <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", margin: 0 }}>
                  {st.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
