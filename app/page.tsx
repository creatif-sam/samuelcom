import { Suspense } from "react";
import { Navbar }                from "@/components/organisms/Navbar";
import { HeroSection }           from "@/components/organisms/HeroSection";
import { ValuesSection }         from "@/components/organisms/ValuesSection";
import { AboutSection }          from "@/components/organisms/AboutSection";
import { PillarsSection }        from "@/components/organisms/PillarsSection";
import { VisionSection }         from "@/components/organisms/VisionSection";
import { ConnectSection }        from "@/components/organisms/ConnectSection";
import { SiteFooter }            from "@/components/organisms/SiteFooter";
import { TestimonialsSection }   from "@/components/organisms/TestimonialsSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ValuesSection />
      <AboutSection />
      <PillarsSection />
      <VisionSection />
      <Suspense fallback={null}><TestimonialsSection /></Suspense>
      <ConnectSection />
      <Suspense fallback={null}><SiteFooter /></Suspense>
    </>
  );
}


