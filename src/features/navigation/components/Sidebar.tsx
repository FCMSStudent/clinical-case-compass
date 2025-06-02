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
} from "@/shared/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/shared/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/ui/avatar";
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
import { Button } from "@/shared/ui/button";
import { AuthContext } from "@/app/AuthContext";

const SidebarContext = createContext({
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
  const [state, setState] = useState<"expanded" | "collapsed">("collapsed");
  const [isMobile, setIsMobile] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const toggle = useCallback(() => {
    setState((prevState) =>
      prevState === "collapsed" ? "expanded" : "collapsed"
    );
  }, []);

  const expand = useCallback(() => {
    setState("expanded");
  }, []);

  const collapse = useCallback(() => {
    setState("collapsed");
  }, []);

  // Detect mobile screens
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust breakpoint as needed
      if (window.innerWidth < 768) {
        setState("expanded"); // Force expanded state on mobile
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Collapse sidebar on route change (desktop only)
  useEffect(() => {
    if (!isMobile) {
      collapse();
    }
  }, [location.pathname, isMobile, collapse]);

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

  return (
    <SidebarContext.Provider value={value}>
      {children}
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
  const { state, isMobile } = useSidebar();
  const { signOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  const AvatarMenu = () => {
    return (
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-8 w-8 rounded-full"
            aria-label="Open user menu"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="Shadcn" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-medium leading-none">
                shadcn
              </span>
              <span className="text-xs leading-none text-muted-foreground">
                shad.cn@gmail.com
              </span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>Support</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const CollapsedNavItem = ({ item }: { item: (typeof navItems)[0] }) => (
    <Link
      to={item.href}
      className="group flex h-[70px] w-[70px] flex-col items-center justify-center rounded-md text-muted-foreground outline-none data-[active=true]:bg-accent data-[active=true]:text-accent-foreground"
      data-active={location.pathname === item.href}
      aria-label={item.label}
    >
      <item.icon className="h-5 w-5" aria-hidden="true" />
      <span className="text-xs font-medium">{item.label}</span>
    </Link>
  );

  const ExpandedNavItem = ({ item }: { item: (typeof navItems)[0] }) => (
    <li className="mb-1">
      <Link
        to={item.href}
        className="group flex items-center space-x-3 rounded-md p-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground data-[active=true]:bg-accent data-[active=true]:text-accent-foreground"
        data-active={location.pathname === item.href}
      >
        <item.icon className="h-4 w-4" aria-hidden="true" />
        <span>{item.label}</span>
      </Link>
    </li>
  );

  return (
    <>
      {/* Mobile Sidebar (Sheet) */}
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
          <SheetContent side="left" className="w-3/4">
            <SheetHeader className="text-left">
              <SheetTitle>Navigation</SheetTitle>
              <SheetDescription>
                Navigate through the application.
              </SheetDescription>
            </SheetHeader>
            <NavigationMenu>
              <NavigationMenuList>
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink asChild>
                      <Link to={item.href}>{item.label}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </SheetContent>
        </Sheet>
      )}

      {/* Desktop Sidebar */}
      <div
        className={cn(
          "bg-background fixed left-0 top-0 z-50 flex h-screen flex-col border-r shadow-sm transition-all duration-300 ease-in-out",
          state === "expanded" ? "w-[var(--sidebar-width)]" : "w-[var(--sidebar-width-icon)]",
          isMobile ? "hidden" : "block"
        )}
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
              <AvatarMenu />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto py-4 px-3">
            <ul className="space-y-1">
              {navItems.map((item) =>
                state === "expanded" ? (
                  <ExpandedNavItem key={item.href} item={item} />
                ) : (
                  <CollapsedNavItem key={item.href} item={item} />
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
