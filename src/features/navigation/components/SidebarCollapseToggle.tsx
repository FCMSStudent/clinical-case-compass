import React from "react";
import { ChevronLeft } from "lucide-react";
import { cn } from '@/lib/utils';
import { getInteractionStates, getGlassmorphicStyles } from '@/lib/component-system';
import { EnhancedIcon } from '@/lib/iconography';

interface SidebarCollapseToggleProps {
  collapsed: boolean;
  onToggle: () => void;
  className?: string;
}

export const SidebarCollapseToggle: React.FC<SidebarCollapseToggleProps> = ({
  collapsed,
  onToggle,
  className
}) => {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "flex items-center justify-center w-8 h-8 rounded-lg",
        "bg-white/10 backdrop-blur-sm border border-white/20",
        "hover:bg-white/20 hover:border-white/30",
        "transition-all duration-200 ease-out",
        "focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-transparent",
        className
      )}
      aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
    >
      <EnhancedIcon
        icon={ChevronLeft}
        size="sm"
        weight="regular"
        color="default"
        animation="rotate"
        interactive
        style={{
          transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease-out'
        }}
      />
    </button>
  );
}; 