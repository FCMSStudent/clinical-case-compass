import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ICON_SIZE } from "@/constants/ui";
import React from "react";

export const SearchPanel = () => {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className={`${ICON_SIZE} text-muted-foreground`} />
      </div>
      <Input
        type="search"
        placeholder="Search case titles and chief complaints..."
        className="pl-10 pr-4 py-2 w-full"
      />
    </div>
  );
};
