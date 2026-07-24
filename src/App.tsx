import { useEffect } from "react";
import Lenis from "lenis";
import { Loader } from "./components/Loader";
import { TechCanvas } from "./components/TechCanvas";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { DashboardSection } from "./components/DashboardSection";
import { SolutionsSection } from "./components/SolutionsSection";
import { SpatialSection } from "./components/SpatialSection";
import { DigitalTwinSection } from "./components/DigitalTwinSection";
import { VisionSection } from "./components/VisionSection";
import { AboutSection } from "./components/AboutSection";
import { CaseStudiesSection } from "./components/CaseStudiesSection";
import { StandardsSection } from "./components/StandardsSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";

export function App() {
  useEffect(() => {
    // 1. Add Lenis structural trigger classes to HTML element
    const htmlEl = document.documentElement;
    htmlEl.classList.add("lenis", "lenis-smooth");

    // 2. Initialize Lenis momentum-based smooth scroll engine
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // 3. Scroll progress & IntersectionObserver for section transitions
    lenis.on("scroll", (e: { scroll: number }) => {
      const heroEl = document.querySelector(".hero");
      if (heroEl) {
        if (e.scroll > 80) {
          heroEl.classList.add("hide");
        } else {
          heroEl.classList.remove("hide");
        }
      }
    });

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show", "is-visible");
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
    });

    const elementsToObserve = document.querySelectorAll(
      ".flow, .feature-item, .process-card, .standards-banner, .faq-item, .page-section"
    );
    elementsToObserve.forEach((el) => observer.observe(el));

    return () => {
      htmlEl.classList.remove("lenis", "lenis-smooth");
      lenis.destroy();
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen relative">
      <Loader />
      <TechCanvas />
      <Header />
      <Hero />
      <main className="main-content">
        <DashboardSection />
        <SolutionsSection />
        <SpatialSection />
        <DigitalTwinSection />
        <VisionSection />
        <AboutSection />
        <CaseStudiesSection />
        <StandardsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;

