import React, { useState } from "react";
import { Input } from "@/shared/components/input";
import { Search, Loader2, X, Filter, Sparkles } from "lucide-react";
import { ICON_SIZE } from "@/shared/constants/ui";
import { cn } from "@/shared/utils/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/shared/components/button";

type SearchPanelProps = {
  value: string;
  onChange: (newValue: string) => void;
  onSearch?: (value: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  className?: string;
};

export const SearchPanel: React.FC<SearchPanelProps> = React.memo(
  ({
    value,
    onChange,
    onSearch,
    isLoading = false,
    placeholder = "Search case titles and chief complaints...",
    className,
  }) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && onSearch) {
        onSearch(value);
      }
    };

    const handleClear = () => {
      onChange("");
      // Focus back to input after clearing
      setTimeout(() => {
        const input = document.querySelector('input[type="search"]') as HTMLInputElement;
        if (input) input.focus();
      }, 0);
    };

    return (
      <div className={cn("relative w-full", className)}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative"
        >
          <div className={cn(
            "relative flex items-center transition-all duration-300",
            isFocused && "scale-[1.02]"
          )}>
            {/* Search Icon */}
            <div className="absolute left-4 flex items-center pointer-events-none z-10">
              <motion.div
                animate={{ 
                  scale: isLoading ? [1, 1.1, 1] : 1,
                  rotate: isLoading ? 360 : 0
                }}
                transition={{ 
                  duration: isLoading ? 1 : 0.3,
                  repeat: isLoading ? Infinity : 0,
                  ease: "linear"
                }}
                className="flex items-center gap-2"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 text-primary animate-spin" />
                ) : (
                  <Search className="h-5 w-5 text-muted-foreground" />
                )}
                {isFocused && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="flex items-center gap-1"
                  >
                    <Sparkles className="h-3 w-3 text-primary" />
                  </motion.div>
                )}
              </motion.div>
            </div>

            {/* Input Field */}
            <Input
              type="search"
              value={value}
              onChange={(e) => onChange(e.currentTarget.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={placeholder}
              className={cn(
                "pl-12 pr-12 py-3 w-full text-base transition-all duration-300",
                "border-2 bg-background/50 backdrop-blur-sm",
                "focus:border-primary/50 focus:bg-background/80",
                "hover:border-primary/30 hover:bg-background/60",
                isFocused && "shadow-lg shadow-primary/10"
              )}
              aria-label="Search cases"
            />

            {/* Clear Button */}
            <AnimatePresence>
              {value && !isLoading && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute right-4 z-10"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClear}
                    className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Filter Button */}
            <AnimatePresence>
              {isFocused && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute right-12 z-10"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 text-muted-foreground hover:text-primary hover:bg-primary/10"
                    aria-label="Filter options"
                  >
                    <Filter className="h-4 w-4" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Focus Indicator */}
          <motion.div
            className="absolute inset-0 rounded-md bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 opacity-0 pointer-events-none"
            animate={{ 
              opacity: isFocused ? 1 : 0,
              scale: isFocused ? 1.02 : 1
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </motion.div>

        {/* Search Suggestions (when focused and no value) */}
        <AnimatePresence>
          {isFocused && !value && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full left-0 right-0 mt-2 bg-background/95 backdrop-blur-sm border border-border/50 rounded-lg shadow-lg z-20"
            >
              <div className="p-3">
                <div className="text-xs font-medium text-muted-foreground mb-2">
                  Quick suggestions
                </div>
                <div className="space-y-1">
                  {[
                    "Cardiology cases",
                    "Recent updates",
                    "Learning points",
                    "Resources"
                  ].map((suggestion, index) => (
                    <motion.button
                      key={suggestion}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      onClick={() => onChange(suggestion)}
                      className="w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
                    >
                      {suggestion}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
