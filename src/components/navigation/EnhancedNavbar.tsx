import React, { useState, useRef, useEffect } from "react";
import { Search, Menu, X, Home, BookOpen, ChevronDown, User, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSupabaseCases } from "@/hooks/use-supabase-cases";
import { useAuth } from "@/app/AuthContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { liquidGlassClasses, getGlassHoverVariants, getGlassTransitionVariants } from "@/lib/glass-effects";
import type { MedicalCase } from "@/types/case";

const NAV_ITEMS = [
  { label: "Dashboard", to: "/dashboard", icon: Home },
  { label: "Cases", to: "/cases", icon: BookOpen },
];

interface SearchResult {
  id: string;
  title: string;
  type: 'case' | 'patient';
  subtitle?: string;
  path: string;
}

const EnhancedNavbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const searchRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Fetch cases for search
  const { cases } = useSupabaseCases();

  // Debounced search effect
  useEffect(() => {
    if (!searchQuery.trim() || !cases) {
      setSearchResults([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      const filtered = cases
        .filter(caseItem => 
          caseItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          caseItem.patient?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          caseItem.chiefComplaint?.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
        .map(caseItem => ({
          id: caseItem.id,
          title: caseItem.title,
          type: 'case' as const,
          subtitle: `${caseItem.patient?.name ?? ""} - ${caseItem.chiefComplaint ?? ""}`,
          path: `/cases/${caseItem.id}`
        }));

      setSearchResults(filtered);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, cases]);

  // Click outside handlers
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Escape key handler
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSearchFocused(false);
        setIsMobileMenuOpen(false);
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleSearchResultClick = (result: SearchResult) => {
    navigate(result.path);
    setIsSearchFocused(false);
    setSearchQuery("");
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsUserMenuOpen(false);
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
      // Still redirect to auth page even if signOut fails
      navigate('/auth');
    }
  };

  const getUserDisplayName = () => {
    return user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  };

  return (
    <motion.nav 
      className={cn("w-full rounded-2xl", liquidGlassClasses.navigation)}
      variants={getGlassTransitionVariants('medium')}
      initial="initial"
      animate="animate"
    >
      <div className="px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <NavLink to="/dashboard" className="text-2xl font-bold text-white transition-all duration-300 hover:brightness-110">
              Medica
            </NavLink>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <motion.div
                  key={item.to}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <NavLink
                    to={item.to}
                    className={cn(
                      "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                      "text-white/80 hover:text-white hover:bg-white/20 hover:brightness-105 hover:saturate-110",
                      isActive 
                        ? "bg-white/25 text-white shadow-md backdrop-blur-[20px] brightness-110 saturate-105" 
                        : "text-white/80"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </NavLink>
                </motion.div>
              );
            })}
          </div>

          {/* Search Bar */}
          <div 
            ref={searchRef}
            className={cn(
              "relative transition-all duration-300 ease-out hidden md:block",
              isSearchFocused ? "w-80" : "w-64"
            )}
          >
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="absolute inset-0 bg-white/15 backdrop-blur-[20px] brightness-110 rounded-xl border border-white/25 shadow-sm"></div>
              <div className="relative flex items-center">
                <Search className="h-4 w-4 text-white/70 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search cases, patients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  className="bg-transparent border-0 text-white placeholder:text-white/50 focus-visible:ring-0 focus-visible:ring-offset-0 pl-10 pr-4 py-2 rounded-xl text-sm focus:outline-none w-full transition-all duration-300 focus:brightness-110 focus:saturate-105"
                />
              </div>
            </motion.div>

            {/* Search Results Dropdown */}
            <AnimatePresence>
              {isSearchFocused && (searchQuery || searchResults.length > 0) && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white/18 backdrop-blur-[30px] saturate-150 brightness-105 rounded-xl border border-white/25 shadow-xl z-50"
                >
                  {searchResults.length > 0 ? (
                    <div className="py-2">
                      {searchResults.map((result) => (
                        <motion.button
                          key={result.id}
                          onClick={() => handleSearchResultClick(result)}
                          className="w-full px-4 py-3 text-left transition-all duration-300 hover:bg-white/20 hover:brightness-105 hover:saturate-110"
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="font-medium text-white text-sm">{result.title}</div>
                          <div className="text-white/70 text-xs mt-1">{result.subtitle}</div>
                        </motion.button>
                      ))}
                    </div>
                  ) : searchQuery ? (
                    <div className="py-4 px-4 text-white/70 text-sm">No results found</div>
                  ) : (
                    <div className="py-4 px-4">
                      <div className="text-white/70 text-xs mb-2">Quick suggestions</div>
                      <div className="space-y-1">
                        {["Recent cases", "Cardiology", "Emergency"].map((suggestion) => (
                          <motion.button
                            key={suggestion}
                            onClick={() => setSearchQuery(suggestion)}
                            className="block w-full text-left px-2 py-1 text-white/60 text-sm rounded transition-all duration-300 hover:bg-white/20 hover:text-white/80 hover:brightness-105"
                            whileHover={{ x: 4 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {suggestion}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Menu */}
          <div className="hidden md:block">
            <div className="relative" ref={userMenuRef}>
              <motion.button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 px-3 py-2 bg-white/15 backdrop-blur-[20px] brightness-110 border border-white/25 rounded-xl transition-all duration-300 hover:bg-white/25 hover:brightness-105 hover:saturate-110"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <User className="h-4 w-4 text-white" />
                <span className="text-white text-sm">{getUserDisplayName()}</span>
                <ChevronDown className="h-3 w-3 text-white/70" />
              </motion.button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                    className="absolute right-0 mt-2 w-48 bg-white/18 backdrop-blur-[30px] saturate-150 brightness-105 rounded-xl border border-white/25 shadow-xl py-2 z-20"
                  >
                    <motion.button
                      className="w-full px-4 py-2 text-left text-white flex items-center space-x-2 transition-all duration-300 hover:bg-white/20 hover:brightness-105 hover:saturate-110"
                      onClick={() => { navigate('/account'); setIsUserMenuOpen(false); }}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <User className="h-4 w-4" />
                      <span>Account</span>
                    </motion.button>
                    <div className="h-px bg-white/20 my-2" />
                    <motion.button
                      className="w-full px-4 py-2 text-left text-red-300 flex items-center space-x-2 transition-all duration-300 hover:bg-white/20 hover:brightness-105 hover:saturate-110"
                      onClick={handleSignOut}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign out</span>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center justify-center p-2 bg-white/15 backdrop-blur-[20px] brightness-110 border border-white/25 rounded-xl transition-all duration-300 hover:bg-white/25 hover:brightness-105 hover:saturate-110"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-white" />
              ) : (
                <Menu className="h-5 w-5 text-white" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, scale: 0.95 }}
              animate={{ opacity: 1, height: "auto", scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }}
              className="md:hidden border-t border-white/20 mt-4 pt-4 pb-4"
            >
              {/* Mobile Search */}
              <div className="mb-4">
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="absolute inset-0 bg-white/15 backdrop-blur-[20px] brightness-110 rounded-xl border border-white/25"></div>
                  <div className="relative flex items-center">
                    <Search className="h-4 w-4 text-white/70 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search cases, patients..."
                      className="bg-transparent border-0 text-white placeholder:text-white/50 focus-visible:ring-0 focus-visible:ring-offset-0 pl-10 pr-4 py-3 rounded-xl text-sm focus:outline-none w-full transition-all duration-300 focus:brightness-110 focus:saturate-105"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Mobile Navigation Items */}
              <div className="space-y-2">
                {NAV_ITEMS.map((item) => {
                  const isActive = location.pathname === item.to;
                  return (
                    <motion.div
                      key={item.to}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <NavLink
                        to={item.to}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300",
                          "text-white/80 hover:text-white hover:bg-white/20 hover:brightness-105 hover:saturate-110",
                          isActive 
                            ? "bg-white/25 text-white shadow-md backdrop-blur-[20px] brightness-110 saturate-105" 
                            : "text-white/80"
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.label}</span>
                      </NavLink>
                    </motion.div>
                  );
                })}
              </div>

              {/* Mobile User Menu */}
              <div className="border-t border-white/20 mt-4 pt-4">
                <motion.button
                  className="w-full flex items-center space-x-3 px-4 py-3 text-white/80 rounded-xl transition-all duration-300 hover:bg-white/20 hover:brightness-105 hover:saturate-110"
                  onClick={() => { navigate('/account'); setIsMobileMenuOpen(false); }}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <User className="h-5 w-5" />
                  <span>Account</span>
                </motion.button>
                <motion.button
                  className="w-full flex items-center space-x-3 px-4 py-3 text-red-300 rounded-xl transition-all duration-300 hover:bg-white/20 hover:brightness-105 hover:saturate-110"
                  onClick={() => { handleSignOut(); setIsMobileMenuOpen(false); }}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sign out</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default EnhancedNavbar;
