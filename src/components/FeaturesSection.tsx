import { motion } from "framer-motion";
import { Zap, UserCheck, ShieldCheck, Target } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Rapid Activation",
    description:
      "We believe speed is a skill. Our platform uses machine learning to turn staffing into instant logistics, deploying a precisely matched workforce the moment demand strikes.",
  },
  {
    icon: UserCheck,
    title: "Rigorous Selection",
    description:
      "Geography is a core metric. Our engine uses AI to find and contact qualified talent within defined radii, securing top local contractors first, filtered for cost and skill.",
  },
  {
    icon: ShieldCheck,
    title: "100% Verified Before Arrival",
    description:
      "We use a Zero-Trust verification model with secure API integrations to run automated background checks and drug testing, blocking dispatch access until fully cleared.",
  },
  {
    icon: Target,
    title: "Controlled Outcomes",
    description:
      "We guarantee controlled outcomes by managing staffing's biggest variables—cost and compliance—prioritizing local mobilization and automating safety for every dispatch.",
  },
];

export function FeaturesSection() {
  return (
    <section className="page-section features-section" id="features">
      <div className="container">
        <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
          <span className="section-eyebrow">OPERATIONAL LOGISTICS</span>
          <h2 className="section-title">
            Designed for today's operations, beyond legacy staffing workflows.
          </h2>
        </div>

        <div className="features-grid">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                className="feature-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx, duration: 0.5 }}
              >
                <div className="feature-icon-box">
                  <Icon size={24} />
                </div>
                <h3 className="feature-title">{feat.title}</h3>
                <p className="feature-desc">{feat.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
