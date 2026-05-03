import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Stack } from "@/components/sections/Stack";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Publications } from "@/components/sections/Publications";
import { Contact } from "@/components/sections/Contact";
import { CursorGlow } from "@/components/ui/CursorGlow";

export default function Home() {
  return (
    <main className="relative">
      <CursorGlow />
      <Navbar />
      <Hero />
      <About />
      <Stack />
      <Experience />
      <Projects />
      <Publications />
      <Contact />
      <Footer />
    </main>
  );
}
