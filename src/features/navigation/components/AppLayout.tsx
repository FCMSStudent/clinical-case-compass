import React, { useState, useRef, useEffect } from "react";
import { Search, Settings, LogOut, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, NavLink, useLocation } from "react-router-dom";

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
      {/* User Menu */}
      <div className="relative" ref={userMenuRef}>
        <button
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          className="flex items-center p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
          aria-label="User menu"
          aria-expanded={isUserMenuOpen}
          aria-haspopup="true"
        >
          <span className="text-white">Profile</span>
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
                    <Settings className="h-4 w-4" aria-hidden="true" />
                    <span>Settings</span>
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

const NAV_ITEMS = [
  { label: "Home", to: "/dashboard" },
  { label: "New Cases", to: "/cases/new" },
];

const TopNavBar: React.FC = () => {
  const location = useLocation();
  return (
    <nav className="w-full flex justify-center mt-12 mb-16">
      <ul className="flex gap-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-6 py-2 shadow-xl items-center">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive: navActive }) =>
                  `relative px-6 py-2 rounded-full text-lg font-medium text-white transition-all duration-200 outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 ` +
                  (isActive || navActive
                    ? "bg-white/20 shadow-md text-white" +
                      " before:absolute before:inset-0 before:rounded-full before:bg-white/10 before:blur-lg before:opacity-80 before:z-[-1]"
                    : "hover:bg-white/10 text-white/80")
                }
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </NavLink>
            </li>
          );
        })}
        {/* Centered Search Bar */}
        <li className="mx-4 flex-1 flex justify-center min-w-[250px] max-w-xs">
          <div className="relative w-full">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"></div>
            <div className="relative flex items-center">
              <Search className="h-4 w-4 text-white/70 ml-3 absolute left-2 top-1/2 -translate-y-1/2" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search cases, symptoms..."
                className="bg-transparent border-0 text-white placeholder:text-white/50 focus-visible:ring-0 focus-visible:ring-offset-0 pl-10 pr-4 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-white/30 w-full"
                aria-label="Search cases and symptoms"
              />
            </div>
          </div>
        </li>
        {/* Settings/Profile Dropdown */}
        <li>
          <ProfileMenu />
        </li>
      </ul>
    </nav>
  );
};

// ProfileMenu component for settings/profile dropdown
const ProfileMenu: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <span>Profile & Settings</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 z-50 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 shadow-xl py-2">
          <button
            className="w-full px-4 py-2 text-left text-white hover:bg-white/20 flex items-center space-x-2 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
            onClick={() => { setOpen(false); navigate('/settings'); }}
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </button>
          <div className="h-px bg-white/20 my-2" role="separator" />
          <button
            className="w-full px-4 py-2 text-left text-red-300 hover:bg-white/20 flex items-center space-x-2 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
            onClick={() => { setOpen(false); /* add sign out logic here */ }}
          >
            <LogOut className="h-4 w-4" />
            <span>Log out</span>
          </button>
        </div>
      )}
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
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 dark:from-blue-900 dark:via-blue-800 dark:to-blue-900">
      {/* Glassy background elements */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <TopNavBar />
        {/* Main Content */}
        <main className={`flex-1 flex flex-col ${className}`} role="main" aria-label="Main content">
          <div className="container mx-auto px-4 py-6 flex-1">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
