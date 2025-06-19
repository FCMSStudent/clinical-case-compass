import React, { useState, useRef, useEffect } from "react";
import { Search, Menu, X, Home, BookOpen, ChevronDown, User, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSupabaseCases } from "@/hooks/use-supabase-cases";
import { useAuth } from "@/app/AuthContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { glassComponents, getGlassClass, combineGlassStyles } from "@/lib/unified-glassmorphic-styles";
import type { MedicalCase } from "@/types/case";

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
      className={cn("w-full rounded-2xl", glassComponents.navbar.floating)}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            <NavLink
              to="/dashboard"
              className="text-2xl font-bold text-white/90 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/30 rounded-lg px-2 py-1"
            >
              Medica
            </NavLink>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {NAV_ITEMS.map(item => {
              const isActive = location.pathname === item.to;
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.to}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                >
                  <NavLink
                    to={item.to}
                    className={cn(
                      "flex items-center space-x-2 px-4 py-2 rounded-lg text-sm transition-all duration-200",
                      "text-white/80 hover:text-white",
                      isActive
                        ? getGlassClass('elevated', 'sm')
                        : getGlassClass('subtle', 'sm', true)
                    )}
                  >
                    <IconComponent />
                    <span className="font-medium">{item.label}</span>
                    {item.hasNotifications && (
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                    )}
                  </NavLink>
                </motion.div>
              );
            })}
          </div>

          {/* Search Bar */}
          <div ref={searchRef} className="relative hidden md:block">
            <motion.div
              className="relative"
              animate={{
                width: isSearchFocused ? 320 : 256,
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className={cn("absolute inset-0 rounded-xl", getGlassClass('subtle', 'sm'))}></div>
              <div className="relative flex items-center">
                <Search className="h-4 w-4 text-white/70 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search cases, patients..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  className="bg-transparent border-0 text-white placeholder:text-white/50 focus-visible:ring-0 pl-10 pr-4 py-2 rounded-xl text-sm w-full focus:outline-none"
                />
              </div>
            </motion.div>

            <AnimatePresence>
              {isSearchFocused && (searchQuery || searchResults.length > 0) && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className={cn(
                    "absolute top-full left-0 right-0 mt-2 rounded-xl z-50",
                    getGlassClass('elevated', 'md')
                  )}
                >
                  {searchResults.length > 0 ? (
                    <div className="py-2">
                      {searchResults.map(result => (
                        <motion.button
                          key={result.id}
                          onClick={() => handleSearchResultClick(result)}
                          className="w-full px-4 py-3 text-left transition-colors duration-200 hover:bg-white/10 rounded-lg mx-2 first:mt-0"
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ duration: 0.15 }}
                        >
                          <div className={cn(
                            "font-medium text-sm",
                            result.type === 'urgent' ? "text-red-300" : "text-white"
                          )}>
                            {result.title}
                          </div>
                          {result.subtitle && (
                            <div className="text-white/70 text-xs mt-1">{result.subtitle}</div>
                          )}
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
                            className="block w-full text-left px-2 py-1 text-white/60 text-sm rounded transition-colors duration-200 hover:bg-white/10 hover:text-white/80"
                            whileHover={{ x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.15 }}
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
                  "flex items-center space-x-2 px-4 py-2 rounded-xl text-white/80 hover:text-white",
                  glassComponents.button.secondary
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
              >
                <User className="h-4 w-4" />
                <span className="text-sm">{getUserDisplayName()}</span>
                <ChevronDown className="h-3 w-3 text-white/70" />
              </motion.button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className={cn(
                      "absolute right-0 mt-2 w-48 rounded-xl z-20",
                      getGlassClass('elevated', 'md')
                    )}
                  >
                    <motion.button
                      className="w-full px-4 py-3 text-left text-white flex items-center space-x-2 transition-colors duration-200 hover:bg-white/10 rounded-lg mx-2 mt-2"
                      onClick={() => { navigate('/account'); setIsUserMenuOpen(false); }}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                    >
                      <User className="h-4 w-4" />
                      <span>Account</span>
                    </motion.button>
                    <div className="h-px bg-white/20 my-2 mx-4" />
                    <motion.button
                      className="w-full px-4 py-3 text-left text-red-300 flex items-center space-x-2 transition-colors duration-200 hover:bg-white/10 rounded-lg mx-2 mb-2"
                      onClick={handleSignOut}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.15 }}
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
                "flex items-center justify-center w-10 h-10 rounded-lg text-white",
                glassComponents.button.ghost
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15 }}
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
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="md:hidden py-4"
            >
              <div className="space-y-2">
                {NAV_ITEMS.map(item => {
                  const IconComponent = item.icon;
                  const isActive = location.pathname === item.to;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center space-x-3 px-4 py-3 rounded-lg text-white/80 hover:text-white transition-colors duration-200",
                        isActive
                          ? getGlassClass('elevated', 'sm')
                          : "hover:bg-white/10"
                      )}
                    >
                      <IconComponent />
                      <span className="font-medium">{item.label}</span>
                      {item.hasNotifications && (
                        <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                      )}
                    </NavLink>
                  );
                })}
                
                {/* Mobile User Menu */}
                <div className="border-t border-white/20 pt-4 mt-4">
                  <div className="flex items-center space-x-3 px-4 py-2 text-white/70 text-sm">
                    <User className="h-4 w-4" />
                    <span>{getUserDisplayName()}</span>
                  </div>
                  <button
                    onClick={() => { navigate('/account'); setIsMobileMenuOpen(false); }}
                    className="w-full text-left px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
                  >
                    Account Settings
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-3 text-red-300 hover:bg-white/10 rounded-lg transition-colors duration-200"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default EnhancedNavbar;
