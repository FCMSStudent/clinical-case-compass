/**
 * PHASE 2 DESIGN SYSTEM DEMO
 * Comprehensive showcase of the standardized typography and color systems
 * Clinical Case Compass - Design System Validation
 */

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { 
  typo, 
  vitalSignsText, 
  medicalPriorityText, 
  clinicalStatusText, 
  treatmentStatusText,
  formatMedicalMeasurement,
  responsiveType,
  createTypographyClass
} from '@/lib/typography';
import { designTokens } from '@/lib/design-tokens';
import { 
  Heart, 
  Activity, 
  Thermometer, 
  Droplets, 
  Stethoscope, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Pill,
  Calendar,
  User
} from 'lucide-react';

export function Phase2SystemDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 dark:from-blue-900 dark:via-blue-800 dark:to-blue-900">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-8 space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className={createTypographyClass('hero', 'text-white')}>
            Phase 2: Design System
          </h1>
          <p className={createTypographyClass('bodyLarge', 'text-white/80 max-w-3xl mx-auto')}>
            Standardized typography and color systems for the Clinical Case Compass. 
            This demo showcases the unified font families, semantic color tokens, 
            and medical-specific design patterns.
          </p>
        </div>

        {/* Typography System */}
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
                <div className={typo.h1}>Heading 1 - Page Titles</div>
                <div className={typo.h2}>Heading 2 - Section Titles</div>
                <div className={typo.h3}>Heading 3 - Subsections</div>
                <div className={typo.h4}>Heading 4 - Card Headers</div>
                <div className={typo.bodyDefault}>Body Text - Regular content and descriptions</div>
                <div className={typo.bodySmall}>Small Body - Supporting information</div>
                <div className={typo.caption}>Caption - Minimal text and metadata</div>
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
                  <span className={typo.vital}>120/80</span>
                  <span className={typo.label}>mmHg</span>
                </div>
                <div className="flex items-center gap-3">
                  <Activity className="h-5 w-5 text-green-400" />
                  <span className={typo.measurement}>72</span>
                  <span className={typo.label}>BPM</span>
                </div>
                <div className="flex items-center gap-3">
                  <Thermometer className="h-5 w-5 text-orange-400" />
                  <span className={typo.measurement}>98.6°F</span>
                </div>
                <div className="flex items-center gap-3">
                  <Pill className="h-5 w-5 text-blue-400" />
                  <span className={typo.dosage}>500mg</span>
                  <span className={typo.label}>twice daily</span>
                </div>
                <div className={typo.diagnosis}>Primary Diagnosis: Hypertension</div>
                <div className={typo.note}>Patient reports feeling dizzy in the morning</div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Color System */}
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

        {/* Clinical Status Examples */}
        <section className="space-y-6">
          <h2 className={createTypographyClass('h2', 'text-white')}>
            Clinical Status Examples
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Patient Status Card */}
            <Card className="bg-white/10 backdrop-blur-xl border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Patient Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Overall Status</span>
                  <span className={clinicalStatusText('stable')}>Stable</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Monitoring Level</span>
                  <span className={clinicalStatusText('monitoring')}>Active Monitoring</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Condition Type</span>
                  <span className={clinicalStatusText('chronic')}>Chronic</span>
                </div>
                
                <div className="pt-4 border-t border-white/20">
                  <h4 className={typo.h6}>Recent Vitals</h4>
                  <div className="mt-2 space-y-2">
                    {(() => {
                      const bp = formatMedicalMeasurement('120/80', 'mmHg', 'normal');
                      const hr = formatMedicalMeasurement('72', 'BPM', 'normal');
                      const temp = formatMedicalMeasurement('98.6', '°F', 'normal');
                      
                      return (
                        <>
                          <div className="flex justify-between">
                            <span className="text-white/70">Blood Pressure</span>
                            <span className={bp.className}>{bp.value} {bp.unit}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Heart Rate</span>
                            <span className={hr.className}>{hr.value} {hr.unit}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Temperature</span>
                            <span className={temp.className}>{temp.value} {temp.unit}</span>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Treatment Status Card */}
            <Card className="bg-white/10 backdrop-blur-xl border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Stethoscope className="h-5 w-5" />
                  Treatment Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">Medication Therapy</span>
                    <span className={treatmentStatusText('ongoing')}>Ongoing</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">Physical Therapy</span>
                    <span className={treatmentStatusText('pending')}>Pending</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">Lab Results</span>
                    <span className={treatmentStatusText('complete')}>Complete</span>
                  </div>
                </div>
                
                <Alert className="bg-warning/20 border-warning/30">
                  <AlertTriangle className="h-4 w-4 text-warning" />
                  <AlertTitle className="text-warning">Follow-up Required</AlertTitle>
                  <AlertDescription className="text-warning/80">
                    Patient scheduled for follow-up appointment in 2 weeks
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Specialty Colors */}
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

        {/* Responsive Typography */}
        <section className="space-y-6">
          <h2 className={createTypographyClass('h2', 'text-white')}>
            Responsive Typography
          </h2>
          
          <Card className="bg-white/10 backdrop-blur-xl border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Responsive Design</CardTitle>
              <CardDescription className="text-white/70">
                Typography that adapts to different screen sizes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className={responsiveType.hero + ' text-white'}>
                Hero Text - Scales from 3xl to 6xl
              </div>
              <div className={responsiveType.display + ' text-white'}>
                Display Text - Scales from 2xl to 4xl
              </div>
              <div className={responsiveType.h1 + ' text-white'}>
                Heading 1 - Scales from 2xl to 4xl
              </div>
              <div className={responsiveType.body + ' text-white/80'}>
                Body text that scales from small to base size for optimal readability 
                across all device sizes, ensuring consistent user experience.
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Usage Examples */}
        <section className="space-y-6">
          <h2 className={createTypographyClass('h2', 'text-white')}>
            Implementation Examples
          </h2>
          
          <Card className="bg-white/10 backdrop-blur-xl border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Code Examples</CardTitle>
              <CardDescription className="text-white/70">
                How to use the new design system in your components
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-black/20 p-4 rounded-lg">
                <code className="text-green-400 text-sm">
{`// Typography usage
import { typo, vitalSignsText } from '@/lib/typography';

<h1 className={typo.h1}>Patient Dashboard</h1>
<div className={vitalSignsText('normal')}>120/80 mmHg</div>

// Medical measurements
const bp = formatMedicalMeasurement('120/80', 'mmHg', 'normal');
<span className={bp.className}>{bp.value} {bp.unit}</span>`}
                </code>
              </div>
              
              <div className="bg-black/20 p-4 rounded-lg">
                <code className="text-blue-400 text-sm">
{`// Color system usage
// Status colors
<Badge className="status-success">Normal</Badge>
<Badge className="status-warning">Elevated</Badge>
<Badge className="status-error">Critical</Badge>

// Medical priorities
<span className={medicalPriorityText('high')}>High Priority</span>`}
                </code>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
        <div className="text-center pt-12 border-t border-white/20">
          <p className={createTypographyClass('body', 'text-white/70')}>
            Phase 2 Complete: Typography & Color Systems Standardized
          </p>
          <p className={createTypographyClass('caption', 'text-white/60 mt-2')}>
            All design tokens are now centralized and medical-specific semantic meanings are established
          </p>
        </div>
      </div>
    </div>
  );
}
