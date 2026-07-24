import { motion } from "framer-motion";
import { ArrowRight, ShieldAlert } from "lucide-react";

export function StandardsSection() {
  return (
    <section className="page-section" id="standards" style={{ background: "#090a0f" }}>
      <div className="container">
        <div className="standards-banner">
          <img
            src="/assets/nuclear_grade_standards.jpg"
            alt="Nuclear Grade Industrial Standards"
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
                borderRadius: "20px",
                background: "rgba(0, 240, 255, 0.15)",
                border: "1px solid rgba(0, 240, 255, 0.3)",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "#00f0ff",
                letterSpacing: "0.1em",
                marginBottom: "20px",
              }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <ShieldAlert size={16} />
              <span>ZERO-FAIL ACCREDITATION</span>
            </motion.div>

            <motion.h2
              className="standards-title"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Nuclear-grade standards across every site.
            </motion.h2>

            <motion.p
              className="standards-desc"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Modeled on nuclear-grade environments, our process enforces badge compliance, protected timelines and zero-error tolerance.
            </motion.p>

            <motion.a
              href="#solutions"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                fontWeight: 700,
                color: "#00f0ff",
                fontSize: "1rem",
              }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <span>Explore our industries</span>
              <ArrowRight size={18} />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
