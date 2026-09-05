import { About } from "@/components/About";
import { Availability } from "@/components/Availability";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";
import { Services } from "@/components/Services";
import { Skills } from "@/components/Skills";
import { SiteContentProvider } from "@/lib/site-content";

export default function Home() {
  return (
    <SiteContentProvider>
      <div id="top" className="relative">
        <div className="grain" />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Services />
          <Skills />
          <Availability />
          <Contact />
        </main>
        <Footer />
      </div>
    </SiteContentProvider>
  );
}
