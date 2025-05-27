
import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Menu, Moon, Sun } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useTheme } from "../../contexts/ThemeContext";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useLocalStorage("sidebar:open", true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleMobileSidebar = () => setIsMobileSidebarOpen(prev => !prev);
  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const closeMobileSidebar = () => setIsMobileSidebarOpen(false);
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar 
        isOpen={isMobileSidebarOpen} 
        isDesktopOpen={isSidebarOpen}
        onClose={closeMobileSidebar} 
      />
      
      <div className="flex-1 transition-all duration-300">
        {/* Enhanced mobile header */}
        <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-background/80 backdrop-blur-md border-b border-border/50 md:hidden">
          <Button
            variant="outline"
            size="icon" 
            onClick={toggleMobileSidebar}
            className="rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-105"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-105"
            aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>

        {/* Enhanced desktop controls */}
        <div className="fixed top-6 left-6 z-30 hidden md:flex gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleSidebar}
            className="rounded-xl shadow-lg bg-background/80 backdrop-blur-md hover:shadow-xl transition-all hover:scale-105 border-border/50"
            aria-label={isSidebarOpen ? "Hide sidebar" : "Show sidebar"}
          >
            {isSidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="rounded-xl shadow-lg bg-background/80 backdrop-blur-md hover:shadow-xl transition-all hover:scale-105 border-border/50"
            aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>

        <main className="px-4 py-6 md:px-6 pt-20 md:pt-6">
          {children}
        </main>
      </div>
      
      <Toaster position="top-right" richColors />
    </div>
  );
}
