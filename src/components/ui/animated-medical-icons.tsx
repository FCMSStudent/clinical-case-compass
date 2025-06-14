
import React from "react";
import { motion } from "framer-motion";
import { Stethoscope, Pill } from "lucide-react";

const AnimatedMedicalIcons = () => {
  const icons = [
    {
      Icon: Stethoscope,
      initialPosition: { x: "20%", y: "10%" },
      animationDelay: 0,
      duration: 8,
    },
    {
      Icon: Pill,
      initialPosition: { x: "80%", y: "20%" },
      animationDelay: 2,
      duration: 10,
    },
    {
      Icon: Stethoscope,
      initialPosition: { x: "15%", y: "70%" },
      animationDelay: 4,
      duration: 12,
    },
    {
      Icon: Pill,
      initialPosition: { x: "85%", y: "80%" },
      animationDelay: 6,
      duration: 9,
    },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map((item, index) => (
        <motion.div
          key={index}
          className="absolute text-white/10"
          style={{
            left: item.initialPosition.x,
            top: item.initialPosition.y,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: item.animationDelay,
          }}
        >
          <item.Icon size={32} />
        </motion.div>
      ))}
      
      {/* ECG Wave Animation */}
      <motion.div
        className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Particle effect dots */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedMedicalIcons;
