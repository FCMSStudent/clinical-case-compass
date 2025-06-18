import { Card, CardContent } from "@/components/ui/card";
import { UserRound, TrendingUp, Activity, BookOpen, Users, Target, Plus, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { useDashboardData } from "@/features/dashboard/hooks/use-dashboard-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/app/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { MetricCardSkeleton } from "@/components/ui/dashboard-skeleton";
import { DynamicRecentActivity } from "@/features/dashboard/components/DynamicRecentActivity";
import { RecentCasesCarousel } from "@/components/ui/recent-cases-carousel";
import { 
  getComponentStyles, 
  button, 
  useTheme 
} from "@/lib/design-system";
import { card } from "@/lib/components";
import { animations } from "@/lib/animations";
import { typo, responsiveType } from "@/lib/typography";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  console.log('Dashboard component rendering');
  
  // Temporary simplified version to test if the component renders at all
  return (
    <div className="p-8 text-white">
      <h1>Dashboard Test</h1>
      <p>If you can see this, the component is rendering.</p>
      <p>Card object: {JSON.stringify(card ? 'defined' : 'undefined')}</p>
    </div>
  );
};

export default Dashboard;
