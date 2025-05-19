
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  ClipboardList,
  Home,
  BookOpen,
  FileText,
  Menu,
  X,
} from "lucide-react";

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
}

const NavItem = ({ to, icon: Icon, label, isActive }: NavItemProps) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-3 text-left font-normal mb-1",
        isActive ? "bg-accent text-primary font-medium" : "text-muted-foreground"
      )}
      asChild
    >
      <Link to={to}>
        <Icon className="h-5 w-5" />
        <span>{label}</span>
      </Link>
    </Button>
  );
};

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Dashboard", icon: Home },
    { path: "/cases", label: "Cases", icon: ClipboardList },
    { path: "/resources", label: "Resources", icon: FileText },
    { path: "/schedule", label: "Schedule", icon: Calendar },
    { path: "/study", label: "Study", icon: BookOpen },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="icon"
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-40 md:hidden"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-64 transform bg-sidebar border-r border-border transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center border-b border-border px-6">
            <Link to="/" className="flex items-center gap-2 font-poppins">
              <span className="text-primary text-xl font-semibold">MedCase</span>
            </Link>
          </div>
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-6">
              <div>
                <h3 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Main
                </h3>
                <div className="space-y-1">
                  {navItems.map((item) => (
                    <NavItem
                      key={item.path}
                      to={item.path}
                      icon={item.icon}
                      label={item.label}
                      isActive={location.pathname === item.path}
                    />
                  ))}
                </div>
              </div>
            </div>
          </nav>
        </div>
      </aside>
    </div>
  );
}
