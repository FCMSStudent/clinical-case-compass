
import React from 'react';
import UnifiedBackground from '@/components/backgrounds/UnifiedBackground';
import LandingNavbar from '@/features/landing/components/LandingNavbar';
import HeroSection from '@/features/landing/components/HeroSection';
import Footer from '@/features/landing/components/Footer';
import { ScrollArea } from '@/components/ui/scroll-area';

const LandingPage = () => {
  return (
    <div className="text-white">
      <UnifiedBackground />
      <LandingNavbar />
      <ScrollArea className="h-screen w-full relative z-10">
        <main>
          <HeroSection />
        </main>
        <Footer />
      </ScrollArea>
    </div>
  );
};

export default LandingPage;
