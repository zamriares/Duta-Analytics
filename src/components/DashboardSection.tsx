import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Cpu,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Gauge,
  Server,
  Zap,
  TrendingUp,
  Building2,
  ShieldCheck,
  Bot,
  RefreshCw,
  Play,
  Info,
} from "lucide-react";

// Interactive Summary Metric Card with secondary content revealing on icon click or mouse pointing
interface MetricCardProps {
  label: string;
  value: React.ReactNode;
  secondary: string;
  icon: React.ReactNode;
  valueColor?: string;
}

function InteractiveMetricCard({ label, value, secondary, icon, valueColor }: MetricCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="feature-item"
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 22,
      }}
      onClick={() => setIsOpen((prev) => !prev)}
      style={{
        padding: "16px 0 20px 0",
        background: "transparent",
        position: "relative",
        border: "none",
        borderBottom: isOpen ? "2.5px solid #000000" : "1px solid #666666",
        boxShadow: "none",
        cursor: "pointer",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="section-eyebrow" style={{ marginBottom: 0 }}>{label}</span>
        
        {/* Interactive Icon Button: Click to toggle secondary text */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen((prev) => !prev);
          }}
          title="Click icon to toggle details"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "5px 8px",
            borderRadius: "4px",
            background: "transparent",
            border: "none",
            color: isOpen ? "var(--accent-cyan)" : "var(--text-primary)",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          {icon}
          <Info size={13} style={{ color: isOpen ? "var(--accent-cyan)" : "var(--text-secondary)" }} />
        </button>
      </div>

      <div style={{ fontSize: "2.4rem", fontWeight: 800, marginTop: "8px", fontFamily: "var(--font-heading)", color: valueColor || "var(--text-primary)" }}>
        {value}
      </div>

      {/* Secondary Content: Appears strictly on icon click */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 10 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ fontSize: "0.85rem", color: "var(--accent-cyan)", fontFamily: "var(--font-mono)", fontWeight: 600 }}>
              &rsaquo; {secondary}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Tab 1: Factory Operations Command
const machineData = [
  { id: "CNC #01", type: "CNC Machining Center", status: "Active", cycle: "42s", efficiency: 94.2, health: 98, scrap: "0.4%", output: "1,240 units" },
  { id: "CNC #02", type: "CNC Machining Center", status: "Warning", cycle: "58s", efficiency: 78.5, health: 82, scrap: "2.1%", output: "890 units" },
  { id: "CNC #04", type: "CNC Machining Center", status: "Active", cycle: "40s", efficiency: 91.0, health: 95, scrap: "0.8%", output: "1,180 units" },
  { id: "ROBOT A1", type: "6-Axis Welding Cell", status: "Active", cycle: "28s", efficiency: 98.4, health: 99, scrap: "0.1%", output: "2,450 units" },
  { id: "ROBOT A2", type: "Palletizing Robot", status: "Active", cycle: "31s", efficiency: 96.1, health: 97, scrap: "0.2%", output: "2,100 units" },
  { id: "PRESS-04", type: "200-Ton Hydraulic Press", status: "Maintenance", cycle: "--", efficiency: 0.0, health: 64, scrap: "0.0%", output: "0 units" },
  { id: "LINE-02", type: "Automated Assembly Line", status: "Active", cycle: "120s", efficiency: 89.3, health: 92, scrap: "1.2%", output: "5,400 units" },
];

// Agentic AI Neural Network Diagnostic Datasets for Machines
const aiDiagnosticData: Record<string, {
  name: string;
  type: string;
  status: "Warning" | "Maintenance" | "Active";
  rootCause: string;
  confidence: string;
  neuralModel: string;
  downtimePrevented: string;
  autoAction: string;
  suggestions: string[];
  neuralNodes: { label: string; val: string; status: "normal" | "warning" | "alert" }[];
}> = {
  "CNC #02": {
    name: "CNC #02",
    type: "CNC Machining Center",
    status: "Warning",
    rootCause: "Spindle bearing micro-fracture causing 4.8 mm/s harmonic vibration & 78°C thermal expansion.",
    confidence: "99.4% Sensor Fusion Match",
    neuralModel: "DeepVibe-ResNet-v4",
    downtimePrevented: "$1,420 / hr",
    autoAction: "Autonomous Agent reduced spindle feed rate by 15% and engaged secondary coolant pump.",
    suggestions: [
      "Schedule bearing assembly replacement during 02:00 AM low-load window.",
      "Dispatch Technician Ahmad with SKU-4820 Precision Ceramic Bearing.",
      "Execute automated 5-point laser alignment verification post-repair."
    ],
    neuralNodes: [
      { label: "Spindle Vibration (FFT)", val: "4.8 mm/s", status: "warning" },
      { label: "Thermal IR Sensor", val: "78°C (+18°C)", status: "alert" },
      { label: "Current Spike (A)", val: "42.1 A", status: "warning" },
      { label: "Acoustic Signature", val: "High Frequency Noise", status: "alert" }
    ]
  },
  "PRESS-04": {
    name: "PRESS-04",
    type: "200-Ton Hydraulic Press",
    status: "Maintenance",
    rootCause: "Hydraulic pressure line seal rupture detected at Valve Block 3.",
    confidence: "98.9% Pressure Differential Match",
    neuralModel: "HydroPredict-v2.1",
    downtimePrevented: "$2,850 / hr",
    autoAction: "Emergency pressure release valve triggered; line isolated to prevent oil contamination.",
    suggestions: [
      "Replace High-Pressure O-Ring Seal Package (SKU-HYD-901).",
      "Flush hydraulic fluid loop and inspect main manifold for cavitation.",
      "Run 10-cycle pressure ramp verification test prior to production resume."
    ],
    neuralNodes: [
      { label: "Manifold Pressure", val: "140 bar (-45 bar)", status: "alert" },
      { label: "Fluid Temperature", val: "84°C", status: "alert" },
      { label: "Flow Velocity", val: "12 L/min", status: "warning" },
      { label: "Viscosity Index", val: "ISO VG 46", status: "normal" }
    ]
  },
  "ROBOT A1": {
    name: "ROBOT A1",
    type: "6-Axis Welding Cell",
    status: "Active",
    rootCause: "Subtle joint 4 servo position drift (0.12mm); automatically compensated.",
    confidence: "99.8% Kinematic Model Match",
    neuralModel: "KineAI-Vision-v6",
    downtimePrevented: "$850 / hr",
    autoAction: "Real-time AI vision closed-loop feedback corrected arm trajectory online.",
    suggestions: [
      "Zero-point recalibration recommended at next scheduled shift break.",
      "Inspect optical encoder cable harness for signal interference.",
      "Maintain active AI vision auto-compensation."
    ],
    neuralNodes: [
      { label: "Joint 4 Kinematics", val: "Delta +0.12mm", status: "warning" },
      { label: "Weld Seam Vision", val: "Target 100% Locked", status: "normal" },
      { label: "Motor Torque Rate", val: "94.2 Nm", status: "normal" },
      { label: "TCP Alignment", val: "Sub-Millimeter OK", status: "normal" }
    ]
  },
  "LINE-02": {
    name: "LINE-02",
    type: "Automated Assembly Line",
    status: "Active",
    rootCause: "Minor bottleneck detected at Pallet Station 3 due to downstream buffer saturation.",
    confidence: "97.5% Discrete Event Simulation",
    neuralModel: "FlowOpt-NeuralNet-v3",
    downtimePrevented: "$620 / hr",
    autoAction: "Conveyor speed auto-tuned down by 6% to synchronize flow and prevent line jam.",
    suggestions: [
      "Clear finished goods buffer stacker at Bay 4.",
      "Increase AGV pick frequency from 8 mins to 5 mins.",
      "Re-balance station work-cell time allocations."
    ],
    neuralNodes: [
      { label: "Buffer Saturation", val: "92% Full", status: "warning" },
      { label: "Conveyor Speed", val: "1.1 m/s (Tuned)", status: "normal" },
      { label: "Photoeye Sensor", val: "Clear", status: "normal" },
      { label: "AGV Request Queue", val: "2 Pending", status: "normal" }
    ]
  }
};

