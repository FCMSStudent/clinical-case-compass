import React, { useCallback, useEffect, useMemo, useState, useRef } from "react";
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
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
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
  const { toggle, open } = useSidebar();
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
      aria-label={open ? "Close sidebar" : "Open sidebar"}
      aria-expanded={open}
      aria-controls="sidebar-navigation"
    >
      <Menu className={cn(ICON_SIZE, "text-white")} aria-hidden="true" />
    </button>
  );
};

const navItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    description: "View your clinical learning overview and progress"
  },
  {
    href: "/cases",
    label: "Cases",
    icon: BookOpen,
    description: "Browse and manage your clinical cases"
  },
  {
    href: "/settings",
    label: "Profile & Settings",
    icon: Settings,
    description: "Configure your account and preferences"
  },
];

interface NavItemProps {
  item: typeof navItems[0];
  collapsed: boolean;
  isMobile: boolean;
  onNavigate?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ item, collapsed, isMobile, onNavigate }) => {
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
            'group relative flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
            'bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20',
            'focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2',
            isActive && 'bg-white/20 text-white shadow-sm border-white/30',
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

const UserProfile: React.FC<{ collapsed: boolean; isMobile: boolean }> = ({ collapsed, isMobile }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  if (!user) {
    return null;
  }

  const fullName = (user.user_metadata as UserMetadata)?.full_name || user.email;

  const handleSignOut = () => {
    signOut();
    setShowUserMenu(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (collapsed && !isMobile) {
        setShowUserMenu(!showUserMenu);
      } else {
        navigate("/settings");
      }
    }
  };

  if (collapsed && !isMobile) {
    return (
      <div className="group relative">
        <button
          className="flex w-full items-center justify-center rounded-xl p-2 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
          onClick={() => setShowUserMenu(!showUserMenu)}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowTooltip(true)}
          onBlur={() => setShowTooltip(false)}
          aria-label={`User profile: ${fullName}`}
          aria-expanded={showUserMenu}
          aria-haspopup="true"
          aria-describedby={showTooltip ? "user-tooltip" : undefined}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
            <User className="h-4 w-4 text-white" aria-hidden="true" />
          </div>
        </button>

        {/* Tooltip */}
        {showTooltip && (
          <div 
            id="user-tooltip"
            className="absolute top-1/2 left-full ml-2 -translate-y-1/2 z-50"
            role="tooltip"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 shadow-xl"></div>
              <div className="relative bg-white/10 backdrop-blur-md rounded-xl border border-white/20 px-3 py-2 text-xs text-white shadow-md min-w-[200px]">
                <div className="font-medium">{fullName}</div>
                <div className="text-white/70">{user.email}</div>
              </div>
            </div>
          </div>
        )}

        {/* User Menu */}
        {showUserMenu && (
          <div 
            ref={userMenuRef}
            className="absolute top-full left-0 mt-2 w-48 z-50"
            role="menu"
            aria-label="User menu"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 shadow-xl"></div>
              <div className="relative bg-white/10 backdrop-blur-md rounded-xl border border-white/20 py-2">
                <button
                  className="w-full px-4 py-2 text-sm text-left text-white hover:bg-white/20 flex items-center space-x-2 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
                  onClick={() => { navigate("/settings"); setShowUserMenu(false); }}
                  role="menuitem"
                >
                  <User className="h-4 w-4" aria-hidden="true" />
                  <span>Profile & Settings</span>
                </button>
                <div className="h-px bg-white/20 my-2" role="separator" />
                <button 
                  className="w-full px-4 py-2 text-sm text-left text-red-300 hover:bg-white/20 flex items-center space-x-2 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
                  onClick={handleSignOut}
                  role="menuitem"
                >
                  <LogOut className="h-4 w-4" aria-hidden="true" />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="border-t border-white/20 pt-4">
      <div
        className="flex items-center space-x-3 rounded-xl p-3 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/30"
        onClick={() => navigate("/settings")}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`User profile: ${fullName}`}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
          <User className="h-5 w-5 text-white" aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="truncate text-sm font-medium text-white">{fullName}</p>
          <p className="truncate text-xs text-white/70">{user.email}</p>
        </div>
        <button
          className="p-1 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
          aria-label="Sign out"
          onClick={e => { e.stopPropagation(); signOut(); }}
        >
          <LogOut className="h-4 w-4 text-white" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

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
      <header className={cn(
        "flex items-center border-b border-white/20 px-4 py-4",
        collapsed && !isMobile && "justify-center px-2"
      )}>
        {(!collapsed || isMobile) && (
          <h1 className="text-xl font-bold text-white">Clinical Case Compass</h1>
        )}
        {collapsed && !isMobile && (
          <div className="text-xl font-bold text-white" aria-label="Clinical Case Compass">CCC</div>
        )}

        {isMobile && (
          <button
            className="ml-auto p-1 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
            onClick={closeSidebar}
            aria-label="Close sidebar"
          >
            <X className={cn(ICON_SIZE, "text-white")} aria-hidden="true" />
          </button>
        )}
      </header>

      {/* Navigation */}
      <nav 
        id="sidebar-navigation"
        className={cn("flex-1 p-4", collapsed && !isMobile ? "overflow-visible" : "overflow-y-auto")}
        aria-label="Main navigation"
      >
        <ul className="space-y-2" role="list">
          {navItems.map((item) => (
            <NavItem
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
        <UserProfile collapsed={collapsed} isMobile={isMobile} />
      </div>

      {/* Collapse Toggle (Desktop only) */}
      {!isMobile && (
        <div className="border-t border-white/20 p-2">
          <button
            onClick={toggleCollapsed}
            className="flex w-full items-center justify-center rounded-xl p-2 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
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
            <div className="absolute inset-0 bg-white/10 backdrop-blur-xl border-r border-white/20 shadow-xl"></div>
            <div className="relative bg-white/10 backdrop-blur-md border-r border-white/20 h-full">
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
        <div className="absolute inset-0 bg-white/10 backdrop-blur-xl border-r border-white/20 shadow-xl"></div>
        <div className="relative bg-white/10 backdrop-blur-md border-r border-white/20 h-full">
          {content}
        </div>
      </div>
    </aside>
  );
});

export default Sidebar;