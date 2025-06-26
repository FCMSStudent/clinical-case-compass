import { Input } from "@/shared/components/input";
import { Button } from "@/shared/components/button";
import { Badge } from "@/shared/components/badge";
import { Card, CardContent } from "@/shared/components/card";
import { Search, Filter, X, Calendar, Tag, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/shared/utils/utils";
import { typography } from "@/design-system/tokens/typography";
import { layout, spacing, sizes } from "@/design-system/tokens/spacing";
import { liquidGlassClasses, getGlassHoverVariants } from "@/design-system/components/glass-effects";

interface FilterOption {
  id: string;
  label: string;
  count?: number;
  color?: string;
}

interface DashboardFiltersProps {
  onSearchChange: (search: string) => void;
  onFilterChange: (filters: string[]) => void;
  searchValue: string;
  activeFilters: string[];
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

export const DashboardFilters = ({
  onSearchChange,
  onFilterChange,
  searchValue,
  activeFilters,
  className
}: DashboardFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

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

  return (
    <div className={cn("space-y-4", className)}>
      {/* Main Search Bar - using design system */}
      <Card className={cn(liquidGlassClasses.card)}>
        <CardContent className={cn(sizes.card.md)}>
          <div className={cn("flex items-center", layout.grid.gap.sm)}>
            <div className="relative flex-1">
              <Search className={cn("absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4", typography.placeholder)} />
              <Input
                placeholder="Search cases, patients, or conditions..."
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                className={cn(
                  liquidGlassClasses.input,
                  "pl-10 text-white",
                  typography.placeholder
                )}
              />
            </div>
            <motion.div variants={getGlassHoverVariants('subtle')} whileHover="hover" whileTap="tap">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className={cn(liquidGlassClasses.button, "text-white")}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {hasActiveFilters && (
                  <Badge className="ml-2 bg-blue-500 text-white">
                    {activeFilters.length + (searchValue ? 1 : 0)}
                  </Badge>
                )}
              </Button>
            </motion.div>
          </div>

          {/* Active Filters Display - using typography tokens */}
          <AnimatePresence>
            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "flex flex-wrap items-center mt-3 pt-3 border-t border-white/20",
                  layout.grid.gap.sm
                )}
              >
                <span className={cn(typography.bodySmall)}>Active filters:</span>
                {searchValue && (
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    Search: "{searchValue}"
                    <button
                      onClick={() => onSearchChange("")}
                      className="ml-1 hover:text-red-300 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {activeFilters.map(filterId => {
                  const filter = [...quickFilters, ...timeFilters].find(f => f.id === filterId);
                  return (
                    <Badge
                      key={filterId}
                      variant="secondary"
                      className="bg-white/20 text-white"
                    >
                      {filter?.label || filterId}
                      <button
                        onClick={() => toggleFilter(filterId)}
                        className="ml-1 hover:text-red-300 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  );
                })}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className={cn(typography.caption, "text-white/70 hover:text-white hover:bg-white/10 h-6 px-2")}
                >
                  Clear all
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Expanded Filters - using design system */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Card className={cn(liquidGlassClasses.card)}>
              <CardContent className={cn(sizes.card.md, "space-y-4")}>
                {/* Quick Filters - using typography tokens */}
                <div>
                  <div className={cn("flex items-center justify-between mb-3")}>
                    <h3 className={cn(typography.labelSmall, "flex items-center", layout.grid.gap.sm)}>
                      <Tag className="h-4 w-4" />
                      Quick Filters
                    </h3>
                  </div>
                  <div className={cn("flex flex-wrap", layout.grid.gap.sm)}>
                    {quickFilters.map(filter => (
                      <motion.button
                        key={filter.id}
                        variants={getGlassHoverVariants('subtle')}
                        whileHover="hover"
                        whileTap="tap"
                        onClick={() => toggleFilter(filter.id)}
                        className={cn(
                          "flex items-center px-3 py-2 rounded-xl border transition-all duration-200",
                          layout.grid.gap.sm,
                          activeFilters.includes(filter.id)
                            ? cn(liquidGlassClasses.button, "border-white/40 text-white")
                            : "bg-white/5 border-white/20 text-white/70 hover:bg-white/10 hover:text-white"
                        )}
                      >
                        {filter.color && (
                          <div className={cn("w-2 h-2 rounded-full", filter.color)} />
                        )}
                        <span className={typography.button}>{filter.label}</span>
                        {filter.count && (
                          <Badge className="bg-white/20 text-white text-xs">
                            {filter.count}
                          </Badge>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Time Filters - using typography tokens */}
                <div>
                  <div className={cn("flex items-center justify-between mb-3")}>
                    <h3 className={cn(typography.labelSmall, "flex items-center", layout.grid.gap.sm)}>
                      <Calendar className="h-4 w-4" />
                      Time Range
                    </h3>
                  </div>
                  <div className={cn("flex flex-wrap", layout.grid.gap.sm)}>
                    {timeFilters.map(filter => (
                      <motion.button
                        key={filter.id}
                        variants={getGlassHoverVariants('subtle')}
                        whileHover="hover"
                        whileTap="tap"
                        onClick={() => toggleFilter(filter.id)}
                        className={cn(
                          "px-3 py-2 rounded-xl border transition-all duration-200",
                          activeFilters.includes(filter.id)
                            ? cn(liquidGlassClasses.button, "border-white/40 text-white")
                            : "bg-white/5 border-white/20 text-white/70 hover:bg-white/10 hover:text-white"
                        )}
                      >
                        <span className={typography.button}>{filter.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Advanced Options Toggle - using typography tokens */}
                <div className="pt-2 border-t border-white/20">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className={cn(typography.bodySmall, "text-white/70 hover:text-white hover:bg-white/10")}
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    {showAdvanced ? "Hide" : "Show"} Advanced Filters
                  </Button>
                </div>

                {/* Advanced Filters - using layout and typography tokens */}
                <AnimatePresence>
                  {showAdvanced && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-3 pt-3 border-t border-white/20"
                    >
                      <div className={cn(layout.grid.cols[1], "md:grid-cols-2", layout.grid.gap.md)} style={{ display: 'grid' }}>
                        <div>
                          <label className={cn(typography.labelSmall, "mb-2 block")}>
                            Case Status
                          </label>
                          <div className="space-y-1">
                            {["Active", "Completed", "Archived", "Draft"].map(status => (
                              <label key={status} className={cn("flex items-center", layout.grid.gap.sm, typography.bodySmall)}>
                                <input
                                  type="checkbox"
                                  checked={activeFilters.includes(status.toLowerCase())}
                                  onChange={() => toggleFilter(status.toLowerCase())}
                                  className="rounded border-white/20 bg-white/10"
                                />
                                {status}
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className={cn(typography.labelSmall, "mb-2 block")}>
                            Specialty
                          </label>
                          <div className="space-y-1">
                            {["Cardiology", "Neurology", "Emergency", "Surgery"].map(specialty => (
                              <label key={specialty} className={cn("flex items-center", layout.grid.gap.sm, typography.bodySmall)}>
                                <input
                                  type="checkbox"
                                  checked={activeFilters.includes(specialty.toLowerCase())}
                                  onChange={() => toggleFilter(specialty.toLowerCase())}
                                  className="rounded border-white/20 bg-white/10"
                                />
                                {specialty}
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};