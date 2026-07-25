import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Map, Navigation, Compass, Info } from "lucide-react";

const spatialCapabilities = [
  {
    icon: Layers,
    title: "Geospatial Asset Layers",
    desc: "Overlay physical machinery, power conduits, and sensor nodes on high-resolution CAD and GIS site plans.",
    secondary: "Supports CAD DWG/DXF import, GeoJSON vector layers, and coordinate auto-projection.",
  },
  {
    icon: Map,
    title: "Multi-Facility Fleet Map",
    desc: "Track regional plants, logistics routes, and supply chain status across geographic locations in a single view.",
    secondary: "Global GIS map view with sub-second sync across regional plant sites.",
  },
  {
    icon: Navigation,
    title: "AGV & Mobile Asset Tracking",
    desc: "Monitor real-time positions, battery levels, and route efficiency of automated guided vehicles across the factory floor.",
    secondary: "Ultra-wideband (UWB) indoor positioning with 10cm spatial accuracy.",
  },
  {
    icon: Compass,
    title: "Environmental Heatmaps",
    desc: "Visualize temperature gradients, noise levels, and air quality telemetry spatially across factory bays.",
    secondary: "Kriging spatial interpolation for continuous environmental gradient heatmaps.",
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
        {cap.title}
      </h3>
      <p className="feature-desc" style={{ fontSize: "0.92rem", color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
        {cap.desc}
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
              &rsaquo; {cap.secondary}
            </div>
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
