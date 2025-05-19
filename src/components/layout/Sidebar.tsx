import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  Calendar,
  Library,
  Menu,
} from "lucide-react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ className, isOpen, onClose, ...props }: SidebarProps) {
  const { pathname } = useLocation();
  const { user, signOut } = useAuth();

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/",
      active: pathname === "/",
    },
    {
      label: "Cases",
      icon: FileText,
      href: "/cases",
      active: pathname.startsWith("/cases"),
    },
    {
      label: "Study",
      icon: BookOpen,
      href: "/study",
      active: pathname === "/study",
    },
    {
      label: "Schedule",
      icon: Calendar,
      href: "/schedule",
      active: pathname === "/schedule",
    },
    {
      label: "Resources",
      icon: Library,
      href: "/resources",
      active: pathname === "/resources",
    },
  ];

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden",
          isOpen ? "block" : "hidden"
        )}
        onClick={onClose}
      />
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r bg-card transition-transform duration-300 ease-in-out lg:static lg:transition-none",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          className
        )}
        {...props}
      >
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px]">
          <Link
            to="/"
            className="flex items-center gap-2 font-semibold"
            onClick={onClose}
          >
            <span className="text-primary">Medical Case Manager</span>
          </Link>
          <Button
            variant="outline"
            size="icon"
            className="ml-auto lg:hidden"
            onClick={onClose}
          >
            <Menu className="h-4 w-4" />
            <span className="sr-only">Toggle Menu</span>
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
                  route.active ? "bg-accent" : "transparent"
                )}
              >
                <route.icon className="h-5 w-5" />
                <span>{route.label}</span>
              </Link>
            ))}
          </nav>
        </ScrollArea>
        {user && (
          <div className="border-t p-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                  {user.email?.[0].toUpperCase() || "U"}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{user.email}</span>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => signOut()}>
                Sign out
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
