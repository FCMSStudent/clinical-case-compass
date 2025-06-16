import { LayoutDashboard, BookOpen, User } from "lucide-react";

export const navItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    description: "View your clinical learning overview and progress"
  },
  {
    href: "/cases",
    label: "Cases",
    icon: BookOpen,
    description: "Browse and manage your clinical cases"
  },
  {
    href: "/account",
    label: "Account",
    icon: User,
    description: "Manage your profile, settings, and preferences"
  },
]; 