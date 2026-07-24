import { motion } from "framer-motion";
import { Mountain, Sun, Droplets, Globe, Layers, Compass, ShieldAlert, Satellite } from "lucide-react";

const spatialParams = [
  { icon: Mountain, name: "Elevation & Slope", val: "Topographic Contours & Drainage" },
  { icon: Sun, name: "Sunlight & Exposure", val: "Solar Radiation & Canopy Coverage" },
  { icon: Droplets, name: "Soil Water Index", val: "Moisture Retention & Flood Risk" },
];

const spatialCapabilities = [
  { icon: Satellite, title: "Crop Health & Yield Monitoring", desc: "Multi-spectral satellite interpretation for canopy vigor, low-yield zones, and nutrient deficiency." },
  { icon: Compass, title: "Land Suitability & Site Analysis", desc: "Geospatial terrain modeling for site expansion, soil conditions, and infrastructure access." },
  { icon: Globe, title: "Plantation Productivity Mapping", desc: "Block-by-block yield tracking and harvest planning for palm oil, timber, and commercial crops." },
  { icon: Layers, title: "Material Source & Supply Planning", desc: "Traceability models connecting raw material locations directly to processing mill logistics." },
  { icon: ShieldAlert, title: "Environmental Risk Mapping", desc: "Real-time overlay of flood zones, terrain slope constraints, and environmental conservation boundaries." },
];

export function SpatialSection() {
  return (
    <section className="page-section spatial-section flow" id="spatial">
      <div className="container">
        <div style={{ textAlign: "left", maxWidth: "800px" }}>
          <span className="section-eyebrow">LOCATION INTELLIGENCE</span>
          <h2 className="section-title">Spatial Intelligence, Mapped.</h2>
          <p className="feature-desc" style={{ marginTop: "12px", fontSize: "1.1rem" }}>
            GIS, satellite, and field intelligence for seeing material sources with operational clarity across plantations, agriculture, mining, utilities, and supply chains.
          </p>
        </div>

        {/* Live Spatial Analysis Parameters Banner */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "24px",
            marginTop: "40px",
            background: "var(--bg-secondary)",
            padding: "32px",
            border: "0.8px solid var(--border-subtle)",
            borderRadius: "4px",
          }}
        >
          {spatialParams.map((p, idx) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx }}
                style={{ display: "flex", alignItems: "center", gap: "16px" }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "4px",
                    background: "var(--bg-primary)",
                    border: "0.8px solid var(--border-subtle)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon size={22} color="var(--accent-blue)" />
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.05rem" }}>
                    {p.name}
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "2px" }}>
                    {p.val}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Spatial Capabilities Grid */}
        <div className="features-grid" style={{ marginTop: "48px" }}>
          {spatialCapabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.title}
                className="feature-item"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx, duration: 0.6, ease: "easeOut" }}
              >
                <div className="feature-icon-box">
                  <Icon size={20} />
                </div>
                <h3 className="feature-title">{cap.title}</h3>
                <p className="feature-desc">{cap.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
