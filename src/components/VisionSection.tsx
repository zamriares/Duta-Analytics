import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Eye,
  ShieldCheck,
  Cpu,
  Scan,
  AlertOctagon,
  HardHat,
  Activity,
  Calculator,
  Gauge,
  Boxes,
  Zap,
  ChevronRight,
  Factory,
  Truck,
  Flame,
  TreePalm,
  Building2,
  ChevronDown,
} from "lucide-react";

const visionCapabilities = [
  { label: "Quality Inspection", icon: Scan, color: "var(--accent-cyan)" },
  { label: "Defect Detection", icon: AlertOctagon, color: "rgb(255, 170, 0)" },
  { label: "PPE Compliance", icon: HardHat, color: "var(--accent-blue)" },
  { label: "Worker Safety", icon: ShieldCheck, color: "rgb(0, 180, 100)" },
  { label: "Machine Monitoring", icon: Cpu, color: "var(--accent-cyan)" },
  { label: "Equipment Health", icon: Activity, color: "rgb(0, 180, 100)" },
  { label: "Production Counting", icon: Calculator, color: "var(--accent-blue)" },
  { label: "OCR & Gauge Reading", icon: Gauge, color: "var(--accent-cyan)" },
  { label: "Inventory Monitoring", icon: Boxes, color: "var(--accent-blue)" },
  { label: "Anomaly Detection", icon: Zap, color: "rgb(255, 60, 60)" },
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

interface EnvironmentItem {
  title: string;
  icon: any;
  color: string;
  desc: string;
}

const targetEnvironments: EnvironmentItem[] = [
  {
    title: "Manufacturing",
    icon: Factory,
    color: "var(--accent-cyan)",
    desc: "Automate surface flaw detection, high-speed dimensional tolerance checks, and robotic assembly line verification in high-volume production facilities.",
  },
  {
    title: "Smart Factory",
    icon: Cpu,
    color: "var(--accent-blue)",
    desc: "Connect camera nodes to edge AI gateways for real-time OEE tracking, automated cycle time auditing, and continuous digital twin mesh synchronization.",
  },
  {
    title: "Warehousing",
    icon: Boxes,
    color: "rgb(0, 180, 100)",
    desc: "Track pallet movements, barcode OCR reading, container stacking density, and automated guided vehicle (AGV) navigational safety zones.",
  },
  {
    title: "Utilities",
    icon: Zap,
    color: "rgb(255, 170, 0)",
    desc: "Monitor high-voltage electrical substations, water treatment valve positions, and thermal hot-spot anomalies automatically 24/7.",
  },
  {
    title: "Logistics",
    icon: Truck,
    color: "var(--accent-cyan)",
    desc: "Digitize dock bay loading efficiency, vehicle license plate recognition (ALPR), and cargo volume utilization across logistics hubs.",
  },
  {
    title: "Oil & Gas",
    icon: Flame,
    color: "rgb(255, 60, 60)",
    desc: "Audit worker PPE compliance (hard hats, flame-retardant vests), flare stack flame monitoring, and hazardous zone intrusion alerts.",
  },
  {
    title: "Palm Oil",
    icon: TreePalm,
    color: "rgb(0, 180, 100)",
    desc: "Automate fresh fruit bunch (FFB) grading, oil extraction conveyor flow monitoring, and steam boiler pressure gauge OCR reading.",
  },
  {
    title: "Infrastructure",
    icon: Building2,
    color: "var(--accent-blue)",
    desc: "Inspect structural concrete micro-cracks, perimeter security breaches, and heavy equipment spatial proximity safety boundaries.",
  },
];

const cctvComparison = [
  { traditional: "Passive NVR recording", vision: "Active real-time operational understanding" },
  { traditional: "Manual video review", vision: "Automated AI edge analytics" },
  { traditional: "Delayed incident reaction", vision: "Real-time automated alerts" },
  { traditional: "Isolated camera views", vision: "Spatially mapped asset telemetry" },
  { traditional: "DVR video wall clutter", vision: "Unified operational dashboard" },
];

function TargetEnvironmentCard({ item, idx, isSelected, onSelect }: { item: EnvironmentItem; idx: number; isSelected: boolean; onSelect: () => void }) {
  const IconComponent = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4, scale: 1.015 }}
      transition={{
        delay: 0.05 * idx,
        type: "spring",
        stiffness: 400,
        damping: 22,
      }}
      onClick={onSelect}
      style={{
        padding: "18px 0 22px 0",
        background: "transparent",
        border: "none",
        borderBottom: isSelected ? "2.5px solid #000000" : "1px solid #666666",
        cursor: "pointer",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <IconComponent size={20} color={item.color} />
          <h4 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, fontFamily: "var(--font-heading)", color: isSelected ? "#000000" : "var(--text-primary)" }}>
            {item.title}
          </h4>
        </div>

        <div
          title="Click to toggle explanation"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            fontSize: "0.75rem",
            fontFamily: "var(--font-mono)",
            fontWeight: 700,
            color: isSelected ? "#000000" : "var(--text-secondary)",
          }}
        >
          <span>{isSelected ? "ACTIVE" : "EXPAND"}</span>
          <ChevronDown size={14} style={{ transform: isSelected ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s ease" }} />
        </div>
      </div>

      {/* Explanation text: Appears strictly when selected */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 12 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{ overflow: "hidden" }}
          >
            <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
              {item.desc}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function VisionSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [selectedEnv, setSelectedEnv] = useState<string>("Manufacturing");

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <section className="page-section vision-section flow" id="vision">
      <div className="container">
        <div style={{ textAlign: "left", maxWidth: "840px" }}>
          <span className="section-eyebrow">ENTERPRISE A.I VISION</span>
          <h2 className="section-title">
            Enterprise A.I Vision for Industrial Site Operations
          </h2>
          <p className="feature-desc" style={{ marginTop: "12px", fontSize: "1.1rem" }}>
            Turn standard camera feeds into automated digital sensors. Audit safety postures, detect surface defects, and digitize equipment states in real time.
          </p>
        </div>

        {/* Vision Intel Control Room Framed Video Showcase */}
        <motion.div
          style={{
            marginTop: "40px",
            background: "var(--bg-secondary)",
            borderRadius: "6px",
            border: "1px solid var(--border-subtle)",
            overflow: "hidden",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.4)",
          }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Top Browser / Control Room Header Bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
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
                ENTERPRISE A.I VISION CONTROL ROOM &bull; RTSP STREAM #04
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
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
                LIVE 60 FPS INFERENCE
              </span>
            </div>
          </div>

          {/* Video Player Container with AI Neural Overlay Frame */}
          <div style={{ position: "relative", width: "100%", background: "#000000" }}>
            <video
              ref={videoRef}
              src="/assets/vision_intel_video.mp4"
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                maxHeight: "600px",
                objectFit: "cover",
              }}
              onError={() => {
                // Video failed to load — no fallback available
              }}
            />

            {/* AI HUD Overlay Corner Reticles */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                zIndex: 5,
                background: "radial-gradient(ellipse at center, rgba(0,0,0,0) 60%, rgba(0,0,0,0.5) 100%)",
              }}
            >
              {/* Top Left HUD Badge */}
              <div
                style={{
                  position: "absolute",
                  top: "16px",
                  left: "16px",
                  padding: "6px 12px",
                  background: "rgba(9, 10, 15, 0.85)",
                  backdropFilter: "blur(6px)",
                  border: "1px solid var(--accent-cyan)",
                  borderRadius: "4px",
                  color: "var(--accent-cyan)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Eye size={14} />
                <span>CAM_ID: CAM-FAC-04 [NEURAL TRACKING]</span>
              </div>

              {/* Top Right HUD Badge */}
              <div
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  padding: "6px 12px",
                  background: "rgba(9, 10, 15, 0.85)",
                  backdropFilter: "blur(6px)",
                  border: "1px solid rgba(0, 240, 255, 0.3)",
                  borderRadius: "4px",
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Cpu size={14} color="var(--accent-cyan)" />
                <span>LATENCY: 14.2ms &bull; CUDA ENGINE 10.2</span>
              </div>

              {/* Bottom Left AI Telemetry Node */}
              <div
                style={{
                  position: "absolute",
                  bottom: "20px",
                  left: "16px",
                  padding: "6px 12px",
                  background: "rgba(9, 10, 15, 0.85)",
                  backdropFilter: "blur(6px)",
                  border: "1px solid rgba(0, 180, 100, 0.4)",
                  borderRadius: "4px",
                  color: "rgb(0, 180, 100)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <ShieldCheck size={14} />
                <span>OBJECT LOCK: 14 SENSORS OK</span>
              </div>
            </div>

            {/* Video Controls Bar Overlay */}
            <div
              style={{
                position: "absolute",
                bottom: "16px",
                right: "16px",
                zIndex: 10,
                display: "flex",
                gap: "8px",
                background: "rgba(9, 10, 15, 0.85)",
                backdropFilter: "blur(8px)",
                padding: "6px 12px",
                borderRadius: "4px",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <button
                onClick={togglePlay}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#ffffff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "0.8rem",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                <span>{isPlaying ? "PAUSE" : "PLAY"}</span>
              </button>

              <div style={{ width: "1px", background: "var(--border-subtle)" }} />

              <button
                onClick={toggleMute}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#ffffff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>

              <div style={{ width: "1px", background: "var(--border-subtle)" }} />

              <button
                onClick={handleFullscreen}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#ffffff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
                title="Fullscreen"
              >
                <Maximize size={16} />
              </button>
            </div>
          </div>

          {/* Bottom Telemetry Bar */}
          <div
            style={{
              padding: "20px 24px",
              background: "var(--bg-secondary)",
              borderTop: "1px solid var(--border-subtle)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "24px",
            }}
          >
            <div>
              <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>
                PARTS PROCESSED (SHIFT)
              </span>
              <div style={{ fontSize: "1.8rem", fontWeight: 800, fontFamily: "var(--font-heading)", marginTop: "4px" }}>
                14,820
              </div>
            </div>

            <div>
              <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>
                DEFECTS FLAGGED
              </span>
              <div style={{ fontSize: "1.8rem", fontWeight: 800, fontFamily: "var(--font-heading)", color: "rgb(255, 180, 0)", marginTop: "4px" }}>
                18 <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--text-secondary)" }}>(0.12%)</span>
              </div>
            </div>

            <div>
              <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>
                PPE AUDITED WORKERS
              </span>
              <div style={{ fontSize: "1.8rem", fontWeight: 800, fontFamily: "var(--font-heading)", marginTop: "4px" }}>
                142
              </div>
            </div>

            <div>
              <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>
                SAFETY COMPLIANCE
              </span>
              <div style={{ fontSize: "1.8rem", fontWeight: 800, fontFamily: "var(--font-heading)", color: "rgb(0, 180, 100)", marginTop: "4px", display: "flex", alignItems: "center", gap: "6px" }}>
                <CheckCircle2 size={20} />
                <span>100% Cleared</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 10 Vision Capabilities Grid with Unique Icons, Borderless & Main Background */}
        <div style={{ marginTop: "56px" }}>
          <span className="section-eyebrow">AUTOMATED DIGITAL SENSOR CAPABILITIES</span>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "20px 24px",
              marginTop: "24px",
            }}
          >
            {visionCapabilities.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * idx }}
                  whileHover={{ y: -4, scale: 1.015 }}
                  style={{
                    padding: "16px 0",
                    background: "transparent",
                    border: "none",
                    borderBottom: "1px solid #666666",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    fontSize: "0.92rem",
                    fontWeight: 600,
                  }}
                >
                  <IconComponent size={18} color={item.color} />
                  <span>{item.label}</span>
                </motion.div>
              );
            })}
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
              gap: "16px 20px",
              marginTop: "28px",
              alignItems: "center",
            }}
          >
            {visionWorkflow.map((w, idx) => (
              <div key={w} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <span
                  style={{
                    padding: "10px 0",
                    background: "transparent",
                    border: "none",
                    borderBottom: "1px solid #666666",
                    fontSize: "0.92rem",
                    fontWeight: 700,
                    fontFamily: "var(--font-mono)",
                    color: "var(--text-primary)",
                  }}
                >
                  {w}
                </span>

                {idx < visionWorkflow.length - 1 && (
                  <motion.div
                    animate={{ opacity: [0.2, 1, 0.2], scale: [0.9, 1.15, 0.9] }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: idx * 0.2,
                    }}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <ChevronRight size={22} color="var(--accent-cyan)" />
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Target Operational Environments with Active Tabs & Explanation Text */}
        <div style={{ marginTop: "96px", paddingTop: "48px", borderTop: "0.8px solid var(--border-subtle)" }}>
          <span className="section-eyebrow">TARGET OPERATIONAL ENVIRONMENTS</span>
          <h3 className="section-title" style={{ fontSize: "2rem", marginBottom: "24px" }}>
            Proven Computer Vision AI Deployments Across Key Sectors
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "24px",
              marginTop: "28px",
            }}
          >
            {targetEnvironments.map((envItem, idx) => (
              <TargetEnvironmentCard
                key={envItem.title}
                item={envItem}
                idx={idx}
                isSelected={selectedEnv === envItem.title}
                onSelect={() => setSelectedEnv(selectedEnv === envItem.title ? "" : envItem.title)}
              />
            ))}
          </div>
        </div>

        {/* CCTV Comparison Grid */}
        <div style={{ marginTop: "64px", paddingTop: "48px", borderTop: "0.8px solid var(--border-subtle)" }}>
          <span className="section-eyebrow">ENTERPRISE A.I VISION VS TRADITIONAL CCTV</span>
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
