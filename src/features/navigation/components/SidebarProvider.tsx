import React, { useCallback, useEffect, useMemo, useState } from "react";
import { SIDEBAR_CONFIG, getInitialSidebarState, saveSidebarState } from "@/constants/sidebar";
import { SidebarContext, type SidebarContextValue } from './SidebarContext';

interface SidebarProviderProps {
  children: React.ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const defaultOpen =
    typeof window !== "undefined" && window.innerWidth >= 768 ? true : false;
  const [open, setOpen] = useState(() => getInitialSidebarState() ?? defaultOpen);
  const [isMobile, setIsMobile] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const toggle = useCallback(() => setOpen((o) => !o), []);
  const openSidebar = useCallback(() => setOpen(true), []);
  const closeSidebar = useCallback(() => setOpen(false), []);
  const toggleCollapsed = useCallback(() => setCollapsed((c) => !c), []);

  useEffect(() => {
    saveSidebarState(open);
  }, [open]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setCollapsed(false); // Reset collapsed state on mobile
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      handleResize();
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (
        e.key.toLowerCase() === SIDEBAR_CONFIG.KEYBOARD_SHORTCUT &&
        (e.metaKey || e.ctrlKey)
      ) {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [toggle]);

  const value = useMemo(
    () => ({ open, isMobile, collapsed, toggle, openSidebar, closeSidebar, toggleCollapsed }),
    [open, isMobile, collapsed, toggle, openSidebar, closeSidebar, toggleCollapsed]
  );

  return (
    <SidebarContext.Provider value={value}>
      <div
        style={{
          '--sidebar-width': collapsed ? SIDEBAR_CONFIG.WIDTH_ICON : SIDEBAR_CONFIG.WIDTH,
          '--sidebar-width-mobile': SIDEBAR_CONFIG.WIDTH_MOBILE,
        } as React.CSSProperties}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}; 