import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  Eye,
  MapPin,
  Boxes,
  ChevronDown,
} from "lucide-react";

const solutionCards = [
  {
    icon: Cpu,
    title: "Factory Telemetry & Process SaaS",
    desc: "Connect machine sensors, PLC signals, and downtime logs into unified operational dashboards for plant managers.",
    bullets: ["Live OEE tracking & downtime root cause tagging", "Real-time shift performance metrics & machine telemetry", "Sub-30ms OPC-UA edge gateway integration"],
  },
  {
    icon: Eye,
    title: "Enterprise A.I Vision Inspection",
    desc: "Deploy neural vision models at production speed to detect surface flaws, assembly errors, and safety compliance.",
    bullets: ["Sub-millimeter defect detection at 60 FPS", "Real-time edge neural inference on CUDA", "Automated alert triggers & reject gate activation"],
  },
  {
    icon: MapPin,
    title: "Spatial GIS & Site Intelligence",
    desc: "Map physical assets, logistics paths, and environmental sensors onto interactive spatial digital maps.",
    bullets: ["Geospatial asset tracking & indoor positioning", "Site thermal heatmaps & traffic density overlays", "Multi-facility regional fleet management"],
  },
  {
    icon: Boxes,
    title: "3D Asset & Digital Twin Modeling",
    desc: "Create interactive 3D digital twins of production lines to simulate workflows and monitor live equipment state.",
    bullets: ["Web-based 3D scene viewer in Three.js", "Sensor-linked mesh state & live thermal pulse", "Predictive maintenance & wear simulation"],
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
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{
        delay: 0.08 * idx,
        type: "spring",
        stiffness: 400,
        damping: 22,
      }}
      onClick={() => setIsOpen((prev) => !prev)}
      style={{
        padding: "20px 0 24px 0",
        background: "transparent",
        border: "none",
        borderBottom: isOpen ? "2.5px solid #000000" : "1px solid #666666",
        boxShadow: "none",
        cursor: "pointer",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
        <div className="feature-icon-box" style={{ marginBottom: 0 }}>
          <Icon size={20} />
        </div>

        <div
          title="Click card to toggle content text"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            padding: "4px 8px",
            fontSize: "0.75rem",
            fontFamily: "var(--font-mono)",
            fontWeight: 700,
            borderRadius: "4px",
            background: "transparent",
            border: "none",
            color: isOpen ? "#000000" : "var(--text-secondary)",
            transition: "all 0.2s ease",
          }}
        >
          <span>{isOpen ? "CLOSE" : "EXPAND"}</span>
          <ChevronDown size={14} style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s ease" }} />
        </div>
      </div>

      {/* ONLY TITLE VISIBLE BY DEFAULT */}
      <h3 className="feature-title" style={{ margin: 0, fontSize: "1.2rem", fontWeight: 700, fontFamily: "var(--font-heading)" }}>
        {sol.title}
      </h3>

      {/* CONTENT TEXT APPEARS ON CLICK */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 14 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{ overflow: "hidden" }}
          >
            <p className="feature-desc" style={{ marginBottom: "14px", fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
              {sol.desc}
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {sol.bullets.map((b) => (
                <li
                  key={b}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "0.85rem",
                    color: "var(--text-primary)",
                    marginBottom: "8px",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  <span style={{ width: "5px", height: "5px", background: "var(--accent-cyan)", borderRadius: "50%", flexShrink: 0 }} />
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
            ].map((st, idx) => (
              <motion.div
                key={st.step}
                initial={{ opacity: 0, x: -90 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{
                  duration: 1.4,
                  delay: 0.3 * idx,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -6, scale: 1.015 }}
                style={{
                  padding: "20px 0",
                  background: "transparent",
                  border: "none",
                  borderBottom: "1px solid #666666",
                }}
              >
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 1.2, delay: 0.3 * idx + 0.15, ease: [0.16, 1, 0.3, 1] }}
                  style={{ fontSize: "1.8rem", fontWeight: 800, fontFamily: "var(--font-mono)", color: "var(--accent-cyan)", marginBottom: "8px" }}
                >
                  {st.step}
                </motion.div>
                <motion.h4
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 1.2, delay: 0.3 * idx + 0.3, ease: [0.16, 1, 0.3, 1] }}
                  style={{ fontSize: "1.1rem", fontWeight: 700, fontFamily: "var(--font-heading)", marginBottom: "8px" }}
                >
                  {st.title}
                </motion.h4>
                <motion.p
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 1.2, delay: 0.3 * idx + 0.45, ease: [0.16, 1, 0.3, 1] }}
                  style={{ fontSize: "0.88rem", color: "var(--text-secondary)", margin: 0 }}
                >
                  {st.text}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
