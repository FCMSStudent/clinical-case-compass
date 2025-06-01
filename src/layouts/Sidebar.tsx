
import React, {
  useState,
  useCallback,
  useEffect,
  createContext,
  useContext,
  useMemo,
  forwardRef,
} from "react";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";
import { PanelLeft, Home, FileText, Calendar, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UserProfileDisplay } from "@/features/auth/UserProfileDisplay";

// Constants
const SIDEBAR_CONFIG = {
  COOKIE_NAME: "sidebar:state",
  COOKIE_MAX_AGE: 60 * 60 * 24 * 7, // 7 days
  WIDTH: "16rem",
  WIDTH_MOBILE: "18rem",
  WIDTH_ICON: "3rem",
  KEYBOARD_SHORTCUT: "b",
  TOOLTIP_DELAY: 0,
} as const;

// Types
type SidebarState = "expanded" | "collapsed";

interface SidebarContextValue {
  state: SidebarState;
  open: boolean;
  setOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean | ((prev: boolean) => boolean)) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
}

interface SidebarProviderProps extends React.ComponentPropsWithoutRef<"div"> {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

// Context
const SidebarContext = createContext<SidebarContextValue | null>(null);

// Utilities
const getCookieValue = (name: string): boolean | null => {
  if (typeof document === "undefined") return null;
  
  try {
    const value = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${name}=`))
      ?.split("=")[1];
    
    return value === "true" ? true : value === "false" ? false : null;
  } catch {
    return null;
  }
};

const setCookieValue = (name: string, value: boolean): void => {
  if (typeof document === "undefined") return;
  
  try {
    document.cookie = `${name}=${value}; path=/; max-age=${SIDEBAR_CONFIG.COOKIE_MAX_AGE}; SameSite=Lax`;
  } catch (error) {
    console.warn("Failed to set sidebar state cookie:", error);
  }
};

// Navigation items
const navigationItems = [
  {
    title: "Cases",
    url: "/cases",
    icon: FileText,
  },
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Schedule",
    url: "/schedule",
    icon: Calendar,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

// Custom hook
export function useSidebar(): SidebarContextValue {
  const context = useContext(SidebarContext);
  
  if (!context) {
    throw new Error(
      "useSidebar must be used within a SidebarProvider. " +
      "Make sure to wrap your component with <SidebarProvider>."
    );
  }
  
  return context;
}

// Provider component (context only)
export const SidebarProvider = forwardRef<HTMLDivElement, SidebarProviderProps>(
  function SidebarProvider(
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange,
      className,
      style,
      children,
      ...props
    },
    ref
  ) {
    const isMobile = useIsMobile();
    const [openMobile, setOpenMobile] = useState(false);
    const [internalOpen, setInternalOpen] = useState(() => {
      const cookieValue = getCookieValue(SIDEBAR_CONFIG.COOKIE_NAME);
      return cookieValue ?? defaultOpen;
    });
    
    const isControlled = openProp !== undefined;
    const open = isControlled ? openProp : internalOpen;
    
    const setOpen = useCallback(
      (value: boolean | ((prev: boolean) => boolean)) => {
        const newValue = typeof value === "function" ? value(open) : value;
        
        if (isControlled) {
          onOpenChange?.(newValue);
        } else {
          setInternalOpen(newValue);
        }
        
        setCookieValue(SIDEBAR_CONFIG.COOKIE_NAME, newValue);
      },
      [open, isControlled, onOpenChange]
    );

    const toggleSidebar = useCallback(() => {
      if (isMobile) {
        setOpenMobile((prev) => !prev);
      } else {
        setOpen((prev) => !prev);
      }
    }, [isMobile, setOpen]);

    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (
          event.key === SIDEBAR_CONFIG.KEYBOARD_SHORTCUT &&
          (event.metaKey || event.ctrlKey) &&
          !event.shiftKey &&
          !event.altKey
        ) {
          event.preventDefault();
          toggleSidebar();
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [toggleSidebar]);

    useEffect(() => {
      if (!isMobile && openMobile) {
        setOpenMobile(false);
      }
    }, [isMobile, openMobile]);

    const state: SidebarState = open ? "expanded" : "collapsed";

    const contextValue = useMemo<SidebarContextValue>(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      }),
      [state, open, setOpen, isMobile, openMobile, toggleSidebar]
    );

    const cssVariables = {
      "--sidebar-width": SIDEBAR_CONFIG.WIDTH,
      "--sidebar-width-icon": SIDEBAR_CONFIG.WIDTH_ICON,
      "--sidebar-width-mobile": SIDEBAR_CONFIG.WIDTH_MOBILE,
      ...style,
    } as React.CSSProperties;

    return (
      <SidebarContext.Provider value={contextValue}>
        <TooltipProvider delayDuration={SIDEBAR_CONFIG.TOOLTIP_DELAY}>
          <div
            ref={ref}
            style={cssVariables}
            className={cn(
              "group/sidebar-wrapper flex min-h-svh w-full",
              "has-[[data-variant=inset]]:bg-sidebar",
              className
            )}
            data-state={state}
            data-mobile={isMobile}
            {...props}
          >
            {children}
          </div>
        </TooltipProvider>
      </SidebarContext.Provider>
    );
  }
);

// Sidebar UI Component
export const Sidebar = () => {
  const { state, open, openMobile, setOpenMobile, isMobile, toggleSidebar } = useSidebar();
  const location = useLocation();

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">M</span>
          </div>
          {(open || isMobile) && (
            <span className="font-semibold text-lg">MedCase</span>
          )}
        </div>
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="h-8 w-8"
          >
            <PanelLeft className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-2">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.url;
          const Icon = item.icon;
          
          if (!open && !isMobile) {
            return (
              <Tooltip key={item.title}>
                <TooltipTrigger asChild>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    size="icon"
                    className="w-full h-10"
                    asChild
                  >
                    <Link to={item.url}>
                      <Icon className="h-4 w-4" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  {item.title}
                </TooltipContent>
              </Tooltip>
            );
          }
          
          return (
            <Button
              key={item.title}
              variant={isActive ? "secondary" : "ghost"}
              className="w-full justify-start h-10"
              asChild
            >
              <Link to={item.url}>
                <Icon className="h-4 w-4 mr-2" />
                {item.title}
              </Link>
            </Button>
          );
        })}
      </nav>

      {/* User Profile */}
      {(open || isMobile) && <UserProfileDisplay />}
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent side="left" className="p-0 w-[var(--sidebar-width-mobile)]">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-50 h-full bg-background border-r transition-all duration-300",
        open ? "w-[var(--sidebar-width)]" : "w-[var(--sidebar-width-icon)]"
      )}
    >
      <SidebarContent />
    </div>
  );
};

// Trigger component for mobile
export const SidebarTrigger = () => {
  const { toggleSidebar, isMobile } = useSidebar();

  if (!isMobile) return null;

  return (
    <Button variant="ghost" size="icon" onClick={toggleSidebar}>
      <PanelLeft className="h-4 w-4" />
    </Button>
  );
};
