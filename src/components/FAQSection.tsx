import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How fast can crews be mobilized?",
    answer:
      "We move at the speed of your schedule. Our platform maintains a deep network of verified industrial craft, eliminating the weeks wasted in traditional hiring cycles. One call activates our mobilization engine to source and deploy precision-matched crews in hours, not days, ensuring your most critical paths remain fully manned.",
  },
  {
    question: "How do you handle compliance & background checks?",
    answer:
      "We use a Zero-Fail Compliance model. Before a worker is even cleared for dispatch, our system automates the verification of background checks, drug testing (FFD), and site-specific certifications including nuclear grade requirements. We block access to the gate for anyone who isn't 100% cleared, ensuring your badging office has zero headaches on Day 1.",
  },
  {
    question: "What is the coverage during outages?",
    answer:
      "We provide 24/7 active coordination to match the 24/7 nature of an outage. Our coverage spans the full range of outage craft: from general laborers and painters to specialized repairs and schedulers. More importantly, we manage the \"last mile\" of arrival, monitoring deployments in real-time to ensure your night and day shifts remain fully manned, even when field conditions shift.",
  },
  {
    question: "How does Vectr differ from traditional staffing vendors?",
    answer:
      "Traditional vendors are reactive; Vectr is an operational engine. While legacy agencies rely on manual resumes and 'available' warm bodies, we use intelligent workflows and expert curation to deliver field-validated precision. We don't just find people who are looking for work; we deploy proven crews that are engineered for the high-tempo grind of a critical path environment.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="page-section faq-section" id="faq">
      <div className="container">
        <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
          <span className="section-eyebrow">OPERATIONAL CLARITY</span>
          <h2 className="section-title">
            How we work and how we deliver industrial-grade staffing.
          </h2>
        </div>

        <div className="faq-accordion">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={faq.question} className={`faq-item ${isOpen ? "open" : ""}`}>
                <button
                  className="faq-trigger"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    size={20}
                    style={{
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                      color: isOpen ? "#00f0ff" : "#94a3b8",
                    }}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <p className="faq-answer">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
