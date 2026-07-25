import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Map, Navigation, Compass, ChevronDown } from "lucide-react";

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
        {cap.title}
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
            <p className="feature-desc" style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
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
                padding: "20px 0",
                background: "transparent",
                border: "none",
                borderBottom: "1px solid #666666",
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

        {/* Spatial GIS Site Intelligence Showcase Map Graphic at the Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            marginTop: "64px",
            borderRadius: "6px",
            overflow: "hidden",
            border: "1px solid var(--border-subtle)",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.4)",
            background: "var(--bg-secondary)",
          }}
        >
          {/* Header Control Bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 20px",
              background: "var(--bg-secondary)",
              borderBottom: "1px solid var(--border-subtle)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ff5f56" }} />
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ffbd2e" }} />
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#27c93f" }} />
              <span style={{ color: "var(--text-secondary)", marginLeft: "12px" }}>
                SPATIAL GIS CONTROL ROOM &bull; SITE MAP OVERLAY
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span
                style={{
                  padding: "3px 10px",
                  borderRadius: "12px",
                  background: "rgba(0, 240, 255, 0.15)",
                  color: "var(--accent-cyan)",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--accent-cyan)" }} />
                LIVE GIS MESH STREAM
              </span>
            </div>
          </div>

          {/* Image Showcase Container */}
          <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
            <img
              src="/assets/WebAssetLidarTopo.webp"
              alt="Spatial GIS & LiDAR Topography Site Intelligence Map"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                objectFit: "cover",
              }}
              onError={(e) => {
                e.currentTarget.src = "/assets/WebAssetLidarTopo.png";
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
