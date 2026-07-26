import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Loader } from "./components/Loader";
import { TechCanvas } from "./components/TechCanvas";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { DashboardSection } from "./components/DashboardSection";
import { DashboardVideoSection } from "./components/DashboardVideoSection";
import { SolutionsSection } from "./components/SolutionsSection";
import { SpatialSection } from "./components/SpatialSection";
import { DigitalTwinSection } from "./components/DigitalTwinSection";
import { VisionSection } from "./components/VisionSection";
import { AboutSection } from "./components/AboutSection";
import { CaseStudiesSection } from "./components/CaseStudiesSection";
import { StandardsSection } from "./components/StandardsSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { ErrorLogViewer } from "./components/ErrorLogViewer";

gsap.registerPlugin(ScrollTrigger);

// Clear browser scroll memory on refresh
if (typeof window !== "undefined") {
  ScrollTrigger.clearScrollMemory("manual");
}

export function App() {
  useEffect(() => {
    // 0. Force page scroll to top on mount
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    // 1. Add Lenis structural trigger classes to HTML element
    const htmlEl = document.documentElement;
    htmlEl.classList.add("lenis", "lenis-smooth");

    // 2. Initialize Lenis momentum-based smooth scroll engine
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.scrollTo(0, { immediate: true });

    // 3. Synchronize Lenis smooth scroll with GSAP ScrollTrigger ticker
    lenis.on("scroll", ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // 4. IntersectionObserver for section entrance transitions
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
      gsap.ticker.remove(updateLenis);
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
        <DashboardVideoSection />
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
      <ErrorLogViewer />
    </div>
  );
}

export default App;

