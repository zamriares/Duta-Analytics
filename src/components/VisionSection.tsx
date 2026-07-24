import { motion } from "framer-motion";
import {
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const visionCapabilities = [
  "Quality Inspection",
  "Defect Detection",
  "PPE Compliance",
  "Worker Safety",
  "Machine Monitoring",
  "Equipment Health",
  "Production Counting",
  "OCR & Gauge Reading",
  "Inventory Monitoring",
  "Anomaly Detection",
];

const visionWorkflow = [
  "1. Industrial Camera",
  "2. AI Vision Engine",
  "3. Object Detection",
  "4. Spatial Analysis",
  "5. Decision Engine",
  "6. Live Dashboard",
  "7. Alerts & Reports",
];

const industries = [
  "Manufacturing",
  "Smart Factory",
  "Warehousing",
  "Utilities",
  "Logistics",
  "Oil & Gas",
  "Palm Oil",
  "Infrastructure",
];

const cctvComparison = [
  { traditional: "Passive NVR recording", vision: "Active real-time operational understanding" },
  { traditional: "Manual video review", vision: "Automated AI edge analytics" },
  { traditional: "Delayed incident reaction", vision: "Real-time automated alerts" },
  { traditional: "Isolated camera views", vision: "Spatially mapped asset telemetry" },
  { traditional: "DVR video wall clutter", vision: "Unified operational dashboard" },
];

export function VisionSection() {
  return (
    <section className="page-section vision-section flow" id="vision">
      <div className="container">
        <div style={{ textAlign: "left", maxWidth: "840px" }}>
          <span className="section-eyebrow">ENTERPRISE COMPUTER VISION</span>
          <h2 className="section-title">
            Enterprise Computer Vision for Industrial Site Operations
          </h2>
          <p className="feature-desc" style={{ marginTop: "12px", fontSize: "1.1rem" }}>
            Turn standard camera feeds into automated digital sensors. Audit safety postures, detect surface defects, and digitize equipment states in real time.
          </p>
        </div>

        {/* Live Vision System Interactive Console Mockup */}
        <motion.div
          style={{
            marginTop: "40px",
            background: "var(--bg-dark)",
            color: "var(--text-inverse)",
            borderRadius: "6px",
            border: "0.8px solid var(--border-dark)",
            overflow: "hidden",
            padding: "28px",
          }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "16px",
              paddingBottom: "20px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "rgb(0, 220, 130)",
                  boxShadow: "0 0 10px rgb(0, 220, 130)",
                }}
              />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.1em" }}>
                VISION ENGINE DEMONSTRATION &bull; RTSP STREAM #04
              </span>
            </div>
            <div style={{ display: "flex", gap: "12px", fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "rgb(180, 185, 198)" }}>
              <span>ENGINE: TensorRT 10.2</span>
              <span>INFERENCE: OPERATIONAL (18ms)</span>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "24px",
              marginTop: "24px",
            }}
          >
            <div>
              <span style={{ fontSize: "0.75rem", color: "rgb(140, 145, 158)", fontFamily: "var(--font-mono)" }}>
                PARTS PROCESSED (SHIFT)
              </span>
              <div style={{ fontSize: "2rem", fontWeight: 800, fontFamily: "var(--font-heading)", marginTop: "4px" }}>
                14,820
              </div>
            </div>
            <div>
              <span style={{ fontSize: "0.75rem", color: "rgb(140, 145, 158)", fontFamily: "var(--font-mono)" }}>
                DEFECTS FLAGGED
              </span>
              <div style={{ fontSize: "2rem", fontWeight: 800, fontFamily: "var(--font-heading)", color: "rgb(255, 180, 0)", marginTop: "4px" }}>
                18 <span style={{ fontSize: "0.85rem", fontWeight: 500 }}>(0.12%)</span>
              </div>
            </div>
            <div>
              <span style={{ fontSize: "0.75rem", color: "rgb(140, 145, 158)", fontFamily: "var(--font-mono)" }}>
                PPE AUDITED WORKERS
              </span>
              <div style={{ fontSize: "2rem", fontWeight: 800, fontFamily: "var(--font-heading)", marginTop: "4px" }}>
                142
              </div>
            </div>
            <div>
              <span style={{ fontSize: "0.75rem", color: "rgb(140, 145, 158)", fontFamily: "var(--font-mono)" }}>
                SAFETY STATUS
              </span>
              <div style={{ fontSize: "2rem", fontWeight: 800, fontFamily: "var(--font-heading)", color: "rgb(0, 220, 130)", marginTop: "4px" }}>
                100% Cleared
              </div>
            </div>
          </div>
        </motion.div>

        {/* 10 Vision Capabilities Grid */}
        <div style={{ marginTop: "56px" }}>
          <span className="section-eyebrow">AUTOMATED DIGITAL SENSOR CAPABILITIES</span>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "16px",
              marginTop: "20px",
            }}
          >
            {visionCapabilities.map((cap, idx) => (
              <motion.div
                key={cap}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * idx }}
                style={{
                  padding: "16px 20px",
                  background: "var(--bg-secondary)",
                  border: "0.8px solid var(--border-subtle)",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                }}
              >
                <CheckCircle2 size={16} color="var(--accent-blue)" />
                <span>{cap}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Vision Workflow Step-by-Step */}
        <div style={{ marginTop: "64px", paddingTop: "48px", borderTop: "0.8px solid var(--border-subtle)" }}>
          <span className="section-eyebrow">THE VISION WORKFLOW</span>
          <h3 className="section-title" style={{ fontSize: "2rem" }}>
            From Video Signals to Decision Action
          </h3>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              marginTop: "28px",
              alignItems: "center",
            }}
          >
            {visionWorkflow.map((w, idx) => (
              <div key={w} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span
                  style={{
                    padding: "10px 18px",
                    background: "var(--bg-primary)",
                    border: "0.8px solid var(--border-strong)",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {w}
                </span>
                {idx < visionWorkflow.length - 1 && <ArrowRight size={16} color="var(--text-muted)" />}
              </div>
            ))}
          </div>
        </div>

        {/* Industries Served */}
        <div style={{ marginTop: "56px" }}>
          <span className="section-eyebrow">TARGET OPERATIONAL ENVIRONMENTS</span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "16px" }}>
            {industries.map((ind) => (
              <span
                key={ind}
                className="hero-badge"
                style={{ marginBottom: 0, textTransform: "none", fontSize: "0.8rem", padding: "8px 16px" }}
              >
                {ind}
              </span>
            ))}
          </div>
        </div>

        {/* CCTV Comparison Grid */}
        <div style={{ marginTop: "64px", paddingTop: "48px", borderTop: "0.8px solid var(--border-subtle)" }}>
          <span className="section-eyebrow">EDGE AI VS TRADITIONAL CCTV</span>
          <h3 className="section-title" style={{ fontSize: "1.8rem" }}>
            Transforming Passive Recording into Active Operational AI
          </h3>

          <div style={{ marginTop: "28px", display: "grid", gap: "12px" }}>
            {cctvComparison.map((row, idx) => (
              <div
                key={idx}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "24px",
                  padding: "16px 24px",
                  background: idx % 2 === 0 ? "var(--bg-secondary)" : "var(--bg-primary)",
                  border: "0.8px solid var(--border-subtle)",
                  fontSize: "0.9rem",
                }}
              >
                <div style={{ color: "var(--text-secondary)", textDecoration: "line-through" }}>
                  {row.traditional}
                </div>
                <div style={{ fontWeight: 700, color: "var(--text-primary)" }}>
                  {row.vision}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
