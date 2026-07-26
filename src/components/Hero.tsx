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
        <div
          className="hero-badge"
          style={{
            marginBottom: "20px",
            padding: "4px 0 8px 0",
            background: "transparent",
            border: "none",
            borderBottom: "3.5px solid var(--accent-blue)",
            display: "inline-flex",
          }}
        >
          <span>ENGINEERING INTELLIGENT DECISIONS.</span>
        </div>

        <h1
          className="hero-title"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: "22px",
            color: "#000000",
          }}
        >
          <span style={{ display: "block" }}>
            Transforming <span style={{ color: "#E69C00" }}>Industrial Data</span>
          </span>
          <span style={{ display: "block", color: "#000000" }}>
            into Intelligent Decisions
          </span>
        </h1>

        <p className="hero-subtitle" style={{ fontSize: "1.25rem", maxWidth: "820px", lineHeight: 1.6, marginBottom: "32px", color: "var(--text-secondary)" }}>
          Delivering AI-powered Manufacturing Intelligence, Vision Intelligence, Digital Twins, and Spatial Analytics through a unified platform that connects people, machines, and data.
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

      {/* CONSTANTLY VISIBLE Scroll Instruction Cue Centered at Bottom */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          pointerEvents: "auto",
        }}
      >
        <a
          href="#dashboard"
          className="hero-scroll-cue hero__scroll-btn hsbtn-in"
          style={{
            fontSize: "0.8rem",
            letterSpacing: "0.14em",
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "4px",
            textDecoration: "none",
          }}
        >
          <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", fontWeight: 700 }}>
            scroll to start
          </span>

          {/* Stacked Blinking Arrowheads */}
          <div
            style={{
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "45px",
            }}
          >
            {[0, 1, 2, 3].map((idx) => (
              <motion.div
                key={idx}
                animate={{ opacity: [0.15, 1, 0.15] }}
                transition={{
                  duration: 1.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: idx * 0.15,
                }}
                style={{
                  marginTop: idx > 0 ? "-11px" : "0px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ChevronDown size={20} color="var(--accent-blue)" strokeWidth={2.5} />
              </motion.div>
            ))}
          </div>
        </a>
      </div>
    </section>
  );
}
