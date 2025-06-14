
import { Stethoscope, Pill } from "lucide-react";

export const animatedIconsConfig = [
    { icon: Stethoscope, initialPosition: { x: "20%", y: "10%" }, animationDelay: 0, duration: 8 },
    { icon: Pill, initialPosition: { x: "80%", y: "20%" }, animationDelay: 2, duration: 10 },
    { icon: Stethoscope, initialPosition: { x: "15%", y: "70%" }, animationDelay: 4, duration: 12 },
    { icon: Pill, initialPosition: { x: "85%", y: "80%" }, animationDelay: 6, duration: 9 },
];

export const particleConfig = {
    count: 20,
};

export const hexagonConfig = [
    { className: "w-48 h-48 top-[10%] left-[5%] text-white/5 opacity-50" },
    { className: "w-64 h-64 top-[60%] right-[10%] text-white/5 opacity-50" },
    { className: "w-32 h-32 top-[75%] left-[20%] text-white/5 opacity-50" },
];
