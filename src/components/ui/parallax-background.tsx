
import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ParallaxBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 1000], [0, -200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);
  const y3 = useTransform(scrollY, [0, 1000], [0, -50]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Parallax layer 1 - Background layer */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y: y1 }}
        animate={{
          x: mousePosition.x * 0.1,
          y: mousePosition.y * 0.1,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      >
        <div 
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 40%, transparent 70%)',
            filter: 'blur(60px)',
            transform: 'translate3d(0, 0, 0)',
          }}
        />
      </motion.div>

      {/* Parallax layer 2 - Middle layer */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y: y2 }}
        animate={{
          x: mousePosition.x * 0.2,
          y: mousePosition.y * 0.2,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 25 }}
      >
        <div 
          className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.015) 50%, transparent 80%)',
            filter: 'blur(80px)',
            transform: 'translate3d(0, 0, 0)',
          }}
        />
      </motion.div>

      {/* Parallax layer 3 - Foreground layer */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y: y3 }}
        animate={{
          x: mousePosition.x * 0.3,
          y: mousePosition.y * 0.3,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 30 }}
      >
        <div 
          className="absolute top-1/2 left-1/2 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 60%, transparent 90%)',
            filter: 'blur(100px)',
            transform: 'translate(-50%, -50%) translate3d(0, 0, 0)',
          }}
        />
      </motion.div>

      {/* Additional ambient glow to ensure smooth blending */}
      <div 
        className="absolute inset-0 opacity-50"
        style={{
          background: 'radial-gradient(ellipse 120% 80% at 50% 50%, rgba(255,255,255,0.01) 0%, transparent 70%)',
          filter: 'blur(120px)',
        }}
      />
    </div>
  );
};

export default ParallaxBackground;
