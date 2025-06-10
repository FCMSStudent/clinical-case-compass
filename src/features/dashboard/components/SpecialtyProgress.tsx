import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Heart, Activity, Bone, Eye, Stethoscope } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface SpecialtyProgressProps {
  data: [string, number][];
}

const specialtyIcons: Record<string, React.ComponentType<any>> = {
  "Neurology": Brain,
  "Cardiology": Heart,
  "Pulmonology": Activity,
  "Orthopedics": Bone,
  "Ophthalmology": Eye,
  "default": Stethoscope
};

export const SpecialtyProgress = ({ data }: SpecialtyProgressProps) => {
  if (data.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-card to-card/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Stethoscope className="h-5 w-5 text-primary" />
            Specialty Focus
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Stethoscope className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No specialty data available yet.</p>
            <p className="text-sm text-muted-foreground mt-1">
              Start creating cases to see your specialty distribution.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const totalCases = data.reduce((sum, [, count]) => sum + count, 0);

  return (
    <Card className="bg-gradient-to-br from-card to-card/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Stethoscope className="h-5 w-5 text-primary" />
          Specialty Focus
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.map(([specialty, count], index) => {
          const IconComponent = specialtyIcons[specialty] || specialtyIcons.default;
          const percentage = Math.round((count / totalCases) * 100);
          const intensity = Math.min(percentage / 20, 1); // Scale for visual intensity

          return (
            <motion.div
              key={specialty}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <IconComponent className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-sm">{specialty}</div>
                  <div className="text-xs text-muted-foreground">{count} cases</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge 
                  variant="secondary" 
                  className="bg-primary/10 text-primary hover:bg-primary/20"
                >
                  {percentage}%
                </Badge>
                <div 
                  className="w-2 h-2 rounded-full bg-primary"
                  style={{ opacity: intensity }}
                />
              </div>
            </motion.div>
          );
        })}
        
        <div className="pt-4 border-t border-border/50">
          <div className="text-center">
            <div className="text-sm text-muted-foreground">
              Total cases across {data.length} specialties
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 