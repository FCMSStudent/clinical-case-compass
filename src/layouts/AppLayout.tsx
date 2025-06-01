
import React from "react";
import { Sidebar } from "@/layouts/Sidebar"; // Fixed: corrected import path
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, className }) => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main
        className={cn(
          "transition-all duration-300 ease-in-out",
          // "lg:pl-64", // This line is removed
          "flex flex-col",
          className
        )}
        style={{ paddingLeft: 'var(--current-sidebar-offset, 0px)' }}
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
