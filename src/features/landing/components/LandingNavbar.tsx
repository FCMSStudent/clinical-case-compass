import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/lib/ui-styles';
import { liquidGlassClasses, getGlassTransitionVariants } from '@/lib/glass-effects';

const LandingNavbar = () => {
  return (
    <motion.header 
      className={cn("fixed top-0 left-0 right-0 z-20 border-b border-white/20", liquidGlassClasses.navigation)}
      variants={getGlassTransitionVariants('medium')}
      initial="initial"
      animate="animate"
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <NavLink to="/" className="text-2xl font-bold text-white transition-all duration-300 hover:brightness-110">
            Medica
          </NavLink>
        </motion.div>
        <div className="flex items-center gap-2">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <NavLink 
              to="/auth" 
              className={cn(
                buttonVariants.ghost, 
                "text-white/80 hover:bg-white/20 hover:text-white hover:brightness-105 hover:saturate-110 transition-all duration-300"
              )}
            >
              Sign In
            </NavLink>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <NavLink 
              to="/auth" 
              className={cn(
                buttonVariants.primary, 
                "shadow-lg shadow-blue-500/20 hover:brightness-105 hover:saturate-110 transition-all duration-300"
              )}
            >
              Get Started
            </NavLink>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default LandingNavbar;
