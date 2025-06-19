
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Heart, 
  Activity, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle2,
  Clock,
  User,
  Calendar,
  Stethoscope
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';

export const ClinicalStatusDemo: React.FC = () => {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className={cn(typography.h2, 'text-white')}>
          Clinical Status Components
        </h2>
        <p className={cn(typography.body, 'text-white/70')}>
          Specialized components for displaying medical information and patient status
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vital Signs Card */}
        <Card className="bg-white/10 backdrop-blur-xl border-white/20">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Heart className="h-5 w-5 text-red-400" />
              <CardTitle className="text-white">Vital Signs</CardTitle>
            </div>
            <CardDescription className="text-white/70">
              Real-time patient monitoring
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h6 className={cn(typography.h6, 'text-white/80')}>Blood Pressure</h6>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-mono text-white">120/80</span>
                  <Badge variant="success">Normal</Badge>
                </div>
              </div>
              <div className="space-y-2">
                <h6 className={cn(typography.h6, 'text-white/80')}>Heart Rate</h6>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-mono text-white">72</span>
                  <Badge variant="success">BPM</Badge>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h6 className={cn(typography.h6, 'text-white/80')}>Oxygen Saturation</h6>
              <div className="flex items-center gap-3">
                <Progress value={98} className="flex-1" />
                <span className="text-lg font-mono text-white">98%</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-white/20">
              <div className="flex items-center gap-2 text-white/60">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Last updated: 2 min ago</span>
              </div>
              <Badge variant="success">Stable</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Patient Status Card */}
        <Card className="bg-white/10 backdrop-blur-xl border-white/20">
          <CardHeader>
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-blue-400" />
              <CardTitle className="text-white">Patient Status</CardTitle>
            </div>
            <CardDescription className="text-white/70">
              Overall condition and treatment progress
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white">Treatment Progress</span>
              <Badge variant="info">Day 3 of 7</Badge>
            </div>
            
            <Progress value={43} className="w-full" />
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                <span className="text-white/90">Medication administered</span>
              </div>
              <div className="flex items-center gap-3">
                <Activity className="h-5 w-5 text-blue-400" />
                <span className="text-white/90">Vitals monitored</span>
              </div>
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-400" />
                <span className="text-white/90">Follow-up required</span>
              </div>
            </div>
            
            <div className="flex gap-2 pt-4 border-t border-white/20">
              <Button size="sm" variant="outline" className="flex-1">
                <Stethoscope className="h-4 w-4 mr-2" />
                Examine
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}; 
