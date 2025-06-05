import React from "react";
import { Sidebar, SidebarTrigger, useSidebar } from "@/features/navigation";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, className }) => {
  const { open, isMobile } = useSidebar();

  // Determine padding based on sidebar state and screen size
  const mainPaddingClass = isMobile
    ? "pl-0"
    : open
    ? "pl-[var(--sidebar-width)]"
    : "pl-0";

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
        {/* Header for mobile view, combining elements from both branches */}
        <header
          className="flex items-center p-4 md:hidden border-b"
          role="banner"
          aria-label="Site"
        >
          <SidebarTrigger />
          {/* Use flex-1 and text-center for centering the title, and a placeholder div for balancing */}
          <h1 className="flex-1 text-center text-lg font-semibold">MedCase</h1>
          <div className="w-8" /> {/* Placeholder for alignment */}
        </header>

        <div className="flex-1 flex">
          <div className="container p-4">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};