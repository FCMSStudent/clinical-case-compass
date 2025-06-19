import React from "react";
import { Menu } from "lucide-react";
import { cn } from '@/lib/utils';
import { useSidebar } from './SidebarContext';

const ICON_SIZE = "w-5 h-5";

interface SidebarTriggerProps {
  className?: string;
}

export const SidebarTrigger: React.FC<SidebarTriggerProps> = ({ className }) => {
  const { toggle, open } = useSidebar();
  
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center p-2 rounded-xl transition-colors",
        "bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20",
        "focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2",
        className
      )}
      onClick={toggle}
      aria-label={open ? "Close sidebar" : "Open sidebar"}
      aria-expanded={open}
      aria-controls="sidebar-navigation"
    >
      <Menu className={cn(ICON_SIZE, "text-white")} aria-hidden="true" />
    </button>
  );
}; 