import React from "react";
import { Sidebar, useSidebar } from "@/layouts/Sidebar";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, className }) => {
  const { state, isMobile } = useSidebar();

  // Determine padding based on sidebar state and screen size
  const mainPaddingClass = isMobile
    ? "pl-0" // No padding on mobile (sidebar is an overlay)
    : state === "expanded"
    ? "pl-[var(--sidebar-width)]" // Padding for expanded sidebar on desktop
    : "pl-[var(--sidebar-width-icon)]"; // Padding for collapsed sidebar on desktop

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main
        className={cn(
          "transition-all duration-300 ease-in-out",
          mainPaddingClass, // Apply dynamic padding based on sidebar state
          "flex flex-col",
          className
        )}
      >
        <div className="flex-1">
          <div className="container space-y-6">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};