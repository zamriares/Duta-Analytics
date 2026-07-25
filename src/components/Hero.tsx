import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export function Hero() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isHideCue, setIsHideCue] = useState(false);
  const heroRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger entrance as soon as user starts scrolling (> 15px)
      if (window.scrollY > 15) {
        setHasScrolled(true);
      }
      if (window.scrollY > 120) {
        setIsHideCue(true);
      } else {
        setIsHideCue(false);
      }
    };

    // If user loaded page already scrolled
    if (window.scrollY > 15) {
      setHasScrolled(true);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const slideLeftVariant = {
    hidden: { opacity: 0, x: -90, filter: "blur(6px)" },
    visible: (customDelay: number) => ({
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
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
        className={`hero-section hero ${hasScrolled ? "show" : ""} ${isHideCue ? "hide" : ""}`}
        id="hero"
      >
        {/* Full-width 3D Monowhite Render Video Background */}
        <div className="hero-bg-layer">
          <video
            autoPlay
            muted
            playsInline
            className="hero-bg-video"
            poster="/assets/hero_industrial_preview.jpg"
          >
            <source src="/assets/hero_video.mp4" type="video/mp4" />
          </video>
        </div>

        <div
          className="container"
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            textAlign: "left",
          }}
        >
          <motion.div
            className="hero-badge"
            custom={0.05}
            initial="hidden"
            animate={hasScrolled ? "visible" : "hidden"}
            variants={slideLeftVariant}
          >
            <span>OPERATIONAL SAAS &bull; DUTA ANALYTICS</span>
          </motion.div>

          {/* Staggered Slide From Left Header */}
          <h1 className="hero-title">
            <motion.span
              style={{
                display: "block",
              }}
              custom={0.2}
              initial="hidden"
              animate={hasScrolled ? "visible" : "hidden"}
              variants={slideLeftVariant}
            >
              Operational Intelligence
            </motion.span>
            <motion.span
              style={{
                display: "block",
                color: "var(--text-primary)",
              }}
              custom={0.35}
              initial="hidden"
              animate={hasScrolled ? "visible" : "hidden"}
              variants={slideLeftVariant}
            >
              for Factory Control Rooms
            </motion.span>
          </h1>

          <motion.p
            className="hero-subtitle"
            custom={0.5}
            initial="hidden"
            animate={hasScrolled ? "visible" : "hidden"}
            variants={slideLeftVariant}
          >
            Convert production telemetry, AI computer vision, and spatial GIS into actionable decision workflows across physical sites.
          </motion.p>

          <motion.div
            className="hero-actions"
            custom={0.65}
            initial="hidden"
            animate={hasScrolled ? "visible" : "hidden"}
            variants={slideLeftVariant}
          >
            <a href="#process" className="btn-pill btn-primary">
              Explore Dashboard
            </a>
            <a href="#contact" className="btn-pill btn-secondary">
              Request Demo
            </a>
          </motion.div>

          {/* Scroll cue button */}
          <a
            href="#process"
            className={`hero-scroll-cue hero__scroll-btn hsbtn-in ${isHideCue ? "hide" : ""}`}
            onClick={() => setHasScrolled(true)}
          >
            <span>{hasScrolled ? "Scroll to explore operational intelligence" : "Scroll down to reveal hero content"}</span>
            <span className="scroll-arrow">&darr;</span>
          </a>
        </div>
      </section>

      {/* Hero Spacer providing physical height for Lenis scroll orchestration */}
      <div className="hero-spacer" aria-hidden="true" />
    </div>
  );
}




