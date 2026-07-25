import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize2, Activity, ShieldCheck, Zap } from "lucide-react";

export function DashboardVideoSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
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
    <section className="page-section dashboard-video-section flow" id="dashboard-demo" style={{ padding: "100px 0 120px" }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: "left", maxWidth: "840px", marginBottom: "48px" }}>
          <span className="section-eyebrow">LIVE CONTROL ROOM RECORDING</span>
          <h2 className="section-title" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", marginTop: "8px" }}>
            See Duta Analytics Control Room in Live Action
          </h2>
          <p className="feature-desc" style={{ marginTop: "16px", fontSize: "1.15rem", color: "var(--text-secondary)" }}>
            Watch real-time production telemetry, AI computer vision streams, and predictive maintenance alerts operate seamlessly across active factory sites.
          </p>
        </div>

        {/* Video Player Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            position: "relative",
            maxWidth: "1080px",
            margin: "0 auto",
            background: "#090A0F",
            borderRadius: "12px",
            border: "1px solid var(--border-subtle)",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 240, 255, 0.08)",
            overflow: "hidden",
          }}
        >
          {/* Top Browser / Control Room Bar */}
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
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ff5f56" }} />
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ffbd2e" }} />
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#27c93f" }} />
              <span style={{ marginLeft: "12px", color: "var(--text-secondary)", fontWeight: 600 }}>
                DUTA_ANALYTICS_CONTROL_ROOM_FEED.mp4
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  padding: "3px 10px",
                  borderRadius: "12px",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  background: "rgba(0, 180, 100, 0.15)",
                  color: "rgb(0, 180, 100)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "rgb(0, 180, 100)" }} />
                60 FPS LIVE RECORDING
              </span>
            </div>
          </div>

          {/* Main Video Wrapper */}
          <div style={{ position: "relative", width: "100%", backgroundColor: "#000000" }}>
            <video
              ref={videoRef}
              src="/assets/dashboard_video.mp4"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src.includes("/assets/")) {
                  target.src = "/dashboard_video.mp4";
                }
              }}
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "680px",
                display: "block",
                objectFit: "contain",
              }}
            />

            {/* Floating Video Overlay Controls */}
            <div
              style={{
                position: "absolute",
                bottom: "16px",
                right: "16px",
                display: "flex",
                gap: "8px",
                zIndex: 10,
                background: "rgba(9, 10, 15, 0.75)",
                backdropFilter: "blur(8px)",
                padding: "6px 12px",
                borderRadius: "20px",
                border: "1px solid rgba(255, 255, 255, 0.15)",
              }}
            >
              <button
                onClick={togglePlay}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--text-primary)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                title={isPlaying ? "Pause Video" : "Play Video"}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>

              <button
                onClick={toggleMute}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--text-primary)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                title={isMuted ? "Unmute Audio" : "Mute Audio"}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>

              <button
                onClick={handleFullscreen}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--text-primary)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                title="Fullscreen"
              >
                <Maximize2 size={18} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Feature Badges below Video */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "24px",
            marginTop: "40px",
            maxWidth: "1080px",
            marginInline: "auto",
          }}
        >
          <div className="feature-item" style={{ padding: "20px", background: "var(--bg-secondary)", borderRadius: "4px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <Activity size={18} color="var(--accent-cyan)" />
              <strong style={{ fontSize: "0.95rem", fontFamily: "var(--font-heading)" }}>Sub-30ms Live Telemetry</strong>
            </div>
            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", margin: 0 }}>
              Direct WebSocket connection to PLC controllers, OPC-UA servers, and edge IoT devices.
            </p>
          </div>

          <div className="feature-item" style={{ padding: "20px", background: "var(--bg-secondary)", borderRadius: "4px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <Zap size={18} color="var(--accent-blue)" />
              <strong style={{ fontSize: "0.95rem", fontFamily: "var(--font-heading)" }}>AI Neural Overlay</strong>
            </div>
            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", margin: 0 }}>
              Computer vision models detect thermal anomalies, vibration drifts, and defective parts in real time.
            </p>
          </div>

          <div className="feature-item" style={{ padding: "20px", background: "var(--bg-secondary)", borderRadius: "4px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <ShieldCheck size={18} color="rgb(0, 180, 100)" />
              <strong style={{ fontSize: "0.95rem", fontFamily: "var(--font-heading)" }}>Nuclear-Grade Reliability</strong>
            </div>
            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", margin: 0 }}>
              Multi-site failover cluster guarantees continuous 99.999% uptime monitoring for mission-critical plants.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
