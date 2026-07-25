import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Cpu, RefreshCw, Eye, Info } from "lucide-react";

const digitalTwinFeatures = [
  {
    icon: Box,
    title: "Interactive WebGL 3D Models",
    desc: "Lightweight 3D representations of production equipment rendered smoothly in web browsers using Three.js.",
    secondary: "GLTF/GLB compression with LOD (Level of Detail) mesh optimization.",
  },
  {
    icon: Cpu,
    title: "Sensor-Linked Mesh States",
    desc: "3D geometry components dynamically change color, pulse, or animate based on live PLC temperature and vibration metrics.",
    secondary: "Real-time shader materials linked directly to WebSocket telemetry streams.",
  },
  {
    icon: RefreshCw,
    title: "Predictive Wear Simulation",
    desc: "Simulate mechanical stress and thermal fatigue on digital twin components to plan maintenance before failure occurs.",
    secondary: "Finite Element Method (FEM) fatigue modeling with historical lifespan projection.",
  },
  {
    icon: Eye,
    title: "Spatial AR & VR Readiness",
    desc: "Export 3D twin scenes to augmented reality headsets for technician guidance during complex repair procedures.",
    secondary: "WebXR & OpenXR compatible for hands-free maintenance walkthroughs.",
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
        padding: "24px",
        background: "var(--bg-secondary)",
        borderRadius: "4px",
        border: isOpen ? "1px solid var(--accent-cyan)" : "0.8px solid var(--border-subtle)",
        boxShadow: isOpen ? "0 8px 24px rgba(0, 240, 255, 0.08)" : "none",
        transition: "all 0.25s ease",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <div className="feature-icon-box" style={{ marginBottom: 0 }}>
          <Icon size={20} />
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen((prev) => !prev);
          }}
          title="Click to toggle secondary details"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            padding: "4px 8px",
            fontSize: "0.75rem",
            fontFamily: "var(--font-mono)",
            fontWeight: 700,
            borderRadius: "4px",
            background: isOpen ? "rgba(0, 240, 255, 0.2)" : "rgba(255, 255, 255, 0.05)",
            border: isOpen ? "1px solid var(--accent-cyan)" : "1px solid var(--border-subtle)",
            color: isOpen ? "var(--accent-cyan)" : "var(--text-secondary)",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          <span>{isOpen ? "HIDE DETAILS" : "VIEW DETAILS"}</span>
          <Info size={12} style={{ color: isOpen ? "var(--accent-cyan)" : "var(--text-secondary)" }} />
        </button>
      </div>

      <h3 className="feature-title" style={{ marginBottom: "10px", fontSize: "1.2rem", fontWeight: 700, fontFamily: "var(--font-heading)" }}>
        {feature.title}
      </h3>
      <p className="feature-desc" style={{ fontSize: "0.92rem", color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
        {feature.desc}
      </p>

      {/* Secondary Content: Appears strictly on icon click */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 14 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ paddingTop: "10px", borderTop: "1px dashed var(--border-subtle)", fontSize: "0.84rem", color: "var(--accent-cyan)", fontFamily: "var(--font-mono)", fontWeight: 600 }}>
              &rsaquo; {feature.secondary}
            </div>
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
