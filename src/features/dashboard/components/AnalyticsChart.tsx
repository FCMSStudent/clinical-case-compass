import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/card";
import { Badge } from "@/shared/components/badge";
import { Button } from "@/shared/components/button";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  Area,
  AreaChart
} from "recharts";
import { TrendingUp, BarChart3, PieChart as PieChartIcon, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/shared/utils/utils";

interface ChartData {
  name: string;
  value: number;
  trend?: number;
  color?: string;
}

interface AnalyticsChartProps {
  title: string;
  data: ChartData[];
  type?: "line" | "bar" | "pie" | "area";
  showTrend?: boolean;
  height?: number;
  className?: string;
}

const COLORS = [
  "#3B82F6", // Blue
  "#10B981", // Green
  "#F59E0B", // Orange
  "#8B5CF6", // Purple
  "#EF4444", // Red
  "#06B6D4", // Cyan
  "#84CC16", // Lime
  "#F97316"  // Orange-red
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-lg p-3 shadow-lg">
        <p className="text-white font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }: any) => (
  <div className="flex flex-wrap justify-center gap-4 mt-4">
    {payload?.map((entry: any, index: number) => (
      <div key={index} className="flex items-center gap-2">
        <div 
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: entry.color }}
        />
        <span className="text-sm text-white/80">{entry.value}</span>
      </div>
    ))}
  </div>
);

export const AnalyticsChart = ({
  title,
  data,
  type = "line",
  showTrend = true,
  height = 300,
  className
}: AnalyticsChartProps) => {
  const [chartType, setChartType] = useState(type);
  const [isAnimating, setIsAnimating] = useState(false);

  const totalValue = data.reduce((sum, item) => sum + item.value, 0);
  const averageTrend = data.reduce((sum, item) => sum + (item.trend || 0), 0) / data.length;

  const handleChartTypeChange = (newType: typeof chartType) => {
    setIsAnimating(true);
    setTimeout(() => {
      setChartType(newType);
      setIsAnimating(false);
    }, 150);
  };

  const renderChart = () => {
    const commonProps = {
      data,
      width: "100%",
      height
    };

    switch (chartType) {
      case "bar":
        return (
          <ResponsiveContainer {...commonProps}>
            <BarChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
              />
              <YAxis 
                tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="value" 
                fill="#3B82F6"
                radius={[4, 4, 0, 0]}
                animationBegin={0}
                animationDuration={800}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );

      case "pie":
        return (
          <ResponsiveContainer {...commonProps}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                animationBegin={0}
                animationDuration={800}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
            </PieChart>
          </ResponsiveContainer>
        );

      case "area":
        return (
          <ResponsiveContainer {...commonProps}>
            <AreaChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
              />
              <YAxis 
                tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#3B82F6"
                fillOpacity={1}
                fill="url(#colorGradient)"
                strokeWidth={2}
                animationBegin={0}
                animationDuration={800}
              />
            </AreaChart>
          </ResponsiveContainer>
        );

      default: // line
        return (
          <ResponsiveContainer {...commonProps}>
            <LineChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
              />
              <YAxis 
                tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3B82F6"
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
                animationBegin={0}
                animationDuration={800}
              />
            </LineChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <Card className={cn("bg-white/10 backdrop-blur-md border border-white/20", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="h-5 w-5" />
              {title}
            </CardTitle>
            <div className="flex items-center gap-4 text-sm text-white/70">
              <span>Total: {totalValue}</span>
              {showTrend && (
                <div className="flex items-center gap-1">
                  <TrendingUp className={cn(
                    "h-4 w-4",
                    averageTrend >= 0 ? "text-green-400" : "text-red-400"
                  )} />
                  <span className={cn(
                    "font-medium",
                    averageTrend >= 0 ? "text-green-400" : "text-red-400"
                  )}>
                    {averageTrend >= 0 ? '+' : ''}{averageTrend.toFixed(1)}%
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Chart Type Selector */}
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              {data.length} items
            </Badge>
            <div className="flex bg-white/10 rounded-lg p-1 border border-white/20">
              {[
                { type: "line" as const, icon: Activity },
                { type: "bar" as const, icon: BarChart3 },
                { type: "pie" as const, icon: PieChartIcon }
              ].map(({ type: btnType, icon: Icon }) => (
                <Button
                  key={btnType}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleChartTypeChange(btnType)}
                  className={cn(
                    "p-2 transition-all duration-200",
                    chartType === btnType
                      ? "bg-white/20 text-white"
                      : "text-white/60 hover:text-white hover:bg-white/10"
                  )}
                >
                  <Icon className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <motion.div
          key={chartType}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "transition-opacity duration-150",
            isAnimating && "opacity-50"
          )}
        >
          {renderChart()}
        </motion.div>

        {/* Chart Statistics */}
        <div className="mt-6 pt-4 border-t border-white/20">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-white/70">Highest</p>
              <p className="text-lg font-semibold text-white">
                {Math.max(...data.map(d => d.value))}
              </p>
            </div>
            <div>
              <p className="text-sm text-white/70">Average</p>
              <p className="text-lg font-semibold text-white">
                {Math.round(totalValue / data.length)}
              </p>
            </div>
            <div>
              <p className="text-sm text-white/70">Lowest</p>
              <p className="text-lg font-semibold text-white">
                {Math.min(...data.map(d => d.value))}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};