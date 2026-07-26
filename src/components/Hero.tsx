import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { HeroFrameCanvas } from "./HeroFrameCanvas";

export function Hero() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [scrollState, setScrollState] = useState({
    frameIndex: 4,
    frameProgress: 0,
    frameOpacity: 1.0,
    textProgress: 0,
    exitProgress: 0,
  });

  const handleScrollProgress = useCallback((data: {
    frameIndex: number;
    frameProgress: number;
    frameOpacity: number;
    textProgress: number;
    exitProgress: number;
  }) => {
    setScrollState(data);
  }, []);

  const textOpacity = Math.min(1.0, Math.max(0, scrollState.textProgress));
  const textTranslateY = (1 - textOpacity) * 35;

  // Smooth Exit Parallax Transition into Dashboard Section
  const sectionOpacity = Math.max(0.0, 1 - scrollState.exitProgress * 0.7);
  const sectionTranslateY = -scrollState.exitProgress * 50;
  const sectionScale = 1 - scrollState.exitProgress * 0.04;

  return (
    <section
      ref={heroRef}
      className="hero-section hero"
      id="hero"
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "transparent",
        opacity: sectionOpacity,
        transform: `translateY(${sectionTranslateY}px) scale(${sectionScale})`,
        transformOrigin: "center top",
        willChange: "transform, opacity",
      }}
    >
      {/* WebP Image Sequence Background Layer starting with frame_0009.webp */}
      <div className="hero-bg-layer">
        <HeroFrameCanvas onScrollProgress={handleScrollProgress} />
      </div>

      {/* Main Text Content: Revealed in Step 2 over the dropping black dots background */}
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          textAlign: "left",
          opacity: textOpacity,
          transform: `translateY(${textTranslateY}px)`,
          transition: "opacity 0.25s ease-out, transform 0.25s ease-out",
          pointerEvents: textOpacity > 0.5 ? "auto" : "none",
          visibility: textOpacity > 0.01 ? "visible" : "hidden",
          paddingTop: "60px",
        }}
      >
        <div className="hero-badge" style={{ marginBottom: "18px" }}>
          <span>OPERATIONAL SAAS &bull; DUTA ANALYTICS</span>
        </div>

        <h1 className="hero-title" style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)", lineHeight: 1.1, marginBottom: "22px" }}>
          <span style={{ display: "block" }}>Operational Intelligence</span>
          <span style={{ display: "block", color: "var(--text-primary)" }}>
            for Factory Control Rooms
          </span>
        </h1>

        <p className="hero-subtitle" style={{ fontSize: "1.25rem", maxWidth: "760px", lineHeight: 1.6, marginBottom: "32px", color: "var(--text-secondary)" }}>
          Convert production telemetry, AI computer vision, and spatial GIS into actionable decision workflows across physical sites.
        </p>

        <div className="hero-actions" style={{ display: "flex", gap: "16px" }}>
          <a href="#dashboard" className="btn-pill btn-primary">
            Explore Dashboard
          </a>
          <a href="#contact" className="btn-pill btn-secondary">
            Request Demo
          </a>
        </div>
      </div>

      {/* CONSTANTLY VISIBLE Scroll Instruction Cue with Triple Stacked Blinking Arrowheads */}
      <div
        style={{
          position: "absolute",
          bottom: "44px",
          left: "48px",
          zIndex: 10,
          pointerEvents: "auto",
          padding: "8px 12px",
        }}
      >
        <a
          href="#dashboard"
          className="hero-scroll-cue hero__scroll-btn hsbtn-in"
          style={{
            fontSize: "1.05rem",
            letterSpacing: "0.12em",
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
          }}
        >
          <span>scroll to start</span>

          {/* 7 Stacked Black Arrowheads with Continuous Wave Blink */}
          <div
            style={{
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "75px",
            }}
          >
            {[0, 1, 2, 3, 4, 5, 6].map((idx) => (
              <motion.div
                key={idx}
                animate={{ opacity: [0.15, 1, 0.15] }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: idx * 0.14,
                }}
                style={{
                  marginTop: idx > 0 ? "-15px" : "0px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ChevronDown size={24} color="#000000" strokeWidth={2.5} />
              </motion.div>
            ))}
          </div>
        </a>
      </div>
    </section>
  );
}
