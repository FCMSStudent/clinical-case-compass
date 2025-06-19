import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  typography, 
  vitalSignsText, 
  medicalPriorityText, 
  clinicalStatusText, 
  treatmentStatusText,
  formatMedicalMeasurement,
  responsiveType,
  createTypographyClass,
  medicalTypography,
  componentTypography
} from '@/lib/typography';
import { 
  Heart, 
  Activity, 
  Thermometer, 
  Pill
} from 'lucide-react';

export const TypographyDemo: React.FC = () => {
  return (
    <section className="space-y-6">
      <h2 className={createTypographyClass('h2', 'text-white')}>
        Typography System
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Typography Hierarchy */}
        <Card className="bg-white/10 backdrop-blur-xl border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Typography Hierarchy</CardTitle>
            <CardDescription className="text-white/70">
              Standardized text scales with consistent line heights
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={typography.h1}>Heading 1 - Page Titles</div>
            <div className={typography.h2}>Heading 2 - Section Titles</div>
            <div className={typography.h3}>Heading 3 - Subsections</div>
            <div className={typography.h4}>Heading 4 - Card Headers</div>
            <div className={typography.bodyDefault}>Body Text - Regular content and descriptions</div>
            <div className={typography.bodySmall}>Small Body - Supporting information</div>
            <div className={typography.caption1}>Caption - Minimal text and metadata</div>
          </CardContent>
        </Card>

        {/* Medical Typography */}
        <Card className="bg-white/10 backdrop-blur-xl border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Medical Typography</CardTitle>
            <CardDescription className="text-white/70">
              Specialized typography for clinical data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Heart className="h-5 w-5 text-red-400" />
              <span className={typography.vital}>120/80</span>
              <span className={typography.label}>mmHg</span>
            </div>
            <div className="flex items-center gap-3">
              <Activity className="h-5 w-5 text-green-400" />
              <span className={typography.measurement}>72</span>
              <span className={typography.label}>BPM</span>
            </div>
            <div className="flex items-center gap-3">
              <Thermometer className="h-5 w-5 text-orange-400" />
              <span className={typography.measurement}>98.6°F</span>
            </div>
            <div className="flex items-center gap-3">
              <Pill className="h-5 w-5 text-blue-400" />
              <span className={medicalTypography.dosage}>500mg</span>
              <span className={componentTypography.label}>twice daily</span>
            </div>
            <div className={medicalTypography.diagnosis}>Primary Diagnosis: Hypertension</div>
            <div className={medicalTypography.clinicalNotes}>Patient reports feeling dizzy in the morning</div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}; 
