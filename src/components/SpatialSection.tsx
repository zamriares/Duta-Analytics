import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  Compass,
  ChevronDown,
  Crosshair,
  Mountain,
  Droplets,
  TreePine,
  Leaf,
  Sprout,
  ShieldCheck,
  Truck,
  FileCheck,
  Sun,
} from "lucide-react";

const spatialCapabilities = [
  {
    icon: TreePine,
    title: "Plantation & Estate GIS Intelligence",
    desc: "Multi-spectral satellite and drone remote sensing for large-scale estates, block-level canopy vigor indexing (NDVI), and automated yield estimations.",
    tag: "AGRICULTURAL GIS",
  },
  {
    icon: Leaf,
    title: "Crop Source Material & EUDR Traceability",
    desc: "Geofence harvesting plots to verify legal land origin, monitor zero-deforestation compliance, and trace crop material from farm block to processing mill.",
    tag: "SUPPLY CHAIN TRACEABILITY",
  },
  {
    icon: Mountain,
    title: "LiDAR Topography & Soil Hydrology",
    desc: "Generate 3D Digital Elevation Models (DEM) for precision contour terracing, canal drainage layout, and slope stability analysis.",
    tag: "TERRAIN ANALYTICS",
  },
  {
    icon: Layers,
    title: "Geospatial Asset & Sensor Overlays",
    desc: "Overlay physical machinery, soil sensor arrays, weather stations, and power conduits on high-resolution CAD and GIS site plans.",
    tag: "INDUSTRIAL & SITE GIS",
  },
  {
    icon: Truck,
    title: "Fleet & Harvest Logistics Tracking",
    desc: "Monitor real-time positions, haulage truck routes, FFB transport status, and mobile asset efficiency across regional estates.",
    tag: "LOGISTICS & FLEET",
  },
  {
    icon: Compass,
    title: "Environmental & Micro-Climate Heatmaps",
    desc: "Visualize temperature gradients, rainfall accumulation, ambient humidity, and soil moisture telemetry spatially across fields and bays.",
    tag: "TELEMETRY & CLIMATE",
  },
];

const plantationServices = [
  {
    icon: FileCheck,
    title: "EUDR & RSPO Sourcing Compliance",
    desc: "Automated polygon mapping and deforestation risk overlays to satisfy strict international import regulations (EUDR, RSPO, ISPO).",
    badge: "Regulatory Proof",
  },
  {
    icon: Sprout,
    title: "Canopy Vigor & NDVI Crop Health",
    desc: "Identify crop stress, nutrient deficiencies, and disease outbreaks weeks before visual symptoms manifest on the ground.",
    badge: "Remote Sensing",
  },
  {
    icon: Sun,
    title: "Yield Forecasting & Harvest Planning",
    desc: "Combine historic crop cycles, weather telemetry, and satellite imagery to predict harvest tonnage and schedule field labor.",
    badge: "AI Predictive",
  },
  {
    icon: ShieldCheck,
    title: "Raw Material Origin Verification",
    desc: "Track crop batches (oil palm FFB, timber, rubber, cocoa) with immutable spatial timestamps from collection point to processing plant.",
    badge: "Chain of Custody",
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
        borderBottom: isOpen ? "2.5px solid var(--accent-blue)" : "1px solid #666666",
        boxShadow: "none",
        cursor: "pointer",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
        <div className="feature-icon-box" style={{ marginBottom: 0 }}>
          <Icon size={20} />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              padding: "2px 8px",
              fontSize: "0.65rem",
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              borderRadius: "4px",
              background: "rgba(59, 130, 246, 0.12)",
              color: "var(--accent-blue)",
              letterSpacing: "0.05em",
            }}
          >
            {cap.tag}
          </span>
          <div
            title="Click card to toggle content text"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              padding: "4px 8px",
              fontSize: "0.75rem",
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              borderRadius: "4px",
              color: isOpen ? "var(--accent-blue)" : "var(--text-secondary)",
              transition: "all 0.2s ease",
            }}
          >
            <span>{isOpen ? "CLOSE" : "EXPAND"}</span>
            <ChevronDown size={14} style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s ease" }} />
          </div>
        </div>
      </div>

      <h3 className="feature-title" style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700, fontFamily: "var(--font-heading)" }}>
        {cap.title}
      </h3>

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

