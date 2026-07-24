import { motion } from "framer-motion";
import { HelpCircle, Eye, Sliders, Users, Calendar } from "lucide-react";

const operatingQuestions = [
  { q: "What is currently running, stopped, or constrained?", detail: "Real-time state verification across equipment, lines, and sites." },
  { q: "Which assets or lines cause the largest operational impact?", detail: "Identify production bottlenecks and OEE throughput losses." },
  { q: "Where are production, maintenance & quality signals connected?", detail: "Correlate vibration, thermal, and defect signals to single root causes." },
  { q: "Which actions receive management attention first?", detail: "Prioritized intervention workflows before the next operational shift." },
];

const managementValues = [
  { icon: Eye, name: "Visibility", desc: "Faster visibility into bottlenecks & site risks." },
  { icon: Sliders, name: "Prioritization", desc: "Data-driven ranking of maintenance & capital priorities." },
  { icon: Users, name: "Coordination", desc: "Cross-functional alignment between engineering, maintenance & ops." },
  { icon: Calendar, name: "Planning", desc: "Foundation for predictive analytics & scenario planning." },
];

export function DigitalTwinSection() {
  return (
    <section className="page-section digital-twin-section flow" id="digital-twin">
      <div className="container">
        <div style={{ textAlign: "left", maxWidth: "840px" }}>
          <span className="section-eyebrow">INDUSTRIAL DIGITAL TWIN</span>
          <h2 className="section-title">
            Operational Models for Clearer Management Decisions
          </h2>
          <p className="feature-desc" style={{ marginTop: "12px", fontSize: "1.1rem" }}>
            A digital twin is not only a 3D view of a factory or asset. It is a practical decision layer connecting physical operations, equipment data, site context, and management workflows.
          </p>
        </div>

        {/* 4 Core Operating Questions Grid */}
        <div style={{ marginTop: "48px" }}>
          <span className="section-eyebrow">OPERATING QUESTIONS THAT MATTER</span>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
              marginTop: "20px",
            }}
          >
            {operatingQuestions.map((item, idx) => (
              <motion.div
                key={item.q}
                className="feature-item"
                style={{ padding: "28px", background: "var(--bg-secondary)", borderRadius: "4px" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--accent-blue)", marginBottom: "12px" }}>
                  <HelpCircle size={20} />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em" }}>
                    QUESTION 0{idx + 1}
                  </span>
                </div>
                <h3 className="feature-title" style={{ fontSize: "1.15rem", marginBottom: "8px" }}>
                  {item.q}
                </h3>
                <p className="feature-desc" style={{ fontSize: "0.9rem" }}>
                  {item.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Management Value Matrix */}
        <div
          style={{
            marginTop: "64px",
            paddingTop: "48px",
            borderTop: "0.8px solid var(--border-subtle)",
          }}
        >
          <span className="section-eyebrow">MANAGEMENT CONTRIBUTION</span>
          <h3 className="section-title" style={{ fontSize: "2rem" }}>
            Structured Decision Intelligence for Leadership
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "32px",
              marginTop: "36px",
            }}
          >
            {managementValues.map((v, idx) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * idx }}
                  style={{ display: "flex", gap: "16px" }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "4px",
                      background: "var(--bg-secondary)",
                      border: "0.8px solid var(--border-subtle)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={18} color="var(--text-primary)" />
                  </div>
                  <div>
                    <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", fontWeight: 700 }}>
                      {v.name}
                    </h4>
                    <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginTop: "4px", lineHeight: "1.6" }}>
                      {v.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
