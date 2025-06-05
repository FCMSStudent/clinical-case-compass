import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LayoutDashboard, BookOpen, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ICON_SIZE } from "@/constants/ui";
import { SIDEBAR_CONFIG, getInitialSidebarState, saveSidebarState } from "@/constants/sidebar";

interface SidebarContextValue {
  open: boolean;
  isMobile: boolean;
  toggle: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextValue>({
  open: false,
  isMobile: false,
  toggle: () => {},
  openSidebar: () => {},
  closeSidebar: () => {},
});

interface SidebarProviderProps {
  children: React.ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const [open, setOpen] = useState(() => getInitialSidebarState(false));
  const [isMobile, setIsMobile] = useState(false);

  const toggle = useCallback(() => setOpen((o) => !o), []);
  const openSidebar = useCallback(() => setOpen(true), []);
  const closeSidebar = useCallback(() => setOpen(false), []);

  useEffect(() => {
    saveSidebarState(open);
  }, [open]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
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
    () => ({ open, isMobile, toggle, openSidebar, closeSidebar }),
    [open, isMobile, toggle, openSidebar, closeSidebar]
  );

  return (
    <SidebarContext.Provider value={value}>
      <div
        style={{
          '--sidebar-width': SIDEBAR_CONFIG.WIDTH,
          '--sidebar-width-mobile': SIDEBAR_CONFIG.WIDTH_MOBILE,
        } as React.CSSProperties}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);

export const SidebarTrigger = () => {
  const { toggle } = useSidebar();
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={toggle}
      aria-label="Toggle sidebar"
    >
      <Menu className={ICON_SIZE} />
    </Button>
  );
};

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/cases", label: "Cases", icon: BookOpen },
  { href: "/settings", label: "Settings", icon: Settings },
];

export const Sidebar = React.memo(function Sidebar() {
  const { open, isMobile, closeSidebar } = useSidebar();
  const location = useLocation();

  const content = (
    <nav className="flex h-full flex-col p-4">
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              to={item.href}
              className={cn(
                "flex items-center space-x-2 rounded-md p-2 text-sm hover:bg-accent",
                location.pathname === item.href &&
                  "bg-accent text-accent-foreground"
              )}
            >
              <item.icon className={ICON_SIZE} />
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );

  if (isMobile) {
    return (
      <div className={cn("fixed inset-0 z-50 flex", open ? "visible" : "invisible")}>
        <div className="absolute inset-0 bg-black/50" onClick={closeSidebar} />
        <div className="relative h-full w-[var(--sidebar-width-mobile)] bg-background border-r shadow-lg">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2"
            onClick={closeSidebar}
            aria-label="Close sidebar"
          >
            <X className={ICON_SIZE} />
          </Button>
          {content}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-40 w-[var(--sidebar-width)] -translate-x-full bg-background border-r shadow-sm transition-transform duration-300",
        open && "translate-x-0"
      )}
    >
      {content}
    </div>
  );
});

export default Sidebar;
