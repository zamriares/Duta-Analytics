import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Map, Navigation, Compass, ChevronDown, Crosshair, Mountain, Droplets } from "lucide-react";

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

// Interactive LiDAR Topography Viewer with Mouse-Tracking Dotted Crosshair & GIS Telemetry Box
function SpatialLidarViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number; relX: number; relY: number; isInside: boolean }>({
    x: 320,
    y: 200,
    relX: 0.5,
    relY: 0.4,
    isInside: false,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
    const relX = x / rect.width;
    const relY = y / rect.height;

    setMousePos({ x, y, relX, relY, isInside: true });
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, isInside: false }));
  };

  // Dynamic calculations based on relative spatial position (relX, relY)
  const elevation = Math.round(135 + (1 - mousePos.relY) * 165);
  const waterContent = (6.2 + mousePos.relX * 22.4).toFixed(1);
  
  let soilCondition = "Loamy Clay (96.4% Stability)";
  if (mousePos.relY < 0.35) {
    soilCondition = "Granular Bedrock (High Load Bearing)";
  } else if (mousePos.relX > 0.6) {
    soilCondition = "Silty Alluvium (Stable Subgrade)";
  } else if (mousePos.relY > 0.7) {
    soilCondition = "Compacted Gravel (Dry Base)";
  }

  const gridLat = (3.1390 + (1 - mousePos.relY) * 0.0045).toFixed(4);
  const gridLon = (101.6869 + mousePos.relX * 0.0055).toFixed(4);

  return (
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
            SPATIAL GIS CONTROL ROOM &bull; LIDAR TOPOGRAPHY INSPECTION
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
            LIVE LIDAR TOPOLOGY STREAM
          </span>
        </div>
      </div>

      {/* Image Container with Mouse-Driven Crosshair & Telemetry Box */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
          cursor: "crosshair",
          userSelect: "none",
        }}
      >
        {/* Base Image */}
        <img
          src="/assets/WebAssetLidarTopo.webp"
          alt="Spatial GIS & LiDAR Topography Site Intelligence Map"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            objectFit: "cover",
            pointerEvents: "none",
          }}
          onError={(e) => {
            e.currentTarget.src = "/assets/WebAssetLidarTopo.png";
          }}
        />

        {/* SVG Dotted Crosshair Lines Constrained inside Image Frame Boundary */}
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          {/* Vertical Dotted Line */}
          <line
            x1={mousePos.x}
            y1={0}
            x2={mousePos.x}
            y2="100%"
            stroke="var(--accent-cyan, #00f0ff)"
            strokeWidth="1.5"
            strokeDasharray="5 5"
            opacity={mousePos.isInside ? 0.9 : 0.4}
          />
          {/* Horizontal Dotted Line */}
          <line
            x1={0}
            y1={mousePos.y}
            x2="100%"
            y2={mousePos.y}
            stroke="var(--accent-cyan, #00f0ff)"
            strokeWidth="1.5"
            strokeDasharray="5 5"
            opacity={mousePos.isInside ? 0.9 : 0.4}
          />

          {/* Reticle Target Circles at Intersection */}
          <circle
            cx={mousePos.x}
            cy={mousePos.y}
            r="16"
            fill="none"
            stroke="var(--accent-cyan, #00f0ff)"
            strokeWidth="1.5"
            opacity={mousePos.isInside ? 0.9 : 0.5}
          />
          <circle
            cx={mousePos.x}
            cy={mousePos.y}
            r="6"
            fill="var(--accent-cyan, #00f0ff)"
            opacity={mousePos.isInside ? 0.9 : 0.5}
          />
        </svg>

        {/* Floating Telemetry Information Box Clamped inside Image Frame Boundary */}
        <div
          style={{
            position: "absolute",
            top: Math.max(16, Math.min(mousePos.y + 16, containerRef.current ? containerRef.current.clientHeight - 190 : 200)),
            left: Math.max(16, Math.min(mousePos.x + 20, containerRef.current ? containerRef.current.clientWidth - 300 : 300)),
            zIndex: 20,
            background: "rgba(9, 10, 15, 0.92)",
            backdropFilter: "blur(8px)",
            border: "1px solid var(--accent-cyan, #00f0ff)",
            boxShadow: "0 10px 30px rgba(0, 240, 255, 0.25)",
            borderRadius: "4px",
            padding: "14px 18px",
            minWidth: "260px",
            pointerEvents: "none",
            transition: "top 0.05s ease-out, left 0.05s ease-out",
          }}
        >
          {/* Box Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px", borderBottom: "1px solid rgba(0, 240, 255, 0.2)", paddingBottom: "6px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--accent-cyan)", fontWeight: 700 }}>
              <Crosshair size={14} />
              <span>SPATIAL POINT INSPECTION</span>
            </div>
            <span style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>
              {mousePos.isInside ? "LIVE CURSOR" : "DEFAULT POINT"}
            </span>
          </div>

          {/* Telemetry Metrics */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.82rem", fontFamily: "var(--font-mono)" }}>
            {/* Elevation */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "5px" }}>
                <Mountain size={13} color="var(--accent-cyan)" /> ELEVATION:
              </span>
              <strong style={{ color: "#ffffff", fontWeight: 700 }}>{elevation} m ASL</strong>
            </div>

            {/* Soil Condition */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
              <span style={{ color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "5px", flexShrink: 0 }}>
                <Layers size={13} color="var(--accent-blue)" /> SOIL CONDITION:
              </span>
              <strong style={{ color: "var(--accent-cyan)", fontWeight: 700, textAlign: "right", fontSize: "0.78rem" }}>
                {soilCondition}
              </strong>
            </div>

            {/* Water Content */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "5px" }}>
                <Droplets size={13} color="rgb(0, 180, 100)" /> WATER CONTENT:
              </span>
              <strong style={{ color: "rgb(0, 180, 100)", fontWeight: 700 }}>{waterContent}% Volumetric</strong>
            </div>

            {/* Coordinates */}
            <div style={{ marginTop: "4px", paddingTop: "6px", borderTop: "1px dashed rgba(255, 255, 255, 0.1)", fontSize: "0.72rem", color: "var(--text-secondary)", display: "flex", justifyContent: "space-between" }}>
              <span>LAT: {gridLat}° N</span>
              <span>LON: {gridLon}° E</span>
            </div>
          </div>
        </div>
      </div>
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

        {/* Spatial GIS Site Intelligence LiDAR Viewer at Section Bottom */}
        <SpatialLidarViewer />
      </div>
    </section>
  );
}
