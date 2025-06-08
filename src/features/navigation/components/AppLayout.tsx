import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  RefObject,
  MouseEvent as ReactMouseEvent,
  TouchEvent as ReactTouchEvent,
} from "react";
import { Search, Settings, LogOut, User } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Sidebar, SidebarTrigger } from "@/features/navigation";
import { cn } from "@/lib/utils";

/**
 * Custom hook to detect clicks outside a specified element.
 */
function useOnClickOutside(
  ref: RefObject<HTMLElement>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

/**
 * HeaderActions: search + user-menu with animations and accessibility.
 */
const HeaderActions: React.FC = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(userMenuRef, () => setIsUserMenuOpen(false));

  const menuVariants: Variants = useMemo(
    () => ({
      hidden: { opacity: 0, scale: 0.95, y: -10 },
      visible: { opacity: 1, scale: 1, y: 0 },
    }),
    []
  );

  return (
    <div className="flex items-center gap-2 sm:gap-4">
      {/* Desktop Search */}
      <div className="hidden md:flex items-center group relative">
        <input
          type="text"
          placeholder="Search..."
          aria-label="Search"
          className="
            pl-8 pr-3 py-1.5 w-48 lg:w-64
            bg-white/60 group-hover:bg-white/80 focus:bg-white
            border border-transparent focus:border-indigo-400
            rounded-full text-sm placeholder:text-gray-500
            focus:outline-none focus:ring-2 focus:ring-indigo-500/50
            transition-all duration-300 shadow-sm hover:shadow-md
          "
        />
        <Search className="h-4 w-4 absolute left-4 text-gray-400 group-hover:text-indigo-600 transition-colors" />
      </div>

      {/* Mobile Search Button */}
      <button
        aria-label="Open search"
        className="
          md:hidden grid place-items-center h-10 w-10
          hover:bg-white/80 rounded-full transition-colors
          text-gray-600 hover:text-indigo-600
        "
      >
        <Search className="h-5 w-5" />
      </button>

      {/* User Menu */}
      <div className="relative" ref={userMenuRef}>
        <button
          onClick={() => setIsUserMenuOpen((open) => !open)}
          aria-label="User menu"
          aria-haspopup="true"
          aria-expanded={isUserMenuOpen}
          className="p-1.5 rounded-full transition-transform duration-200 ease-in-out hover:scale-105"
        >
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md hover:shadow-lg">
            <User className="h-5 w-5 text-white" />
          </div>
        </button>

        <AnimatePresence>
          {isUserMenuOpen && (
            <motion.div
              role="menu"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={menuVariants}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="
                absolute right-0 mt-3 w-56 p-2
                bg-gradient-to-br from-white to-gray-50/80
                backdrop-blur-lg rounded-xl shadow-2xl
                border border-gray-200/80
              "
            >
              <div className="px-3 py-2 border-b border-gray-200/80">
                <p className="text-sm font-semibold text-gray-800">Jane Doe</p>
                <p className="text-xs text-gray-500">janedoe@example.com</p>
              </div>
              <div className="py-2 space-y-1">
                <MenuItem icon={User}>Profile</MenuItem>
                <MenuItem icon={Settings}>Settings</MenuItem>
              </div>
              <div className="h-px bg-gray-200/80 my-1" />
              <MenuItem icon={LogOut} isDanger>
                Log out
              </MenuItem>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

interface MenuItemProps {
  children: React.ReactNode;
  icon: React.ElementType;
  isDanger?: boolean;
}

/**
 * MenuItem: styled menu option with proper role and hover state.
 */
const MenuItem: React.FC<MenuItemProps> = ({ children, icon: Icon, isDanger = false }) => (
  <button
    role="menuitem"
    className={cn(
      "w-full px-3 py-2 text-sm text-left flex items-center gap-3 rounded-md transition-colors duration-200",
      isDanger
        ? "text-red-600 hover:bg-red-500/10"
        : "text-gray-700 hover:bg-indigo-500/10 hover:text-indigo-700"
    )}
  >
    <Icon className="h-4 w-4" />
    <span className="font-medium">{children}</span>
  </button>
);

interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

/**
 * AppLayout: full-page layout with glassmorphic header & adjusted padding.
 */
export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  className = "",
  title = "Clinical Case Compass",
}) => (
  <div className="min-h-screen bg-slate-50 md:flex">
    <Sidebar />

    <div className="flex-1 min-w-0 transition-all duration-300 ease-in-out">
      {/* Glassmorphic Header with tighter padding */}
      <header
        className="
          sticky top-0 z-40
          flex items-center justify-between
          px-4 py-2 sm:px-6 sm:py-3
          border-b border-gray-200/80
          bg-white/70 backdrop-blur-xl
        "
      >
        <div className="flex items-center gap-2 sm:gap-4">
          <SidebarTrigger />
          <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            {title}
          </h1>
        </div>
        <HeaderActions />
      </header>

      {/* Main Content with consistent padding */}
      <main className={cn("p-4 sm:p-6 flex-1", className)}>{children}</main>
    </div>
  </div>
);

export default AppLayout;
