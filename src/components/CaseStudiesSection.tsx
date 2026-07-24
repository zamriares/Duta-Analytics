import { motion } from "framer-motion";
import { Factory, MapPin, Activity, Truck } from "lucide-react";

const caseStudies = [
  {
    category: "Discrete Manufacturing",
    icon: Factory,
    title: "Multi-line Factory Visibility Layer Deployed",
    problem: "Operational reporting depended on fragmented spreadsheets and manual end-of-shift consolidation.",
    solution: "Deployed live OEE tracking, downtime Pareto analysis, exception alerts, and executive reporting across all assembly lines.",
    stats: [
      { label: "Production Lines", value: "3 Lines" },
      { label: "Downtime Categories", value: "14 Categories" },
      { label: "Live Control Dashboards", value: "6 Dashboards" },
    ],
  },
  {
    category: "Infrastructure & Built-World",
    icon: MapPin,
    title: "GIS Service Coverage Model for Infrastructure Planning",
    problem: "Spatial data, asset registries, and environmental risk constraint zones were disconnected across agencies.",
    solution: "Consolidated spatial layers, catchment models, and risk overlay zones into one interactive planning workspace.",
    stats: [
      { label: "Mapped Assets", value: "42 Assets" },
      { label: "Service Boundaries", value: "7 Boundaries" },
      { label: "Risk Overlay Layers", value: "11 Layers" },
    ],
  },
  {
    category: "Heavy Industrial Operations",
    icon: Activity,
    title: "Digital Twin Telemetry & Predictive Asset Monitoring",
    problem: "Unscheduled machine outages caused severe downtime cost and missed shift targets.",
    solution: "Transformed high-frequency vibration and thermal telemetry into real-time predictive anomaly alerts.",
    stats: [
      { label: "Telemetry Sensor Nodes", value: "28 Nodes" },
      { label: "Signal Accuracy", value: "99.8%" },
      { label: "Alert Trigger Time", value: "< 1s Response" },
    ],
  },
  {
    category: "Industrial Logistics",
    icon: Truck,
    title: "Geospatial Fleet & Supply Chain Telemetry Engine",
    problem: "Lack of visibility between raw material transport vehicles and central warehouse receiving docks.",
    solution: "Integrated vehicle GPS tracking directly with warehouse inventory stock levels and gate arrival scheduling.",
    stats: [
      { label: "Fleet Vehicles Monitored", value: "150 Vehicles" },
      { label: "Distribution Hubs", value: "12 Hubs" },
      { label: "Telemetry Mode", value: "Real-time GPS" },
    ],
  },
];

export function CaseStudiesSection() {
  return (
    <section className="page-section case-studies-section flow" id="case-studies">
      <div className="container">
        <div style={{ textAlign: "left", maxWidth: "840px" }}>
          <span className="section-eyebrow">REAL-WORLD PROOF &amp; EVIDENCE</span>
          <h2 className="section-title">
            Outcome-Led Analytics for Serious Operational Environments
          </h2>
          <p className="feature-desc" style={{ marginTop: "12px", fontSize: "1.1rem" }}>
            Implementation evidence measured through practical operating improvements: faster reporting cycles, unified decision layers, and clearer review workflows.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "32px",
            marginTop: "48px",
          }}
        >
          {caseStudies.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                className="feature-item"
                style={{ padding: "32px", background: "var(--bg-secondary)", borderRadius: "4px" }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx, duration: 0.6, ease: "easeOut" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                  <Icon size={20} color="var(--accent-blue)" />
                  <span className="section-eyebrow" style={{ marginBottom: 0 }}>{item.category}</span>
                </div>

                <h3 className="feature-title" style={{ fontSize: "1.3rem", lineHeight: "1.3" }}>
                  {item.title}
                </h3>

                <p className="feature-desc" style={{ marginTop: "12px", fontSize: "0.92rem", lineHeight: "1.6" }}>
                  <strong>Challenge:</strong> {item.problem}
                </p>
                <p className="feature-desc" style={{ marginTop: "8px", fontSize: "0.92rem", lineHeight: "1.6" }}>
                  <strong>Intervention:</strong> {item.solution}
                </p>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "12px",
                    marginTop: "24px",
                    paddingTop: "20px",
                    borderTop: "0.8px solid var(--border-subtle)",
                  }}
                >
                  {item.stats.map((st) => (
                    <div key={st.label}>
                      <div style={{ fontSize: "1.05rem", fontWeight: 800, fontFamily: "var(--font-heading)" }}>
                        {st.value}
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "2px" }}>
                        {st.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
