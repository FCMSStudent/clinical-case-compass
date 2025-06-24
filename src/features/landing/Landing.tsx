import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/app/providers/AuthContext';
import UnifiedBackground from '@/shared/components/UnifiedBackground';
import LandingNavbar from '@/features/landing/components/LandingNavbar';
import HeroSection from '@/features/landing/components/HeroSection';
import FeaturesSection from '@/features/landing/components/FeaturesSection';
import CtaSection from '@/features/landing/components/CtaSection';
import Footer from '@/features/landing/components/Footer';
import { ScrollArea } from '@/shared/components/scroll-area';
import { motion } from "framer-motion";
import {
  pageTransitionVariants,
  reducedMotionPageTransitionVariants,
  getMotionVariants
} from "@/design-system/animations/motion";

const LandingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) navigate('/dashboard');
  }, [user, navigate]);

  // Get page transition variants, respecting reduced motion settings.
  const variants = getMotionVariants(pageTransitionVariants, reducedMotionPageTransitionVariants);

  return (
    <div className="text-white">
      <UnifiedBackground />
      
      {/* Simplified motion wrapper with improved transitions */}
      <motion.div
        className="relative z-10 flex flex-col min-h-screen"
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <LandingNavbar />
        
        {/* Remove ScrollArea transitions to prevent conflicts */}
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
