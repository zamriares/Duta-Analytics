import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, ShieldCheck, Zap, Info } from "lucide-react";

const caseStudies = [
  {
    icon: TrendingUp,
    title: "Precision Machining Plant (Kuala Lumpur)",
    metric: "+14.2% OEE Gain",
    desc: "Integrated telemetry from 45 CNC machines into real-time control room dashboards, reducing micro-stoppages by 38% in 60 days.",
    secondary: "Implementation timeline: 6 weeks. Connected 45 Fanuc & Siemens CNC PLCs via Kepware OPC-UA server cluster.",
  },
  {
    icon: Zap,
    title: "Automated Welding Bay (Penang)",
    metric: "99.4% Defect Detection",
    desc: "Deployed edge AI computer vision inspection on robotic welding arms, eliminating manual quality audits and scrap rework.",
    secondary: "Edge AI deployment: 4 NVIDIA Jetson Orin AGX units processing 60 FPS multi-angle camera streams.",
  },
  {
    icon: ShieldCheck,
    title: "Semiconductor Assembly Facility (Selangor)",
    metric: "-42% Downtime Loss",
    desc: "Implemented predictive vibration and thermal digital twin alerts, preventing 18 catastrophic spindle failures this year.",
    secondary: "Predictive ROI: $148,000 direct annual savings in bearing replacement & unplanned line stoppage costs.",
  },
];

function CaseStudyCard({ cs, idx }: { cs: typeof caseStudies[0]; idx: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = cs.icon;

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
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div className="feature-icon-box" style={{ marginBottom: 0 }}>
            <Icon size={20} />
          </div>
          <span style={{ fontSize: "0.82rem", fontFamily: "var(--font-mono)", color: "var(--accent-cyan)", fontWeight: 700 }}>
            {cs.metric}
          </span>
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
        {cs.title}
      </h3>
      <p className="feature-desc" style={{ fontSize: "0.92rem", color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
        {cs.desc}
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
              &rsaquo; {cs.secondary}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function CaseStudiesSection() {
  return (
    <section className="page-section case-studies-section flow" id="case-studies">
      <div className="container">
        <div style={{ textAlign: "left", maxWidth: "840px" }}>
          <span className="section-eyebrow">FIELD RESULTS & CASE STUDIES</span>
          <h2 className="section-title">
            Proven Industrial ROI Across Malaysian Manufacturing
          </h2>
          <p className="feature-desc" style={{ marginTop: "12px", fontSize: "1.1rem" }}>
            Real deployment metrics from enterprise production lines running Duta Analytics operational software.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="features-grid" style={{ marginTop: "48px" }}>
          {caseStudies.map((cs, idx) => (
            <CaseStudyCard key={cs.title} cs={cs} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
