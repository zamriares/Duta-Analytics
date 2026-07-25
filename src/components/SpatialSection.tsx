import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Map, Navigation, Compass, Info } from "lucide-react";

const spatialCapabilities = [
  {
    icon: Layers,
    title: "Geospatial Asset Layers",
    desc: "Overlay physical machinery, power conduits, and sensor nodes on high-resolution CAD and GIS site plans.",
  },
  {
    icon: Map,
    title: "Multi-Facility Fleet Map",
    desc: "Track regional plants, logistics routes, and supply chain status across geographic locations in a single view.",
  },
  {
    icon: Navigation,
    title: "AGV & Mobile Asset Tracking",
    desc: "Monitor real-time positions, battery levels, and route efficiency of automated guided vehicles across the factory floor.",
  },
  {
    icon: Compass,
    title: "Environmental Heatmaps",
    desc: "Visualize temperature gradients, noise levels, and air quality telemetry spatially across factory bays.",
  },
];

function SpatialCard({ cap, idx }: { cap: typeof spatialCapabilities[0]; idx: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = cap.icon;

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

      <h3 className="feature-title" style={{ marginBottom: "8px" }}>{cap.title}</h3>

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
              {cap.desc}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function SpatialSection() {
  return (
    <section className="page-section spatial-section flow" id="spatial">
      <div className="container">
        <div style={{ textAlign: "left", maxWidth: "840px" }}>
          <span className="section-eyebrow">SPATIAL GIS & SITE INTELLIGENCE</span>
          <h2 className="section-title">
            Ground-Level Spatial Context for Every Asset
          </h2>
          <p className="feature-desc" style={{ marginTop: "12px", fontSize: "1.1rem" }}>
            Bridge GIS mapping and indoor factory coordinates to track machinery, environmental sensors, and mobile assets spatially.
          </p>
        </div>

        {/* Spatial KPI Stat Bar */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            marginTop: "40px",
          }}
        >
          {[
            { label: "MAPPED SITES", val: "14 Facilities" },
            { label: "SPATIAL RESOLUTION", val: "Sub-Meter GIS" },
            { label: "TRACKED ASSETS", val: "1,420 Nodes" },
            { label: "HEATMAP UPDATE RATE", val: "1.2s Real-Time" },
          ].map((p, idx) => (
            <motion.div
              key={p.label}
              style={{
                padding: "20px",
                background: "var(--bg-secondary)",
                borderRadius: "4px",
                border: "0.8px solid var(--border-subtle)",
              }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 * idx }}
            >
              <div style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--text-secondary)", letterSpacing: "0.1em" }}>
                {p.label}
              </div>
              <div style={{ fontSize: "1.4rem", fontWeight: 800, fontFamily: "var(--font-heading)", marginTop: "6px" }}>
                {p.val}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Spatial Capabilities Grid */}
        <div className="features-grid" style={{ marginTop: "48px" }}>
          {spatialCapabilities.map((cap, idx) => (
            <SpatialCard key={cap.title} cap={cap} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
