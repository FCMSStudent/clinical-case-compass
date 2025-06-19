
import React from "react";
import { Menu } from "lucide-react";
import { cn } from '@/lib/utils';
import { useSidebar } from './SidebarContext';
import { EnhancedIcon } from '@/lib/iconography.tsx';

interface SidebarTriggerProps {
  className?: string;
}

export const SidebarTrigger: React.FC<SidebarTriggerProps> = ({ className }) => {
  const { toggle } = useSidebar();

  return (
    <button
      onClick={toggle}
      className={cn(
        "flex items-center justify-center w-10 h-10 rounded-lg",
        "bg-white/10 backdrop-blur-sm border border-white/20",
        "hover:bg-white/20 hover:border-white/30",
        "transition-all duration-200 ease-out",
        "focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-transparent",
        className
      )}
      aria-label="Toggle sidebar"
    >
      <EnhancedIcon
        icon={Menu}
        size="md"
        weight="regular"
        color="default"
        animation="scale"
        interactive
      />
    </button>
  );
};
