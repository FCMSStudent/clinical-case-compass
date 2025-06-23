import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from '@/shared/utils/utils';
import { useSidebar } from './SidebarContext';
import { SidebarHeader } from './SidebarHeader';
import { SidebarNavItem } from './SidebarNavItem';
import { SidebarUserProfile } from './SidebarUserProfile';
import { SidebarCollapseToggle } from './SidebarCollapseToggle';
import { navItems } from '../constants/navItems';

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

  const sidebarContent = (
    <motion.div 
      className="flex h-full flex-col" 
      ref={sidebarRef}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }}
    >
      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-white/10 pointer-events-none rounded-xl"></div>
      
      {/* Header */}
      <SidebarHeader 
        collapsed={collapsed} 
        isMobile={isMobile} 
        onClose={closeSidebar} 
      />

      {/* Navigation */}
      <nav 
        id="sidebar-navigation"
        className={cn("flex-1 p-4 relative z-10", collapsed && !isMobile ? "overflow-visible" : "overflow-y-auto")}
        aria-label="Main navigation"
      >
        <ul className="space-y-2" role="list">
          {navItems.map((item, index) => (
            <motion.li
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.3, 
                ease: "cubic-bezier(0.16, 1, 0.3, 1)",
                delay: index * 0.1 
              }}
            >
              <SidebarNavItem
                item={item}
                collapsed={collapsed}
                isMobile={isMobile}
                onNavigate={isMobile ? closeSidebar : undefined}
              />
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* User Profile */}
      <motion.div 
        className="p-4 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "cubic-bezier(0.16, 1, 0.3, 1)", delay: 0.2 }}
      >
        <SidebarUserProfile collapsed={collapsed} isMobile={isMobile} />
      </motion.div>

      {/* Collapse Toggle (Desktop only) */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "cubic-bezier(0.16, 1, 0.3, 1)", delay: 0.3 }}
        >
          <SidebarCollapseToggle collapsed={collapsed} onToggle={toggleCollapsed} />
        </motion.div>
      )}
    </motion.div>
  );

  if (isMobile) {
    return (
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop with enhanced glass effect */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xl"
              onClick={closeSidebar}
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Mobile Sidebar with glassmorphism */}
            <motion.aside
              className="fixed inset-y-0 left-0 z-50 w-[var(--sidebar-width-mobile)]"
              role="complementary"
              aria-label="Mobile navigation sidebar"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }}
            >
              <div className="relative h-full w-full backdrop-blur-xl bg-white/10 border-r border-white/20">
                {sidebarContent}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          className={cn(
            "sticky top-0 z-20 h-screen w-[var(--sidebar-width)]"
          )}
          role="complementary"
          aria-label="Desktop navigation sidebar"
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{ duration: 0.3, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <div className="relative h-full w-full backdrop-blur-xl bg-white/10 border-r border-white/20">
            {sidebarContent}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
});

export default Sidebar;
