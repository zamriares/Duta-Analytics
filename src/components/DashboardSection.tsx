import { useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Cpu,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Gauge,
  Server
} from "lucide-react";

const machineData = [
  { id: "CNC #01", type: "CNC Machining Center", status: "Active", cycle: "42s", efficiency: 94.2, health: 98, scrap: "0.4%", output: "1,240 units" },
  { id: "CNC #02", type: "CNC Machining Center", status: "Warning", cycle: "58s", efficiency: 78.5, health: 82, scrap: "2.1%", output: "890 units" },
  { id: "CNC #04", type: "CNC Machining Center", status: "Active", cycle: "40s", efficiency: 91.0, health: 95, scrap: "0.8%", output: "1,180 units" },
  { id: "ROBOT A1", type: "6-Axis Welding Cell", status: "Active", cycle: "28s", efficiency: 98.4, health: 99, scrap: "0.1%", output: "2,450 units" },
  { id: "ROBOT A2", type: "Palletizing Robot", status: "Active", cycle: "31s", efficiency: 96.1, health: 97, scrap: "0.2%", output: "2,100 units" },
  { id: "PRESS-04", type: "200-Ton Hydraulic Press", status: "Maintenance", cycle: "--", efficiency: 0.0, health: 64, scrap: "0.0%", output: "0 units" },
  { id: "LINE-02", type: "Automated Assembly Line", status: "Active", cycle: "120s", efficiency: 89.3, health: 92, scrap: "1.2%", output: "5,400 units" },
];

const dashboardTabs = [
  "Factory Operations Command",
  "Equipment Effectiveness",
  "Stop Loss Monitoring",
  "Energy Monitoring",
  "Executive Dashboard",
];

