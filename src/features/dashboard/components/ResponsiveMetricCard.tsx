import { Card, CardContent } from "@/shared/components/card";
import { Badge } from "@/shared/components/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/shared/utils/utils";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { typography } from "@/design-system/tokens/typography";
import { liquidGlassClasses, getGlassHoverVariants } from "@/design-system/components/glass-effects";
import { useIsMobile } from "@/shared/hooks/use-is-mobile";

interface TrendData {
  period: string;
  value: number;
}

interface ResponsiveMetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
    percentage: number;
  } | undefined;
  sparklineData?: TrendData[] | undefined;
  color?: "blue" | "green" | "orange" | "purple" | "indigo";
  priority?: "high" | "medium" | "low";
  className?: string;
}

const colorSchemes = {
  blue: {
    bg: "bg-blue-500/20",
    border: "border-blue-400/30",
    text: "text-blue-300",
    accent: "bg-blue-400",
    sparkline: "#3B82F6"
  },
  green: {
    bg: "bg-green-500/20",
    border: "border-green-400/30",
    text: "text-green-300",
    accent: "bg-green-400",
    sparkline: "#10B981"
  },
  orange: {
    bg: "bg-orange-500/20",
    border: "border-orange-400/30",
    text: "text-orange-300",
    accent: "bg-orange-400",
    sparkline: "#F59E0B"
  },
  purple: {
    bg: "bg-purple-500/20",
    border: "border-purple-400/30",
    text: "text-purple-300",
    accent: "bg-purple-400",
    sparkline: "#8B5CF6"
  },
  indigo: {
    bg: "bg-indigo-500/20",
    border: "border-indigo-400/30",
    text: "text-indigo-300",
    accent: "bg-indigo-400",
    sparkline: "#6366F1"
  }
};

export const ResponsiveMetricCard = ({
  title,
  value,
  icon,
  description,
  trend,
  sparklineData,
  color = "blue",
  priority = "medium",
  className
}: ResponsiveMetricCardProps) => {
  const isMobile = useIsMobile();
  const scheme = colorSchemes[color];
  
  const getTrendIcon = () => {
    if (!trend) return <Minus className="h-3 w-3" />;
    return trend.isPositive ? 
      <TrendingUp className="h-3 w-3" /> : 
      <TrendingDown className="h-3 w-3" />;
  };

  const getTrendColor = () => {
    if (!trend) return "text-white/60";
    return trend.isPositive ? "text-green-400" : "text-red-400";
  };

  const getPriorityIndicator = () => {
    if (isMobile) return ""; // Skip priority indicators on mobile for cleaner look
    switch (priority) {
      case "high":
        return "border-l-4 border-l-red-400";
      case "medium":
        return "border-l-4 border-l-yellow-400";
      case "low":
        return "border-l-4 border-l-green-400";
      default:
        return "";
    }
  };

  // Mobile layout
  if (isMobile) {
    return (
      <motion.div
        variants={getGlassHoverVariants('subtle')}
        whileHover="hover"
        whileTap="tap"
        className={className}
      >
        <Card className={cn(
          liquidGlassClasses.card,
          "relative overflow-hidden"
        )}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className={cn(typography.caption, "text-white/70")}>
                  {title}
                </div>
                <div className={cn("text-2xl font-bold text-white")}>
                  {value}
                </div>
                {trend && (
                  <div className={cn("flex items-center gap-1")}>
                    <div className={getTrendColor()}>
                      {getTrendIcon()}
                    </div>
                    <span className={cn(typography.caption, "font-medium", getTrendColor())}>
                      {trend.percentage}%
                    </span>
                  </div>
                )}
              </div>
              <div className={cn(
                "p-2 rounded-lg",
                scheme.bg,
                scheme.border
              )}>
                <div className={cn(scheme.text, "w-6 h-6")}>
                  {icon}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  // Desktop layout (enhanced version)
  return (
    <motion.div
      variants={getGlassHoverVariants('medium')}
      whileHover="hover"
      whileTap="tap"
      className={className}
    >
      <Card className={cn(
        liquidGlassClasses.card,
        "relative overflow-hidden group",
        getPriorityIndicator()
      )}>
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Header */}
            <div className={cn("flex items-center justify-between")}>
              <div className="space-y-1">
                <div className={cn(typography.labelSmall, "text-white/80")}>
                  {title}
                </div>
                {description && (
                  <p className={cn(typography.caption, "text-white/60")}>{description}</p>
                )}
              </div>
              <div className={cn(
                "p-3 rounded-xl border transition-all duration-300",
                scheme.bg,
                scheme.border,
                "group-hover:scale-110"
              )}>
                <div className={scheme.text}>
                  {icon}
                </div>
              </div>
            </div>

            {/* Main Value */}
            <div className={cn("flex items-baseline justify-between")}>
              <motion.span 
                className={cn("text-3xl font-bold text-white")}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {value}
              </motion.span>
              
              {/* Trend Indicator */}
              {trend && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className={cn("flex items-center gap-2")}
                >
                  <div className={getTrendColor()}>
                    {getTrendIcon()}
                  </div>
                  <span className={cn(typography.bodySmall, "font-medium", getTrendColor())}>
                    {trend.percentage}%
                  </span>
                </motion.div>
              )}
            </div>

            {/* Sparkline Chart */}
            {sparklineData && sparklineData.length > 0 && (
              <div className="h-12 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sparklineData}>
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={scheme.sparkline}
                      strokeWidth={2}
                      dot={false}
                      animationDuration={1000}
                      animationBegin={300}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Status Badge */}
            {trend && (
              <div className={cn("flex justify-end")}>
                <Badge 
                  variant="secondary" 
                  className={cn(
                    typography.caption,
                    scheme.bg,
                    scheme.text,
                    "border-white/30"
                  )}
                >
                  {trend.isPositive ? "↗ Growing" : "↘ Declining"}
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};