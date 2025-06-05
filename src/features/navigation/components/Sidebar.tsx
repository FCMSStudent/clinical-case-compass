import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  createContext,
  useCallback,
  useMemo,
} from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Bell,
  Menu,
  Home,
  Plus,
  LayoutDashboard,
  BookOpen,
  Settings,
  User,
  HelpCircle,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/shared/utils";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/app/AuthContext";
import {
  SIDEBAR_CONFIG,
  saveSidebarState,
  getInitialSidebarState,
} from "@/constants/sidebar";

type SidebarState = "expanded" | "collapsed";

type SidebarContextValue = {
  state: SidebarState;
  isMobile: boolean;
  toggle: () => void;
  expand: () => void;
  collapse: () => void;
};

const SidebarContext = createContext<SidebarContextValue>({
  state: "collapsed",
  isMobile: false,
  toggle: () => {},
  expand: () => {},
  collapse: () => {},
});

interface SidebarProviderProps {
  children: React.ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({
  children,
}) => {
  const [state, setState] = useState<SidebarState>(() =>
    getInitialSidebarState(false) ? "expanded" : "collapsed"
  );
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const toggle = useCallback(() => {
    setState((prevState) => {
      const next = prevState === "collapsed" ? "expanded" : "collapsed";
      saveSidebarState(next === "expanded");
      return next;
    });
  }, []);

  const expand = useCallback(() => {
    setState("expanded");
    saveSidebarState(true);
  }, []);

  const collapse = useCallback(() => {
    setState("collapsed");
    saveSidebarState(false);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
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
    if (state === "expanded") {
      collapse();
    }
  }, [location.pathname, collapse, state]);

  const value = useMemo(
    () => ({
      state,
      isMobile,
      toggle,
      expand,
      collapse,
    }),
    [state, isMobile, toggle, expand, collapse]
  );

  useEffect(() => {
    saveSidebarState(state === "expanded");
  }, [state]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key.toLowerCase() === SIDEBAR_CONFIG.KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        toggle();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggle]);

  useEffect(() => {
    if (isMobile && state === "expanded") {
      firstLinkRef.current?.focus();
    }
  }, [isMobile, state]);

  return (
    <SidebarContext.Provider value={value}>
      <div
        style={{
          "--sidebar-width": SIDEBAR_CONFIG.WIDTH,
          "--sidebar-width-icon": SIDEBAR_CONFIG.WIDTH_ICON,
          "--sidebar-width-mobile": SIDEBAR_CONFIG.WIDTH_MOBILE,
        } as React.CSSProperties}
        className="group/sidebar-wrapper"
        data-state={state}
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
      className="md:hidden"
      aria-label="Toggle sidebar"
    >
      <Menu className="h-4 w-4" />
    </Button>
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
  {
    href: "/help",
    label: "Help",
    icon: HelpCircle,
  },
];

export const Sidebar = React.memo(function Sidebar() {
  const { state, isMobile, expand, collapse } = useSidebar();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };


  const CollapsedNavItem = ({ item, index }: { item: (typeof navItems)[0]; index: number }) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          to={item.href}
          className="group flex h-[var(--sidebar-width-icon)] w-[var(--sidebar-width-icon)] flex-col items-center justify-center rounded-md text-muted-foreground outline-none data-[active=true]:bg-accent data-[active=true]:text-accent-foreground"
          data-active={location.pathname === item.href}
          aria-label={item.label}
          ref={index === 0 ? firstLinkRef : undefined}
        >
          <item.icon className="h-5 w-5" aria-hidden="true" />
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{item.label}</TooltipContent>
    </Tooltip>
  );

  const ExpandedNavItem = ({ item, index }: { item: (typeof navItems)[0]; index: number }) => (
    <li className="mb-1">
      <Link
        to={item.href}
        className="group flex items-center space-x-3 rounded-md p-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground data-[active=true]:bg-accent data-[active=true]:text-accent-foreground"
        data-active={location.pathname === item.href}
        ref={index === 0 ? firstLinkRef : undefined}
      >
        <item.icon className="h-4 w-4" aria-hidden="true" />
        <span>{item.label}</span>
      </Link>
    </li>
  );

  return (
    <>
      {isMobile && (
        <Sheet>
          <SheetTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="md:hidden"
              aria-label="Open sidebar"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[var(--sidebar-width-mobile)]">
            <SheetHeader className="text-left">
              <SheetTitle>Navigation</SheetTitle>
              <SheetDescription>
                Navigate through the application.
              </SheetDescription>
            </SheetHeader>
            <NavigationMenu>
              <NavigationMenuList>
                {navItems.map((item, index) => (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink asChild>
                      <Link
                        to={item.href}
                        ref={index === 0 ? firstLinkRef : undefined}
                      >
                        {item.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </SheetContent>
        </Sheet>
      )}

      <div
        onMouseEnter={() => {
          if (!isMobile && state === "collapsed") {
            expand();
            setHovered(true);
          }
        }}
        onMouseLeave={() => {
          if (!isMobile && hovered) {
            collapse();
            setHovered(false);
          }
        }}
        className={cn(
          "bg-background fixed left-0 top-0 z-50 flex h-screen flex-col border-r shadow-sm transition-all duration-300 ease-in-out",
          state === "expanded" ? "w-[var(--sidebar-width)]" : "w-[var(--sidebar-width-icon)]",
          isMobile ? "hidden" : "block"
        )}
        role="complementary"
        aria-label="Sidebar navigation"
        aria-expanded={state === "expanded"}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-4 py-3">
            {state === "expanded" ? (
              <Link to="/" className="font-bold text-lg">
                MedCase
              </Link>
            ) : (
              <Link to="/" className="font-bold text-lg">
                MC
              </Link>
            )}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" aria-label="Notifications">
                <Bell className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto py-4 px-3">
            <ul className="space-y-1">
              {navItems.map((item, index) =>
                state === "expanded" ? (
                  <ExpandedNavItem key={item.href} item={item} index={index} />
                ) : (
                  <CollapsedNavItem key={item.href} item={item} index={index} />
                )
              )}
            </ul>
          </div>
          {state === "expanded" && (
            <div className="p-4">
              <Button variant="outline" className="w-full" onClick={() => navigate("/cases/new")}>
                <Plus className="mr-2 h-4 w-4" /> New Case
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
});

export default Sidebar;