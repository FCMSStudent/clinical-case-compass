import React, { useEffect, useRef } from "react";
import { cn } from '@/shared/utils/utils';
import { useSidebar } from './SidebarContext';
import { SidebarHeader } from './SidebarHeader';
import { SidebarNavItem } from './SidebarNavItem';
import { SidebarUserProfile } from './SidebarUserProfile';
import { SidebarCollapseToggle } from './SidebarCollapseToggle';
import { navItems } from '../constants/navItems';
import { liquidGlassClasses } from '@/design-system/components/glass-effects';

const Sidebar = React.memo(function Sidebar() {
  const { open, isMobile, collapsed, closeSidebar, toggleCollapsed } = useSidebar();
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Focus management for mobile sidebar
  useEffect(() => {
    if (open && isMobile && sidebarRef.current) {
      const firstFocusable = sidebarRef.current.querySelector('button, a, [tabindex]:not([tabindex="-1"])') as HTMLElement;
      if (firstFocusable) {
        firstFocusable.focus();
      }
    }
  }, [open, isMobile]);

  // Trap focus in mobile sidebar
  useEffect(() => {
    if (!open || !isMobile) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeSidebar();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, isMobile, closeSidebar]);

  const content = (
    <div className="flex h-full flex-col" ref={sidebarRef}>
      {/* Header */}
      <SidebarHeader 
        collapsed={collapsed} 
        isMobile={isMobile} 
        onClose={closeSidebar} 
      />

      {/* Navigation */}
      <nav 
        id="sidebar-navigation"
        className={cn("flex-1 p-4", collapsed && !isMobile ? "overflow-visible" : "overflow-y-auto")}
        aria-label="Main navigation"
      >
        <ul className="space-y-2" role="list">
          {navItems.map((item) => (
            <SidebarNavItem
              key={item.href}
              item={item}
              collapsed={collapsed}
              isMobile={isMobile}
              onNavigate={isMobile ? closeSidebar : undefined}
            />
          ))}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4">
        <SidebarUserProfile collapsed={collapsed} isMobile={isMobile} />
      </div>

      {/* Collapse Toggle (Desktop only) */}
      {!isMobile && (
        <SidebarCollapseToggle collapsed={collapsed} onToggle={toggleCollapsed} />
      )}
    </div>
  );

  if (isMobile) {
    return (
      <>
        {/* Backdrop with enhanced glass effect */}
        {open && (
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[20px] saturate-150 brightness-105 transition-opacity duration-300"
            onClick={closeSidebar}
            aria-hidden="true"
          />
        )}

        {/* Mobile Sidebar with Apple-inspired glass effects */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-[var(--sidebar-width-mobile)] transform transition-transform duration-300 ease-in-out",
            open ? "translate-x-0" : "-translate-x-full"
          )}
          role="complementary"
          aria-label="Mobile navigation sidebar"
          aria-hidden={!open}
        >
          <div className="relative h-full w-full">
            <div className="absolute inset-0 bg-white/18 backdrop-blur-[24px] saturate-160 brightness-108 border-r border-white/20 shadow-xl"></div>
            <div className={cn("relative h-full", liquidGlassClasses.navigation)}>
              {content}
            </div>
          </div>
        </aside>
      </>
    );
  }

  return (
    <aside
      className={cn(
        open
          ? "sticky top-0 z-20 h-screen"
          : "fixed inset-y-0 left-0 z-40",
        "transform transition-all duration-300 ease-in-out",
        "w-[var(--sidebar-width)]",
        open ? "" : "-translate-x-full"
      )}
      role="complementary"
      aria-label="Desktop navigation sidebar"
      aria-hidden={!open}
    >
      <div className="relative h-full w-full">
        <div className="absolute inset-0 bg-white/18 backdrop-blur-[24px] saturate-160 brightness-108 border-r border-white/20 shadow-xl"></div>
        <div className={cn("relative h-full", liquidGlassClasses.navigation)}>
          {content}
        </div>
      </div>
    </aside>
  );
});

export default Sidebar;
