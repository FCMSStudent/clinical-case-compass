import React from "react";
import { X } from "lucide-react";
import { cn } from '@/lib/utils';
import { getInteractionStates, getGlassmorphicStyles } from '@/lib/component-system';

const ICON_SIZE = "w-5 h-5";

interface SidebarHeaderProps {
  collapsed: boolean;
  isMobile: boolean;
  onClose?: () => void;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({ 
  collapsed, 
  isMobile, 
  onClose 
}) => {
  return (
    <header className={cn(
      "flex items-center border-b border-white/20 px-4 py-4",
      collapsed && !isMobile && "justify-center px-2"
    )}>
      {(!collapsed || isMobile) && (
        <h1 className="text-xl font-bold text-white">Medica</h1>
      )}
      {collapsed && !isMobile && (
        <div className="text-xl font-bold text-white" aria-label="Medica">M</div>
      )}

      {isMobile && (
        <button
          className={cn(
            "ml-auto p-1 rounded-lg text-white",
            getGlassmorphicStyles('light'),
            getInteractionStates('medium', 'default', 'subtle')
          )}
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <X className={cn(ICON_SIZE, "text-white")} aria-hidden="true" />
        </button>
      )}
    </header>
  );
}; 