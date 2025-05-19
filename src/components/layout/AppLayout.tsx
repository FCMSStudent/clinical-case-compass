
import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  // Use localStorage to persist sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useLocalStorage("sidebar:open", true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleCloseSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  const handleToggleMobileSidebar = () => {
    setIsMobileSidebarOpen((prev) => !prev);
  };

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar 
        isOpen={isMobileSidebarOpen} 
        isDesktopOpen={isSidebarOpen}
        onClose={handleCloseSidebar} 
      />
      
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-0'}`}>
        {/* Mobile menu button */}
        <div className="flex items-center p-4 md:hidden">
          <Button
            variant="outline"
            size="icon" 
            onClick={handleToggleMobileSidebar}
            className="rounded-md"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Desktop toggle button */}
        <Button
          variant="outline"
          size="icon"
          onClick={handleToggleSidebar}
          className="fixed top-4 left-4 z-30 shadow-sm bg-background hover:bg-accent hidden md:flex"
          aria-label={isSidebarOpen ? "Hide sidebar" : "Show sidebar"}
        >
          {isSidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>

        {/* Main content area */}
        <main className={`px-4 py-6 md:px-6 ${!isSidebarOpen ? 'md:pl-16' : ''}`}>
          {children}
        </main>
      </div>
      <Toaster position="top-right" richColors />
    </div>
  );
}
