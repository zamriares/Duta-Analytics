import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Activation, simplified",
    highlight: "One call triggers mobilization.",
    description:
      "Your requirements: craft, count, and start date route directly to our verified crews. No hand-offs. No escalations. Just boots on the ground in minutes.",
  },
  {
    number: "02",
    title: "Cleared to count",
    highlight: "Our team handles all screening and verification before dispatch.",
    description:
      "Compliance, background, certifications, and fitness-for-duty — we enforce a zero-fail model to guarantee every worker clears the gate on Day 1.",
  },
  {
    number: "03",
    title: "Proven field match",
    highlight: "We don't just provide available workers. We deploy proven crews.",
    description:
      "By filtering for past performance, role fit, and reliability, we deliver teams engineered for endurance — ensuring your project stays fully manned from first break to completion.",
  },
  {
    number: "04",
    title: "Seamless arrival",
    highlight: 'We manage the "last mile" of mobilization.',
    description:
      "Every crew arrives site-ready with finalized reporting details. With real-time arrival monitoring and active coordination, we ensure your shift starts on time, even when field conditions shift.",
  },
];

export function ProcessSection() {
  return (
    <section className="page-section process-section flow" id="process">
      <div className="container">
        <div style={{ textAlign: "left", maxWidth: "720px" }}>
          <span className="section-eyebrow">HIGH-TEMPO WORKFLOW</span>
          <h2 className="section-title">Mobilization Engineered for Endurance</h2>
        </div>

        <div className="process-grid">
          {steps.map((step, idx) => (
            <motion.div
              key={step.number}
              className="process-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * idx, duration: 0.6, ease: "easeOut" }}
            >
              <div className="step-num">{step.number}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-highlight">{step.highlight}</p>
              <p className="step-desc">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
