
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { buttonVariants, typography } from '@/lib/ui-styles';
import { ArrowRight, BookOpen, User, BrainCircuit } from 'lucide-react';
import { motion } from 'framer-motion';
import { BentoCard } from '@/components/ui/bento-card';
import { BentoContainer } from '@/components/ui/bento-container';

const HeroSection = () => {
  return (
    <section className="pt-40 pb-20 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-20"
        >
          <h1 className={cn(typography.h1, "text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70")}>
            Master Clinical Cases, Faster.
          </h1>
          <p className={cn(typography.body.large, "mt-6 max-w-3xl mx-auto text-white/80")}>
            Medica is your all-in-one platform to document, analyze, and learn from every patient encounter. Turn daily practice into a powerful knowledge base.
          </p>
          <div className="mt-10 flex justify-center items-center gap-4">
            <NavLink to="/auth" className={cn(buttonVariants.primary, "h-12 px-8 text-base font-semibold shadow-lg shadow-blue-500/30")}>
              Get Started Free
              <ArrowRight className="h-5 w-5" />
            </NavLink>
          </div>
        </motion.div>
        
        <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="max-w-6xl mx-auto"
        >
          <BentoContainer>
            <BentoCard
              layout="medium"
              variant="elevated"
              icon={<BookOpen />}
              title="Organize Cases"
              className="hover:border-blue-400/50"
            >
              <p className={cn(typography.body.small, 'text-white/80')}>
                Effortlessly document and categorize your clinical encounters for easy review and learning.
              </p>
            </BentoCard>
            
            <BentoCard
              layout="medium"
              variant="elevated"
              icon={<User />}
              title="Track Patients"
              className="hover:border-green-400/50"
            >
              <p className={cn(typography.body.small, 'text-white/80')}>
                Manage patient information and timelines securely, linking multiple cases to a single profile.
              </p>
            </BentoCard>
            
            <BentoCard
              layout="medium"
              variant="elevated"
              icon={<BrainCircuit />}
              title="Extract Insights"
              className="hover:border-purple-400/50"
            >
              <p className={cn(typography.body.small, 'text-white/80')}>
                Identify key learning points and patterns from your cases to accelerate your professional growth.
              </p>
            </BentoCard>
          </BentoContainer>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