function PlantationServiceCard({ service, idx }: { service: typeof plantationServices[0]; idx: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{
        delay: 0.08 * idx,
        type: "spring",
        stiffness: 400,
        damping: 22,
      }}
      onClick={() => setIsOpen((prev) => !prev)}
      style={{
        padding: "20px 0 22px 0",
        background: "transparent",
        border: "none",
        borderBottom: isOpen ? "2.5px solid var(--accent-blue)" : "1px solid #666666",
        cursor: "pointer",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ padding: "6px", borderRadius: "6px", background: "rgba(59, 130, 246, 0.12)", color: "var(--accent-blue)", display: "flex", alignItems: "center" }}>
            <Icon size={18} />
          </div>
          <span style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: "var(--accent-cyan)", fontWeight: 700 }}>
            {service.badge}
          </span>
        </div>

        <div
          title="Click card to toggle content text"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            padding: "4px 8px",
            fontSize: "0.75rem",
            fontFamily: "var(--font-mono)",
            fontWeight: 700,
            color: isOpen ? "var(--accent-blue)" : "var(--text-secondary)",
            transition: "all 0.2s ease",
          }}
        >
          <span>{isOpen ? "CLOSE" : "EXPAND"}</span>
          <ChevronDown size={14} style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s ease" }} />
        </div>
      </div>

      {/* ONLY TITLE HEADING VISIBLE BY DEFAULT */}
      <h4 style={{ fontSize: "1.1rem", fontWeight: 700, fontFamily: "var(--font-heading)", margin: 0, color: "var(--text-primary)" }}>
        {service.title}
      </h4>

      {/* CHILD CONTENTS COLLAPSIBLE */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 12 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{ overflow: "hidden" }}
          >
            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
              {service.desc}
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
  const [viewMode, setViewMode] = useState<"plantation" | "industrial">("plantation");
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
  const ndviIndex = (0.64 + mousePos.relX * 0.28 - mousePos.relY * 0.1).toFixed(2);
  
  let areaLabel = "Block P-40B (Mature Canopy)";
  let soilCondition = "Loamy Clay (High Moisture)";
  if (mousePos.relY < 0.35) {
    areaLabel = "High-Altitude Contour Terrace";
    soilCondition = "Granular Bedrock (Well Drained)";
  } else if (mousePos.relX > 0.6) {
    areaLabel = "Riparian Zone Buffer Polygon";
    soilCondition = "Silty Alluvium (Stable Subgrade)";
  } else if (mousePos.relY > 0.7) {
    areaLabel = "Harvest Collection Depot #4";
    soilCondition = "Compacted Gravel (Dry Access Base)";
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
          flexWrap: "wrap",
          gap: "12px",
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
            SPATIAL GIS CONTROL ROOM &bull; {viewMode === "plantation" ? "PLANTATION & CROP TOPOGRAPHY" : "FACILITY CAD & SITE LIDAR"}
          </span>
        </div>

        {/* View Mode Toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ display: "flex", background: "rgba(255, 255, 255, 0.05)", borderRadius: "4px", padding: "2px" }}>
            <button
              onClick={() => setViewMode("plantation")}
              style={{
                padding: "4px 12px",
                fontSize: "0.72rem",
                fontFamily: "var(--font-mono)",
                fontWeight: 700,
                borderRadius: "3px",
                border: "none",
                background: viewMode === "plantation" ? "var(--accent-blue)" : "transparent",
                color: viewMode === "plantation" ? "#ffffff" : "var(--text-secondary)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              PLANTATION & CROP GIS
            </button>
            <button
              onClick={() => setViewMode("industrial")}
              style={{
                padding: "4px 12px",
                fontSize: "0.72rem",
                fontFamily: "var(--font-mono)",
                fontWeight: 700,
                borderRadius: "3px",
                border: "none",
                background: viewMode === "industrial" ? "var(--accent-blue)" : "transparent",
                color: viewMode === "industrial" ? "#ffffff" : "var(--text-secondary)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              INDUSTRIAL CAD
            </button>
          </div>

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
            LIVE SATELLITE & LIDAR FEED
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
            top: Math.max(16, Math.min(mousePos.y + 16, containerRef.current ? containerRef.current.clientHeight - 210 : 200)),
            left: Math.max(16, Math.min(mousePos.x + 20, containerRef.current ? containerRef.current.clientWidth - 310 : 300)),
            zIndex: 20,
            background: "rgba(9, 10, 15, 0.92)",
            backdropFilter: "blur(8px)",
            border: "1px solid var(--accent-cyan, #00f0ff)",
            boxShadow: "0 10px 30px rgba(0, 240, 255, 0.25)",
            borderRadius: "4px",
            padding: "14px 18px",
            minWidth: "270px",
            pointerEvents: "none",
            transition: "top 0.05s ease-out, left 0.05s ease-out",
          }}
        >
          {/* Box Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px", borderBottom: "1px solid rgba(0, 240, 255, 0.2)", paddingBottom: "6px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--accent-cyan)", fontWeight: 700 }}>
              <Crosshair size={14} />
              <span>{viewMode === "plantation" ? "CROP PLOT INSPECTION" : "SPATIAL POINT INSPECTION"}</span>
            </div>
            <span style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>
              {mousePos.isInside ? "LIVE CURSOR" : "DEFAULT"}
            </span>
          </div>

          {/* Telemetry Metrics */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.82rem", fontFamily: "var(--font-mono)" }}>
            {viewMode === "plantation" ? (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "5px" }}>
                    <TreePine size={13} color="var(--accent-blue)" /> PLOT ZONE:
                  </span>
                  <strong style={{ color: "#ffffff", fontWeight: 700, fontSize: "0.78rem" }}>{areaLabel}</strong>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "5px" }}>
                    <Sprout size={13} color="rgb(0, 220, 130)" /> CANOPY (NDVI):
                  </span>
                  <strong style={{ color: "rgb(0, 220, 130)", fontWeight: 700 }}>{ndviIndex} (Optimal Vigor)</strong>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "5px" }}>
                    <Mountain size={13} color="var(--accent-cyan)" /> ELEVATION:
                  </span>
                  <strong style={{ color: "#ffffff", fontWeight: 700 }}>{elevation} m ASL</strong>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "5px" }}>
                    <Droplets size={13} color="var(--accent-blue)" /> SOIL MOISTURE:
                  </span>
                  <strong style={{ color: "var(--accent-cyan)", fontWeight: 700 }}>{waterContent}% Volumetric</strong>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "5px" }}>
                    <ShieldCheck size={13} color="#27c93f" /> EUDR STATUS:
                  </span>
                  <strong style={{ color: "#27c93f", fontWeight: 700, fontSize: "0.75rem" }}>Verified Compliant</strong>
                </div>
              </>
            ) : (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "5px" }}>
                    <Mountain size={13} color="var(--accent-cyan)" /> ELEVATION:
                  </span>
                  <strong style={{ color: "#ffffff", fontWeight: 700 }}>{elevation} m ASL</strong>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
                  <span style={{ color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "5px", flexShrink: 0 }}>
                    <Layers size={13} color="var(--accent-blue)" /> SOIL CONDITION:
                  </span>
                  <strong style={{ color: "var(--accent-cyan)", fontWeight: 700, textAlign: "right", fontSize: "0.78rem" }}>
                    {soilCondition}
                  </strong>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "5px" }}>
                    <Droplets size={13} color="rgb(0, 180, 100)" /> WATER CONTENT:
                  </span>
                  <strong style={{ color: "rgb(0, 180, 100)", fontWeight: 700 }}>{waterContent}% Volumetric</strong>
                </div>
              </>
            )}

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
          <span className="section-eyebrow">SPATIAL GIS, PLANTATION & SITE INTELLIGENCE</span>
          <h2 className="section-title">
            Ground-Level & Agronomic Spatial Context for Every Site & Crop Block
          </h2>
          <p className="feature-desc" style={{ marginTop: "12px", fontSize: "1.1rem", lineHeight: 1.6 }}>
            Bridge GIS mapping, plantation satellite imagery, crop source material polygon tracking, and indoor factory coordinates into a single unified spatial decision intelligence platform.
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
            { label: "MAPPED ESTATES & SITES", val: "120,000+ Ha" },
            { label: "SPATIAL RESOLUTION", val: "Sub-Meter GIS" },
            { label: "CROP PLOT POLYGONS", val: "4,850 Blocks" },
            { label: "TRACEABILITY COMPLIANCE", val: "100% EUDR / RSPO" },
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

        {/* Dedicated Plantation & Crop Source Material GIS Services Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            marginTop: "64px",
            padding: "20px 0 0 0",
            background: "transparent",
            border: "none",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <span className="section-eyebrow" style={{ fontSize: "0.75rem" }}>
                AGRONOMIC & CROP SOURCE MATERIAL SERVICES
              </span>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 700, fontFamily: "var(--font-heading)", marginTop: "8px" }}>
                End-to-End Plantation GIS & Raw Material Traceability
              </h3>
            </div>
            <span
              style={{
                padding: "6px 14px",
                fontSize: "0.8rem",
                fontFamily: "var(--font-mono)",
                fontWeight: 700,
                borderRadius: "20px",
                background: "rgba(39, 201, 63, 0.12)",
                color: "#27c93f",
                border: "1px solid rgba(39, 201, 63, 0.3)",
              }}
            >
              EUDR & RSPO READY
            </span>
          </div>

          <p style={{ marginTop: "14px", fontSize: "0.98rem", color: "var(--text-secondary)", lineHeight: 1.6, maxWidth: "900px" }}>
            We provide specialized spatial intelligence solutions for estate managers, timber concession operators, palm oil processors, and agri-consultants. From satellite NDVI health index monitoring to crop parcel geofencing and zero-deforestation audit logs, our services give full visibility over upstream material origins.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "24px",
              marginTop: "28px",
            }}
          >
            {plantationServices.map((service, idx) => (
              <PlantationServiceCard key={service.title} service={service} idx={idx} />
            ))}
          </div>
        </motion.div>

        {/* Spatial GIS Site Intelligence LiDAR Viewer at Section Bottom */}
        <SpatialLidarViewer />
      </div>
    </section>
  );
}

