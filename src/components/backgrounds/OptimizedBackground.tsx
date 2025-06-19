import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useUnifiedTheme } from "@/lib/unified-theme-system";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Optimized Background Component
 * Simplified version with better performance and reduced complexity
 */
const OptimizedBackground: React.FC = () => {
  const { currentTheme } = useUnifiedTheme();
  const { scrollY } = useScroll();
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const checkReducedMotion = () => setIsReducedMotion(prefersReducedMotion());
    checkReducedMotion();

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', checkReducedMotion);
    
    return () => {
      mediaQuery.removeEventListener('change', checkReducedMotion);
    };
  }, []);

  // Gentle parallax effects (only 2 layers instead of 3)
  const y1 = useTransform(scrollY, [0, 1000], [0, -200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);

  // Helper function to get theme colors with opacity
  const getThemeColor = (opacity: number) => {
    const primary = currentTheme.colors.primary;
    // Extract RGB values from hex
    const hex = primary.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16) || 59;
    const g = parseInt(hex.substring(2, 4), 16) || 130;
    const b = parseInt(hex.substring(4, 6), 16) || 246;
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  // For reduced motion, show a simple static background
  if (isReducedMotion) {
    return (
      <div className="fixed inset-0 pointer-events-none">
        {/* Simple gradient background */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${currentTheme.colors.primary}20 0%, ${currentTheme.colors.secondary}15 50%, ${currentTheme.colors.accent}10 100%)`
          }}
        />
        {/* Simple static glow */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-30"
          style={{
            background: `radial-gradient(circle, ${getThemeColor(0.1)} 0%, transparent 70%)`,
            filter: 'blur(60px)'
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle, ${getThemeColor(0.08)} 0%, transparent 70%)`,
            filter: 'blur(50px)'
          }}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Base gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${currentTheme.colors.primary}25 0%, ${currentTheme.colors.secondary}20 50%, ${currentTheme.colors.accent}15 100%)`
        }}
      />

      {/* Layer 1: Deep background glow (slower parallax) */}
      <motion.div 
        className="absolute inset-0 will-change-transform" 
        style={{ y: y1 }}
      >
        <div
          className="absolute top-1/4 left-1/4 w-[40vw] h-[40vh] rounded-full"
          style={{
            background: `radial-gradient(circle, ${getThemeColor(0.12)} 0%, transparent 70%)`,
            filter: 'blur(80px)'
          }}
        />
        <div
          className="absolute bottom-1/3 right-1/3 w-[35vw] h-[35vh] rounded-full"
          style={{
            background: `radial-gradient(circle, ${getThemeColor(0.08)} 0%, transparent 70%)`,
            filter: 'blur(70px)'
          }}
        />
      </motion.div>

      {/* Layer 2: Foreground accents (faster parallax) */}
      <motion.div 
        className="absolute inset-0 will-change-transform" 
        style={{ y: y2 }}
      >
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[30vh] rounded-full"
          style={{
            background: `radial-gradient(circle, ${getThemeColor(0.06)} 0%, transparent 60%)`,
            filter: 'blur(60px)'
          }}
        />
        
        {/* Subtle animated pulse */}
        <motion.div
          className="absolute top-3/4 left-1/5 w-32 h-32 rounded-full"
          style={{
            background: `radial-gradient(circle, ${getThemeColor(0.15)} 0%, transparent 50%)`,
            filter: 'blur(40px)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Medical ECG line - simplified */}
      <motion.div
        className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear",
          repeatDelay: 2
        }}
      />

      {/* Grid overlay for medical feel */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px'
        }}
      />
    </div>
  );
};

export default OptimizedBackground;