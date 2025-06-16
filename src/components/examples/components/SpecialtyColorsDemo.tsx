import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  createTypographyClass
} from '@/lib/typography';
import { 
  Heart, 
  Activity, 
  Calendar
} from 'lucide-react';

export const SpecialtyColorsDemo: React.FC = () => {
  return (
    <section className="space-y-6">
      <h2 className={createTypographyClass('h2', 'text-white')}>
        Medical Specialty Colors
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white/10 backdrop-blur-xl border-cardiology-500/30">
          <CardHeader>
            <CardTitle className="text-cardiology-400 flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Cardiology
            </CardTitle>
            <CardDescription className="text-white/70">
              Heart and cardiovascular conditions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-cardiology-300">
              Primary focus on heart health, blood pressure, and circulation
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-xl border-neurology-500/30">
          <CardHeader>
            <CardTitle className="text-neurology-400 flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Neurology
            </CardTitle>
            <CardDescription className="text-white/70">
              Nervous system and brain conditions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-neurology-300">
              Specialized care for neurological disorders and brain health
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-xl border-orthopedic-500/30">
          <CardHeader>
            <CardTitle className="text-orthopedic-400 flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Orthopedic
            </CardTitle>
            <CardDescription className="text-white/70">
              Bone, joint, and musculoskeletal system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-orthopedic-300">
              Treatment of bones, joints, ligaments, and muscle conditions
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}; 