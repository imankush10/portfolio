import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Achievements, { FlippingCards } from "@/components/Achievements";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="app-safe w-full overflow-x-clip">
      <Hero />
      <Projects />
      <Achievements />
      /*<Education />*/
      <Contact />
    </main>
  );
}
