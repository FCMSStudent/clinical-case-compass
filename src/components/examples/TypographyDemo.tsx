import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  typography, 
  medicalTypography, 
  componentTypography, 
  statusTypography,
  responsiveType,
  vitalSignsText,
  medicalPriorityText,
  clinicalStatusText,
  treatmentStatusText,
  formatMedicalMeasurement
} from '@/lib/typography';

export default function TypographyDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className={typography.largeTitle + " text-white"}>
            Apple-Inspired Typography System
          </h1>
          <p className={typography.body + " text-white/80 max-w-3xl mx-auto"}>
            A comprehensive typography system based on Apple's Human Interface Guidelines, 
            featuring San Francisco fonts, proper hierarchy, and medical-specific styles.
          </p>
        </div>

        {/* Core Typography Hierarchy */}
        <Card className="backdrop-blur-xl bg-white/10 border-white/20">
          <CardHeader>
            <CardTitle className={componentTypography.cardTitle + " text-white"}>
              Core Typography Hierarchy
            </CardTitle>
            <CardDescription className={componentTypography.cardCaption + " text-white/70"}>
              Apple's HIG-inspired text styles with proper weights and spacing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <h2 className={typography.largeTitle + " text-white mb-2"}>
                  Large Title (34pt Semibold)
                </h2>
                <p className={typography.caption1 + " text-white/60"}>
                  Used for the most prominent text, like navigation titles
                </p>
              </div>
              
              <div>
                <h3 className={typography.title + " text-white mb-2"}>
                  Title (28pt Semibold)
                </h3>
                <p className={typography.caption1 + " text-white/60"}>
                  Used for section headers and important content titles
                </p>
              </div>
              
              <div>
                <h4 className={typography.headline + " text-white mb-2"}>
                  Headline (17pt Semibold)
                </h4>
                <p className={typography.caption1 + " text-white/60"}>
                  Used for card titles and prominent labels
                </p>
              </div>
              
              <div>
                <p className={typography.body + " text-white mb-2"}>
                  Body (17pt Regular) - This is the primary text style for content. 
                  It features comfortable line height and proper letter spacing for optimal readability.
                </p>
                <p className={typography.caption1 + " text-white/60"}>
                  Used for main content and descriptions
                </p>
              </div>
              
              <div>
                <p className={typography.callout + " text-white mb-2"}>
                  Callout (16pt Regular) - Used for highlighted content and important notes.
                </p>
                <p className={typography.caption1 + " text-white/60"}>
                  Used for highlighted content and important notes
                </p>
              </div>
              
              <div>
                <p className={typography.subheadline + " text-white mb-2"}>
                  Subheadline (15pt Regular) - Secondary content and supporting text.
                </p>
                <p className={typography.caption1 + " text-white/60"}>
                  Used for secondary content and supporting text
                </p>
              </div>
              
              <div>
                <p className={typography.footnote + " text-white mb-2"}>
                  Footnote (13pt Regular) - Additional information and citations.
                </p>
                <p className={typography.caption1 + " text-white/60"}>
                  Used for additional information and citations
                </p>
              </div>
              
              <div>
                <p className={typography.caption1 + " text-white mb-2"}>
                  Caption 1 (12pt Regular) - Small labels and metadata.
                </p>
                <p className={typography.caption2 + " text-white/60"}>
                  Caption 2 (11pt Regular) - Even smaller text for fine details.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Medical Typography */}
        <Card className="backdrop-blur-xl bg-white/10 border-white/20">
          <CardHeader>
            <CardTitle className={componentTypography.cardTitle + " text-white"}>
              Medical Typography
            </CardTitle>
            <CardDescription className={componentTypography.cardCaption + " text-white/70"}>
              Specialized typography for medical content with proper hierarchy
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className={medicalTypography.patientName + " text-white mb-2"}>
                  John Smith, 45
                </h3>
                <p className={typography.caption1 + " text-white/60"}>
                  Patient Name - Large Title weight for prominence
                </p>
              </div>
              
              <div>
                <h4 className={medicalTypography.diagnosis + " text-white mb-2"}>
                  Acute Myocardial Infarction
                </h4>
                <p className={typography.caption1 + " text-white/60"}>
                  Diagnosis - Title weight for medical conditions
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <p className={medicalTypography.vitals + " text-white"}>
                    BP: 140/90
                  </p>
                  <p className={typography.caption1 + " text-white/60"}>
                    Vital Signs - Monospace for numbers
                  </p>
                </div>
                
                <div className="space-y-2">
                  <p className={medicalTypography.labResults + " text-white"}>
                    HbA1c: 6.2%
                  </p>
                  <p className={typography.caption1 + " text-white/60"}>
                    Lab Results - Monospace for precision
                  </p>
                </div>
                
                <div className="space-y-2">
                  <p className={medicalTypography.medication + " text-white"}>
                    Metformin 500mg
                  </p>
                  <p className={typography.caption1 + " text-white/60"}>
                    Medication - Medium weight for clarity
                  </p>
                </div>
              </div>
              
              <div>
                <p className={medicalTypography.clinicalNotes + " text-white mb-2"}>
                  Patient presents with chest pain radiating to left arm. 
                  ECG shows ST elevation in leads II, III, aVF. 
                  Immediate intervention required.
                </p>
                <p className={typography.caption1 + " text-white/60"}>
                  Clinical Notes - Body weight for detailed documentation
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Badge className={medicalTypography.dosage + " bg-blue-500/20 text-blue-300 border-blue-500/30"}>
                  500mg BID
                </Badge>
                <Badge className={medicalTypography.status + " bg-green-500/20 text-green-300 border-green-500/30"}>
                  Stable
                </Badge>
                <Badge className={medicalTypography.status + " bg-amber-500/20 text-amber-300 border-amber-500/30"}>
                  Monitoring
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Component Typography */}
        <Card className="backdrop-blur-xl bg-white/10 border-white/20">
          <CardHeader>
            <CardTitle className={componentTypography.cardTitle + " text-white"}>
              Component Typography
            </CardTitle>
            <CardDescription className={componentTypography.cardCaption + " text-white/70"}>
              Typography styles optimized for specific UI components
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <h4 className={componentTypography.navTitle + " text-white mb-2"}>
                  Navigation Title
                </h4>
                <p className={componentTypography.navItem + " text-white/80 mb-4"}>
                  Navigation Item
                </p>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <button className={`px-4 py-2 rounded-lg bg-blue-500/20 border border-blue-500/30 ${componentTypography.buttonLarge} text-white hover:bg-blue-500/30 transition-colors`}>
                  Large Button
                </button>
                <button className={`px-3 py-2 rounded-lg bg-blue-500/20 border border-blue-500/30 ${componentTypography.buttonDefault} text-white hover:bg-blue-500/30 transition-colors`}>
                  Default Button
                </button>
                <button className={`px-2 py-1 rounded-md bg-blue-500/20 border border-blue-500/30 ${componentTypography.buttonSmall} text-white hover:bg-blue-500/30 transition-colors`}>
                  Small Button
                </button>
              </div>
              
              <div className="space-y-2">
                <label className={`block ${componentTypography.label} text-white`}>
                  Form Label
                </label>
                <input 
                  type="text" 
                  placeholder="Input placeholder text"
                  className={`w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 ${componentTypography.input} text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className={componentTypography.cardTitle + " text-white mb-2"}>
                    Card Title
                  </h5>
                  <p className={componentTypography.cardBody + " text-white/80 mb-2"}>
                    Card body text with proper line height and spacing for optimal readability.
                  </p>
                  <p className={componentTypography.cardCaption + " text-white/60"}>
                    Card caption for additional context
                  </p>
                </div>
                
                <div>
                  <h6 className={componentTypography.tableHeader + " text-white mb-2"}>
                    Table Header
                  </h6>
                  <p className={componentTypography.tableCell + " text-white/80"}>
                    Table cell content with appropriate sizing
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status Typography */}
        <Card className="backdrop-blur-xl bg-white/10 border-white/20">
          <CardHeader>
            <CardTitle className={componentTypography.cardTitle + " text-white"}>
              Status Typography
            </CardTitle>
            <CardDescription className={componentTypography.cardCaption + " text-white/70"}>
              Color-coded typography for different status levels
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <p className={statusTypography.critical}>
                    Critical Status
                  </p>
                  <p className={typography.caption1 + " text-white/60"}>
                    Semibold red text for critical information
                  </p>
                </div>
                
                <div className="space-y-2">
                  <p className={statusTypography.warning}>
                    Warning Status
                  </p>
                  <p className={typography.caption1 + " text-white/60"}>
                    Medium amber text for warnings
                  </p>
                </div>
                
                <div className="space-y-2">
                  <p className={statusTypography.success}>
                    Success Status
                  </p>
                  <p className={typography.caption1 + " text-white/60"}>
                    Medium green text for success states
                  </p>
                </div>
                
                <div className="space-y-2">
                  <p className={statusTypography.info}>
                    Info Status
                  </p>
                  <p className={typography.caption1 + " text-white/60"}>
                    Medium blue text for informational content
                  </p>
                </div>
                
                <div className="space-y-2">
                  <p className={statusTypography.neutral}>
                    Neutral Status
                  </p>
                  <p className={typography.caption1 + " text-white/60"}>
                    Regular gray text for neutral information
                  </p>
                </div>
              </div>
              
              <Separator className="bg-white/20" />
              
              <div className="space-y-4">
                <h5 className={typography.headline + " text-white"}>
                  Medical Status Examples
                </h5>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className={vitalSignsText('normal')}>
                      Normal: 120/80 mmHg
                    </p>
                    <p className={vitalSignsText('elevated')}>
                      Elevated: 140/90 mmHg
                    </p>
                    <p className={vitalSignsText('critical')}>
                      Critical: 180/110 mmHg
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className={medicalPriorityText('low')}>
                      Low Priority
                    </p>
                    <p className={medicalPriorityText('medium')}>
                      Medium Priority
                    </p>
                    <p className={medicalPriorityText('high')}>
                      High Priority
                    </p>
                    <p className={medicalPriorityText('urgent')}>
                      Urgent Priority
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className={clinicalStatusText('stable')}>
                      Stable Condition
                    </p>
                    <p className={clinicalStatusText('monitoring')}>
                      Under Monitoring
                    </p>
                    <p className={clinicalStatusText('acute')}>
                      Acute Condition
                    </p>
                    <p className={clinicalStatusText('chronic')}>
                      Chronic Condition
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className={treatmentStatusText('complete')}>
                      Treatment Complete
                    </p>
                    <p className={treatmentStatusText('ongoing')}>
                      Treatment Ongoing
                    </p>
                    <p className={treatmentStatusText('pending')}>
                      Treatment Pending
                    </p>
                    <p className={treatmentStatusText('emergency')}>
                      Emergency Treatment
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Responsive Typography */}
        <Card className="backdrop-blur-xl bg-white/10 border-white/20">
          <CardHeader>
            <CardTitle className={componentTypography.cardTitle + " text-white"}>
              Responsive Typography
            </CardTitle>
            <CardDescription className={componentTypography.cardCaption + " text-white/70"}>
              Fluid typography that scales across different screen sizes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <h2 className={responsiveType.hero + " " + fontWeight.semibold + " text-white leading-tight tracking-[-0.02em] mb-2"}>
                  Hero Text
                </h2>
                <p className={typography.caption1 + " text-white/60"}>
                  Scales from 1.875rem to 4.5rem across breakpoints
                </p>
              </div>
              
              <div>
                <h3 className={responsiveType.display + " " + fontWeight.semibold + " text-white leading-tight tracking-[-0.01em] mb-2"}>
                  Display Text
                </h3>
                <p className={typography.caption1 + " text-white/60"}>
                  Scales from 1.5rem to 3rem across breakpoints
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className={responsiveType.h1 + " " + fontWeight.semibold + " text-white leading-snug mb-2"}>
                    Heading 1
                  </h4>
                  <p className={typography.caption1 + " text-white/60"}>
                    Responsive heading scale
                  </p>
                </div>
                
                <div>
                  <h5 className={responsiveType.h2 + " " + fontWeight.semibold + " text-white leading-snug mb-2"}>
                    Heading 2
                  </h5>
                  <p className={typography.caption1 + " text-white/60"}>
                    Responsive heading scale
                  </p>
                </div>
              </div>
              
              <div>
                <p className={responsiveType.body + " " + fontWeight.regular + " text-white leading-relaxed tracking-[0.01em] mb-2"}>
                  Responsive body text that scales from 0.875rem to 1.125rem across different screen sizes, 
                  maintaining optimal readability and visual hierarchy.
                </p>
                <p className={typography.caption1 + " text-white/60"}>
                  Scales from 0.875rem to 1.125rem across breakpoints
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Medical Measurement Examples */}
        <Card className="backdrop-blur-xl bg-white/10 border-white/20">
          <CardHeader>
            <CardTitle className={componentTypography.cardTitle + " text-white"}>
              Medical Measurement Formatting
            </CardTitle>
            <CardDescription className={componentTypography.cardCaption + " text-white/70"}>
              Properly formatted medical measurements with status indicators
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { value: '120', unit: 'mmHg', status: 'normal' as const },
                { value: '140', unit: 'mmHg', status: 'elevated' as const },
                { value: '180', unit: 'mmHg', status: 'critical' as const }
              ].map((measurement, index) => {
                const formatted = formatMedicalMeasurement(measurement.value, measurement.unit, measurement.status);
                return (
                  <div key={index} className="text-center p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className={formatted.className + " text-2xl font-mono tabular-nums"}>
                      {formatted.value}/{formatted.unit}
                    </div>
                    <p className={typography.caption1 + " text-white/60 mt-1"}>
                      Blood Pressure
                    </p>
                  </div>
                );
              })}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { value: '98.6', unit: '°F', status: 'normal' as const },
                { value: '101.2', unit: '°F', status: 'elevated' as const },
                { value: '104.5', unit: '°F', status: 'critical' as const }
              ].map((measurement, index) => {
                const formatted = formatMedicalMeasurement(measurement.value, measurement.unit, measurement.status);
                return (
                  <div key={index} className="text-center p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className={formatted.className + " text-2xl font-mono tabular-nums"}>
                      {formatted.value} {formatted.unit}
                    </div>
                    <p className={typography.caption1 + " text-white/60 mt-1"}>
                      Temperature
                    </p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Font Stack Information */}
        <Card className="backdrop-blur-xl bg-white/10 border-white/20">
          <CardHeader>
            <CardTitle className={componentTypography.cardTitle + " text-white"}>
              Font Stack Information
            </CardTitle>
            <CardDescription className={componentTypography.cardCaption + " text-white/70"}>
              Apple's system font stack automatically uses San Francisco on Apple devices
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className={typography.headline + " text-white mb-2"}>
                Sans Serif Font Stack
              </h4>
              <p className={typography.body + " text-white/80 mb-2"}>
                -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
              </p>
              <p className={typography.caption1 + " text-white/60"}>
                Automatically uses San Francisco on Apple devices, falls back to system fonts on other platforms
              </p>
            </div>
            
            <div>
              <h4 className={typography.headline + " text-white mb-2"}>
                Monospace Font Stack
              </h4>
              <p className={typography.body + " text-white/80 mb-2"}>
                "SF Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace
              </p>
              <p className={typography.caption1 + " text-white/60"}>
                Uses SF Mono on Apple devices for code and numerical data
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 