import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  BookOpen,
  Settings,
  ChevronLeft,
  User,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/app/AuthContext';
import type { UserMetadata } from '@/types/auth'; // Keep this import
import { SIDEBAR_CONFIG, getInitialSidebarState, saveSidebarState } from "@/constants/sidebar";
import { SidebarContext, useSidebar, type SidebarContextValue } from './SidebarContext';

const ICON_SIZE = "w-5 h-5";

interface SidebarProviderProps {
  children: React.ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const defaultOpen =
    typeof window !== "undefined" && window.innerWidth >= 768 ? true : false;
  const [open, setOpen] = useState(() => getInitialSidebarState(defaultOpen));
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

export const SidebarTrigger = ({ className }: { className?: string }) => {
  const { toggle } = useSidebar();
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center p-2 rounded-xl transition-colors",
        "bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20",
        "focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2",
        className
      )}
      onClick={toggle}
      aria-label="Toggle sidebar"
    >
      <Menu className={cn(ICON_SIZE, "text-white")} />
    </button>
  );
};

const navItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/cases",
    label: "Cases",
    icon: BookOpen,
  },
  {
    href: "/settings",
    label: "Settings",
    icon: Settings,
  },
];

interface NavItemProps {
  item: typeof navItems[0];
  collapsed: boolean;
  isMobile: boolean;
  onNavigate?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ item, collapsed, isMobile, onNavigate }) => {
  return (
    <NavLink
      to={item.href}
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          'group relative flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
          'bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20',
          'focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2',
          isActive && 'bg-white/20 text-white shadow-sm border-white/30',
          collapsed && !isMobile && 'justify-center px-2'
        )
      }
    >
      <item.icon className={cn(ICON_SIZE, "flex-shrink-0 text-white")} />

      {(!collapsed || isMobile) && (
        <span className="ml-3 truncate text-white">{item.label}</span>
      )}

      {/* Tooltip for collapsed state */}
      {collapsed && !isMobile && (
        <div className="absolute top-1/2 left-full ml-2 -translate-y-1/2 z-50 hidden group-hover:block">
          <div className="relative">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 shadow-xl"></div>
            <div className="relative bg-white/10 backdrop-blur-md rounded-xl border border-white/20 px-3 py-2 text-xs text-white shadow-md">
              {item.label}
            </div>
          </div>
        </div>
      )}
    </NavLink>
  );
};

const UserProfile: React.FC<{ collapsed: boolean; isMobile: boolean }> = ({ collapsed, isMobile }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  const fullName = (user.user_metadata as UserMetadata)?.full_name || user.email;

  if (collapsed && !isMobile) {
    return (
      <div className="group relative">
        <button
          className="flex w-full items-center justify-center rounded-xl p-2 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors"
          onClick={() => navigate("/settings")}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
            <User className="h-4 w-4 text-white" />
          </div>
        </button>

        {/* Tooltip */}
        <div className="absolute top-1/2 left-full ml-2 -translate-y-1/2 z-50 hidden group-hover:block">
          <div className="relative">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 shadow-xl"></div>
            <div className="relative bg-white/10 backdrop-blur-md rounded-xl border border-white/20 px-3 py-2 text-xs text-white shadow-md min-w-[200px]">
              <div className="font-medium">{fullName}</div>
              <div className="text-white/70">{user.email}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-t border-white/20 pt-4">
      <div
        className="flex items-center space-x-3 rounded-xl p-3 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors cursor-pointer"
        onClick={() => navigate("/settings")}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
          <User className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="truncate text-sm font-medium text-white">{fullName}</p>
          <p className="truncate text-xs text-white/70">{user.email}</p>
        </div>
        <button
          className="p-1 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 rounded-lg transition-colors"
          aria-label="Sign out"
          onClick={e => { e.stopPropagation(); signOut(); }}
        >
          <LogOut className="h-4 w-4 text-white" />
        </button>
      </div>
    </div>
  );
};

const Sidebar = React.memo(function Sidebar() {
  const { open, isMobile, collapsed, closeSidebar, toggleCollapsed } = useSidebar();

  const content = (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className={cn(
        "flex items-center border-b border-white/20 px-4 py-4",
        collapsed && !isMobile && "justify-center px-2"
      )}>
        {(!collapsed || isMobile) && (
          <h1 className="text-xl font-bold text-white">Clinical Case Compass</h1>
        )}
        {collapsed && !isMobile && (
          <div className="text-xl font-bold text-white">CCC</div>
        )}

        {isMobile && (
          <button
            className="ml-auto p-1 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 rounded-lg transition-colors"
            onClick={closeSidebar}
            aria-label="Close sidebar"
          >
            <X className={cn(ICON_SIZE, "text-white")} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className={cn("flex-1 p-4", collapsed && !isMobile ? "overflow-visible" : "overflow-y-auto")}>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <NavItem
                item={item}
                collapsed={collapsed}
                isMobile={isMobile}
                onNavigate={isMobile ? closeSidebar : undefined}
              />
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4">
        <UserProfile collapsed={collapsed} isMobile={isMobile} />
      </div>

      {/* Collapse Toggle (Desktop only) */}
      {!isMobile && (
        <div className="border-t border-white/20 p-2">
          <button
            onClick={toggleCollapsed}
            className="flex w-full items-center justify-center rounded-xl p-2 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronLeft className={cn(
              ICON_SIZE,
              "transition-transform duration-200 text-white",
              collapsed && "rotate-180"
            )} />
          </button>
        </div>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <>
        {/* Backdrop */}
        {open && (
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={closeSidebar}
            aria-hidden="true"
          />
        )}

        {/* Mobile Sidebar */}
        <div
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-[var(--sidebar-width-mobile)] transform transition-transform duration-300 ease-in-out",
            open ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="relative h-full w-full">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-xl border-r border-white/20 shadow-xl"></div>
            <div className="relative bg-white/10 backdrop-blur-md border-r border-white/20 h-full">
              {content}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div
      className={cn(
        open
          ? "sticky top-0 z-20 h-screen"
          : "fixed inset-y-0 left-0 z-40",
        "transform transition-all duration-300 ease-in-out",
        "w-[var(--sidebar-width)]",
        open ? "" : "-translate-x-full"
      )}
    >
      <div className="relative h-full w-full">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-xl border-r border-white/20 shadow-xl"></div>
        <div className="relative bg-white/10 backdrop-blur-md border-r border-white/20 h-full">
          {content}
        </div>
      </div>
    </div>
  );
});

export default Sidebar;