export function DashboardSection() {
  const [activeTab, setActiveTab] = useState("Factory Operations Command");

  return (
    <section className="page-section dashboard-section flow" id="dashboard">
      <div className="container">
        <div style={{ textAlign: "left", maxWidth: "840px" }}>
          <span className="section-eyebrow">FACTORY PERFORMANCE MONITORING</span>
          <h2 className="section-title">
            Operational Dashboards Shaped for Factory Decisions
          </h2>
          <p className="feature-desc" style={{ marginTop: "12px", fontSize: "1.1rem" }}>
            Convert production signals, downtime patterns, and site performance data into a clear interface for daily action.
          </p>
        </div>

        {/* Top Summary Metrics Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "24px",
            marginTop: "40px",
          }}
        >
          <motion.div
            className="feature-item"
            style={{ padding: "24px", background: "var(--bg-secondary)", borderRadius: "4px" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="section-eyebrow" style={{ marginBottom: 0 }}>ACTIVE MACHINES</span>
              <Cpu size={18} color="var(--accent-blue)" />
            </div>
            <div style={{ fontSize: "2.4rem", fontWeight: 800, marginTop: "8px", fontFamily: "var(--font-heading)" }}>
              42 <span style={{ fontSize: "0.9rem", fontWeight: 500, color: "var(--text-secondary)" }}>/ 45 online</span>
            </div>
            <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "4px" }}>
              Plant 04 (Kuala Lumpur)
            </div>
          </motion.div>

          <motion.div
            className="feature-item"
            style={{ padding: "24px", background: "var(--bg-secondary)", borderRadius: "4px" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="section-eyebrow" style={{ marginBottom: 0 }}>TOTAL ASSETS</span>
              <Server size={18} color="var(--text-primary)" />
            </div>
            <div style={{ fontSize: "2.4rem", fontWeight: 800, marginTop: "8px", fontFamily: "var(--font-heading)" }}>
              195
            </div>
            <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "4px" }}>
              Monitored Telemetry Nodes
            </div>
          </motion.div>

          <motion.div
            className="feature-item"
            style={{ padding: "24px", background: "var(--bg-secondary)", borderRadius: "4px" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="section-eyebrow" style={{ marginBottom: 0 }}>LIVE UPTIME</span>
              <Activity size={18} color="var(--accent-cyan)" />
            </div>
            <div style={{ fontSize: "2.4rem", fontWeight: 800, marginTop: "8px", fontFamily: "var(--font-heading)", color: "rgb(0, 150, 100)" }}>
              91%
            </div>
            <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "4px" }}>
              Target: &gt; 90% Shift Average
            </div>
          </motion.div>

          <motion.div
            className="feature-item"
            style={{ padding: "24px", background: "var(--bg-secondary)", borderRadius: "4px" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="section-eyebrow" style={{ marginBottom: 0 }}>OEE AVERAGE</span>
              <Gauge size={18} color="var(--accent-blue)" />
            </div>
            <div style={{ fontSize: "2.4rem", fontWeight: 800, marginTop: "8px", fontFamily: "var(--font-heading)" }}>
              84.5%
            </div>
            <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "4px" }}>
              Overall Equipment Effectiveness
            </div>
          </motion.div>
        </div>

        {/* Dashboard View Controller Tabs */}
        <div style={{ marginTop: "48px" }}>
          <div
            style={{
              display: "flex",
              gap: "8px",
              overflowX: "auto",
              paddingBottom: "12px",
              borderBottom: "1px solid var(--border-subtle)",
            }}
          >
            {dashboardTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "10px 18px",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  borderRadius: "4px",
                  background: activeTab === tab ? "var(--text-primary)" : "transparent",
                  color: activeTab === tab ? "var(--bg-primary)" : "var(--text-secondary)",
                  transition: "all 0.2s ease",
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Machine Telemetry Data Grid */}
        <div style={{ marginTop: "32px", overflowX: "auto" }}>
          <div
            style={{
              background: "var(--bg-primary)",
              border: "0.8px solid var(--border-subtle)",
              borderRadius: "4px",
              minWidth: "800px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 1.5fr 1fr 1fr 1fr 1fr 1fr",
                padding: "16px 24px",
                background: "var(--bg-secondary)",
                borderBottom: "0.8px solid var(--border-subtle)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "var(--text-secondary)",
                letterSpacing: "0.1em",
              }}
            >
              <span>MACHINE ID</span>
              <span>EQUIPMENT TYPE</span>
              <span>STATUS</span>
              <span>CYCLE TIME</span>
              <span>EFFICIENCY</span>
              <span>SCRAP RATE</span>
              <span>HEALTH SCORE</span>
            </div>

            {machineData.map((m, idx) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * idx }}
                viewport={{ once: true }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.2fr 1.5fr 1fr 1fr 1fr 1fr 1fr",
                  padding: "16px 24px",
                  borderBottom: idx === machineData.length - 1 ? "none" : "0.8px solid var(--border-subtle)",
                  alignItems: "center",
                  fontSize: "0.9rem",
                }}
              >
                <div style={{ fontWeight: 700, fontFamily: "var(--font-heading)" }}>{m.id}</div>
                <div style={{ color: "var(--text-secondary)" }}>{m.type}</div>
                <div>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "4px 10px",
                      borderRadius: "12px",
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      background:
                        m.status === "Active"
                          ? "rgba(0, 180, 100, 0.1)"
                          : m.status === "Warning"
                          ? "rgba(255, 170, 0, 0.1)"
                          : "rgba(255, 50, 50, 0.1)",
                      color:
                        m.status === "Active"
                          ? "rgb(0, 150, 80)"
                          : m.status === "Warning"
                          ? "rgb(200, 130, 0)"
                          : "rgb(220, 40, 40)",
                    }}
                  >
                    {m.status === "Active" && <CheckCircle2 size={12} />}
                    {m.status === "Warning" && <AlertTriangle size={12} />}
                    {m.status === "Maintenance" && <Clock size={12} />}
                    {m.status}
                  </span>
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>{m.cycle}</div>
                <div style={{ fontWeight: 600 }}>{m.efficiency > 0 ? `${m.efficiency}%` : "--"}</div>
                <div style={{ color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>{m.scrap}</div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div
                    style={{
                      flex: 1,
                      height: "6px",
                      background: "var(--border-subtle)",
                      borderRadius: "3px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${m.health}%`,
                        height: "100%",
                        background:
                          m.health > 90
                            ? "rgb(0, 150, 80)"
                            : m.health > 75
                            ? "rgb(200, 130, 0)"
                            : "rgb(220, 40, 40)",
                      }}
                    />
                  </div>
                  <span style={{ fontSize: "0.8rem", fontFamily: "var(--font-mono)", fontWeight: 700 }}>
                    {m.health}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
