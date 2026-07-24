import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";

export function StandardsSection() {
  return (
    <section className="page-section standards-section flow" id="standards">
      <div className="container">
        <div className="standards-banner">
          <img
            src="/assets/nuclear_grade_standards.jpg"
            alt="Industrial Control Room Decision Systems"
            className="standards-bg-img"
          />
          <div className="standards-overlay" />

          <div className="standards-content">
            <motion.div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                border: "0.8px solid var(--border-dark)",
                background: "rgba(255, 255, 255, 0.05)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "var(--text-inverse)",
                letterSpacing: "0.15em",
                marginBottom: "20px",
              }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <ShieldCheck size={16} />
              <span>HIGH-CONSEQUENCE SITE RELIABILITY</span>
            </motion.div>

            <motion.h2
              className="standards-title"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Industrial-grade clarity across every site &amp; asset network.
            </motion.h2>

            <motion.p
              className="standards-desc"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Modeled for high-demand physical environments, our decision workflows eliminate reporting latency, connect isolated machine telemetry, and give operators instant operational action.
            </motion.p>

            <motion.a
              href="#solutions"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                fontWeight: 700,
                color: "var(--text-inverse)",
                fontSize: "0.95rem",
                letterSpacing: "0.02em",
                borderBottom: "0.8px solid var(--text-inverse)",
                paddingBottom: "4px",
              }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <span>Explore our solutions</span>
              <ArrowRight size={16} />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}

