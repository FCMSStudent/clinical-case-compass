import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { 
  Menu, 
  X, 
  LayoutDashboard, 
  BookOpen, 
  Settings, 
  ChevronLeft,
  User,
  LogOut,
  Bell,
  Search,
  HelpCircle
} from "lucide-react";
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/app/AuthContext';
import { SIDEBAR_CONFIG, getInitialSidebarState, saveSidebarState } from "@/constants/sidebar";

interface SidebarContextValue {
  open: boolean;
  isMobile: boolean;
  collapsed: boolean;
  toggle: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleCollapsed: () => void;
}

const SidebarContext = createContext<SidebarContextValue>({
  open: false,
  isMobile: false,
  collapsed: false,
  toggle: () => {},
  openSidebar: () => {},
  closeSidebar: () => {},
  toggleCollapsed: () => {},
});

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

export const useSidebar = () => useContext(SidebarContext);

export const SidebarTrigger = ({ className }: { className?: string }) => {
  const { toggle } = useSidebar();
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center p-2 rounded-lg transition-colors",
        "hover:bg-accent hover:text-accent-foreground",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        className
      )}
      onClick={toggle}
      aria-label="Toggle sidebar"
    >
      <Menu className={ICON_SIZE} />
    </button>
  );
};

const navItems = [
  { 
    href: "/dashboard", 
    label: "Dashboard", 
    icon: LayoutDashboard,
    badge: null
  },
  { 
    href: "/cases", 
    label: "Cases", 
    icon: BookOpen,
    badge: "12"
  },
  { 
    href: "/notifications", 
    label: "Notifications", 
    icon: Bell,
    badge: "3"
  },
  { 
    href: "/search", 
    label: "Search", 
    icon: Search,
    badge: null
  },
  { 
    href: "/settings", 
    label: "Settings", 
    icon: Settings,
    badge: null
  },
  { 
    href: "/help", 
    label: "Help & Support", 
    icon: HelpCircle,
    badge: null
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
          'group relative flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
          'hover:bg-accent hover:text-accent-foreground',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          isActive && 'bg-accent text-accent-foreground shadow-sm',
          collapsed && !isMobile && 'justify-center px-2'
        )
      }
    >
      <item.icon className={cn(ICON_SIZE, "flex-shrink-0")} />
      
      {(!collapsed || isMobile) && (
        <>
          <span className="ml-3 truncate">{item.label}</span>
          {item.badge && (
            <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {item.badge}
            </span>
          )}
        </>
      )}
      
      {/* Tooltip for collapsed state */}
      {collapsed && !isMobile && (
        <div className="absolute left-full ml-2 hidden group-hover:block">
          <div className="rounded-md bg-popover px-2 py-1 text-xs text-popover-foreground shadow-md border">
            {item.label}
            {item.badge && (
              <span className="ml-1 rounded-full bg-primary px-1.5 py-0.5 text-xs text-primary-foreground">
                {item.badge}
              </span>
            )}
          </div>
        </div>
      )}
    </NavLink>
  );
};

const UserProfile: React.FC<{ collapsed: boolean; isMobile: boolean }> = ({ collapsed, isMobile }) => {
  const { user, signOut } = useAuth();

  if (!user) {
    return null;
  }

  const fullName = (user.user_metadata as any)?.full_name || user.email;

  if (collapsed && !isMobile) {
    return (
      <div className="group relative">
        <button className="flex w-full items-center justify-center rounded-lg p-2 hover:bg-accent">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
            {String(fullName).split(' ').map(n => n[0]).join('')}
          </div>
        </button>
        
        {/* Tooltip */}
        <div className="absolute left-full ml-2 hidden group-hover:block">
          <div className="rounded-md bg-popover px-3 py-2 text-xs text-popover-foreground shadow-md border min-w-[200px]">
            <div className="font-medium">{fullName}</div>
            <div className="text-muted-foreground">{user.email}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-t pt-4">
      <div className="flex items-center space-x-3 rounded-lg p-3 hover:bg-accent transition-colors">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
          {String(fullName).split(' ').map(n => n[0]).join('')}
        </div>
        <div className="flex-1 min-w-0">
          <p className="truncate text-sm font-medium">{fullName}</p>
          <p className="truncate text-xs text-muted-foreground">{user.email}</p>
        </div>
        <button
          className="p-1 hover:bg-accent rounded transition-colors"
          aria-label="Sign out"
          onClick={() => signOut()}
        >
          <LogOut className="h-4 w-4" />
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
        "flex items-center border-b px-4 py-4",
        collapsed && !isMobile && "justify-center px-2"
      )}>
        {(!collapsed || isMobile) && (
          <h1 className="text-xl font-bold text-primary">MedCase</h1>
        )}
        {collapsed && !isMobile && (
          <div className="text-xl font-bold text-primary">MC</div>
        )}
        
        {isMobile && (
          <button
            className="ml-auto p-1 hover:bg-accent rounded transition-colors"
            onClick={closeSidebar}
            aria-label="Close sidebar"
          >
            <X className={ICON_SIZE} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
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
        <div className="border-t p-2">
          <button
            onClick={toggleCollapsed}
            className="flex w-full items-center justify-center rounded-lg p-2 hover:bg-accent transition-colors"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronLeft className={cn(
              ICON_SIZE, 
              "transition-transform duration-200",
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
            className="fixed inset-0 z-40 bg-black/50 transition-opacity" 
            onClick={closeSidebar}
            aria-hidden="true"
          />
        )}
        
        {/* Mobile Sidebar */}
        <div className={cn(
          "fixed inset-y-0 left-0 z-50 w-[var(--sidebar-width-mobile)] bg-background border-r shadow-lg transform transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full"
        )}>
          {content}
        </div>
      </>
    );
  }

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-40 bg-background border-r shadow-sm transform transition-all duration-300 ease-in-out",
        "w-[var(--sidebar-width)]",
        open ? "translate-x-0" : "-translate-x-full"
      )}
    >
      {content}
    </div>
  );
});

export default Sidebar;
