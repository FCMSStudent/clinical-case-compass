// -----------------------------------------------------------------------------
// Enhanced Navbar – Liquid Glass Edition
// -----------------------------------------------------------------------------
// * Frosted surface (`glass`) with subtle border + shadow that adapts to dark
//   and light themes.
// * Animations powered by Framer Motion, respecting reduced-motion prefs.
// * Desktop, tablet, and mobile layouts consolidated into one responsive
//   component – no duplication of markup.
// * Pulls design-system primitives (Card, Button, Input) for consistent styling.
// -----------------------------------------------------------------------------

import * as React from "react";
import {
  useState,
  useRef,
  useEffect,
  useCallback,
  MutableRefObject,
} from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import {
  Search,
  Menu,
  X,
  Home,
  BookOpen,
  User,
  ChevronDown,
  LogOut,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";
import { useAuth } from "@/app/AuthContext";
import { useSupabaseCases } from "@/hooks/use-supabase-cases";

// -----------------------------------------------------------------------------
// Constants --------------------------------------------------------------------
const NAV = [
  { label: "Dashboard", to: "/dashboard", icon: Home },
  { label: "Cases", to: "/cases", icon: BookOpen },
] as const;

type SearchResult = {
  id: string;
  title: string;
  subtitle?: string;
  path: string;
};

// -----------------------------------------------------------------------------
// Animation helpers ------------------------------------------------------------
const dropdownVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.18, ease: [0.23, 1, 0.32, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.12, ease: "easeInOut" } },
};

const mobileMenuVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.22, ease: [0.23, 1, 0.32, 1] },
  },
  exit: { opacity: 0, height: 0, transition: { duration: 0.15, ease: "easeInOut" } },
};

// -----------------------------------------------------------------------------
// Hook – click outside ---------------------------------------------------------
function useClickOutside<T extends HTMLElement>(
  ref: MutableRefObject<T | null>,
  cb: () => void,
) {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) cb();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [cb, ref]);
}

