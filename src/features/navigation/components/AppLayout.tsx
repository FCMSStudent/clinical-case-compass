import React, { useState, useRef, useEffect } from "react";
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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const userMenuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsUserMenuOpen(false);
  };

  const handleSignOut = () => {
    // Add sign out logic here
    setIsUserMenuOpen(false);
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsUserMenuOpen(false);
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div className="flex items-center space-x-4">
      {/* Desktop Search */}
      <div className="hidden md:flex items-center backdrop-blur-lg bg-white/40 rounded-xl border border-white/30 shadow-lg">
        <Search className="h-4 w-4 text-gray-600 ml-3" aria-hidden="true" />
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search cases, symptoms..."
          className="bg-transparent border-0 text-gray-800 placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 pl-2 pr-4 py-2 rounded-xl text-sm focus:outline-none"
          aria-label="Search cases and symptoms"
        />
      </div>

      {/* Mobile Search Button */}
      <button
        className="md:hidden p-2 backdrop-blur-lg bg-white/40 border border-white/30 rounded-xl hover:bg-white/50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
        aria-label="Search"
        onClick={() => setIsSearchOpen(!isSearchOpen)}
        aria-expanded={isSearchOpen}
      >
        <Search className="h-5 w-5 text-gray-800" aria-hidden="true" />
      </button>

      {/* Mobile Search Input */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 mt-2 mx-4 z-50"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 shadow-xl"></div>
              <div className="relative bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-3">
                <div className="flex items-center">
                  <Search className="h-4 w-4 text-white/70 mr-2" aria-hidden="true" />
                  <input
                    type="text"
                    placeholder="Search cases, symptoms..."
                    className="bg-transparent border-0 text-white placeholder:text-white/50 focus-visible:ring-0 focus-visible:ring-offset-0 flex-1 text-sm focus:outline-none"
                    aria-label="Search cases and symptoms"
                    autoFocus
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* User Menu */}
      <div className="relative" ref={userMenuRef}>
        <button
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          className="flex items-center p-2 backdrop-blur-lg bg-white/40 border border-white/30 rounded-xl hover:bg-white/50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
          aria-label="User menu"
          aria-expanded={isUserMenuOpen}
          aria-haspopup="true"
        >
          <div className="h-8 w-8 rounded-full bg-white/30 backdrop-blur-sm border border-white/40 flex items-center justify-center">
            <User className="h-5 w-5 text-gray-800" aria-hidden="true" />
          </div>
        </button>

        <AnimatePresence>
          {isUserMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-48 z-50"
              role="menu"
              aria-label="User menu options"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 shadow-xl"></div>
                <div className="relative bg-white/10 backdrop-blur-md rounded-xl border border-white/20 py-2">
                  <button
                    className="w-full px-4 py-2 text-sm text-left text-white hover:bg-white/20 flex items-center space-x-2 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
                    onClick={() => handleNavigate("/settings")}
                    role="menuitem"
                  >
                    <User className="h-4 w-4" aria-hidden="true" />
                    <span>Profile & Settings</span>
                  </button>
                  <div className="h-px bg-white/20 my-2" role="separator" />
                  <button 
                    className="w-full px-4 py-2 text-sm text-left text-red-300 hover:bg-white/20 flex items-center space-x-2 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
                    onClick={handleSignOut}
                    role="menuitem"
                  >
                    <LogOut className="h-4 w-4" aria-hidden="true" />
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
  title = "Medica",
  actions
}) => {
  return (
    <div className="min-h-screen relative">
      {/* Subtle background elements */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-pink-200/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out">
          {/* Desktop Header */}
          <header className="hidden md:flex items-center justify-between px-6 py-4 sticky top-0 z-30">
            <div className="relative">
              <div className="backdrop-blur-lg bg-white/40 rounded-2xl border border-white/30 shadow-xl px-6 py-4 flex items-center space-x-4">
                <SidebarTrigger />
                <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {actions || <HeaderActions />}
            </div>
          </header>

          {/* Mobile Header */}
          <header className="flex md:hidden items-center justify-between px-4 py-3 sticky top-0 z-30">
            <div className="backdrop-blur-lg bg-white/40 rounded-2xl border border-white/30 shadow-xl px-4 py-3 flex items-center space-x-3">
              <SidebarTrigger />
              <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
            </div>
            
            <HeaderActions />
          </header>

          {/* Main Content */}
          <main className={`flex-1 flex flex-col ${className}`} role="main" aria-label="Main content">
            <div className="container mx-auto px-4 py-6 flex-1">
              <div className="backdrop-blur-lg bg-white/40 rounded-2xl border border-white/30 shadow-xl p-8 min-h-[calc(100vh-200px)]">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
