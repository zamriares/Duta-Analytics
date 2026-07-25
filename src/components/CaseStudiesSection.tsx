import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, ShieldCheck, Zap, Info } from "lucide-react";

const caseStudies = [
  {
    icon: TrendingUp,
    title: "Precision Machining Plant (Kuala Lumpur)",
    metric: "+14.2% OEE Gain",
    desc: "Integrated telemetry from 45 CNC machines into real-time control room dashboards, reducing micro-stoppages by 38% in 60 days.",
  },
  {
    icon: Zap,
    title: "Automated Welding Bay (Penang)",
    metric: "99.4% Defect Detection",
    desc: "Deployed edge AI computer vision inspection on robotic welding arms, eliminating manual quality audits and scrap rework.",
  },
  {
    icon: ShieldCheck,
    title: "Semiconductor Assembly Facility (Selangor)",
    metric: "-42% Downtime Loss",
    desc: "Implemented predictive vibration and thermal digital twin alerts, preventing 18 catastrophic spindle failures this year.",
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

        <span style={{ fontSize: "0.8rem", fontFamily: "var(--font-mono)", color: "var(--accent-cyan)", fontWeight: 700 }}>
          {cs.metric}
        </span>
      </div>

      <h3 className="feature-title" style={{ marginBottom: "8px" }}>{cs.title}</h3>

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
              {cs.desc}
            </p>
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