// -----------------------------------------------------------------------------
// Component --------------------------------------------------------------------
export const EnhancedNavbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { cases } = useSupabaseCases();

  const searchRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useClickOutside(searchRef, () => setSearchOpen(false));
  useClickOutside(userRef, () => setUserOpen(false));

  // Debounced search ---------------------------------------------------------
  useEffect(() => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    const id = setTimeout(() => {
      const subset = cases
        ?.filter((c) =>
          [c.title, c.patient?.name, c.chiefComplaint]
            .filter(Boolean)
            .some((v) => v!.toLowerCase().includes(q.toLowerCase())),
        )
        .slice(0, 6)
        .map((c) => ({
          id: c.id,
          title: c.title,
          subtitle: `${c.patient?.name ?? ""} – ${c.chiefComplaint ?? ""}`,
          path: `/cases/${c.id}`,
        })) ?? [];
      setResults(subset);
    }, 250);
    return () => clearTimeout(id);
  }, [q, cases]);

  // Esc key -------------------------------------------------------------------
  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setUserOpen(false);
        setSearchOpen(false);
      }
    };
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, []);

  // Helpers -------------------------------------------------------------------
  const displayName =
    user?.user_metadata?.full_name ?? user?.email?.split("@")[0] ?? "User";

  const isReduced = useReducedMotion();

  const handleSignOut = async () => {
    try {
      await signOut();
    } finally {
      setUserOpen(false);
      navigate("/auth");
    }
  };

  // -------------------------------------------------------------------------
  // JSX ----------------------------------------------------------------------
  return (
    <Card variant="glass" className="w-full">
      <div className="px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <NavLink to="/dashboard" className="text-2xl font-bold text-white">
            Medica
          </NavLink>

          {/* Desktop Nav */}
          <div className="hidden items-center space-x-8 md:flex">
            {NAV.map(({ label, to, icon: Icon }) => {
              const active = location.pathname === to;
              return (
                <NavLink
                  key={to}
                  to={to}
                  className={cn(
                    "flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    active ? "bg-white/20 text-white" : "text-white/80 hover:text-white",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </NavLink>
              );
            })}
          </div>

          {/* Search */}
          <div
            ref={searchRef}
            className={cn(
              "relative hidden transition-[width] duration-300 md:block",
              searchOpen ? "w-80" : "w-64",
            )}
          >
            {/* Frosted wrapper */}
            <div className="glass-subtle absolute inset-0 rounded-xl border border-white/20" />
            <div className="relative flex items-center">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
              <input
                type="text"
                placeholder="Search cases, patients…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onFocus={() => setSearchOpen(true)}
                className="w-full rounded-xl bg-transparent px-10 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none"
              />
            </div>
            {/* Dropdown */}
            <AnimatePresence>
              {searchOpen && (q || results.length) && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="glass absolute left-0 right-0 top-full z-50 mt-2 rounded-xl border border-white/20"
                >
                  {results.length ? (
                    <ul className="py-2">
                      {results.map((r) => (
                        <li key={r.id}>
                          <button
                            onClick={() => {
                              navigate(r.path);
                              setSearchOpen(false);
                              setQ("");
                            }}
                            className="w-full px-4 py-3 text-left hover:bg-white/10"
                          >
                            <p className="text-sm font-medium text-white">{r.title}</p>
                            <p className="mt-1 text-xs text-white/70">{r.subtitle}</p>
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="px-4 py-4 text-sm text-white/70">No results</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User menu (desktop) */}
          <div className="hidden md:block" ref={userRef}>
            <Button
              variant="outline"
              size="sm"
              className="glass-subtle flex items-center space-x-2"
              onClick={() => setUserOpen(!userOpen)}
            >
              <User className="h-4 w-4" />
              <span className="text-sm text-white">{displayName}</span>
              <ChevronDown className="h-3 w-3 text-white/70" />
            </Button>
            <AnimatePresence>
              {userOpen && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="glass absolute right-0 mt-2 w-48 rounded-xl border border-white/20 py-2"
                >
                  <button
                    className="flex w-full items-center space-x-2 px-4 py-2 text-left text-white hover:bg-white/10"
                    onClick={() => {
                      navigate("/account");
                      setUserOpen(false);
                    }}
                  >
                    <User className="h-4 w-4" />
                    <span>Account</span>
                  </button>
                  <div className="my-2 h-px bg-white/20" />
                  <button
                    className="flex w-full items-center space-x-2 px-4 py-2 text-left text-red-300 hover:bg-white/10"
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign out</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile toggle */}
          <Button
            size="icon"
            variant="outline"
            className="glass-subtle md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile panel */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="md:hidden"
            >
              {/* Search */}
              <div className="mt-4">
                <div className="relative">
                  <div className="glass-subtle absolute inset-0 rounded-xl border border-white/20" />
                  <div className="relative flex items-center">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
                    <input
                      type="text"
                      placeholder="Search…"
                      className="w-full rounded-xl bg-transparent px-10 py-3 text-sm text-white placeholder:text-white/50 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Nav links */}
              <div className="mt-4 space-y-2">
                {NAV.map(({ label, to, icon: Icon }) => {
                  const active = location.pathname === to;
                  return (
                    <NavLink
                      key={to}
                      to={to}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center space-x-3 rounded-xl px-4 py-3 transition-colors",
                        active ? "bg-white/20 text-white" : "text-white/80 hover:text-white",
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{label}</span>
                    </NavLink>
                  );
                })}
              </div>

              {/* User shortcuts */}
              <div className="mt-4 border-t border-white/20 pt-4">
                <button
                  className="flex w-full items-center space-x-3 rounded-xl px-4 py-3 text-white/80 hover:bg-white/20"
                  onClick={() => {
                    navigate("/account");
                    setMobileOpen(false);
                  }}
                >
                  <User className="h-5 w-5" />
                  <span>Account</span>
                </button>
                <button
                  className="flex w-full items-center space-x-3 rounded-xl px-4 py-3 text-red-300 hover:bg-white/20"
                  onClick={() => {
                    handleSignOut();
                    setMobileOpen(false);
                  }}
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sign out</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
};

export default EnhancedNavbar;
