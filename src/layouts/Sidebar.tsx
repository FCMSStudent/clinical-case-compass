import React, {
  useState,
  useCallback,
  useEffect,
  createContext,
  useContext,
  useMemo,
  forwardRef,
  useRef,
} from "react";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";
import { PanelLeft } from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

// Custom hook
/**
 * Hook to access the sidebar context.
 * Must be used within a SidebarProvider.
 * 
 * @returns The sidebar context value
 * @throws Error if used outside of SidebarProvider
 */
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

// Provider component
/**
 * Provides context for sidebar components, managing state and mobile behavior.
 * Supports both controlled and uncontrolled usage patterns.
 */
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
      // Try to get initial state from cookie, fallback to defaultOpen
      const cookieValue = getCookieValue(SIDEBAR_CONFIG.COOKIE_NAME);
      return cookieValue ?? defaultOpen;
    });
    
    // Handle controlled vs uncontrolled state
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
        
        // Persist state in cookie
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

    // Keyboard shortcut handler
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

    // Close mobile sidebar when switching to desktop
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

SidebarProvider.displayName = "SidebarProvider";
