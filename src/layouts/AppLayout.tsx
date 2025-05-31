
import { Sidebar } from "./Sidebar";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "../app/ThemeContext";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

function AppLayoutContent({ children }: AppLayoutProps) {
  const { theme, setTheme } = useTheme();
  const { toggleSidebar, state, isMobile } = useSidebar();

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const isDesktopSidebarOpen = state === 'expanded' && !isMobile;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 transition-all duration-300">
        {/* Enhanced mobile header */}
        <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-background/80 backdrop-blur-md border-b border-border/50 md:hidden">
          <Button
            variant="outline"
            size="icon" 
            onClick={toggleSidebar} // Use combined toggleSidebar from hook
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
            onClick={toggleSidebar} // Use combined toggleSidebar from hook
            className="rounded-xl shadow-lg bg-background/80 backdrop-blur-md hover:shadow-xl transition-all hover:scale-105 border-border/50"
            aria-label={isDesktopSidebarOpen ? "Hide sidebar" : "Show sidebar"}
          >
            {isDesktopSidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
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

export function AppLayout({ children }: AppLayoutProps) {
  // Default to open if not explicitly set to "false" in localStorage, or if not present
  const initialSidebarState = typeof window !== 'undefined' ? localStorage.getItem("sidebar:state") !== "false" : true;

  return (
    <SidebarProvider defaultOpen={initialSidebarState}>
      <AppLayoutContent>{children}</AppLayoutContent>
    </SidebarProvider>
  );
}
