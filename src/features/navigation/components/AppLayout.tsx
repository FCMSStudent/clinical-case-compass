import React from "react";
import { Sidebar, SidebarTrigger, useSidebar } from "@/features/navigation";
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
          mainPaddingClass,
          "flex flex-col min-h-screen",
          className
        )}
      >
        <header
          className="flex items-center justify-between p-4 md:hidden border-b"
          role="banner"
          aria-label="Site"
        >
          <SidebarTrigger />
          <h1 className="text-lg font-semibold">MedCase</h1>
          <div className="w-8" />
        </header>
        <div className="flex-1 flex">
          <div className="w-full max-w-6xl p-4">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

