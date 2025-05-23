
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useLocation } from "react-router-dom";
import {
  FileText,
  PlusCircle,
  X,
} from "lucide-react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  isDesktopOpen?: boolean;
  onClose: () => void;
}

export function Sidebar({ className, isOpen, isDesktopOpen = true, onClose, ...props }: SidebarProps) {
  const { pathname } = useLocation();
  const { user, signOut } = useAuth();

  const routes = [
    {
      label: "All Cases",
      icon: FileText,
      href: "/cases",
      active: pathname === "/cases",
    },
    {
      label: "New Case",
      icon: PlusCircle,
      href: "/cases/new",
      active: pathname === "/cases/new",
    }
  ];

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden",
          isOpen ? "block" : "hidden"
        )}
        onClick={onClose}
      />
      
      {/* Sidebar container */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 w-64 bg-card border-r transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full", // Mobile behavior
          isDesktopOpen ? "md:translate-x-0" : "md:-translate-x-full", // Desktop behavior
          className
        )}
        {...props}
      >
        <div className="flex h-14 items-center border-b px-4">
          <Link
            to="/"
            className={cn(
              "flex items-center gap-2 font-semibold"
            )}
            onClick={onClose}
          >
            {(isDesktopOpen || isOpen) ? (
              <span className="text-primary">Clinical Case Manager</span>
            ) : (
              <span className="text-primary text-lg font-bold">CCM</span>
            )}
          </Link>
          <Button
            variant="outline"
            size="icon"
            className="ml-auto md:hidden"
            onClick={onClose}
            aria-label="Close Menu"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <ScrollArea className="flex-1 py-4">
          <nav className="grid gap-1 px-2">
            {routes.map((route) => (
              <Link
                key={route.href}
                to={route.href}
                onClick={onClose}
                className={cn(
                  "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  route.active ? "bg-accent text-accent-foreground" : "text-foreground"
                )}
              >
                <route.icon className="h-5 w-5" />
                {(isDesktopOpen || isOpen) && (
                  <span>{route.label}</span>
                )}
              </Link>
            ))}
          </nav>
        </ScrollArea>
        {user && (
          <div className="border-t p-4">
            <div className="flex flex-col gap-2">
              <div className={cn(
                "flex items-center gap-2"
              )}>
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                  {user.email?.[0].toUpperCase() || "U"}
                </div>
                {isDesktopOpen && (
                  <div className="flex flex-col">
                    <span className="text-sm font-medium truncate max-w-[180px]">{user.email}</span>
                  </div>
                )}
              </div>
              {isDesktopOpen && (
                <Button variant="outline" size="sm" onClick={signOut}>
                  Sign out
                </Button>
              )}
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
