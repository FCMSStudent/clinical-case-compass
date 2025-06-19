import React from "react";
import { X } from "lucide-react";
import { cn } from '@/lib/utils';
import { getInteractionStates, getGlassmorphicStyles } from '@/lib/component-system';
import { EnhancedIcon } from '@/lib/iconography';

interface SidebarHeaderProps {
  collapsed: boolean;
  isMobile: boolean;
  onClose?: () => void;
  className?: string;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  collapsed,
  isMobile,
  onClose,
  className
}) => {
  if (!isMobile) return null;

  return (
    <div className={cn(
      "flex items-center justify-between p-4 border-b border-white/20",
      className
    )}>
      <h2 className="text-lg font-semibold text-white">
        {collapsed ? "Menu" : "Navigation"}
      </h2>
      
      {onClose && (
        <button
          onClick={onClose}
          className={cn(
            "flex items-center justify-center w-8 h-8 rounded-lg",
            "bg-white/10 backdrop-blur-sm border border-white/20",
            "hover:bg-white/20 hover:border-white/30",
            "transition-all duration-200 ease-out",
            "focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-transparent"
          )}
          aria-label="Close sidebar"
        >
          <EnhancedIcon
            icon={X}
            size="sm"
            weight="regular"
            color="default"
            animation="scale"
            interactive
          />
        </button>
      )}
    </div>
  );
}; 