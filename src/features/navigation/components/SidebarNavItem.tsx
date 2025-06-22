import React, { useState, useRef } from "react";
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/shared/utils/utils';

const ICON_SIZE = "w-5 h-5";

interface NavItemProps {
  item: {
    href: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    description: string;
  };
  collapsed: boolean;
  isMobile: boolean;
  onNavigate?: () => void;
}

export const SidebarNavItem: React.FC<NavItemProps> = ({ item, collapsed, isMobile, onNavigate }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isActive = location.pathname === item.href;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onNavigate?.();
    }
  };

  const handleFocus = () => {
    if (collapsed && !isMobile) {
      setShowTooltip(true);
    }
  };

  const handleBlur = () => {
    if (collapsed && !isMobile) {
      setShowTooltip(false);
    }
  };

  return (
    <li>
      <NavLink
        to={item.href}
        onClick={onNavigate}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={({ isActive }) =>
          cn(
            'group relative flex items-center rounded-lg px-3 py-2.5 text-base font-medium transition-all duration-200',
            'bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20',
            'focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2',
            isActive && 'bg-white/30 shadow-md rounded-lg text-white border-white/30',
            collapsed && !isMobile && 'justify-center px-2'
          )
        }
        aria-current={isActive ? "page" : undefined}
        aria-describedby={collapsed && !isMobile ? `${item.href}-tooltip` : undefined}
      >
        <item.icon className={cn(ICON_SIZE, "flex-shrink-0 text-white")} aria-hidden="true" />

        {(!collapsed || isMobile) && (
          <span className="ml-3 truncate text-white">{item.label}</span>
        )}

        {/* Accessible Tooltip for collapsed state */}
        {collapsed && !isMobile && (
          <div 
            ref={tooltipRef}
            id={`${item.href}-tooltip`}
            className={cn(
              "absolute top-1/2 left-full ml-2 -translate-y-1/2 z-50",
              showTooltip ? "block" : "hidden"
            )}
            role="tooltip"
            aria-hidden={!showTooltip}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 shadow-xl"></div>
              <div className="relative bg-white/10 backdrop-blur-md rounded-xl border border-white/20 px-3 py-2 text-xs text-white shadow-md">
                <div className="font-medium">{item.label}</div>
                <div className="text-white/70 text-xs">{item.description}</div>
              </div>
            </div>
          </div>
        )}
      </NavLink>
    </li>
  );
}; 