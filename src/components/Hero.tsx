import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="hero-section">
      <motion.div
        className="hero-badge"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span>AI DRIVEN SPEED. EXPERT CURATION.</span>
      </motion.div>

      <motion.h1
        className="hero-title"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        The New Standard in Staffing
      </motion.h1>

      <motion.p
        className="hero-subtitle"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        We mobilize verified crews to protect your schedule and your bottom line in high-consequence environments.
      </motion.p>

      <motion.div
        className="hero-actions"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <a href="#cta" className="btn-pill btn-primary btn-lg">
          Request Crews
        </a>
        <a href="#cta" className="btn-pill btn-secondary btn-lg">
          Apply
        </a>
      </motion.div>

      <motion.a
        href="#process"
        className="hero-scroll-cue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        <span>scroll to discover our process</span>
        <span className="scroll-arrow">↓</span>
      </motion.a>

      <motion.div
        className="hero-preview-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
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
