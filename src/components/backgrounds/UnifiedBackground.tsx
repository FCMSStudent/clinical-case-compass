import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useTheme } from "@/lib/styles/theme";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/lib/motion";
import { animatedIconsConfig, particleConfig, hexagonConfig } from "@/lib/background-config";

const Hexagon = ({ className, ...props }: React.ComponentProps<typeof motion.div>) => (
    <motion.div className={cn("absolute", className)} {...props}>
        <svg viewBox="0 0 100 86.6" className="w-full h-full fill-current">
            <polygon points="50,0 100,25 100,75 50,100 0,75 0,25" />
        </svg>
    </motion.div>
);

const MedicalIcon = ({ icon: Icon, initialPosition, animationDelay, duration }: {
    icon: React.ElementType,
    initialPosition: { x: string, y: string },
    animationDelay: number,
    duration: number
}) => (
    <motion.div
        className="absolute text-white/10"
        style={{
            left: initialPosition.x,
            top: initialPosition.y,
        }}
        animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            rotate: [0, 5, -5, 0],
        }}
        transition={{
            duration: duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: animationDelay,
        }}
    >
        <Icon size={32} />
    </motion.div>
);

const UnifiedBackground = () => {
    const { currentTheme } = useTheme();
    const { scrollY } = useScroll();
    const [isReducedMotion, setIsReducedMotion] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const checkReducedMotion = () => setIsReducedMotion(prefersReducedMotion());
        checkReducedMotion();

        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 40,
                y: (e.clientY / window.innerHeight - 0.5) * 40,
            });
        };

        if (!prefersReducedMotion()) {
            window.addEventListener("mousemove", handleMouseMove);
        }

        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        mediaQuery.addEventListener('change', checkReducedMotion);
        
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            mediaQuery.removeEventListener('change', checkReducedMotion);
        };
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

            {/* Layer 2: Hexagon patterns & Medical Icons */}
            <motion.div className="absolute inset-0 will-change-transform" style={{ y: y2 }}>
                {hexagonConfig.map((hex, index) => <Hexagon key={index} {...hex} />)}
                {animatedIconsConfig.map((item, index) => <MedicalIcon key={index} {...item} />)}
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

            {/* ECG Wave Animation */}
            <motion.div
                className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Particle effect dots */}
            {Array.from({ length: particleConfig.count }).map((_, i) => (
                <motion.div
                    key={`particle-${i}`}
                    className="absolute w-1 h-1 bg-white/20 rounded-full"
                    style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                    animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
                    transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 5 }}
                />
            ))}
        </div>
    );
};

export default UnifiedBackground;
