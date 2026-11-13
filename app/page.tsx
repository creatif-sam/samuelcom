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
import { ShareTestimonySection } from "@/components/organisms/ShareTestimonySection";

// Re-fetch latest blog posts from main_blog_posts periodically instead of freezing them at build time
export const revalidate = 300;

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
      <HeroSection />
      <ValuesSection />
      <PillarsSection />
      <WhatIDoSection />
      <VisionSection />
      <Suspense fallback={null}><TestimonialsSection /></Suspense>
      <ShareTestimonySection />
      <Suspense fallback={null}><LatestBlogsSection /></Suspense>
      <ConnectSection />
      </main>
      <Suspense fallback={null}><SiteFooter /></Suspense>
    </>
  );
}