function AgenticAiTroubleshooter() {
  const [selectedMachine, setSelectedMachine] = useState<string>("CNC #02");
  const [isExecutingAction, setIsExecutingAction] = useState<boolean>(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const diag = aiDiagnosticData[selectedMachine];

  const handleExecuteCountermeasure = () => {
    setIsExecutingAction(true);
    setActionMessage("Deploying Neural Signal Pulse & Resetting Feed Rates...");
    setTimeout(() => {
      setIsExecutingAction(false);
      setActionMessage("✓ Countermeasure Applied: Harmonic vibration lowered to 1.2 mm/s. Machine status STABILIZED.");
      setTimeout(() => setActionMessage(null), 5000);
    }, 1800);
  };

  return (
    <div
      style={{
        background: "var(--bg-secondary)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "4px",
        padding: "24px",
        marginBottom: "28px",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              padding: "10px",
              borderRadius: "4px",
              background: "rgba(0, 240, 255, 0.1)",
              border: "1px solid rgba(0, 240, 255, 0.2)",
              color: "var(--accent-cyan)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Bot size={22} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span className="section-eyebrow" style={{ marginBottom: 0 }}>AGENTIC AI NEURAL TROUBLESHOOTER</span>
              <span
                style={{
                  fontSize: "0.72rem",
                  fontFamily: "var(--font-mono)",
                  padding: "2px 8px",
                  borderRadius: "10px",
                  background: "rgba(0, 180, 100, 0.15)",
                  color: "rgb(0, 180, 100)",
                  fontWeight: 700,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "rgb(0, 180, 100)" }} />
                REAL-TIME NEURAL INFERENCE ACTIVE
              </span>
            </div>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, fontFamily: "var(--font-heading)", marginTop: "2px" }}>
              Autonomous Equipment Diagnostics & Downtime Prevention Engine
            </h3>
          </div>
        </div>

        {/* Machine Selector Pills */}
        <div style={{ display: "flex", gap: "6px", background: "var(--bg-primary)", padding: "4px", borderRadius: "4px", border: "0.8px solid var(--border-subtle)" }}>
          {Object.keys(aiDiagnosticData).map((mKey) => (
            <button
              key={mKey}
              onClick={() => setSelectedMachine(mKey)}
              style={{
                padding: "6px 12px",
                fontSize: "0.8rem",
                fontFamily: "var(--font-mono)",
                fontWeight: 700,
                borderRadius: "3px",
                background: selectedMachine === mKey ? "var(--text-primary)" : "transparent",
                color: selectedMachine === mKey ? "var(--bg-primary)" : "var(--text-secondary)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {mKey}
            </button>
          ))}
        </div>
      </div>

      {/* Main Diagnostic Panel Layout */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedMachine}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "24px" }}
        >
          {/* Left Column: Root Cause & Action Plan */}
          <div style={{ background: "var(--bg-primary)", padding: "20px", borderRadius: "4px", border: "0.8px solid var(--border-subtle)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "1.1rem", fontWeight: 800, fontFamily: "var(--font-heading)" }}>{diag.name}</span>
                <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>({diag.type})</span>
              </div>
              <span
                style={{
                  fontSize: "0.78rem",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 700,
                  padding: "3px 10px",
                  borderRadius: "12px",
                  background:
                    diag.status === "Warning" ? "rgba(255, 170, 0, 0.15)" : diag.status === "Maintenance" ? "rgba(255, 50, 50, 0.15)" : "rgba(0, 180, 100, 0.15)",
                  color:
                    diag.status === "Warning" ? "rgb(200, 130, 0)" : diag.status === "Maintenance" ? "rgb(220, 40, 40)" : "rgb(0, 150, 80)",
                }}
              >
                {diag.status}
              </span>
            </div>

            {/* Root Cause Analysis Card */}
            <div style={{ padding: "14px", background: "var(--bg-secondary)", borderRadius: "4px", marginBottom: "16px", borderLeft: "3px solid var(--accent-cyan)" }}>
              <div style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--accent-cyan)", fontWeight: 700, marginBottom: "4px" }}>
                NEURAL PATTERN MATCH &bull; {diag.neuralModel} ({diag.confidence})
              </div>
              <div style={{ fontSize: "0.92rem", fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.5 }}>
                {diag.rootCause}
              </div>
              <div style={{ fontSize: "0.8rem", color: "rgb(0, 180, 100)", marginTop: "6px", fontFamily: "var(--font-mono)", fontWeight: 700 }}>
                ESTIMATED LOSS PREVENTED: {diag.downtimePrevented}
              </div>
            </div>

            {/* Autonomous Action Taken */}
            <div style={{ marginBottom: "16px" }}>
              <div style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--text-secondary)", fontWeight: 700, marginBottom: "6px" }}>
                AUTONOMOUS MITIGATION ACTION TAKEN:
              </div>
              <div style={{ fontSize: "0.88rem", color: "var(--text-primary)", background: "rgba(0, 102, 255, 0.08)", padding: "10px 14px", borderRadius: "4px", border: "1px solid rgba(0, 102, 255, 0.2)", display: "flex", alignItems: "center", gap: "8px" }}>
                <Zap size={16} color="var(--accent-blue)" />
                <span>{diag.autoAction}</span>
              </div>
            </div>

            {/* AI Troubleshooting Suggestions */}
            <div>
              <div style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--text-secondary)", fontWeight: 700, marginBottom: "8px" }}>
                NEURAL NETWORK ACTIONABLE SUGGESTIONS:
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {diag.suggestions.map((sug, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "0.85rem", color: "var(--text-primary)" }}>
                    <span style={{ width: "18px", height: "18px", borderRadius: "50%", background: "var(--bg-secondary)", color: "var(--accent-cyan)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 800, flexShrink: 0, marginTop: "2px" }}>
                      {idx + 1}
                    </span>
                    <span>{sug}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ marginTop: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button
                onClick={handleExecuteCountermeasure}
                disabled={isExecutingAction}
                style={{
                  padding: "10px 16px",
                  fontSize: "0.82rem",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 700,
                  borderRadius: "4px",
                  background: isExecutingAction ? "var(--bg-secondary)" : "var(--accent-cyan)",
                  color: "#090A0F",
                  border: "none",
                  cursor: isExecutingAction ? "wait" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  transition: "all 0.2s ease",
                }}
              >
                {isExecutingAction ? <RefreshCw size={14} /> : <Play size={14} />}
                {isExecutingAction ? "DEPLOYING NEURAL SIGNAL..." : "DEPLOY NEURAL COUNTERMEASURE"}
              </button>

              <button
                style={{
                  padding: "10px 16px",
                  fontSize: "0.82rem",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 700,
                  borderRadius: "4px",
                  background: "transparent",
                  color: "var(--text-primary)",
                  border: "1px solid var(--border-subtle)",
                  cursor: "pointer",
                }}
              >
                DISPATCH TECHNICIAN
              </button>
            </div>

            {actionMessage && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  marginTop: "12px",
                  padding: "10px 14px",
                  background: "rgba(0, 180, 100, 0.15)",
                  border: "1px solid rgb(0, 180, 100)",
                  borderRadius: "4px",
                  fontSize: "0.82rem",
                  fontFamily: "var(--font-mono)",
                  color: "rgb(0, 180, 100)",
                  fontWeight: 700,
                }}
              >
                {actionMessage}
              </motion.div>
            )}
          </div>

          {/* Right Column: Neural Sensor Telemetry Grid & Topology */}
          <div style={{ background: "var(--bg-primary)", padding: "20px", borderRadius: "4px", border: "0.8px solid var(--border-subtle)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--text-secondary)", fontWeight: 700, marginBottom: "12px" }}>
                MULTI-MODAL NEURAL SENSOR FEED:
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
                {diag.neuralNodes.map((node, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "12px",
                      background: "var(--bg-secondary)",
                      borderRadius: "4px",
                      border: node.status === "alert" ? "1px solid rgba(255, 50, 50, 0.4)" : node.status === "warning" ? "1px solid rgba(255, 170, 0, 0.4)" : "1px solid var(--border-subtle)",
                    }}
                  >
                    <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>{node.label}</div>
                    <div style={{ fontSize: "1.1rem", fontWeight: 800, fontFamily: "var(--font-heading)", marginTop: "4px", color: node.status === "alert" ? "rgb(220, 40, 40)" : node.status === "warning" ? "rgb(200, 130, 0)" : "var(--text-primary)" }}>
                      {node.val}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Neural Topology Graphic Illustration */}
            <div style={{ padding: "16px", background: "var(--bg-secondary)", borderRadius: "4px", border: "0.8px solid var(--border-subtle)" }}>
              <div style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", color: "var(--accent-cyan)", fontWeight: 700, marginBottom: "8px", display: "flex", justifyContent: "space-between" }}>
                <span>NEURAL LAYER CONNECTOR</span>
                <span>4 LATENT LAYERS ACTIVE</span>
              </div>

              {/* Animated SVG Neural Network Nodes */}
              <svg viewBox="0 0 320 80" style={{ width: "100%", height: "auto", display: "block" }}>
                <line x1="30" y1="40" x2="110" y2="20" stroke="rgba(0, 240, 255, 0.4)" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="30" y1="40" x2="110" y2="60" stroke="rgba(0, 240, 255, 0.4)" strokeWidth="1.5" />
                <line x1="110" y1="20" x2="210" y2="40" stroke="rgba(0, 240, 255, 0.6)" strokeWidth="1.5" />
                <line x1="110" y1="60" x2="210" y2="40" stroke="rgba(0, 240, 255, 0.6)" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="210" y1="40" x2="290" y2="40" stroke="rgb(0, 180, 100)" strokeWidth="2" />

                <circle cx="30" cy="40" r="10" fill="var(--bg-primary)" stroke="var(--accent-cyan)" strokeWidth="2" />
                <circle cx="110" cy="20" r="8" fill="var(--bg-primary)" stroke="var(--accent-blue)" strokeWidth="2" />
                <circle cx="110" cy="60" r="8" fill="var(--bg-primary)" stroke="var(--accent-blue)" strokeWidth="2" />
                <circle cx="210" cy="40" r="9" fill="var(--bg-primary)" stroke="var(--accent-cyan)" strokeWidth="2" />
                <circle cx="290" cy="40" r="11" fill="rgb(0, 180, 100)" stroke="#ffffff" strokeWidth="2" />

                <text x="30" y="44" fill="var(--text-primary)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">IN</text>
                <text x="110" y="23" fill="var(--text-primary)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">L1</text>
                <text x="110" y="63" fill="var(--text-primary)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">L2</text>
                <text x="210" y="43" fill="var(--text-primary)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">N3</text>
                <text x="290" y="44" fill="#090A0F" fontSize="8" fontWeight="800" fontFamily="var(--font-mono)" textAnchor="middle">OUT</text>
              </svg>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Tab 2: Equipment Effectiveness (OEE)
const oeeData = [
  { line: "Machining Cell Alpha", availability: "96.4%", performance: "92.1%", quality: "99.2%", overall: "88.1%", status: "Optimal" },
  { line: "Automated Assembly Line B", availability: "88.2%", performance: "85.4%", quality: "98.5%", overall: "74.2%", status: "Needs Tuning" },
  { line: "Stamping & Press Bay 03", availability: "94.0%", performance: "91.8%", quality: "97.9%", overall: "84.5%", status: "Optimal" },
  { line: "Robotic Welding Station A", availability: "98.5%", performance: "96.2%", quality: "99.7%", overall: "94.4%", status: "Optimal" },
  { line: "Packaging & Logistics Line", availability: "91.5%", performance: "89.0%", quality: "98.1%", overall: "80.0%", status: "Optimal" },
];

// Tab 3: Stop Loss Monitoring
const stopLossData = [
  { id: "ALT-8041", timestamp: "14m ago", location: "CNC #02 Spindle", severity: "Warning", cause: "Vibration Anomaly (>4.2 mm/s)", financialImpact: "-$420 / hr", action: "Auto-throttled RPM 15%" },
  { id: "ALT-8038", timestamp: "1h 12m ago", location: "PRESS-04 Valve", severity: "Critical", cause: "Hydraulic Fluid Temp (>78°C)", financialImpact: "-$1,250 / hr", action: "Coolant Loop Engaged" },
  { id: "ALT-8032", timestamp: "3h 45m ago", location: "Conveyor Line 02", severity: "Info", cause: "Photoeye Sensor Dust Accumulation", financialImpact: "-$90 / hr", action: "Air Jet Clean Cycle Run" },
  { id: "ALT-8025", timestamp: "5h 20m ago", location: "Robot Cell A1", severity: "Resolved", cause: "Gripper Calibration Drift", financialImpact: "$0 / hr", action: "Self-Calibrated via Vision" },
];

// Tab 4: Energy Monitoring
const energyData = [
  { node: "Substation Alpha (Main Transformer)", load: "412 kW", powerFactor: "0.98", dailyConsumption: "8,420 kWh", carbonImpact: "2.69 tons", costShift: "$1,120" },
  { node: "Substation Beta (HV AC Units)", load: "185 kW", powerFactor: "0.95", dailyConsumption: "3,700 kWh", carbonImpact: "1.18 tons", costShift: "$490" },
  { node: "CNC Machining Bay Feeder", load: "124 kW", powerFactor: "0.99", dailyConsumption: "2,480 kWh", carbonImpact: "0.79 tons", costShift: "$330" },
  { node: "Robotics & Automation Feeder", load: "88 kW", powerFactor: "0.97", dailyConsumption: "1,760 kWh", carbonImpact: "0.56 tons", costShift: "$235" },
  { node: "Rooftop Solar Array Inverter 02", load: "-140 kW (Generating)", powerFactor: "1.00", dailyConsumption: "-2,800 kWh", carbonImpact: "-0.89 tons", costShift: "-$375" },
];

// Tab 5: Executive Dashboard Site List
const executiveSites = [
  { site: "Kuala Lumpur Main Facility", manager: "Ahmad Razak", status: "Operational", targetOutput: "45,000", actualOutput: "46,210", oee: "88.4%", compliance: "99.5%" },
  { site: "Penang Semiconductor Hub", manager: "Lee Wei Chen", status: "Operational", targetOutput: "60,000", actualOutput: "61,450", oee: "92.1%", compliance: "100.0%" },
  { site: "Johor Precision Machining Site", manager: "Santhi Kumar", status: "Maintenance", targetOutput: "28,000", actualOutput: "24,800", oee: "78.2%", compliance: "97.8%" },
  { site: "Selangor Automated Logistics Center", manager: "Farida Hanim", status: "Operational", targetOutput: "80,000", actualOutput: "82,100", oee: "94.6%", compliance: "99.8%" },
];

// Tab 5: Executive Monthly Value Trend Data (12 Months)
const monthlyValueData = [
  { month: "Jan", value: 1.82, target: 1.75, units: "18.2k" },
  { month: "Feb", value: 1.95, target: 1.85, units: "19.5k" },
  { month: "Mar", value: 2.10, target: 2.00, units: "21.0k" },
  { month: "Apr", value: 2.05, target: 2.00, units: "20.5k" },
  { month: "May", value: 2.35, target: 2.20, units: "23.5k" },
  { month: "Jun", value: 2.48, target: 2.30, units: "24.8k" },
  { month: "Jul", value: 2.62, target: 2.50, units: "26.2k" },
  { month: "Aug", value: 2.55, target: 2.50, units: "25.5k" },
  { month: "Sep", value: 2.78, target: 2.60, units: "27.8k" },
  { month: "Oct", value: 2.90, target: 2.75, units: "29.0k" },
  { month: "Nov", value: 3.15, target: 2.90, units: "31.5k" },
  { month: "Dec", value: 3.40, target: 3.10, units: "34.0k" },
];

function ExecutiveMonthlyChart() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(11);

  const maxValue = 4.0;
  const chartHeight = 220;
  const chartWidth = 840;
  const paddingX = 45;
  const paddingY = 25;

  const points = monthlyValueData.map((d, i) => {
    const x = paddingX + (i / (monthlyValueData.length - 1)) * (chartWidth - 2 * paddingX);
    const y = chartHeight - paddingY - (d.value / maxValue) * (chartHeight - 2 * paddingY);
    return { x, y, data: d };
  });

  const pathD = points.reduce((acc, point, i, a) => {
    if (i === 0) return `M ${point.x},${point.y}`;
    const prev = a[i - 1];
    const cx1 = prev.x + (point.x - prev.x) / 2;
    const cy1 = prev.y;
    const cx2 = prev.x + (point.x - prev.x) / 2;
    const cy2 = point.y;
    return `${acc} C ${cx1},${cy1} ${cx2},${cy2} ${point.x},${point.y}`;
  }, "");

  const areaD = `${pathD} L ${points[points.length - 1].x},${chartHeight - paddingY} L ${points[0].x},${chartHeight - paddingY} Z`;

  return (
    <div
      style={{
        background: "var(--bg-secondary)",
        border: "0.8px solid var(--border-subtle)",
        borderRadius: "4px",
        padding: "24px",
        marginBottom: "28px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px", marginBottom: "20px" }}>
        <div>
          <span className="section-eyebrow" style={{ marginBottom: "4px" }}>ANNUAL FINANCIAL PRODUCTION VALUE</span>
          <h3 style={{ fontSize: "1.35rem", fontWeight: 700, fontFamily: "var(--font-heading)" }}>
            Monthly Enterprise Output Trend ($ Millions)
          </h3>
        </div>

        <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>2026 YTD TOTAL</div>
            <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-primary)", fontFamily: "var(--font-heading)" }}>$30.15M</div>
          </div>
          <div>
            <div style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>PEAK MONTH</div>
            <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "rgb(0, 180, 100)", fontFamily: "var(--font-heading)" }}>$3.40M (Dec)</div>
          </div>
          <div>
            <div style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>YoY GROWTH</div>
            <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--accent-cyan)", fontFamily: "var(--font-heading)" }}>+12.4%</div>
          </div>
        </div>
      </div>

      <div style={{ position: "relative", width: "100%", overflowX: "auto" }}>
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}
        >
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent-cyan, #00f0ff)" stopOpacity="0.45" />
              <stop offset="100%" stopColor="var(--accent-cyan, #00f0ff)" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Y Axis Grid Lines */}
          {[1.0, 2.0, 3.0, 4.0].map((val) => {
            const y = chartHeight - paddingY - (val / maxValue) * (chartHeight - 2 * paddingY);
            return (
              <g key={val}>
                <line x1={paddingX} y1={y} x2={chartWidth - paddingX} y2={y} stroke="var(--border-subtle)" strokeDasharray="3 3" strokeWidth="0.8" />
                <text x={paddingX - 10} y={y + 4} fill="var(--text-secondary)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="end">
                  ${val}M
                </text>
              </g>
            );
          })}

          {/* Animated Gradient Area Fill */}
          <motion.path
            d={areaD}
            fill="url(#chartGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          />

          {/* Animated Vertical Bars */}
          {points.map((pt, i) => {
            const barWidth = 24;
            const barHeight = (pt.data.value / maxValue) * (chartHeight - 2 * paddingY);
            const isHovered = hoveredIndex === i;
            return (
              <motion.rect
                key={pt.data.month + "-bar"}
                x={pt.x - barWidth / 2}
                y={chartHeight - paddingY - barHeight}
                width={barWidth}
                height={barHeight}
                rx={3}
                fill={isHovered ? "var(--accent-blue, #0066ff)" : "rgba(0, 102, 255, 0.18)"}
                stroke={isHovered ? "var(--accent-cyan, #00f0ff)" : "transparent"}
                strokeWidth={1.5}
                initial={{ height: 0, y: chartHeight - paddingY }}
                animate={{ height: barHeight, y: chartHeight - paddingY - barHeight }}
                transition={{ duration: 0.7, delay: i * 0.04 }}
                onMouseEnter={() => setHoveredIndex(i)}
                style={{ cursor: "pointer" }}
              />
            );
          })}

          {/* Animated Line Stroke Path */}
          <motion.path
            d={pathD}
            fill="none"
            stroke="var(--accent-cyan, #00f0ff)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          />

          {/* Animated Interactive Data Point Circle Nodes */}
          {points.map((pt, i) => {
            const isHovered = hoveredIndex === i;
            return (
              <g key={pt.data.month + "-pt"} style={{ cursor: "pointer" }} onMouseEnter={() => setHoveredIndex(i)}>
                <motion.circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? 6 : 4}
                  fill={isHovered ? "#ffffff" : "var(--accent-cyan, #00f0ff)"}
                  stroke="var(--bg-primary)"
                  strokeWidth="2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 + i * 0.04 }}
                />
                <text
                  x={pt.x}
                  y={chartHeight - 6}
                  fill={isHovered ? "var(--text-primary)" : "var(--text-secondary)"}
                  fontSize="11"
                  fontWeight={isHovered ? "700" : "500"}
                  fontFamily="var(--font-mono)"
                  textAnchor="middle"
                >
                  {pt.data.month}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hovered Month Detail Bar */}
        {hoveredIndex !== null && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              marginTop: "16px",
              padding: "12px 18px",
              background: "var(--bg-primary)",
              border: "0.8px solid var(--border-subtle)",
              borderRadius: "4px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
              fontSize: "0.85rem",
              fontFamily: "var(--font-mono)",
            }}
          >
            <div>
              <span style={{ color: "var(--text-secondary)" }}>SELECTED MONTH: </span>
              <strong style={{ color: "var(--text-primary)" }}>{monthlyValueData[hoveredIndex].month} 2026</strong>
            </div>
            <div>
              <span style={{ color: "var(--text-secondary)" }}>MONTHLY OUTPUT VALUE: </span>
              <strong style={{ color: "var(--accent-cyan)", fontSize: "0.95rem" }}>${monthlyValueData[hoveredIndex].value} Million</strong>
            </div>
            <div>
              <span style={{ color: "var(--text-secondary)" }}>PRODUCTION UNITS: </span>
              <strong style={{ color: "rgb(0, 180, 100)" }}>{monthlyValueData[hoveredIndex].units}</strong>
            </div>
            <div>
              <span style={{ color: "var(--text-secondary)" }}>VS TARGET: </span>
              <strong style={{ color: "rgb(0, 180, 100)" }}>
                +${(monthlyValueData[hoveredIndex].value - monthlyValueData[hoveredIndex].target).toFixed(2)}M (+{(((monthlyValueData[hoveredIndex].value - monthlyValueData[hoveredIndex].target) / monthlyValueData[hoveredIndex].target) * 100).toFixed(1)}%)
              </strong>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

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

        {/* Dashboard View Controller Tabs */}
        <div style={{ marginTop: "40px" }}>
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
                  border: activeTab === tab ? "1px solid var(--text-primary)" : "1px solid transparent",
                  transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                  cursor: "pointer",
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Summary Metrics Cards by Active Tab with Hover / Icon Click Secondary Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + "-metrics"}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "24px",
              marginTop: "32px",
            }}
          >
            {activeTab === "Factory Operations Command" && (
              <>
                <InteractiveMetricCard
                  label="ACTIVE MACHINES"
                  value={
                    <>
                      42 <span style={{ fontSize: "0.9rem", fontWeight: 500, color: "var(--text-secondary)" }}>/ 45 online</span>
                    </>
                  }
                  secondary="Plant 04 (Kuala Lumpur) • 3 Maintenance Queued"
                  icon={<Cpu size={18} color="var(--accent-blue)" />}
                />

                <InteractiveMetricCard
                  label="TOTAL ASSETS"
                  value="195"
                  secondary="Monitored Telemetry Nodes Across 7 Production Bays"
                  icon={<Server size={18} color="var(--text-primary)" />}
                />

                <InteractiveMetricCard
                  label="LIVE UPTIME"
                  value="91%"
                  valueColor="rgb(0, 180, 100)"
                  secondary="Target: > 90% Shift Average (Current: 91.2% Peak)"
                  icon={<Activity size={18} color="var(--accent-cyan)" />}
                />

                <InteractiveMetricCard
                  label="OEE AVERAGE"
                  value="84.5%"
                  secondary="Overall Equipment Effectiveness • World Target 85%"
                  icon={<Gauge size={18} color="var(--accent-blue)" />}
                />
              </>
            )}

            {activeTab === "Equipment Effectiveness" && (
              <>
                <InteractiveMetricCard
                  label="AVAILABILITY"
                  value="92.4%"
                  secondary="Uptime vs Scheduled Hours (Unplanned Loss: 7.6%)"
                  icon={<Clock size={18} color="var(--accent-blue)" />}
                />

                <InteractiveMetricCard
                  label="PERFORMANCE"
                  value="91.1%"
                  secondary="Speed vs Ideal Cycle Time (Speed Loss: 8.9%)"
                  icon={<TrendingUp size={18} color="var(--accent-cyan)" />}
                />

                <InteractiveMetricCard
                  label="QUALITY RATE"
                  value="98.6%"
                  valueColor="rgb(0, 180, 100)"
                  secondary="First Pass Yield Rate (Scrap Defect Loss: 1.4%)"
                  icon={<CheckCircle2 size={18} color="rgb(0, 180, 100)" />}
                />

                <InteractiveMetricCard
                  label="WORLD-CLASS OEE"
                  value="84.5%"
                  secondary="Target: 85.0% World Standard Benchmark"
                  icon={<Gauge size={18} color="var(--accent-blue)" />}
                />
              </>
            )}

            {activeTab === "Stop Loss Monitoring" && (
              <>
                <InteractiveMetricCard
                  label="ACTIVE ALERTS"
                  value={
                    <>
                      3 <span style={{ fontSize: "0.9rem", fontWeight: 500, color: "var(--text-secondary)" }}>incidents</span>
                    </>
                  }
                  valueColor="rgb(255, 170, 0)"
                  secondary="1 Critical (Hydraulic Valve), 2 Warnings (CNC Vibration)"
                  icon={<AlertTriangle size={18} color="rgb(255, 170, 0)" />}
                />

                <InteractiveMetricCard
                  label="RISK EXPOSURE"
                  value={
                    <>
                      $1,760 <span style={{ fontSize: "0.9rem", fontWeight: 500, color: "var(--text-secondary)" }}>/ hr</span>
                    </>
                  }
                  valueColor="rgb(255, 60, 60)"
                  secondary="Potential Downtime Loss Rate if Unmitigated"
                  icon={<Zap size={18} color="rgb(255, 60, 60)" />}
                />

                <InteractiveMetricCard
                  label="AUTO-MITIGATED"
                  value="18"
                  secondary="Self-Calibrated Sensor Incidents Solved This Shift"
                  icon={<ShieldCheck size={18} color="rgb(0, 180, 100)" />}
                />

                <InteractiveMetricCard
                  label="SAVINGS PROTECTED"
                  value="$14,250"
                  valueColor="rgb(0, 180, 100)"
                  secondary="Stop-Loss Preventive ROI Accumulated This Month"
                  icon={<TrendingUp size={18} color="rgb(0, 180, 100)" />}
                />
              </>
            )}

            {activeTab === "Energy Monitoring" && (
              <>
                <InteractiveMetricCard
                  label="ACTIVE DEMAND"
                  value="669 kW"
                  secondary="Peak Facility Load Capacity: 780 kW Max Limit"
                  icon={<Zap size={18} color="var(--accent-blue)" />}
                />

                <InteractiveMetricCard
                  label="SOLAR GENERATION"
                  value="140 kW"
                  valueColor="rgb(255, 180, 0)"
                  secondary="Rooftop Photovoltaic Array Yielding 21% Total Demand"
                  icon={<Zap size={18} color="rgb(255, 180, 0)" />}
                />

                <InteractiveMetricCard
                  label="DAILY KWH COST"
                  value={
                    <>
                      13,560 <span style={{ fontSize: "0.9rem", fontWeight: 500, color: "var(--text-secondary)" }}>kWh</span>
                    </>
                  }
                  secondary="$1,965 Shift Power Spend ($0.145 / kWh Grid Rate)"
                  icon={<Activity size={18} color="var(--accent-cyan)" />}
                />

                <InteractiveMetricCard
                  label="CARBON INTENSITY"
                  value={
                    <>
                      0.32 <span style={{ fontSize: "0.9rem", fontWeight: 500, color: "var(--text-secondary)" }}>kg CO₂e/kWh</span>
                    </>
                  }
                  valueColor="rgb(0, 180, 100)"
                  secondary="Scope 2 Direct Utility Grid Emission Index"
                  icon={<CheckCircle2 size={18} color="rgb(0, 180, 100)" />}
                />
              </>
            )}

            {activeTab === "Executive Dashboard" && (
              <>
                <InteractiveMetricCard
                  label="REGIONAL SITES"
                  value={
                    <>
                      4 <span style={{ fontSize: "0.9rem", fontWeight: 500, color: "var(--text-secondary)" }}>Active Facilities</span>
                    </>
                  }
                  secondary="Kuala Lumpur, Penang, Johor & Selangor Plant Operations"
                  icon={<Building2 size={18} color="var(--accent-blue)" />}
                />

                <InteractiveMetricCard
                  label="MONTHLY UNITS"
                  value="214,560"
                  secondary="+4.2% Above Target Production Goal for Q3"
                  icon={<TrendingUp size={18} color="var(--accent-cyan)" />}
                />

                <InteractiveMetricCard
                  label="COMPLIANCE SCORE"
                  value="99.3%"
                  valueColor="rgb(0, 180, 100)"
                  secondary="ISO 50001 Energy & Nuclear Grade Safety Rating"
                  icon={<ShieldCheck size={18} color="rgb(0, 180, 100)" />}
                />

                <InteractiveMetricCard
                  label="PLANT VELOCITY"
                  value="98.4"
                  secondary="Aggregate Operational Speed & Throughput Score"
                  icon={<Gauge size={18} color="var(--accent-blue)" />}
                />
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Dynamic Detail Data Table & Chart per Active Tab */}
        <div style={{ marginTop: "32px", overflowX: "auto" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + "-table"}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              {/* Tab 1: Factory Operations Command - Features Agentic AI Troubleshooter + Machine Grid */}
              {activeTab === "Factory Operations Command" && (
                <>
                  {/* Agentic AI Neural Network Troubleshooter Section */}
                  <AgenticAiTroubleshooter />

                  {/* Machine Telemetry Grid */}
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
                      <div
                        key={m.id}
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
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Tab 2: Equipment Effectiveness */}
              {activeTab === "Equipment Effectiveness" && (
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
                      gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr",
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
                    <span>PRODUCTION LINE</span>
                    <span>AVAILABILITY</span>
                    <span>PERFORMANCE</span>
                    <span>QUALITY FPY</span>
                    <span>OVERALL OEE</span>
                    <span>STATUS</span>
                  </div>

                  {oeeData.map((row, idx) => (
                    <div
                      key={row.line}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr",
                        padding: "16px 24px",
                        borderBottom: idx === oeeData.length - 1 ? "none" : "0.8px solid var(--border-subtle)",
                        alignItems: "center",
                        fontSize: "0.9rem",
                      }}
                    >
                      <div style={{ fontWeight: 700, fontFamily: "var(--font-heading)" }}>{row.line}</div>
                      <div style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>{row.availability}</div>
                      <div style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>{row.performance}</div>
                      <div style={{ fontFamily: "var(--font-mono)", color: "rgb(0, 180, 100)", fontWeight: 600 }}>{row.quality}</div>
                      <div style={{ fontFamily: "var(--font-mono)", fontWeight: 800, color: "var(--text-primary)", fontSize: "0.95rem" }}>{row.overall}</div>
                      <div>
                        <span
                          style={{
                            padding: "4px 10px",
                            borderRadius: "12px",
                            fontSize: "0.78rem",
                            fontWeight: 700,
                            background: row.status === "Optimal" ? "rgba(0, 180, 100, 0.1)" : "rgba(255, 170, 0, 0.1)",
                            color: row.status === "Optimal" ? "rgb(0, 150, 80)" : "rgb(200, 130, 0)",
                          }}
                        >
                          {row.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 3: Stop Loss Monitoring */}
              {activeTab === "Stop Loss Monitoring" && (
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
                      gridTemplateColumns: "1fr 1fr 1.5fr 1fr 1fr 1.5fr",
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
                    <span>ALERT ID</span>
                    <span>TIMESTAMP</span>
                    <span>LOCATION & CAUSE</span>
                    <span>SEVERITY</span>
                    <span>EXPOSURE</span>
                    <span>MITIGATION ACTION</span>
                  </div>

                  {stopLossData.map((row, idx) => (
                    <div
                      key={row.id}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1.5fr 1fr 1fr 1.5fr",
                        padding: "16px 24px",
                        borderBottom: idx === stopLossData.length - 1 ? "none" : "0.8px solid var(--border-subtle)",
                        alignItems: "center",
                        fontSize: "0.9rem",
                      }}
                    >
                      <div style={{ fontWeight: 700, fontFamily: "var(--font-mono)" }}>{row.id}</div>
                      <div style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>{row.timestamp}</div>
                      <div>
                        <div style={{ fontWeight: 600 }}>{row.location}</div>
                        <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>{row.cause}</div>
                      </div>
                      <div>
                        <span
                          style={{
                            padding: "4px 10px",
                            borderRadius: "12px",
                            fontSize: "0.78rem",
                            fontWeight: 700,
                            background:
                              row.severity === "Critical"
                                ? "rgba(255, 50, 50, 0.1)"
                                : row.severity === "Warning"
                                ? "rgba(255, 170, 0, 0.1)"
                                : "rgba(0, 180, 100, 0.1)",
                            color:
                              row.severity === "Critical"
                                ? "rgb(220, 40, 40)"
                                : row.severity === "Warning"
                                ? "rgb(200, 130, 0)"
                                : "rgb(0, 150, 80)",
                          }}
                        >
                          {row.severity}
                        </span>
                      </div>
                      <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: row.financialImpact.startsWith("-") ? "rgb(220, 40, 40)" : "rgb(0, 150, 80)" }}>
                        {row.financialImpact}
                      </div>
                      <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>{row.action}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 4: Energy Monitoring */}
              {activeTab === "Energy Monitoring" && (
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
                      gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr",
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
                    <span>POWER FEEDER NODE</span>
                    <span>CURRENT LOAD</span>
                    <span>POWER FACTOR</span>
                    <span>DAILY ENERGY</span>
                    <span>CO₂ EMISSIONS</span>
                    <span>COST SHIFT</span>
                  </div>

                  {energyData.map((row, idx) => (
                    <div
                      key={row.node}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr",
                        padding: "16px 24px",
                        borderBottom: idx === energyData.length - 1 ? "none" : "0.8px solid var(--border-subtle)",
                        alignItems: "center",
                        fontSize: "0.9rem",
                      }}
                    >
                      <div style={{ fontWeight: 700, fontFamily: "var(--font-heading)" }}>{row.node}</div>
                      <div style={{ fontFamily: "var(--font-mono)", fontWeight: 600, color: row.load.includes("Generating") ? "rgb(255, 180, 0)" : "var(--text-primary)" }}>{row.load}</div>
                      <div style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>{row.powerFactor}</div>
                      <div style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>{row.dailyConsumption}</div>
                      <div style={{ fontFamily: "var(--font-mono)", color: "rgb(0, 180, 100)" }}>{row.carbonImpact}</div>
                      <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}>{row.costShift}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 5: Executive Dashboard - Includes Graphical Animated Chart + Facility List */}
              {activeTab === "Executive Dashboard" && (
                <>
                  {/* Animated Graphical Chart */}
                  <ExecutiveMonthlyChart />

                  {/* Regional Facilities Overview Grid */}
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
                        gridTemplateColumns: "2fr 1.2fr 1fr 1fr 1fr 1fr 1fr",
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
                      <span>FACILITY LOCATION</span>
                      <span>PLANT MANAGER</span>
                      <span>STATUS</span>
                      <span>TARGET</span>
                      <span>ACTUAL OUTPUT</span>
                      <span>PLANT OEE</span>
                      <span>COMPLIANCE</span>
                    </div>

                    {executiveSites.map((row, idx) => (
                      <div
                        key={row.site}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "2fr 1.2fr 1fr 1fr 1fr 1fr 1fr",
                          padding: "16px 24px",
                          borderBottom: idx === executiveSites.length - 1 ? "none" : "0.8px solid var(--border-subtle)",
                          alignItems: "center",
                          fontSize: "0.9rem",
                        }}
                      >
                        <div style={{ fontWeight: 700, fontFamily: "var(--font-heading)" }}>{row.site}</div>
                        <div style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>{row.manager}</div>
                        <div>
                          <span
                            style={{
                              padding: "4px 10px",
                              borderRadius: "12px",
                              fontSize: "0.78rem",
                              fontWeight: 700,
                              background: row.status === "Operational" ? "rgba(0, 180, 100, 0.1)" : "rgba(255, 170, 0, 0.1)",
                              color: row.status === "Operational" ? "rgb(0, 150, 80)" : "rgb(200, 130, 0)",
                            }}
                          >
                            {row.status}
                          </span>
                        </div>
                        <div style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>{row.targetOutput}</div>
                        <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: "var(--text-primary)" }}>{row.actualOutput}</div>
                        <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: "var(--accent-blue)" }}>{row.oee}</div>
                        <div style={{ fontFamily: "var(--font-mono)", color: "rgb(0, 180, 100)", fontWeight: 700 }}>{row.compliance}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
