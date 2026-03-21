import { Suspense } from "react";
import { Navbar }                from "@/components/organisms/Navbar";
import { HeroSection }           from "@/components/organisms/HeroSection";
import { ValuesSection }         from "@/components/organisms/ValuesSection";
import { PillarsSection }        from "@/components/organisms/PillarsSection";
import { WhatIDoSection }        from "@/components/organisms/WhatIDoSection";
import { VisionSection }         from "@/components/organisms/VisionSection";
import { ConnectSection }        from "@/components/organisms/ConnectSection";
import { SiteFooter }            from "@/components/organisms/SiteFooter";
import { TestimonialsSection }   from "@/components/organisms/TestimonialsSection";
import { LatestBlogsSection }    from "@/components/organisms/LatestBlogsSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ValuesSection />
      <PillarsSection />
      <WhatIDoSection />
      <VisionSection />
      <Suspense fallback={null}><TestimonialsSection /></Suspense>
      <LatestBlogsSection />
      <ConnectSection />
      <Suspense fallback={null}><SiteFooter /></Suspense>
    </>
  );
}


