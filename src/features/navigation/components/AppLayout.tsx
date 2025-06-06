import React from "react";
import { Bell, Search } from "lucide-react";
import { Sidebar, SidebarTrigger, useSidebar } from "@/features/navigation";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  actions?: React.ReactNode;
}

const HeaderActions: React.FC = () => {
  return (
    <div className="flex items-center space-x-2">
      {/* Search Button */}
      <button
        className="p-2 hover:bg-accent rounded-lg transition-colors"
        aria-label="Search"
      >
        <Search className="h-5 w-5" />
      </button>
      
      {/* Notifications */}
      <button
        className="relative p-2 hover:bg-accent rounded-lg transition-colors"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
        <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-xs text-white font-medium">3</span>
        </span>
      </button>
      
      {/* User Menu Trigger */}
      <button
        className="flex items-center space-x-2 p-2 hover:bg-accent rounded-lg transition-colors"
        aria-label="User menu"
      >
        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
          <span className="text-sm font-medium text-primary-foreground">DJ</span>
        </div>
      </button>
    </div>
  );
};

export const AppLayout: React.FC<AppLayoutProps> = ({ 
  children, 
  className, 
  title = "MedCase",
  actions 
}) => {
  const { open, isMobile, collapsed } = useSidebar();

  // Calculate main content padding based on sidebar state
  const getMainPadding = () => {
    if (isMobile) return "pl-0";
    if (!open) return "pl-0";
    return collapsed ? "pl-[var(--sidebar-width-icon)]" : "pl-[var(--sidebar-width)]";
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <div
        className={cn(
          "min-h-screen transition-all duration-300 ease-in-out",
          getMainPadding()
        )}
      >
        {/* Desktop Header */}
        <header className="hidden md:flex items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 py-4 sticky top-0 z-30">
          <div className="flex items-center space-x-4">
            <SidebarTrigger />
            {title && (
              <h1 className="text-xl font-semibold text-foreground">{title}</h1>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            {actions || <HeaderActions />}
          </div>
        </header>

        {/* Mobile Header */}
        <header className="flex md:hidden items-center justify-between border-b bg-background px-4 py-3 sticky top-0 z-30">
          <div className="flex items-center space-x-3">
            <SidebarTrigger />
            {title && (
              <h1 className="text-lg font-semibold text-foreground">{title}</h1>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              className="p-2 hover:bg-accent rounded-lg transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              className="relative p-2 hover:bg-accent rounded-lg transition-colors"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main
          className={cn(
            "flex-1 flex flex-col",
            className
          )}
        >
          <div className="container mx-auto px-4 py-6 flex-1">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
