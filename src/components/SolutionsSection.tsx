import { motion } from "framer-motion";
import { Factory, MapPin, BrainCircuit, Box } from "lucide-react";

const solutionCards = [
  {
    icon: Factory,
    title: "Manufacturing SaaS / Factory Visibility",
    desc: "Unified operational layer for production, quality, downtime, maintenance, and leadership reporting.",
    bullets: [
      "Line performance & OEE monitoring",
      "Downtime and maintenance signal tracking",
      "Quality variance & rework analytics",
      "Shift, asset, and multi-plant reporting",
    ],
  },
  {
    icon: MapPin,
    title: "GIS Services / Spatial Analysis",
    desc: "Location intelligence for physical assets, service coverage, site risk, and infrastructure planning.",
    bullets: [
      "Asset & site geospatial mapping",
      "Service-area & catchment analysis",
      "Risk & environmental constraint overlays",
      "Field-ready spatial data workflows",
    ],
  },
  {
    icon: BrainCircuit,
    title: "AI-Assisted Analytics / Decision Intelligence",
    desc: "Analytical workflows that convert live signals, historical patterns, and domain rules into prioritized action.",
    bullets: [
      "Real-time exception monitoring",
      "Automated performance narratives",
      "Root-cause indicator synthesis",
      "AI-recommended next actions",
    ],
  },
  {
    icon: Box,
    title: "Digital Twin / Industrial Digital Twin",
    desc: "Structured operating model of sites, assets, process flows, and performance signals for executive review.",
    bullets: [
      "Asset & process digital modeling",
      "Live signal & telemetry relationships",
      "What-if scenario comparison",
      "Operational simulation readiness",
    ],
  },
];

const implementationSteps = [
  { step: "01", name: "Scope Map", detail: "Define operating questions & physical site parameters" },
  { step: "02", name: "Data Layer", detail: "Connect machine telemetry, ERP exports & spatial GIS" },
  { step: "03", name: "Signal Logic", detail: "Deploy exception rules, OEE algorithms & AI models" },
  { step: "04", name: "Live Workflow", detail: "Empower control rooms with real-time operational action" },
];

export function SolutionsSection() {
  return (
    <section className="page-section solutions-section flow" id="solutions">
      <div className="container">
        <div style={{ textAlign: "left", maxWidth: "800px" }}>
          <span className="section-eyebrow">DECISION SYSTEMS</span>
          <h2 className="section-title">
            Practical Analytics Solutions for Physical Operations
          </h2>
          <p className="feature-desc" style={{ marginTop: "12px", fontSize: "1.1rem" }}>
            Trusted operational visibility, spatial context, and AI-assisted decision support across physical assets, factories, and infrastructure networks.
          </p>
        </div>

        {/* 4 Main Solutions Grid */}
        <div className="features-grid" style={{ marginTop: "48px" }}>
          {solutionCards.map((sol, idx) => {
            const Icon = sol.icon;
            return (
              <motion.div
                key={sol.title}
                className="feature-item"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx, duration: 0.6, ease: "easeOut" }}
              >
                <div className="feature-icon-box">
                  <Icon size={20} />
                </div>
                <h3 className="feature-title">{sol.title}</h3>
                <p className="feature-desc" style={{ marginBottom: "20px" }}>
                  {sol.desc}
                </p>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {sol.bullets.map((b) => (
                    <li
                      key={b}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "0.88rem",
                        color: "var(--text-secondary)",
                        marginBottom: "8px",
                      }}
                    >
                      <span style={{ width: "4px", height: "4px", background: "var(--accent-blue)", borderRadius: "50%" }} />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Implementation Path Grid */}
        <div style={{ marginTop: "80px", paddingTop: "48px", borderTop: "0.8px solid var(--border-subtle)" }}>
          <span className="section-eyebrow">IMPLEMENTATION PATH</span>
          <h3 className="section-title" style={{ fontSize: "2rem" }}>
            From Scattered Data to Operational Decision Workflows
          </h3>

          <div className="process-grid" style={{ marginTop: "32px" }}>
            {implementationSteps.map((s, idx) => (
              <motion.div
                key={s.step}
                className="process-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx }}
              >
                <div className="step-num">{s.step}</div>
                <h4 className="step-title">{s.name}</h4>
                <p className="step-desc">{s.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
