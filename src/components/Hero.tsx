import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export function Hero() {
  const [isShow, setIsShow] = useState(false);
  const [isHideCue, setIsHideCue] = useState(false);
  const heroRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Trigger .show class after mount
    const timer = setTimeout(() => {
      setIsShow(true);
    }, 150);

    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsHideCue(true);
      } else {
        setIsHideCue(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const flipVariant = {
    hidden: { opacity: 0, rotateX: -85, y: 35 },
    visible: (customDelay: number) => ({
      opacity: 1,
      rotateX: 0,
      y: 0,
      transition: {
        duration: 0.95,
        delay: customDelay,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  return (
    <div className="hero-wrapper">
      <section
        ref={heroRef}
        className={`hero-section hero ${isShow ? "show" : ""} ${isHideCue ? "hide" : ""}`}
        id="hero"
      >
        {/* Full-width 3D Monowhite Render Background */}
        <div className="hero-bg-layer">
          <img
            src="/assets/hero_industrial_preview.jpg"
            alt="3D Monowhite Floating Factory Equipment Background"
            className="hero-bg-img"
          />
        </div>

        <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", perspective: "1000px" }}>
          <motion.div
            className="hero-badge"
            custom={0.1}
            initial="hidden"
            animate={isShow ? "visible" : "hidden"}
            variants={flipVariant}
          >
            <span>OPERATIONAL SAAS &bull; DUTA ANALYTICS</span>
          </motion.div>

          {/* Cascade 3D Flip Animation Header */}
          <h1 className="hero-title" style={{ perspective: "1200px" }}>
            <motion.span
              style={{
                display: "block",
                transformOrigin: "center top",
                transformStyle: "preserve-3d",
              }}
              custom={0.25}
              initial="hidden"
              animate={isShow ? "visible" : "hidden"}
              variants={flipVariant}
            >
              Operational Intelligence
            </motion.span>
            <motion.span
              style={{
                display: "block",
                color: "var(--text-primary)",
                transformOrigin: "center top",
                transformStyle: "preserve-3d",
              }}
              custom={0.45}
              initial="hidden"
              animate={isShow ? "visible" : "hidden"}
              variants={flipVariant}
            >
              for Factory Control Rooms
            </motion.span>
          </h1>

          <motion.p
            className="hero-subtitle"
            custom={0.65}
            initial="hidden"
            animate={isShow ? "visible" : "hidden"}
            variants={flipVariant}
          >
            Convert production telemetry, AI computer vision, and spatial GIS into actionable decision workflows across physical sites.
          </motion.p>

          <motion.div
            className="hero-actions"
            custom={0.8}
            initial="hidden"
            animate={isShow ? "visible" : "hidden"}
            variants={flipVariant}
          >
            <a href="#dashboard" className="btn-pill btn-primary">
              Explore Dashboard
            </a>
            <a href="#contact" className="btn-pill btn-secondary">
              Request Demo
            </a>
          </motion.div>

          {/* Scroll button with reveal & exit physics styling */}
          <a
            href="#dashboard"
            className={`hero-scroll-cue hero__scroll-btn hsbtn-in ${isHideCue ? "hide" : ""}`}
          >
            <span>Scroll to explore operational intelligence</span>
            <span className="scroll-arrow">&darr;</span>
          </a>
        </div>
      </section>

      {/* Hero Spacer providing physical height for Lenis scroll orchestration */}
      <div className="hero-spacer" aria-hidden="true" />
    </div>
  );
}




