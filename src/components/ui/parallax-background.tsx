
import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useTheme } from "@/lib/themes";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/lib/motion";

const Hexagon = ({ className, ...props }: React.ComponentProps<typeof motion.div>) => (
  <motion.div className={cn("absolute", className)} {...props}>
    <svg viewBox="0 0 100 86.6" className="w-full h-full fill-current">
      <polygon points="50,0 100,25 100,75 50,100 0,75 0,25" />
    </svg>
  </motion.div>
);

const ParallaxBackground = () => {
  const { currentTheme } = useTheme();
  const { scrollY } = useScroll();
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsReducedMotion(prefersReducedMotion());

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      });
    };
    if (!prefersReducedMotion()) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const y1 = useSpring(useTransform(scrollY, [0, 1000], [0, -300]), { stiffness: 100, damping: 30 });
  const y2 = useSpring(useTransform(scrollY, [0, 1000], [0, -200]), { stiffness: 100, damping: 30 });
  const y3 = useSpring(useTransform(scrollY, [0, 1000], [0, -100]), { stiffness: 100, damping: 30 });

  const themeColor = (opacity: number) => {
    const hex = currentTheme.colors.primary.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16) || 0;
    const g = parseInt(hex.substring(2, 4), 16) || 0;
    const b = parseInt(hex.substring(4, 6), 16) || 0;
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  if (isReducedMotion) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0" style={{ background: currentTheme.colors.background }} />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Layer 1: Deepest layer - Large glows */}
      <motion.div className="absolute inset-0 will-change-transform" style={{ y: y1 }}>
        <div
          className="absolute top-1/4 left-1/4 w-[50vw] h-[50vh] rounded-full"
          style={{ background: `radial-gradient(circle, ${themeColor(0.05)} 0%, transparent 70%)`, filter: 'blur(80px)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vh] rounded-full"
          style={{ background: `radial-gradient(circle, ${themeColor(0.03)} 0%, transparent 70%)`, filter: 'blur(100px)' }}
        />
      </motion.div>

      {/* Layer 2: Hexagon patterns */}
      <motion.div className="absolute inset-0 will-change-transform" style={{ y: y2 }}>
        <Hexagon className="w-48 h-48 top-[10%] left-[5%] text-white/5 opacity-50" />
        <Hexagon className="w-64 h-64 top-[60%] right-[10%] text-white/5 opacity-50" />
        <Hexagon className="w-32 h-32 top-[75%] left-[20%] text-white/5 opacity-50" />
      </motion.div>

      {/* Layer 3: Interactive mouse-based glow */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y: y3 }}
        animate={{ x: mousePosition.x * 0.2, y: mousePosition.y * 0.2 }}
        transition={{ type: "spring", stiffness: 100, damping: 25 }}
      >
        <div
          className="absolute top-[60%] left-[40%] w-[30vw] h-[30vh] rounded-full"
          style={{ background: `radial-gradient(circle, ${themeColor(0.04)} 0%, transparent 60%)`, filter: 'blur(70px)' }}
        />
      </motion.div>
    </div>
  );
};

export default ParallaxBackground;
