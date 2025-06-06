import type { LucideIcon } from "lucide-react";
import { LayoutDashboard, BookOpen, Settings } from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/cases", label: "Cases", icon: BookOpen },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default NAV_ITEMS;
