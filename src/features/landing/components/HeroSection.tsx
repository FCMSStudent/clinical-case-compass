
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { buttonVariants, typography } from '@/lib/ui-styles';
import { ArrowRight, BookOpen, User, BrainCircuit } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="pt-40 pb-20 text-center overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
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
              <ArrowRight className="ml-2 h-5 w-5" />
            </NavLink>
          </div>
        </motion.div>
        
        <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
            <div className="flex flex-col items-center text-center space-y-3 p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-500/10 rounded-lg ring-1 ring-blue-500/20">
                    <BookOpen className="h-6 w-6 text-blue-400"/>
                </div>
                <h3 className={typography.h6}>Organize Cases</h3>
                <p className={typography.body.small}>Effortlessly document and categorize your clinical encounters for easy review and learning.</p>
            </div>
             <div className="flex flex-col items-center text-center space-y-3 p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                <div className="flex items-center justify-center w-12 h-12 bg-green-500/10 rounded-lg ring-1 ring-green-500/20">
                    <User className="h-6 w-6 text-green-400"/>
                </div>
                <h3 className={typography.h6}>Track Patients</h3>
                <p className={typography.body.small}>Manage patient information and timelines securely, linking multiple cases to a single profile.</p>
            </div>
             <div className="flex flex-col items-center text-center space-y-3 p-6 bg-purple-500/10 rounded-xl border border-white/10 backdrop-blur-sm">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-500/10 rounded-lg ring-1 ring-purple-500/20">
                    <BrainCircuit className="h-6 w-6 text-purple-400"/>
                </div>
                <h3 className={typography.h6}>Extract Insights</h3>
                <p className={typography.body.small}>Identify key learning points and patterns from your cases to accelerate your professional growth.</p>
            </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
