import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ProcessSection } from "./components/ProcessSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { StandardsSection } from "./components/StandardsSection";
import { FAQSection } from "./components/FAQSection";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";

export function App() {
  return (
    <div className="min-h-screen bg-[#090A0F] text-slate-100 selection:bg-[#00F0FF] selection:text-black">
      <Header />
      <main>
        <Hero />
        <ProcessSection />
        <FeaturesSection />
        <StandardsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
