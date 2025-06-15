
import React from 'react';
import UnifiedBackground from '@/components/backgrounds/UnifiedBackground';
import LandingNavbar from '@/features/landing/components/LandingNavbar';
import HeroSection from '@/features/landing/components/HeroSection';
import FeaturesSection from '@/features/landing/components/FeaturesSection';
import CtaSection from '@/features/landing/components/CtaSection';
import Footer from '@/features/landing/components/Footer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion } from "framer-motion"; // Added motion
import {
  pageTransitionVariants,
  reducedMotionPageTransitionVariants,
  getMotionVariants
} from "@/lib/motion"; // Added motion imports

const LandingPage = () => {
  // Get page transition variants, respecting reduced motion settings.
  const variants = getMotionVariants(pageTransitionVariants, reducedMotionPageTransitionVariants);

  return (
    <div className="text-white"> {/* Base container, non-animated, for elements like UnifiedBackground. */}
      <UnifiedBackground />
      {/* This motion.div applies page transition animations to the main content of the landing page. */}
      {/* It's keyed by the route in App.tsx's AnimatePresence setup. */}
      <motion.div
        className="relative z-10 flex flex-col min-h-screen" // Ensures consistent layout during transitions.
        variants={variants}
        initial="initial" // Start state from pageTransitionVariants (e.g., opacity 0, off-screen).
        animate="animate" // End state from pageTransitionVariants (e.g., opacity 1, on-screen).
        exit="exit"       // Exit state from pageTransitionVariants (e.g., opacity 0, off-screen).
      >
        <LandingNavbar />
        {/* ScrollArea contains the bulk of the page content and should fill available vertical space. */}
        <ScrollArea className="flex-1 w-full">
          <main>
            <HeroSection />
            <FeaturesSection />
          <CtaSection />
          </main>
          <Footer />
        </ScrollArea>
      </motion.div>
    </div>
  );
};

export default LandingPage;
