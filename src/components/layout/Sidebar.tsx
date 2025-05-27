
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { FileText, Plus, X, Stethoscope, Archive, Briefcase, Settings, Search, User, LogOut } from "lucide-react"; 
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
    badgeCount: 0 
  },
  {
    label: "Drafts",
    icon: Archive, 
    href: "/cases/drafts",
    description: "Access your saved case drafts",
    badgeCount: 3 
  },
  {
    label: "My Cases",
    icon: Briefcase, 
    href: "/cases/my",
    description: "View cases assigned to you",
    badgeCount: 7 
  },
  {
    label: "Settings",
    icon: Settings, 
    href: "/settings",
    description: "Configure application settings",
    badgeCount: 0
  }
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

  const isExpanded = state === 'expanded';
  const displayUserName = "Dr. Smith"; // As per instructions
  const displayUserInitials = "DS"; // As per instructions


  const sidebarContent = (
    <>
      {/* Enhanced header with better branding */}
      <div className={cn(
        "flex h-16 items-center border-b border-border/50 px-4 bg-gradient-to-r from-primary/5 to-primary/10",
        isExpanded ? "px-6" : "px-3 justify-center" // Adjust padding for collapsed state
      )}>
        <Link
          to="/"
          className="flex items-center gap-3 font-bold text-lg group"
          onClick={handleLinkClick}
        >
          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Stethoscope className="h-5 w-5 text-primary" />
          </div>
          {(!isMobile || openMobile) && isExpanded && ( // Show text only if expanded (and not mobile collapsed)
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Clinical Case Manager
            </span>
          )}
        </Link>
        {isMobile && ( // Show close button only on mobile sheet
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto hover:bg-destructive/10 hover:text-destructive"
            onClick={() => setOpenMobile(false)}
            aria-label="Close Menu"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* + New Clinical Case Button */}
      <div className={cn("border-b border-border/30", isExpanded || isMobile ? "p-4" : "p-3")}>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild disabled={isExpanded || isMobile}>
            <Link
              to="/cases/new"
              onClick={handleLinkClick}
              className="block w-full"
            >
              <Button
                variant="default" // Or your app's primary action variant
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

      {/* Enhanced navigation with better styling */}
      <ScrollArea className="flex-1 py-6">
        <nav className={cn("space-y-2", isExpanded || isMobile ? "px-4" : "px-3")}>
          {routes.map((route) => {
            const isActive = pathname === route.href || (route.href !== "/" && pathname.startsWith(route.href));
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
                    <div className={cn(
                      "p-2 rounded-lg transition-colors",
                      isActive 
                        ? "bg-white/20" 
                        : "bg-muted/50 group-hover:bg-muted"
                    )}>
                      <route.icon className="h-4 w-4" />
                    </div>
                    {(isExpanded || isMobile) && (
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="font-medium">
                          {route.label}
                          {route.badgeCount > 0 && <span className="sr-only"> ({route.badgeCount} notifications)</span>}
                        </span>
                        {route.description && <span className={cn("text-xs transition-colors", isActive ? "text-primary-foreground/80" : "text-muted-foreground group-hover:text-accent-foreground/80")}>{route.description}</span>}
                      </div>
                    )}
                    {(isExpanded || isMobile) && route.badgeCount > 0 && (
                      <Badge variant="secondary" className="ml-auto" aria-hidden="true">{route.badgeCount}</Badge>
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

      {/* Global Case Search Field */}
      <div role="search" className={cn("border-t border-border/30", isExpanded || isMobile ? "p-4" : "p-3 flex justify-center items-center")}>
        {(isExpanded || isMobile) ? (
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              ref={searchInputRef}
              type="search"
              placeholder="Search all cases..."
              className="w-full pl-8" // Padding for the icon
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

      {/* Enhanced user section */}
      {user && (
        <div className={cn("border-t border-border/30 mt-auto", isExpanded || isMobile ? "p-4" : "p-3 flex justify-center")}>
          <DropdownMenu>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild disabled={isExpanded || isMobile}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "flex items-center gap-3 w-full",
                      isExpanded || isMobile ? "justify-start p-2" : "justify-center rounded-full h-10 w-10 p-0"
                    )}
                  >
                    <Avatar className={cn(isExpanded || isMobile ? "h-8 w-8" : "h-9 w-9")}>
                      {/* <AvatarImage src={user?.avatarUrl} alt={displayUserName} /> */}
                      <AvatarFallback>{displayUserInitials}</AvatarFallback>
                    </Avatar>
                    {(isExpanded || isMobile) && (
                      <div className="flex flex-col items-start min-w-0">
                        <span className="text-sm font-medium truncate">{displayUserName}</span>
                        {/* Optional: <span className="text-xs text-muted-foreground truncate">Role</span> */}
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
            <DropdownMenuContent side="top" align="start" className="w-56 mb-1 ml-2 md:ml-0">
              <DropdownMenuItem asChild>
                <Link to="/account-settings"> {/* Placeholder link */}
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

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent 
          side="left" 
          className={cn(
            "p-0 flex flex-col bg-gradient-to-b from-card to-card/95 border-r border-border/50 shadow-xl focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none data-[state=closed]:duration-200 data-[state=open]:duration-300 ease-in-out",
            "w-[var(--sidebar-width-mobile)]", // Use CSS variable for mobile width
            className // Allow external class overrides
          )}
          // {...props} // Props might not be applicable here directly, SheetContent has its own
        >
          {sidebarContent}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col bg-gradient-to-b from-card to-card/95 border-r border-border/50 shadow-xl transition-all duration-300 ease-in-out",
        "h-screen sticky top-0", // Make it sticky
        isExpanded ? "w-[var(--sidebar-width)]" : "w-[var(--sidebar-width-icon)]",
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
