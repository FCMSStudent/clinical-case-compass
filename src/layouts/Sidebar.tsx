import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/app/AuthContext";
import { Link, useLocation } from "react-router-dom";
import {
  FileText,
  Plus,
  X,
  Stethoscope,
  Archive,
  Briefcase,
  Settings,
  Search,
  User,
  LogOut,
} from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

const routes = [
  {
    label: "All Cases",
    icon: FileText,
    href: "/cases",
    description: "View and manage all medical cases",
    badgeCount: 0,
  },
  {
    label: "Drafts",
    icon: Archive,
    href: "/cases/drafts",
    description: "Access your saved case drafts",
    badgeCount: 3,
  },
  {
    label: "My Cases",
    icon: Briefcase,
    href: "/cases/my",
    description: "View cases assigned to you",
    badgeCount: 7,
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    description: "Configure application settings",
    badgeCount: 0,
  },
];

export function Sidebar({ className, ...props }: SidebarProps) {
  const { pathname } = useLocation();
  const { user, signOut } = useAuth();
  const { state, openMobile, setOpenMobile, isMobile, setOpen } = useSidebar();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const isExpanded = state === "expanded";
  const displayUserName = "Dr. Smith";
  const displayUserInitials = "DS";

  const sidebarContent = (
    <>
      {/* Header / Branding */}
      <div
        className={cn(
          "flex h-16 items-center border-b border-border/50",
          "px-4 bg-gradient-to-r from-primary/5 to-primary/10",
          isExpanded ? "px-6" : "px-3 justify-center"
        )}
      >
        <Link
          to="/"
          className="flex items-center gap-3 font-bold text-lg group"
          onClick={handleLinkClick}
        >
          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Stethoscope className="h-5 w-5 text-primary" />
          </div>
          {(!isMobile || openMobile) && isExpanded && (
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Clinical Case Manager
            </span>
          )}
        </Link>
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto hover:bg-destructive/10 hover:text-destructive"
            onClick={() => setOpenMobile(false)}
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* + New Clinical Case */}
      <div
        className={cn(
          "border-b border-border/30",
          isExpanded || isMobile ? "p-4" : "p-3"
        )}
      >
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild disabled={isExpanded || isMobile}>
            <Link to="/cases/new" onClick={handleLinkClick} className="block w-full">
              <Button
                variant="default"
                className={cn(
                  "w-full flex items-center",
                  isExpanded || isMobile ? "justify-start" : "justify-center"
                )}
                aria-label={!(isExpanded || isMobile) ? "New Clinical Case" : undefined}
                size={isExpanded || isMobile ? "default" : "icon"}
              >
                <Plus className={cn("h-4 w-4", (isExpanded || isMobile) && "mr-2")} />
                {(isExpanded || isMobile) && <span>+ New Clinical Case</span>}
              </Button>
            </Link>
          </TooltipTrigger>
          {!(isExpanded || isMobile) && (
            <TooltipContent side="right">
              <p>New Clinical Case</p>
            </TooltipContent>
          )}
        </Tooltip>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-6">
        <nav className={cn("space-y-2", isExpanded || isMobile ? "px-4" : "px-3")}>
          {routes.map((route) => {
            const isActive =
              pathname === route.href ||
              (route.href !== "/" && pathname.startsWith(route.href));

            return (
              <Tooltip key={route.href} delayDuration={0}>
                <TooltipTrigger asChild disabled={isExpanded || isMobile}>
                  <Link
                    to={route.href}
                    onClick={handleLinkClick}
                    className={cn(
                      "group flex items-center gap-3 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-[1.02]",
                      isExpanded || isMobile ? "px-4 py-3" : "p-3 justify-center",
                      isActive
                        ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg shadow-primary/25"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                    aria-label={
                      !(isExpanded || isMobile)
                        ? route.badgeCount > 0
                          ? `${route.label}, ${route.badgeCount} notifications`
                          : route.label
                        : undefined
                    }
                    aria-current={isActive ? "page" : undefined}
                  >
                    <div
                      className={cn(
                        "p-2 rounded-lg transition-colors",
                        isActive
                          ? "bg-white/20"
                          : "bg-muted/50 group-hover:bg-muted"
                      )}
                    >
                      <route.icon className="h-4 w-4" />
                    </div>
                    {(isExpanded || isMobile) && (
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="font-medium">{route.label}</span>
                        <span
                          className={cn(
                            "text-xs transition-colors",
                            isActive
                              ? "text-primary-foreground/80"
                              : "text-muted-foreground group-hover:text-accent-foreground/80"
                          )}
                        >
                          {route.description}
                        </span>
                      </div>
                    )}
                    {(isExpanded || isMobile) && route.badgeCount > 0 && (
                      <Badge variant="secondary" className="ml-auto" aria-hidden="true">
                        {route.badgeCount}
                      </Badge>
                    )}
                  </Link>
                </TooltipTrigger>
                {!(isExpanded || isMobile) && (
                  <TooltipContent side="right">
                    <p>{route.label}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Global Search */}
      <div
        role="search"
        className={cn(
          "border-t border-border/30",
          isExpanded || isMobile
            ? "p-4"
            : "p-3 flex justify-center items-center"
        )}
      >
        {(isExpanded || isMobile) ? (
          <div className="relative w-full">
            <Search
              className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              ref={searchInputRef}
              type="search"
              placeholder="Search all cases..."
              className="w-full pl-8"
            />
          </div>
        ) : (
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg"
                aria-label="Search cases"
                onClick={() => {
                  setOpen(true);
                  setTimeout(() => searchInputRef.current?.focus(), 100);
                }}
              >
                <Search className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Search cases</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>

      {/* User Menu */}
      {user && (
        <div
          className={cn(
            "border-t border-border/30 mt-auto",
            isExpanded || isMobile ? "p-4" : "p-3 flex justify-center"
          )}
        >
          <DropdownMenu>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild disabled={isExpanded || isMobile}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "flex items-center gap-3 w-full",
                      isExpanded || isMobile
                        ? "justify-start p-2"
                        : "justify-center rounded-full h-10 w-10 p-0"
                    )}
                  >
                    <Avatar
                      className={cn(
                        isExpanded || isMobile ? "h-8 w-8" : "h-9 w-9"
                      )}
                    >
                      <AvatarFallback>{displayUserInitials}</AvatarFallback>
                    </Avatar>
                    {(isExpanded || isMobile) && (
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-medium truncate">
                          {displayUserName}
                        </span>
                      </div>
                    )}
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              {!(isExpanded || isMobile) && (
                <TooltipContent side="right">
                  <p>{displayUserName}</p>
                </TooltipContent>
              )}
            </Tooltip>
            <DropdownMenuContent
              side="top"
              align="start"
              className="w-56 mb-1 ml-2 md:ml-0"
            >
              <DropdownMenuItem asChild>
                <Link to="/account-settings">
                  <User className="mr-2 h-4 w-4" />
                  <span>Account</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={signOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </>
  );

  // Mobile sheet
  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent
          side="left"
          className={cn(
            "p-0 flex flex-col bg-gradient-to-b from-card to-card/95 border-r border-border/50 shadow-xl focus:outline-none",
            "w-[var(--sidebar-width-mobile)]",
            className
          )}
        >
          {sidebarContent}
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop sidebar
  return (
    <aside
      className={cn(
        "hidden md:flex flex-col bg-gradient-to-b from-card to-card/95 border-r border-border/50 shadow-xl transition-all duration-300 ease-in-out",
        "h-screen sticky top-0",
        isExpanded
          ? "w-[var(--sidebar-width)]"
          : "w-[var(--sidebar-width-icon)]",
        className
      )}
      role="navigation"
      aria-label="Main sidebar navigation and tools"
      {...props}
    >
      {sidebarContent}
    </aside>
  );
}
