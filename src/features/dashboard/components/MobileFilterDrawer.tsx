import { Input } from "@/shared/components/input";
import { Button } from "@/shared/components/button";
import { Badge } from "@/shared/components/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/components/sheet";
import { Search, Filter, X, Calendar, Tag, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/shared/utils/utils";
import { typography } from "@/design-system/tokens/typography";
import { liquidGlassClasses } from "@/design-system/components/glass-effects";

interface FilterOption {
  id: string;
  label: string;
  count?: number;
  color?: string;
}

interface MobileFilterDrawerProps {
  searchValue: string;
  onSearchChange: (search: string) => void;
  activeFilters: string[];
  onFilterChange: (filters: string[]) => void;
  className?: string;
}

const quickFilters: FilterOption[] = [
  { id: "recent", label: "Recent", count: 12, color: "bg-blue-500" },
  { id: "priority", label: "High Priority", count: 3, color: "bg-red-500" },
  { id: "cardiology", label: "Cardiology", count: 8, color: "bg-purple-500" },
  { id: "emergency", label: "Emergency", count: 5, color: "bg-orange-500" },
  { id: "completed", label: "Completed", count: 15, color: "bg-green-500" },
  { id: "this-week", label: "This Week", count: 7, color: "bg-indigo-500" }
];

const timeFilters: FilterOption[] = [
  { id: "today", label: "Today" },
  { id: "week", label: "This Week" },
  { id: "month", label: "This Month" },
  { id: "quarter", label: "This Quarter" }
];

const statusFilters: FilterOption[] = [
  { id: "active", label: "Active" },
  { id: "completed", label: "Completed" },
  { id: "archived", label: "Archived" },
  { id: "draft", label: "Draft" }
];

const specialtyFilters: FilterOption[] = [
  { id: "cardiology", label: "Cardiology" },
  { id: "neurology", label: "Neurology" },
  { id: "emergency", label: "Emergency" },
  { id: "surgery", label: "Surgery" }
];

export const MobileFilterDrawer = ({
  searchValue,
  onSearchChange,
  activeFilters,
  onFilterChange,
  className
}: MobileFilterDrawerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("quick");

  const toggleFilter = (filterId: string) => {
    const newFilters = activeFilters.includes(filterId)
      ? activeFilters.filter(f => f !== filterId)
      : [...activeFilters, filterId];
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    onFilterChange([]);
    onSearchChange("");
  };

  const hasActiveFilters = activeFilters.length > 0 || searchValue.length > 0;

  const FilterPill = ({ filter, isActive }: { filter: FilterOption; isActive: boolean }) => (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => toggleFilter(filter.id)}
      className={cn(
        "flex items-center gap-2 px-4 py-3 rounded-2xl border-2 transition-all duration-200 min-h-[48px] touch-manipulation",
        isActive
          ? "bg-white/20 border-white/40 text-white"
          : "bg-white/5 border-white/20 text-white/70"
      )}
    >
      <div className="flex items-center gap-2 flex-1">
        {filter.color && (
          <div className={cn("w-3 h-3 rounded-full", filter.color)} />
        )}
        <span className={cn(typography.button, "font-medium")}>{filter.label}</span>
        {filter.count && (
          <Badge className="bg-white/20 text-white text-xs">
            {filter.count}
          </Badge>
        )}
      </div>
      {isActive && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
        >
          <Check className="w-3 h-3 text-white" />
        </motion.div>
      )}
    </motion.button>
  );

  const SectionButton = ({ id, label, icon, isActive }: { 
    id: string; 
    label: string; 
    icon: React.ReactNode; 
    isActive: boolean;
  }) => (
    <button
      onClick={() => setActiveSection(id)}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200",
        isActive
          ? "bg-white/20 text-white"
          : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
      )}
    >
      {icon}
      <span className={typography.button}>{label}</span>
    </button>
  );

  const getSectionFilters = () => {
    switch (activeSection) {
      case "quick":
        return quickFilters;
      case "time":
        return timeFilters;
      case "status":
        return statusFilters;
      case "specialty":
        return specialtyFilters;
      default:
        return quickFilters;
    }
  };

  return (
    <div className={className}>
      {/* Compact Search + Filter Button for Mobile */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
          <Input
            placeholder="Search cases..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className={cn(
              liquidGlassClasses.input,
              "pl-10 text-white h-12 text-base"
            )}
          />
        </div>
        
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              size="lg"
              className={cn(
                liquidGlassClasses.button,
                "text-white h-12 px-4 relative"
              )}
            >
              <Filter className="h-5 w-5" />
              {hasActiveFilters && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {activeFilters.length + (searchValue ? 1 : 0)}
                  </span>
                </div>
              )}
            </Button>
          </SheetTrigger>
          
          <SheetContent 
            side="bottom" 
            className="h-[85vh] bg-black/95 border-white/20 p-0"
          >
            <div className="flex flex-col h-full">
              <SheetHeader className="p-6 border-b border-white/20">
                <div className="flex items-center justify-between">
                  <SheetTitle className="text-white text-xl font-bold">
                    Filter Cases
                  </SheetTitle>
                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFilters}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                      Clear All
                    </Button>
                  )}
                </div>
                
                {/* Active filters display */}
                <AnimatePresence>
                  {hasActiveFilters && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex flex-wrap gap-2 mt-3"
                    >
                      {searchValue && (
                        <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                          Search: "{searchValue}"
                          <button
                            onClick={() => onSearchChange("")}
                            className="ml-1 hover:text-red-300"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      )}
                      {activeFilters.map(filterId => {
                        const filter = [...quickFilters, ...timeFilters, ...statusFilters, ...specialtyFilters]
                          .find(f => f.id === filterId);
                        return (
                          <Badge
                            key={filterId}
                            variant="secondary"
                            className="bg-white/20 text-white"
                          >
                            {filter?.label || filterId}
                            <button
                              onClick={() => toggleFilter(filterId)}
                              className="ml-1 hover:text-red-300"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </SheetHeader>
              
              <div className="flex-1 overflow-hidden flex flex-col">
                {/* Section Tabs */}
                <div className="flex gap-2 p-4 border-b border-white/20 overflow-x-auto">
                  <SectionButton
                    id="quick"
                    label="Quick"
                    icon={<Tag className="w-4 h-4" />}
                    isActive={activeSection === "quick"}
                  />
                  <SectionButton
                    id="time"
                    label="Time"
                    icon={<Calendar className="w-4 h-4" />}
                    isActive={activeSection === "time"}
                  />
                  <SectionButton
                    id="status"
                    label="Status"
                    icon={<Filter className="w-4 h-4" />}
                    isActive={activeSection === "status"}
                  />
                  <SectionButton
                    id="specialty"
                    label="Specialty"
                    icon={<Tag className="w-4 h-4" />}
                    isActive={activeSection === "specialty"}
                  />
                </div>
                
                {/* Filter Options */}
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-3">
                    {getSectionFilters().map(filter => (
                      <FilterPill
                        key={filter.id}
                        filter={filter}
                        isActive={activeFilters.includes(filter.id)}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Bottom Actions */}
              <div className="p-4 border-t border-white/20 bg-black/50">
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 h-12 text-white border-white/30 hover:bg-white/10"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => setIsOpen(false)}
                    className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};