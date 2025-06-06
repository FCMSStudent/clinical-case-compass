import React, { useState } from "react";
import { Search, Settings, LogOut, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  actions?: React.ReactNode;
}

const HeaderActions = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <div className="flex items-center space-x-4">
      {/* Search */}
      <div className="hidden md:flex items-center relative">
        <input
          type="text"
          placeholder="Search..."
          className="pl-10 pr-4 py-2 bg-accent/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <Search className="h-4 w-4 absolute left-3 text-muted-foreground" />
      </div>

      {/* Mobile Search Button */}
      <button
        className="md:hidden p-2 hover:bg-accent rounded-lg transition-colors"
        aria-label="Search"
      >
        <Search className="h-5 w-5" />
      </button>

      {/* User Menu */}
      <div className="relative">
        <button
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          className="flex items-center p-2 hover:bg-accent rounded-lg transition-colors"
          aria-label="User menu"
        >
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
            <User className="h-5 w-5 text-primary-foreground" />
          </div>
        </button>

        <AnimatePresence>
          {isUserMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-48 py-2 bg-background rounded-lg shadow-lg border"
            >
              <button className="w-full px-4 py-2 text-sm text-left hover:bg-accent flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </button>
              <button className="w-full px-4 py-2 text-sm text-left hover:bg-accent flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </button>
              <div className="h-px bg-border my-2" />
              <button className="w-full px-4 py-2 text-sm text-left text-red-500 hover:bg-accent flex items-center space-x-2">
                <LogOut className="h-4 w-4" />
                <span>Log out</span>
              </button>
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
  title = "MedCase",
  actions
}) => {
  return (
    <div className="min-h-screen bg-background md:flex">
      {/* Rest of your layout code */}
      <div className="flex-1 min-h-screen transition-all duration-300 ease-in-out">
        {/* Desktop Header */}
        <header className="hidden md:flex items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 py-4 sticky top-0 z-30">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-foreground">{title}</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {actions || <HeaderActions />}
          </div>
        </header>

        {/* Mobile Header */}
        <header className="flex md:hidden items-center justify-between border-b bg-background px-4 py-3 sticky top-0 z-30">
          <div className="flex items-center space-x-3">
            <h1 className="text-lg font-semibold text-foreground">{title}</h1>
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
  );
};

export default AppLayout;
