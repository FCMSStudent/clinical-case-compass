import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/card";
import { Brain, Heart, Bone, Eye, Stethoscope, TrendingUp, Target, Award } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/shared/components/badge";
import { Button } from "@/shared/components/button";
import { ComponentType } from "react";

interface SpecialtyProgressProps {
  data: [string, number][];
}

const specialtyIcons: Record<string, ComponentType<{ className?: string }>> = {
  "Neurology": Brain,
  "Cardiology": Heart,
  "Pulmonology": Stethoscope,
  "Orthopedics": Bone,
  "Ophthalmology": Eye,
  "default": Stethoscope
};

const specialtyColors = {
  "Neurology": {
    bg: "bg-purple-500/10",
    text: "text-purple-600",
    border: "border-purple-200",
    icon: "bg-purple-500/20",
    gradient: "from-purple-500 to-purple-600"
  },
  "Cardiology": {
    bg: "bg-red-500/10",
    text: "text-red-600",
    border: "border-red-200",
    icon: "bg-red-500/20",
    gradient: "from-red-500 to-red-600"
  },
  "Pulmonology": {
    bg: "bg-blue-500/10",
    text: "text-blue-600",
    border: "border-blue-200",
    icon: "bg-blue-500/20",
    gradient: "from-blue-500 to-blue-600"
  },
  "Orthopedics": {
    bg: "bg-orange-500/10",
    text: "text-orange-600",
    border: "border-orange-200",
    icon: "bg-orange-500/20",
    gradient: "from-orange-500 to-orange-600"
  },
  "Ophthalmology": {
    bg: "bg-green-500/10",
    text: "text-green-600",
    border: "border-green-200",
    icon: "bg-green-500/20",
    gradient: "from-green-500 to-green-600"
  },
  "default": {
    bg: "bg-gray-500/10",
    text: "text-gray-600",
    border: "border-gray-200",
    icon: "bg-gray-500/20",
    gradient: "from-gray-500 to-gray-600"
  }
};

export const SpecialtyProgress = ({ data }: SpecialtyProgressProps) => {
  if (data.length === 0) {
    return (
      <div className="relative">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl"></div>
        <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
          <div className="pb-6 pt-6 px-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h3 className="text-xl font-bold flex items-center gap-2 text-white">
                  <Stethoscope className="h-6 w-6 text-white/80" />
                  Specialty Focus
                </h3>
                <p className="text-white/70">
                  Your case distribution across medical specialties
                </p>
              </div>
              <div className="p-3 rounded-full bg-white/20 border border-white/30">
                <Target className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
          <div className="text-center py-12">
            <div className="p-6 rounded-full bg-white/20 mx-auto w-20 h-20 flex items-center justify-center mb-4">
              <Stethoscope className="h-8 w-8 text-white/60" />
            </div>
            <h3 className="text-lg font-semibold text-white/80 mb-2">
              No specialty data yet
            </h3>
            <p className="text-white/70 mb-4">
              Start creating cases to see your specialty distribution and track your learning focus.
            </p>
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/20">
              Create Your First Case
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const totalCases = data.reduce((sum, [, count]) => sum + count, 0);

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl"></div>
      <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
        <div className="pb-6 pt-6 px-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h3 className="text-xl font-bold flex items-center gap-2 text-white">
                <Stethoscope className="h-6 w-6 text-white/80" />
                Specialty Focus
              </h3>
              <p className="text-white/70">
                Your case distribution across medical specialties
              </p>
            </div>
            <div className="p-3 rounded-full bg-white/20 border border-white/30">
              <Award className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
        <div className="px-6 pb-6 space-y-6">
          {data.map(([specialty, count], index) => {
            const IconComponent = specialtyIcons[specialty] || specialtyIcons.default;
            const percentage = Math.round((count / totalCases) * 100);
            const colors = specialtyColors[specialty] || specialtyColors.default;
            const isTopSpecialty = index === 0;
            
            return (
              <motion.div
                key={specialty}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                className="group"
              >
                <div className={`
                  relative p-4 rounded-lg border transition-all duration-300 cursor-pointer
                  hover:shadow-lg hover:scale-[1.02] group-hover:border-white/40
                  ${colors.bg.replace('/10', '/20')} ${colors.border.replace('-200', '-400/30')}
                  ${isTopSpecialty ? 'ring-2 ring-white/20 shadow-md' : ''}
                `}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`
                        relative p-3 rounded-xl border transition-all duration-300 group-hover:scale-110
                        ${colors.icon.replace('/20', '/30')} ${colors.border.replace('-200', '-400/30')}
                      `}>
                        <div className={`
                          absolute inset-0 rounded-xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300
                          ${colors.gradient}
                        `} />
                        <IconComponent className="h-5 w-5 text-white relative z-10" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-sm group-hover:text-white transition-colors text-white/90">
                            {specialty}
                          </h4>
                          {isTopSpecialty && (
                            <Badge variant="default" className="bg-white/30 text-white text-xs">
                              <TrendingUp className="h-2 w-2 mr-1" />
                              Top
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-white/70">{count} cases</span>
                          <span className="text-xs text-white/70">•</span>
                          <span className="text-xs text-white/70">{percentage}% of total</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-lg font-bold text-white/90">{percentage}%</div>
                        <div className="text-xs text-white/70">Focus</div>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-white opacity-60" />
                    </div>
                  </div>
                  {/* Progress Bar */}
                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-white/70">Progress</span>
                      <span className="font-medium text-white/90">{percentage}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className={`h-2 rounded-full bg-white/70 relative`}
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, delay: index * 0.2, ease: "easeOut" }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}; 