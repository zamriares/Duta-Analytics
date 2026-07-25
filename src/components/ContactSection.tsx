import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    projectFocus: "Manufacturing SaaS / Factory Visibility",
    message: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("https://formspree.io/f/mzdwqwpw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const data = await response.json().catch(() => ({}));
        if (data && data.errors) {
          setErrorMessage(data.errors.map((err: any) => err.message).join(", "));
        } else {
          setErrorMessage("Failed to send inquiry. Please check your inputs and try again.");
        }
      }
    } catch (err) {
      console.error("Formspree submission error:", err);
      setErrorMessage("Network error. Please check your internet connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
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
                Thank you. Your inquiry has been submitted successfully via Formspree to Duta Analytics. Our operational team will review your requirements and reach out within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "grid", gap: "20px" }}>
              {errorMessage && (
                <div
                  style={{
                    padding: "12px 16px",
                    borderRadius: "4px",
                    background: "rgba(255, 60, 60, 0.12)",
                    border: "1px solid rgba(255, 60, 60, 0.4)",
                    color: "rgb(255, 80, 80)",
                    fontSize: "0.88rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <AlertCircle size={18} />
                  <span>{errorMessage}</span>
                </div>
              )}

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
                    name="name"
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
                    name="email"
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
                  name="website"
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
                  name="projectFocus"
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
                  <option value="Enterprise A.I Vision">Enterprise A.I Vision</option>
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
                  name="message"
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
                disabled={isSubmitting}
                className="btn-pill btn-primary"
                style={{
                  width: "100%",
                  padding: "14px 28px",
                  fontSize: "1rem",
                  marginTop: "10px",
                  opacity: isSubmitting ? 0.7 : 1,
                  cursor: isSubmitting ? "wait" : "pointer",
                }}
              >
                {isSubmitting ? (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                    <Loader2 size={18} className="spin" style={{ animation: "spin 1s linear infinite" }} />
                    SUBMITTING INQUIRY...
                  </span>
                ) : (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                    <span>Send Inquiry</span>
                    <Send size={16} />
                  </span>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
