import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    projectFocus: "Manufacturing SaaS / Factory Visibility",
    message: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="page-section contact-section flow" id="contact">
      <div className="container">
        <div style={{ maxWidth: "800px", textAlign: "left", marginBottom: "40px" }}>
          <span className="section-eyebrow">REQUEST CONSULTATION</span>
          <h2 className="section-title">
            Discuss a Manufacturing SaaS, Vision AI, GIS, or Digital Twin Project
          </h2>
          <p className="feature-desc" style={{ marginTop: "12px", fontSize: "1.1rem" }}>
            Share your operational challenge, data sources, and decision workflow you want to improve.
          </p>
        </div>

        <motion.div
          style={{
            maxWidth: "680px",
            margin: "40px auto 0",
            background: "var(--bg-secondary)",
            border: "0.8px solid var(--border-subtle)",
            borderRadius: "6px",
            padding: "40px",
          }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {submitted ? (
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "rgba(0, 180, 100, 0.1)",
                  color: "rgb(0, 150, 80)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                }}
              >
                <CheckCircle2 size={28} />
              </div>
              <h3 className="feature-title" style={{ fontSize: "1.5rem" }}>
                Inquiry Received
              </h3>
              <p className="feature-desc" style={{ marginTop: "8px" }}>
                Thank you. An operational specialist from Duta Analytics will review your requirements and reach out within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "grid", gap: "20px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div>
                  <label
                    htmlFor="name"
                    style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "8px", fontFamily: "var(--font-mono)" }}
                  >
                    NAME *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      background: "var(--bg-primary)",
                      border: "0.8px solid var(--border-strong)",
                      borderRadius: "4px",
                      fontSize: "0.95rem",
                      color: "var(--text-primary)",
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "8px", fontFamily: "var(--font-mono)" }}
                  >
                    WORK EMAIL *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      background: "var(--bg-primary)",
                      border: "0.8px solid var(--border-strong)",
                      borderRadius: "4px",
                      fontSize: "0.95rem",
                      color: "var(--text-primary)",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="website"
                  style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "8px", fontFamily: "var(--font-mono)" }}
                >
                  COMPANY WEBSITE
                </label>
                <input
                  id="website"
                  type="text"
                  placeholder="https://company.com"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    background: "var(--bg-primary)",
                    border: "0.8px solid var(--border-strong)",
                    borderRadius: "4px",
                    fontSize: "0.95rem",
                    color: "var(--text-primary)",
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="projectFocus"
                  style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "8px", fontFamily: "var(--font-mono)" }}
                >
                  PROJECT FOCUS
                </label>
                <select
                  id="projectFocus"
                  value={formData.projectFocus}
                  onChange={(e) => setFormData({ ...formData, projectFocus: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    background: "var(--bg-primary)",
                    border: "0.8px solid var(--border-strong)",
                    borderRadius: "4px",
                    fontSize: "0.95rem",
                    color: "var(--text-primary)",
                    outline: "none",
                  }}
                >
                  <option value="Manufacturing SaaS / Factory Visibility">Manufacturing SaaS / Factory Visibility</option>
                  <option value="Vision AI / Computer Vision">Vision AI / Computer Vision</option>
                  <option value="GIS Services / Spatial Analysis">GIS Services / Spatial Analysis</option>
                  <option value="Digital Twin / Industrial Digital Twin">Digital Twin / Industrial Digital Twin</option>
                  <option value="Custom Analytics Platform">Custom Analytics Platform</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "8px", fontFamily: "var(--font-mono)" }}
                >
                  OPERATIONAL CHALLENGE / NOTES
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Tell us about your factory, sites, or asset telemetry sources..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    background: "var(--bg-primary)",
                    border: "0.8px solid var(--border-strong)",
                    borderRadius: "4px",
                    fontSize: "0.95rem",
                    color: "var(--text-primary)",
                    outline: "none",
                    resize: "vertical",
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn-pill btn-primary"
                style={{ width: "100%", padding: "14px 28px", fontSize: "1rem", marginTop: "10px" }}
              >
                <span>Send Inquiry</span>
                <Send size={16} style={{ marginLeft: "8px" }} />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
