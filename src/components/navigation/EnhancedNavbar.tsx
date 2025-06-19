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
      className={cn(
        "w-full rounded-2xl",
        "bg-white/18 backdrop-blur-[24px] saturate-160 brightness-108 border border-white/20 shadow-lg",
        liquidGlassClasses.navigation
      )}
      variants={getGlassTransitionVariants('medium')}
      initial="initial"
      animate="animate"
    >
      <div className="px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <NavLink
              to="/dashboard"
              className={cn(
                "text-2xl font-bold transition-all duration-300 hover:brightness-110 tracking-[-0.02em]",
                "text-white/80 contrast-more:text-white contrast-more:font-medium",
                "focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-transparent"
              )}
            >
              Medica
            </NavLink>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map(item => {
              const isActive = location.pathname === item.to;
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.to}
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <NavLink
                    to={item.to}
                    className={cn(
                      "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-all duration-300",
                      "text-white/80 hover:text-white hover:bg-white/20 hover:brightness-105 hover:saturate-110",
                      isActive
                        ? "bg-white/25 text-white shadow-md backdrop-blur-[20px] brightness-110 saturate-105"
                        : "",
                      "contrast-more:text-white contrast-more:font-medium",
                      "focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-transparent"
                    )}
                  >
                    <IconComponent />
                    <span className="font-medium tracking-[0.01em]">{item.label}</span>
                    {item.hasNotifications && <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />}
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
                boxShadow: isSearchFocused
                  ? "0 8px 32px rgba(0,0,0,0.12)"
                  : "0 4px 16px rgba(0,0,0,0.08)"
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-white/10 backdrop-blur-[16px] saturate-130 brightness-105 rounded-xl border border-white/20 shadow-lg"></div>
              <div className="relative flex items-center">
                <Search className="h-4 w-4 text-white/70 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search cases, patients..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  className={cn(
                    "bg-transparent border-0 text-white placeholder:text-white/50 placeholder:font-light focus-visible:ring-0 pl-10 pr-4 py-2 rounded-xl text-sm transition-all duration-300 focus:brightness-110 focus:saturate-105 tracking-[0.005em]",
                    "focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-transparent"
                  )}
                />
              </div>
            </motion.div>

            <AnimatePresence>
              {isSearchFocused && (searchQuery || searchResults.length > 0) && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white/15 backdrop-blur-[28px] saturate-170 brightness-107 rounded-2xl border border-white/20 shadow-2xl z-50"
                >
                  {searchResults.length > 0 ? (
                    <div className="py-2">
                      {searchResults.map(result => (
                        <motion.button
                          key={result.id}
                          onClick={() => handleSearchResultClick(result)}
                          className={cn(
                            "w-full px-4 py-3 text-left transition-all duration-300 hover:bg-white/20 hover:brightness-105 hover:saturate-110",
                            "focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-transparent"
                          )}
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.97 }}
                          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                        >
                          <div className={cn(
                            "font-medium text-sm",
                            result.type === 'urgent' ? "text-red-300 font-semibold" : "text-white"
                          )}>
                            {result.title}
                          </div>
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
                            className="block w-full text-left px-2 py-1 text-white/60 text-sm rounded transition-all duration-300 hover:bg-white/20 hover:text-white/80 hover:brightness-105"
                            whileHover={{ x: 4 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
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
                  "flex items-center space-x-2 px-3 py-2 rounded-xl transition-all duration-300",
                  "bg-white/15 backdrop-blur-[20px] brightness-110 border border-white/25",
                  "hover:bg-white/25 hover:brightness-105 hover:saturate-110",
                  "text-white/80 contrast-more:text-white contrast-more:font-medium",
                  "focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-transparent"
                )}
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
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
                    className="absolute right-0 mt-2 w-48 bg-white/15 backdrop-blur-[28px] saturate-170 brightness-107 rounded-xl border border-white/25 shadow-xl py-2 z-20"
                  >
                    <motion.button
                      className="w-full px-4 py-2 text-left text-white flex items-center space-x-2 transition-all duration-300 hover:bg-white/20 hover:brightness-105 hover:saturate-110 focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-transparent"
                      onClick={() => { navigate('/account'); setIsUserMenuOpen(false); }}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      <User className="h-4 w-4" />
                      <span>Account</span>
                    </motion.button>
                    <div className="h-px bg-white/20 my-2" />
                    <motion.button
                      className="w-full px-4 py-2 text-left text-red-300 flex items-center space-x-2 transition-all duration-300 hover:bg-white/20 hover:brightness-105 hover:saturate-110 focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-transparent"
                      onClick={handleSignOut}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign out</span>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button and Mobile Menu omitted for brevity */}
        </div>
      </div>
    </motion.nav>
  );
};

export default EnhancedNavbar;
