import React, { useState } from "react";
import { Search, Settings, LogOut, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar, SidebarTrigger } from "@/features/navigation";
import { useNavigate } from "react-router-dom";

interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  actions?: React.ReactNode;
}

const HeaderActions = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsUserMenuOpen(false);
  };

  return (
    <div className="flex items-center space-x-4">
      {/* Search */}
      <div className="hidden md:flex items-center relative">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"></div>
        <div className="relative flex items-center">
          <Search className="h-4 w-4 text-white/70 ml-3" />
          <input
            type="text"
            placeholder="Search cases, symptoms..."
            className="bg-transparent border-0 text-white placeholder:text-white/50 focus-visible:ring-0 focus-visible:ring-offset-0 pl-10 pr-4 py-2 rounded-xl text-sm"
          />
        </div>
      </div>

      {/* Mobile Search Button */}
      <button
        className="md:hidden p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-colors"
        aria-label="Search"
      >
        <Search className="h-5 w-5 text-white" />
      </button>

      {/* User Menu */}
      <div className="relative">
        <button
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          className="flex items-center p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-colors"
          aria-label="User menu"
        >
          <div className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
            <User className="h-5 w-5 text-white" />
          </div>
        </button>

        <AnimatePresence>
          {isUserMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-48"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 shadow-xl"></div>
                <div className="relative bg-white/10 backdrop-blur-md rounded-xl border border-white/20 py-2">
                  <button
                    className="w-full px-4 py-2 text-sm text-left text-white hover:bg-white/20 flex items-center space-x-2 transition-colors"
                    onClick={() => handleNavigate("/settings")}
                  >
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </button>
                  <button
                    className="w-full px-4 py-2 text-sm text-left text-white hover:bg-white/20 flex items-center space-x-2 transition-colors"
                    onClick={() => handleNavigate("/settings")}
                  >
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </button>
                  <div className="h-px bg-white/20 my-2" />
                  <button className="w-full px-4 py-2 text-sm text-left text-red-300 hover:bg-white/20 flex items-center space-x-2 transition-colors">
                    <LogOut className="h-4 w-4" />
                    <span>Log out</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  className,
  title = "Clinical Case Compass",
  actions
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 dark:from-blue-900 dark:via-blue-800 dark:to-blue-900 md:flex">
      {/* Glassy background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full">
        <Sidebar />
        <div className="flex-1 min-h-screen transition-all duration-300 ease-in-out">
          {/* Desktop Header */}
          <header className="hidden md:flex items-center justify-between px-6 py-4 sticky top-0 z-30">
            <div className="relative">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl"></div>
              <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 px-6 py-4 flex items-center space-x-4">
                <SidebarTrigger />
                <h1 className="text-xl font-semibold text-white">{title}</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {actions || <HeaderActions />}
            </div>
          </header>

          {/* Mobile Header */}
          <header className="flex md:hidden items-center justify-between px-4 py-3 sticky top-0 z-30">
            <div className="relative">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl"></div>
              <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 px-4 py-3 flex items-center space-x-3">
                <SidebarTrigger />
                <h1 className="text-lg font-semibold text-white">{title}</h1>
              </div>
            </div>
            
            <HeaderActions />
          </header>

          {/* Main Content */}
          <main className={`flex-1 flex flex-col ${className}`}>
            <div className="container mx-auto px-4 py-6 flex-1">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
