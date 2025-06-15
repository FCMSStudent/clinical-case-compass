
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/lib/ui-styles';

const LandingNavbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-20 bg-black/20 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-bold text-white transition-colors">
          Medica
        </NavLink>
        <div className="flex items-center gap-2">
          <NavLink to="/auth" className={cn(buttonVariants.ghost, "text-white/80 hover:bg-white/10 hover:text-white")}>
            Sign In
          </NavLink>
          <NavLink to="/auth" className={cn(buttonVariants.primary, "shadow-lg shadow-blue-500/20")}>
            Get Started
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default LandingNavbar;
