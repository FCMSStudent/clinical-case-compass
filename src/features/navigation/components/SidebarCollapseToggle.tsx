import React from "react";
import { ChevronLeft } from "lucide-react";
import { cn } from '@/lib/utils';
import { getInteractionStates, getGlassmorphicStyles } from '@/lib/component-system';

const ICON_SIZE = "w-5 h-5";

interface SidebarCollapseToggleProps {
  collapsed: boolean;
  onToggle: () => void;
}

export const SidebarCollapseToggle: React.FC<SidebarCollapseToggleProps> = ({ 
  collapsed, 
  onToggle 
}) => {
  return (
    <div className="border-t border-white/20 p-2">
      <button
        onClick={onToggle}
        className={cn(
          "flex w-full items-center justify-center rounded-xl p-2 text-white",
          getGlassmorphicStyles('light'),
          getInteractionStates('medium', 'default', 'subtle')
        )}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        aria-describedby="collapse-description"
      >
        <ChevronLeft className={cn(
          ICON_SIZE,
          "transition-transform duration-200 text-white",
          collapsed && "rotate-180"
        )} aria-hidden="true" />
        <span id="collapse-description" className="sr-only">
          {collapsed ? "Expand sidebar to show full navigation" : "Collapse sidebar to show icons only"}
        </span>
      </button>
    </div>
  );
}; 