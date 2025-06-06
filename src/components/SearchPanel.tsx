import React from "react";
import { Input } from "@/components/ui/input";
import { Search, Loader2, X } from "lucide-react";
import { ICON_SIZE } from "@/constants/ui";
import { cn } from "@/lib/utils";

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
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && onSearch) {
        onSearch(value);
      }
    };

    return (
      <div className={cn("relative w-full", className)}>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {isLoading ? (
            <Loader2 className={`${ICON_SIZE} animate-spin text-muted-foreground`} />
          ) : (
            <Search className={`${ICON_SIZE} text-muted-foreground`} />
          )}
        </div>
        <Input
          type="search"
          value={value}
          onChange={(e) => onChange(e.currentTarget.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="pl-10 pr-10 py-2 w-full"
          aria-label="Search cases"
        />
        {value && !isLoading && (
          <button
            onClick={() => onChange("")}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);
