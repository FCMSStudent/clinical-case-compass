import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  vitalSignsText, 
  createTypographyClass
} from '@/lib/typography';
import { 
  CheckCircle, 
  AlertTriangle, 
  AlertCircle,
  Clock
} from 'lucide-react';

export const ColorSystemDemo: React.FC = () => {
  return (
    <section className="space-y-6">
      <h2 className={createTypographyClass('h2', 'text-white')}>
        Medical Color System
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Status Colors */}
        <Card className="bg-white/10 backdrop-blur-xl border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Status Colors</CardTitle>
            <CardDescription className="text-white/70">
              Semantic colors for medical status indicators
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <span className="text-success">Success - Normal/Stable</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <span className="text-warning">Warning - Monitoring</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-error" />
              <span className="text-error">Error - Critical/Urgent</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-info" />
              <span className="text-info">Info - Ongoing/Chronic</span>
            </div>
          </CardContent>
        </Card>

        {/* Vital Signs Status */}
        <Card className="bg-white/10 backdrop-blur-xl border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Vital Signs Status</CardTitle>
            <CardDescription className="text-white/70">
              Color-coded vital sign readings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-white">Blood Pressure</span>
              <span className={vitalSignsText('normal')}>120/80</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white">Heart Rate</span>
              <span className={vitalSignsText('elevated')}>95 BPM</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white">Temperature</span>
              <span className={vitalSignsText('critical')}>103.2°F</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white">Oxygen Sat</span>
              <span className={vitalSignsText('normal')}>98%</span>
            </div>
          </CardContent>
        </Card>

        {/* Priority Levels */}
        <Card className="bg-white/10 backdrop-blur-xl border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Priority Levels</CardTitle>
            <CardDescription className="text-white/70">
              Medical priority classification system
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Badge className="bg-success/20 text-success border-success/30">
              Low Priority
            </Badge>
            <Badge className="bg-warning/20 text-warning border-warning/30">
              Medium Priority
            </Badge>
            <Badge className="bg-error/20 text-error border-error/30">
              High Priority
            </Badge>
            <Badge className="bg-error/30 text-error border-error/50 font-bold">
              Urgent Priority
            </Badge>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}; 