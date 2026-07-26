import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Cpu, RefreshCw, Eye, ChevronDown } from "lucide-react";

const digitalTwinFeatures = [
  {
    icon: Box,
    title: "Interactive WebGL 3D Models",
    desc: "Lightweight 3D representations of production equipment rendered smoothly in web browsers using Three.js.",
  },
  {
    icon: Cpu,
    title: "Sensor-Linked Mesh States",
    desc: "3D geometry components dynamically change color, pulse, or animate based on live PLC temperature and vibration metrics.",
  },
  {
    icon: RefreshCw,
    title: "Predictive Wear Simulation",
    desc: "Simulate mechanical stress and thermal fatigue on digital twin components to plan maintenance before failure occurs.",
  },
  {
    icon: Eye,
    title: "Spatial AR & VR Readiness",
    desc: "Export 3D twin scenes to augmented reality headsets for technician guidance during complex repair procedures.",
  },
];

function DigitalTwinCard({ feature, idx }: { feature: typeof digitalTwinFeatures[0]; idx: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = feature.icon;

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
      <h3 className="feature-title" style={{ margin: 0, fontSize: "clamp(1.02rem, 2vw, 1.25rem)", fontWeight: 700, fontFamily: "var(--font-heading)" }}>
        {feature.title}
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
            <p className="feature-desc" style={{ fontSize: "clamp(0.85rem, 1.5vw, 0.92rem)", color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
              {feature.desc}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function DigitalTwinSection() {
  return (
    <section className="page-section digital-twin-section flow" id="digital-twin">
      <div className="container">
        <div style={{ textAlign: "left", maxWidth: "840px" }}>
          <span className="section-eyebrow">3D ASSET & DIGITAL TWIN MODELING</span>
          <h2 className="section-title">
            Live 3D Digital Twins of Physical Operations
          </h2>
          <p className="feature-desc" style={{ marginTop: "12px", fontSize: "clamp(0.92rem, 1.8vw, 1.15rem)" }}>
            Transform CAD engineering files into interactive 3D digital twin models driven by live telemetry and AI predictions.
          </p>
        </div>

        {/* Digital Twin Features Grid */}
        <div className="features-grid" style={{ marginTop: "48px" }}>
          {digitalTwinFeatures.map((feature, idx) => (
            <DigitalTwinCard key={feature.title} feature={feature} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
