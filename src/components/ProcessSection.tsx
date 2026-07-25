import { useEffect, useState } from "react";

interface StepItem {
  step: string;
  title: string;
  highlight: string;
  description: string;
}

const steps: StepItem[] = [
  {
    step: "01",
    title: "Activation & Telemetry Sync",
    highlight: "One call triggers full spatial & sensor mobilization.",
    description:
      "Connect physical site equipment, count parameters, and IoT sensors directly to our operational control matrix. Zero manual hand-offs, real-time sync across all site nodes.",
  },
  {
    step: "02",
    title: "AI Screening & Verification",
    highlight: "Enforcing zero-fail operational compliance across all parameters.",
    description:
      "Automated verification engines screen telemetry, background logs, and fitness-for-duty metrics to guarantee every physical system and worker clears baseline checks on Day 1.",
  },
  {
    step: "03",
    title: "Spatial GIS & Control Dispatch",
    highlight: "Engineered for high-tempo endurance and site precision.",
    description:
      "By filtering for past performance, role fit, and real-time spatial positioning, we deliver coordinated field teams engineered for continuous high-performance execution.",
  },
  {
    step: "04",
    title: "Seamless Real-Time Execution",
    highlight: "Active coordination when operational conditions shift.",
    description:
      "Continuous arrival monitoring and live shift telemetry ensure operational continuity. Every metric updates in real-time on command dashboards.",
  },
];

export function ProcessSection() {
  const [stepProgress, setStepProgress] = useState<number[]>(steps.map(() => 0));

  useEffect(() => {
    const handleScroll = () => {
      const stepElements = document.querySelectorAll(".flow__step");
      const windowHeight = window.innerHeight;

      const newProgress = Array.from(stepElements).map((el) => {
        const rect = el.getBoundingClientRect();
        const start = windowHeight * 0.85;
        const end = windowHeight * 0.25;
        const current = rect.top;

        if (current > start) return 0;
        if (current < end) return 1;
        return (start - current) / (start - end);
      });

      setStepProgress(newProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="page-section process-section flow" id="process">
      <div className="container">
        <div className="flow__header-wrapper">
          <span className="section-eyebrow">HIGH-TEMPO WORKFLOW</span>
          <h2 className="section-title">Mobilization Engineered for Endurance</h2>
        </div>

        <div className="flow__container">
          {steps.map((item, idx) => {
            const progress = stepProgress[idx] ?? 0;
            const isActive = progress > 0.05 && progress < 0.95;
            const isVisited = progress >= 0.95;

            return (
              <div
                key={item.step}
                className={`flow__step ${isActive ? "flow__step--active" : ""} ${
                  isVisited ? "flow__step--visited" : ""
                }`}
                data-step={idx + 1}
              >
                <div className="flow__header">
                  <div className="flow__number">
                    <span>{item.step}</span>
                  </div>
                  <h3 className="flow__title">{item.title}</h3>
                </div>

                <div className="flow__body">
                  <div className="flow__track">
                    <div
                      className="flow__track-fill"
                      style={{ transform: `scaleY(${progress})` }}
                    />
                  </div>
                  <div className="flow__content">
                    <p className="flow__highlight">{item.highlight}</p>
                    <p className="flow__description">{item.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
