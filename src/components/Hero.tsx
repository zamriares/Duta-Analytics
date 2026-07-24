import { motion, type Variants } from "framer-motion";

const titleVariants: Variants = {
  hidden: {
    opacity: 0,
    transform: "perspective(1000px) translate3d(-120px, 60px, -50px) rotateY(45deg) rotateX(25deg)",
  },
  visible: {
    opacity: 1,
    transform: "perspective(1000px) translate3d(0px, 0px, 0px) rotateY(0deg) rotateX(0deg)",
    transition: {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const lineVariants: Variants = {
  hidden: {
    opacity: 0,
    transform: "perspective(1000px) translate3d(-80px, 40px, 0px) rotateY(35deg) rotateX(20deg)",
  },
  visible: (i: number) => ({
    opacity: 1,
    transform: "perspective(1000px) translate3d(0px, 0px, 0px) rotateY(0deg) rotateX(0deg)",
    transition: {
      duration: 1.5,
      delay: 0.1 * i,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export function Hero() {
  return (
    <section className="hero-section hero show">
      <motion.div
        className="hero-badge"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span>AI DRIVEN SPEED. EXPERT CURATION.</span>
      </motion.div>

      {/* 3D Hardware Accelerated Typography Reveal */}
      <motion.h1
        className="hero-title hero__title"
        variants={titleVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.span custom={0} variants={lineVariants} style={{ display: "block" }}>
          The New Standard
        </motion.span>
        <motion.span custom={1} variants={lineVariants} style={{ display: "block", color: "#00F0FF" }}>
          in Staffing
        </motion.span>
      </motion.h1>

      <motion.p
        className="hero-subtitle hero__subtitle"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
      >
        We mobilize verified crews to protect your schedule and your bottom line in high-consequence environments.
      </motion.p>

      <motion.div
        className="hero-actions"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
      >
        <a href="#cta" className="btn-pill btn-primary btn-lg">
          Request Crews
        </a>
        <a href="#cta" className="btn-pill btn-secondary btn-lg">
          Apply
        </a>
      </motion.div>

      {/* Scroll button with reveal & exit styling */}
      <motion.a
        href="#process"
        className="hero-scroll-cue hsbtn-in"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        <span>scroll to discover our process</span>
        <span className="scroll-arrow">↓</span>
      </motion.a>

      <motion.div
        className="hero-preview-container"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
      >
        <img
          src="/assets/hero_industrial_preview.jpg"
          alt="Industrial Operations Command Dashboard"
          className="hero-preview-img"
        />
      </motion.div>
    </section>
  );
}
