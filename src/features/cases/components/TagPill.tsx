import { memo } from "react";
import { Badge } from "@/shared/components/badge";
import { CaseTag } from "@/shared/types/case";
import { motion } from "framer-motion";
import { cn } from "@/shared/utils/utils";
import { Tag } from "lucide-react";

interface TagPillProps {
  tag: { id: string; name: string; color: string };
  className?: string;
}

export const TagPill = memo(({ tag, className }: TagPillProps) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    className={cn(
      "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium transition-colors",
      className
    )}
    style={{
      backgroundColor: `${tag.color}20`,
      color: tag.color,
    }}
  >
    <Tag className="h-3 w-3 mr-1" aria-hidden="true" />
    {tag.name}
  </motion.span>
));

TagPill.displayName = "TagPill"; 