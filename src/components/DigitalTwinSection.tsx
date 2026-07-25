import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Cpu, RefreshCw, Eye, Info } from "lucide-react";

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

      <h3 className="feature-title" style={{ marginBottom: "8px" }}>{feature.title}</h3>

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
            <p className="feature-desc" style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
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
          <p className="feature-desc" style={{ marginTop: "12px", fontSize: "1.1rem" }}>
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
