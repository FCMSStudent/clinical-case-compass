
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  typography, 
  fontWeight,
  medicalTypography, 
  componentTypography, 
  statusTypography,
  responsiveType,
  createTypographyClass
} from '@/lib/typography';
import { 
  Type, 
  Palette, 
  Layout, 
  Layers,
  Monitor,
  Smartphone,
  Tablet
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const TypographyDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Type className="h-8 w-8 text-blue-400" />
            <h1 className={cn(typography.largeTitle, "text-white")}>
              Apple-Inspired Typography
            </h1>
          </div>
          <p className={cn(typography.body, "text-white/80 max-w-4xl mx-auto")}>
            A comprehensive typography system based on Apple's Human Interface Guidelines, 
            featuring San Francisco fonts, consistent spacing, and perfect readability across all devices.
          </p>
        </section>

        {/* Typography Hierarchy */}
        <section className="space-y-8">
          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Layers className="h-6 w-6 text-blue-400" />
                <CardTitle className="text-white">Typography Hierarchy</CardTitle>
              </div>
              <CardDescription className="text-white/70">
                Apple's HIG-inspired text styles with proper scaling and spacing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              
              {/* Apple HIG Styles */}
              <div className="space-y-6">
                <div className="border-b border-white/20 pb-4">
                  <h4 className="text-white font-medium mb-4">Apple HIG Styles</h4>
                </div>
                
                <div className="space-y-4">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className={typography.largeTitle + " text-white"}>Large Title</div>
                    <Badge variant="outline" className="self-start lg:self-center">34pt Semibold</Badge>
                  </div>
                  
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className={typography.title + " text-white"}>Title</div>
                    <Badge variant="outline" className="self-start lg:self-center">28pt Semibold</Badge>
                  </div>
                  
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className={typography.headline + " text-white"}>Headline</div>
                    <Badge variant="outline" className="self-start lg:self-center">17pt Semibold</Badge>
                  </div>
                  
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className={typography.body + " text-white"}>Body text with comfortable line height for readability</div>
                    <Badge variant="outline" className="self-start lg:self-center">17pt Regular</Badge>
                  </div>
                  
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className={typography.callout + " text-white"}>Callout text for highlighted content</div>
                    <Badge variant="outline" className="self-start lg:self-center">16pt Regular</Badge>
                  </div>
                  
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className={typography.subheadline + " text-white"}>Subheadline for secondary content</div>
                    <Badge variant="outline" className="self-start lg:self-center">15pt Regular</Badge>
                  </div>
                  
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className={typography.footnote + " text-white"}>Footnote for additional information</div>
                    <Badge variant="outline" className="self-start lg:self-center">13pt Regular</Badge>
                  </div>
                  
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className={typography.caption1 + " text-white"}>Caption for minimal text</div>
                    <Badge variant="outline" className="self-start lg:self-center">12pt Regular</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Font Weight System */}
        <section className="space-y-8">
          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Palette className="h-6 w-6 text-purple-400" />
                <CardTitle className="text-white">Font Weight System</CardTitle>
              </div>
              <CardDescription className="text-white/70">
                Consistent weight hierarchy avoiding extreme weights
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center space-y-3">
                  <div className={`text-2xl text-white ${fontWeight.regular}`}>Regular</div>
                  <Badge variant="outline">400 - Body text</Badge>
                </div>
                
                <div className="text-center space-y-3">
                  <div className={`text-2xl text-white ${fontWeight.medium}`}>Medium</div>
                  <Badge variant="outline">500 - Labels</Badge>
                </div>
                
                <div className="text-center space-y-3">
                  <div className={`text-2xl text-white ${fontWeight.semibold}`}>Semibold</div>
                  <Badge variant="outline">600 - Headings</Badge>
                </div>
                
                <div className="text-center space-y-3">
                  <div className={`text-2xl text-white ${fontWeight.bold}`}>Bold</div>
                  <Badge variant="outline">700 - Emphasis</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Responsive Typography */}
        <section className="space-y-8">
          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Layout className="h-6 w-6 text-green-400" />
                <CardTitle className="text-white">Responsive Typography</CardTitle>
              </div>
              <CardDescription className="text-white/70">
                Fluid scaling across different devices and screen sizes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Monitor className="h-5 w-5 text-blue-400" />
                    <h4 className="text-white font-medium">Desktop Scale</h4>
                  </div>
                  <div className={responsiveType.hero + " text-white"}>Hero Text Scale</div>
                  <div className={responsiveType.h1 + " text-white"}>Heading Scale</div>
                  <div className={responsiveType.body + " text-white"}>Body text scales perfectly across screen sizes</div>
                </div>
                
                <Separator className="bg-white/20" />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-5 w-5 text-green-400" />
                    <span className="text-white">Mobile Optimized</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Tablet className="h-5 w-5 text-purple-400" />
                    <span className="text-white">Tablet Friendly</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Monitor className="h-5 w-5 text-blue-400" />
                    <span className="text-white">Desktop Ready</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Medical Typography */}
        <section className="space-y-8">
          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Medical Typography</CardTitle>
              <CardDescription className="text-white/70">
                Specialized typography for clinical and medical applications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-white font-medium">Patient Information</h4>
                  <div className={medicalTypography.patientName + " text-white"}>John Smith, 45</div>
                  <div className={medicalTypography.diagnosis + " text-white"}>Primary Hypertension</div>
                  <div className={medicalTypography.clinicalNotes + " text-white"}>
                    Patient presents with elevated blood pressure. No acute distress noted.
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-white font-medium">Vital Signs & Measurements</h4>
                  <div className="space-y-2">
                    <div className={medicalTypography.vitals + " text-green-400"}>120/80 mmHg</div>
                    <div className={medicalTypography.labResults + " text-blue-400"}>Glucose: 95 mg/dL</div>
                    <div className={medicalTypography.medication + " text-white"}>Lisinopril 10mg</div>
                    <div className={medicalTypography.dosage + " text-white/70"}>Once daily with food</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Component Typography */}
        <section className="space-y-8">
          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Component Typography</CardTitle>
              <CardDescription className="text-white/70">
                Consistent typography for UI components
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-white font-medium">Buttons & Actions</h4>
                  <div className="flex flex-wrap gap-4">
                    <Button size="sm" className={componentTypography.buttonSmall}>Small Button</Button>
                    <Button size="default" className={componentTypography.buttonDefault}>Default Button</Button>
                    <Button size="lg" className={componentTypography.buttonLarge}>Large Button</Button>
                  </div>
                </div>
                
                <Separator className="bg-white/20" />
                
                <div className="space-y-4">
                  <h4 className="text-white font-medium">Cards & Content</h4>
                  <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                    <div className={componentTypography.cardTitle + " text-white mb-2"}>Card Title</div>
                    <div className={componentTypography.cardBody + " text-white/90 mb-3"}>
                      This is the card body content with proper typography scaling and line height.
                    </div>
                    <div className={componentTypography.cardCaption + " text-white/60"}>
                      Card caption with metadata information
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Status Typography */}
        <section className="space-y-8">
          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Status Typography</CardTitle>
              <CardDescription className="text-white/70">
                Color-coded typography for different status levels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="text-center space-y-2">
                  <div className={statusTypography.critical}>Critical</div>
                  <Badge variant="destructive">High Priority</Badge>
                </div>
                
                <div className="text-center space-y-2">
                  <div className={statusTypography.warning}>Warning</div>
                  <Badge variant="warning">Attention</Badge>
                </div>
                
                <div className="text-center space-y-2">
                  <div className={statusTypography.success}>Success</div>
                  <Badge variant="success">Completed</Badge>
                </div>
                
                <div className="text-center space-y-2">
                  <div className={statusTypography.info}>Information</div>
                  <Badge variant="info">Notice</Badge>
                </div>
                
                <div className="text-center space-y-2">
                  <div className={statusTypography.neutral}>Neutral</div>
                  <Badge variant="outline">Default</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}; 
