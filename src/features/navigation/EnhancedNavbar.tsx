import React, { useState, useRef, useEffect } from "react";
import { Search, Menu, X, Home, BookOpen, ChevronDown, User, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { useSupabaseCases } from "@/shared/hooks/use-supabase-cases";
import { useAuth } from "@/app/providers/AuthContext";
import { cn } from "@/shared/utils/utils";
import { Button } from "@/shared/components/button";
import type { MedicalCase } from "@/shared/types/case";

interface NavItem {
  label: string;
  to: string;
  icon: React.ComponentType;
  hasNotifications?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", to: "/dashboard", icon: Home },
  { label: "Cases", to: "/cases", icon: BookOpen, hasNotifications: false },
];

interface SearchResult {
  id: string;
  title: string;
  type: 'case' | 'patient' | 'urgent';
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

  const { cases } = useSupabaseCases();

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
    } catch {
      navigate('/auth');
    }
  };

  const getUserDisplayName = () => user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';

  return (
    <motion.nav
      className="sticky top-0 z-50 mb-8 backdrop-blur-md bg-white/5 border-b border-white/10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            whileHover={{ 
              scale: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 1.02 
            }}
            transition={{ duration: 0.2 }}
          >
            <NavLink
              to="/dashboard"
              className="text-2xl font-bold text-white transition-all duration-300 hover:brightness-110"
            >
              Medica
            </NavLink>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {NAV_ITEMS.map(item => {
              const isActive = location.pathname === item.to;
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.to}
                  whileHover={{ 
                    scale: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 1.02 
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <NavLink
                    to={item.to}
                    className={cn(
                      "flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300",
                      isActive
                        ? "backdrop-blur-md bg-white/20 border border-white/30 text-white shadow-sm"
                        : "text-white/80 hover:text-white hover:bg-white/10 hover:border-white/20 border border-transparent",
                      "focus:ring-2 focus:ring-white/20 focus:outline-none"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                    {item.hasNotifications && (
                      <motion.div 
                        className="w-2 h-2 bg-red-400 rounded-full"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      />
                    )}
                  </NavLink>
                </motion.div>
              );
            })}
          </div>

          {/* Search Bar */}
          <div ref={searchRef} className="relative hidden md:block min-w-[320px]">
            <motion.div
              className="relative"
              animate={{
                scale: isSearchFocused ? 1.02 : 1,
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/70" />
                <input
                  type="search"
                  placeholder="Search cases, patients..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  className={cn(
                    "w-full pl-12 pr-4 py-3 text-white rounded-xl transition-all duration-300",
                    "backdrop-blur-md bg-white/10 border border-white/20",
                    "placeholder:text-white/60",
                    "focus:bg-white/20 focus:border-white/30 focus:ring-2 focus:ring-white/20 focus:outline-none",
                    "hover:bg-white/15 hover:border-white/25"
                  )}
                />
                {/* Glass effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-xl pointer-events-none"></div>
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
                  className="absolute top-full left-0 right-0 mt-2 backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 shadow-xl z-50 overflow-hidden"
                >
                  {searchResults.length > 0 ? (
                    <div className="py-2">
                      {searchResults.map(result => (
                        <motion.button
                          key={result.id}
                          onClick={() => handleSearchResultClick(result)}
                          className="w-full px-4 py-3 text-left transition-all duration-300 hover:bg-white/20 text-white"
                          whileHover={{ x: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 4 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="font-medium text-sm">{result.title}</div>
                          {result.subtitle && <div className="text-white/70 text-xs mt-1">{result.subtitle}</div>}
                        </motion.button>
                      ))}
                    </div>
                  ) : searchQuery ? (
                    <div className="py-4 px-4 text-white/70 text-sm">No results found</div>
                  ) : (
                    <div className="py-4 px-4">
                      <div className="text-white/70 text-xs mb-2">Quick suggestions</div>
                      <div className="space-y-1">
                        {['Recent cases', 'Cardiology', 'Emergency'].map(suggestion => (
                          <motion.button
                            key={suggestion}
                            onClick={() => setSearchQuery(suggestion)}
                            className="block w-full text-left px-2 py-1 text-white/60 text-sm rounded transition-all duration-300 hover:bg-white/20 hover:text-white/80"
                            whileHover={{ x: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 4 }}
                            transition={{ duration: 0.2 }}
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
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300",
                  "backdrop-blur-md bg-white/10 border border-white/20",
                  "hover:bg-white/20 hover:border-white/30",
                  "text-white/90 hover:text-white",
                  "focus:ring-2 focus:ring-white/20 focus:outline-none group"
                )}
                whileHover={{ 
                  scale: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 1.02 
                }}
                transition={{ duration: 0.2 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                <User className="h-4 w-4 relative z-10" />
                <span className="text-sm relative z-10">{getUserDisplayName()}</span>
                <ChevronDown className="h-3 w-3 text-white/70 relative z-10" />
              </motion.button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                    className="absolute right-0 mt-2 w-48 backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-xl py-2 z-20 overflow-hidden"
                  >
                    <motion.button
                      className="w-full px-4 py-2 text-left text-white flex items-center space-x-2 transition-all duration-300 hover:bg-white/20 focus:ring-2 focus:ring-white/20 focus:outline-none"
                      onClick={() => { navigate('/account'); setIsUserMenuOpen(false); }}
                      whileHover={{ x: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <User className="h-4 w-4" />
                      <span>Account</span>
                    </motion.button>
                    <div className="h-px bg-white/20 my-2" />
                    <motion.button
                      className="w-full px-4 py-2 text-left text-red-300 flex items-center space-x-2 transition-all duration-300 hover:bg-white/20 focus:ring-2 focus:ring-white/20 focus:outline-none"
                      onClick={handleSignOut}
                      whileHover={{ x: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 4 }}
                      transition={{ duration: 0.2 }}
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
              className={cn(
                "p-2 rounded-xl transition-all duration-300",
                "backdrop-blur-md bg-white/10 border border-white/20",
                "hover:bg-white/20 hover:border-white/30",
                "text-white focus:ring-2 focus:ring-white/20 focus:outline-none"
              )}
              whileHover={{ 
                scale: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 1.05 
              }}
              whileTap={{ 
                scale: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 0.95 
              }}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }}
              className="md:hidden mt-4 backdrop-blur-md bg-white/10 rounded-xl border border-white/20 overflow-hidden"
            >
              <div className="p-4 space-y-4">
                {NAV_ITEMS.map(item => {
                  const isActive = location.pathname === item.to;
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300",
                        isActive
                          ? "bg-white/20 border border-white/30 text-white"
                          : "text-white/80 hover:text-white hover:bg-white/10"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </NavLink>
                  );
                })}
                <div className="h-px bg-white/20" />
                <button
                  onClick={() => { navigate('/account'); setIsMobileMenuOpen(false); }}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 w-full text-left"
                >
                  <User className="h-4 w-4" />
                  <span>Account</span>
                </button>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-red-300 hover:bg-white/10 transition-all duration-300 w-full text-left"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign out</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default EnhancedNavbar;
