import React, { useState, useRef, useEffect } from "react";
import { Search, Menu, X, Home, BookOpen, ChevronDown, User, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCases } from "@/lib/api/cases";
import { useAuth } from "@/app/AuthContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
  const { data: cases } = useQuery({
    queryKey: ["cases"],
    queryFn: () => getCases(),
  });

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
          caseItem.patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          caseItem.chiefComplaint.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
        .map(caseItem => ({
          id: caseItem.id,
          title: caseItem.title,
          type: 'case' as const,
          subtitle: `${caseItem.patient.name} - ${caseItem.chiefComplaint}`,
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
    <nav className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl">
      <div className="px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <NavLink to="/dashboard" className="text-2xl font-bold text-white hover:text-white/80 transition-colors">
              Medica
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    "hover:bg-white/10 hover:scale-105",
                    isActive 
                      ? "bg-white/20 text-white shadow-sm" 
                      : "text-white/80 hover:text-white"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </NavLink>
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
            <div className="relative">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"></div>
              <div className="relative flex items-center">
                <Search className="h-4 w-4 text-white/70 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search cases, patients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  className="bg-transparent border-0 text-white placeholder:text-white/50 focus-visible:ring-0 focus-visible:ring-offset-0 pl-10 pr-4 py-2 rounded-xl text-sm focus:outline-none w-full"
                />
              </div>
            </div>

            {/* Search Results Dropdown */}
            <AnimatePresence>
              {isSearchFocused && (searchQuery || searchResults.length > 0) && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 z-50"
                >
                  {searchResults.length > 0 ? (
                    <div className="py-2">
                      {searchResults.map((result) => (
                        <button
                          key={result.id}
                          onClick={() => handleSearchResultClick(result)}
                          className="w-full px-4 py-3 text-left hover:bg-white/10 transition-colors"
                        >
                          <div className="font-medium text-white text-sm">{result.title}</div>
                          <div className="text-white/70 text-xs mt-1">{result.subtitle}</div>
                        </button>
                      ))}
                    </div>
                  ) : searchQuery ? (
                    <div className="py-4 px-4 text-white/70 text-sm">No results found</div>
                  ) : (
                    <div className="py-4 px-4">
                      <div className="text-white/70 text-xs mb-2">Quick suggestions</div>
                      <div className="space-y-1">
                        {["Recent cases", "Cardiology", "Emergency"].map((suggestion) => (
                          <button
                            key={suggestion}
                            onClick={() => setSearchQuery(suggestion)}
                            className="block w-full text-left px-2 py-1 text-white/60 hover:text-white text-sm hover:bg-white/5 rounded"
                          >
                            {suggestion}
                          </button>
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
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-colors"
              >
                <User className="h-4 w-4 text-white" />
                <span className="text-white text-sm">{getUserDisplayName()}</span>
                <ChevronDown className="h-3 w-3 text-white/70" />
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 py-2"
                  >
                    <button
                      className="w-full px-4 py-2 text-left text-white hover:bg-white/20 flex items-center space-x-2 transition-colors"
                      onClick={() => { navigate('/settings'); setIsUserMenuOpen(false); }}
                    >
                      <User className="h-4 w-4" />
                      <span>Settings</span>
                    </button>
                    <div className="h-px bg-white/20 my-2" />
                    <button
                      className="w-full px-4 py-2 text-left text-red-300 hover:bg-white/20 flex items-center space-x-2 transition-colors"
                      onClick={handleSignOut}
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign out</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center justify-center p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-white" />
              ) : (
                <Menu className="h-5 w-5 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/20 mt-4 pt-4 pb-4"
            >
              {/* Mobile Search */}
              <div className="mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"></div>
                  <div className="relative flex items-center">
                    <Search className="h-4 w-4 text-white/70 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search cases, patients..."
                      className="bg-transparent border-0 text-white placeholder:text-white/50 focus-visible:ring-0 focus-visible:ring-offset-0 pl-10 pr-4 py-3 rounded-xl text-sm focus:outline-none w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Mobile Navigation Items */}
              <div className="space-y-2">
                {NAV_ITEMS.map((item) => {
                  const isActive = location.pathname === item.to;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors",
                        isActive 
                          ? "bg-white/20 text-white" 
                          : "text-white/80 hover:bg-white/10 hover:text-white"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </NavLink>
                  );
                })}
              </div>

              {/* Mobile User Menu */}
              <div className="border-t border-white/20 mt-4 pt-4">
                <button
                  className="w-full flex items-center space-x-3 px-4 py-3 text-white/80 hover:bg-white/10 hover:text-white rounded-xl transition-colors"
                  onClick={() => { navigate('/settings'); setIsMobileMenuOpen(false); }}
                >
                  <User className="h-5 w-5" />
                  <span>Settings</span>
                </button>
                <button
                  className="w-full flex items-center space-x-3 px-4 py-3 text-red-300 hover:bg-white/10 rounded-xl transition-colors"
                  onClick={() => { handleSignOut(); setIsMobileMenuOpen(false); }}
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sign out</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default EnhancedNavbar;
