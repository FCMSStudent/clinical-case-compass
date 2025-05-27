
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { FileText, PlusCircle, X, Stethoscope } from "lucide-react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  isDesktopOpen?: boolean;
  onClose: () => void;
}

const routes = [
  {
    label: "All Cases",
    icon: FileText,
    href: "/cases",
    description: "View and manage all medical cases"
  },
  {
    label: "New Case",
    icon: PlusCircle,
    href: "/cases/new",
    description: "Create a new medical case"
  }
];

export function Sidebar({ className, isOpen, isDesktopOpen = true, onClose, ...props }: SidebarProps) {
  const { pathname } = useLocation();
  const { user, signOut } = useAuth();

  return (
    <>
      {/* Enhanced mobile backdrop with blur */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-all duration-300 md:hidden",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={onClose}
      />
      
      {/* Enhanced sidebar container */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 w-72 bg-gradient-to-b from-card to-card/95 border-r border-border/50 backdrop-blur-xl transition-all duration-300 ease-in-out shadow-xl",
          // Mobile behavior with smoother animations
          isOpen ? "translate-x-0" : "-translate-x-full md:hidden",
          // Desktop behavior
          isDesktopOpen ? "md:translate-x-0" : "md:-translate-x-full",
          className
        )}
        {...props}
      >
        {/* Enhanced header with better branding */}
        <div className="flex h-16 items-center border-b border-border/50 px-6 bg-gradient-to-r from-primary/5 to-primary/10">
          <Link
            to="/"
            className="flex items-center gap-3 font-bold text-lg group"
            onClick={onClose}
          >
            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Stethoscope className="h-5 w-5 text-primary" />
            </div>
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Clinical Case Manager
            </span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto md:hidden hover:bg-destructive/10 hover:text-destructive"
            onClick={onClose}
            aria-label="Close Menu"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Enhanced navigation with better styling */}
        <ScrollArea className="flex-1 py-6">
          <nav className="px-4 space-y-2">
            {routes.map((route) => {
              const isActive = pathname === route.href;
              return (
                <Link
                  key={route.href}
                  to={route.href}
                  onClick={onClose}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 hover:scale-[1.02]",
                    isActive 
                      ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg shadow-primary/25" 
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <div className={cn(
                    "p-2 rounded-lg transition-colors",
                    isActive 
                      ? "bg-white/20" 
                      : "bg-muted/50 group-hover:bg-muted"
                  )}>
                    <route.icon className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium">{route.label}</span>
                    <span className={cn(
                      "text-xs transition-colors",
                      isActive 
                        ? "text-primary-foreground/80" 
                        : "text-muted-foreground group-hover:text-accent-foreground/80"
                    )}>
                      {route.description}
                    </span>
                  </div>
                </Link>
              );
            })}
          </nav>
        </ScrollArea>

        {/* Enhanced user section */}
        {user && (
          <div className="border-t border-border/50 p-4 bg-gradient-to-r from-muted/50 to-muted/30">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-background/50 border border-border/50">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold text-sm shadow-md">
                  {user.email?.[0].toUpperCase() || "U"}
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-sm font-medium truncate">{user.email}</span>
                  <span className="text-xs text-muted-foreground">Medical Professional</span>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={signOut}
                className="w-full hover:bg-destructive hover:text-destructive-foreground transition-colors"
              >
                Sign out
              </Button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
