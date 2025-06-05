import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Menu, X, LayoutDashboard, BookOpen, Settings } from "lucide-react";

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

const SIDEBAR_CONFIG = {
  WIDTH: '240px',
  WIDTH_MOBILE: '280px',
  KEYBOARD_SHORTCUT: 'b'
};

const ICON_SIZE = "w-5 h-5";

const getInitialSidebarState = (defaultState: boolean) => {
  try {
    const saved = localStorage.getItem('sidebarOpen');
    return saved ? JSON.parse(saved) : defaultState;
  } catch {
    return defaultState;
  }
};

const saveSidebarState = (state: boolean) => {
  try {
    localStorage.setItem('sidebarOpen', JSON.stringify(state));
  } catch {
    // Ignore errors
  }
};

interface SidebarProviderProps {
  children: React.ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const defaultOpen =
    typeof window !== "undefined" && window.innerWidth >= 768 ? true : false;
  const [open, setOpen] = useState(() => getInitialSidebarState(defaultOpen));
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
    <button
      type="button"
      className="p-2 hover:bg-gray-100 rounded-md"
      onClick={toggle}
      aria-label="Toggle sidebar"
    >
      <Menu className={ICON_SIZE} />
    </button>
  );
};

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/cases", label: "Cases", icon: BookOpen },
  { href: "/settings", label: "Settings", icon: Settings },
];

const Sidebar = React.memo(function Sidebar() {
  const { open, isMobile, closeSidebar } = useSidebar();
  const location = { pathname: window.location.pathname };

  const content = (
    <nav className="flex h-full flex-col p-4">
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className={`flex items-center space-x-2 rounded-md p-2 text-sm hover:bg-gray-100
                ${location.pathname === item.href ? 'bg-gray-100' : ''}`}
            >
              <item.icon className={ICON_SIZE} />
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );

  if (isMobile) {
    return (
      <div className={`fixed inset-0 z-50 flex ${open ? 'visible' : 'invisible'}`}>
        <div className="absolute inset-0 bg-black/50" onClick={closeSidebar} />
        <div className="relative h-full w-[var(--sidebar-width-mobile)] bg-white border-r shadow-lg">
          <button
            className="absolute right-2 top-2 p-2 hover:bg-gray-100 rounded-md"
            onClick={closeSidebar}
            aria-label="Close sidebar"
          >
            <X className={ICON_SIZE} />
          </button>
          {content}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`fixed inset-y-0 left-0 z-40 w-[var(--sidebar-width)] -translate-x-full bg-white border-r shadow-sm transition-transform duration-300
        ${open ? 'translate-x-0' : ''}`}
    >
      {content}
    </div>
  );
});

export default Sidebar;