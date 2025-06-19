// ────────────────────────────────────────────────────────────────────────────────
// SPACING & LAYOUT DEMO - APPLE-INSPIRED 8PT GRID SYSTEM
// ────────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { spacingUtilities, responsiveSpacing, layoutSpacing } from '@/lib/spacing';
import { typography } from '@/lib/typography';

export const SpacingLayoutDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Hero Section with Apple-inspired spacing */}
        <section className="text-center space-y-6">
          <h1 className={cn(typography.h1, "text-white")}>
            8pt Grid Spacing System
          </h1>
          <p className={cn(typography.body.large, "text-white/80 max-w-3xl mx-auto")}>
            Apple-inspired spacing and layout principles with consistent 8pt grid alignment, 
            generous margins, and fluid responsive design.
          </p>
        </section>

        {/* 8pt Grid Demonstration */}
        <section className="space-y-8">
          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">8pt Grid System</CardTitle>
              <CardDescription className="text-white/70">
                All spacing values are multiples of 8px (0.5rem) to maintain consistent visual rhythm
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Grid Spacing Examples */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white/10 p-4 rounded-lg border border-white/20">
                  <h4 className="text-white font-medium mb-2">4px (0.25rem)</h4>
                  <p className="text-white/60 text-sm">Half-step for fine adjustments</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg border border-white/20">
                  <h4 className="text-white font-medium mb-2">8px (0.5rem)</h4>
                  <p className="text-white/60 text-sm">Base unit - standard spacing</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg border border-white/20">
                  <h4 className="text-white font-medium mb-2">16px (1rem)</h4>
                  <p className="text-white/60 text-sm">iOS standard margin</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg border border-white/20">
                  <h4 className="text-white font-medium mb-2">24px (1.5rem)</h4>
                  <p className="text-white/60 text-sm">Comfortable spacing</p>
                </div>
              </div>

              {/* Visual Grid Demonstration */}
              <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                <h4 className="text-white font-medium mb-4">Visual Grid Alignment</h4>
                <div className="grid grid-cols-8 gap-1">
                  {Array.from({ length: 64 }, (_, i) => (
                    <div 
                      key={i} 
                      className="h-2 bg-white/20 rounded-sm"
                      style={{ opacity: (i % 8 === 0) ? 0.6 : 0.2 }}
                    />
                  ))}
                </div>
                <p className="text-white/60 text-sm mt-4">
                  Each square represents 8px. Notice how elements align to the grid for consistent rhythm.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Container Spacing Examples */}
        <section className="space-y-8">
          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Container Spacing</CardTitle>
              <CardDescription className="text-white/70">
                Apple-inspired container margins that scale with screen size
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Responsive Container Demo */}
              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-lg border border-white/20">
                  <h4 className="text-white font-medium mb-2">Mobile (16px margins)</h4>
                  <p className="text-white/60 text-sm">px-4 - iOS standard mobile margin</p>
                </div>
                <div className="bg-white/10 p-6 rounded-lg border border-white/20">
                  <h4 className="text-white font-medium mb-2">Tablet (24px margins)</h4>
                  <p className="text-white/60 text-sm">px-6 - iPad standard margin</p>
                </div>
                <div className="bg-white/10 p-8 rounded-lg border border-white/20">
                  <h4 className="text-white font-medium mb-2">Desktop (32px margins)</h4>
                  <p className="text-white/60 text-sm">px-8 - macOS standard margin</p>
                </div>
                <div className="bg-white/10 p-12 rounded-lg border border-white/20">
                  <h4 className="text-white font-medium mb-2">Wide Screen (48px margins)</h4>
                  <p className="text-white/60 text-sm">px-12 - Large display margin</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Component Spacing Examples */}
        <section className="space-y-8">
          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Component Spacing</CardTitle>
              <CardDescription className="text-white/70">
                Consistent spacing patterns for components with 8pt grid alignment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Button Spacing */}
              <div className="space-y-4">
                <h4 className="text-white font-medium">Button Touch Targets</h4>
                <div className="flex flex-wrap gap-4">
                  <Button size="sm" variant="outline">Small (48px)</Button>
                  <Button size="default" variant="outline">Default (60px)</Button>
                  <Button size="lg" variant="outline">Large (72px)</Button>
                  <Button size="xl" variant="outline">Extra Large (88px)</Button>
                </div>
                <p className="text-white/60 text-sm">
                  All buttons meet Apple's 44px minimum touch target requirement
                </p>
              </div>

              <Separator className="bg-white/20" />

              {/* Input Spacing */}
              <div className="space-y-4">
                <h4 className="text-white font-medium">Input Field Spacing</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="Small input (40px)" size="sm" />
                  <Input placeholder="Default input (60px)" size="md" />
                  <Input placeholder="Large input (64px)" size="lg" />
                  <Input placeholder="Extra large input (80px)" size="xl" />
                </div>
              </div>

              <Separator className="bg-white/20" />

              {/* Card Spacing */}
              <div className="space-y-4">
                <h4 className="text-white font-medium">Card Padding Options</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="backdrop-blur-md bg-white/10 border-white/20 p-3">
                    <CardContent className="p-0">
                      <p className="text-white/80 text-sm">Compact (12px)</p>
                    </CardContent>
                  </Card>
                  <Card className="backdrop-blur-md bg-white/10 border-white/20 p-4">
                    <CardContent className="p-0">
                      <p className="text-white/80 text-sm">Default (16px)</p>
                    </CardContent>
                  </Card>
                  <Card className="backdrop-blur-md bg-white/10 border-white/20 p-6">
                    <CardContent className="p-0">
                      <p className="text-white/80 text-sm">Comfortable (24px)</p>
                    </CardContent>
                  </Card>
                  <Card className="backdrop-blur-md bg-white/10 border-white/20 p-8">
                    <CardContent className="p-0">
                      <p className="text-white/80 text-sm">Spacious (32px)</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Grid System Examples */}
        <section className="space-y-8">
          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Grid System</CardTitle>
              <CardDescription className="text-white/70">
                Responsive grid layouts with consistent 8pt-aligned gaps
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Grid Gap Examples */}
              <div className="space-y-4">
                <h4 className="text-white font-medium">Grid Gap Options</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {Array.from({ length: 8 }, (_, i) => (
                    <div key={i} className="bg-white/10 p-4 rounded-lg border border-white/20">
                      <p className="text-white/80 text-sm">Tight (8px)</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Array.from({ length: 8 }, (_, i) => (
                    <div key={i} className="bg-white/10 p-4 rounded-lg border border-white/20">
                      <p className="text-white/80 text-sm">Default (16px)</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {Array.from({ length: 8 }, (_, i) => (
                    <div key={i} className="bg-white/10 p-4 rounded-lg border border-white/20">
                      <p className="text-white/80 text-sm">Comfortable (24px)</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {Array.from({ length: 8 }, (_, i) => (
                    <div key={i} className="bg-white/10 p-4 rounded-lg border border-white/20">
                      <p className="text-white/80 text-sm">Spacious (32px)</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section Spacing Examples */}
        <section className="space-y-8">
          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Section Spacing</CardTitle>
              <CardDescription className="text-white/70">
                Generous vertical spacing between major content sections
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              
              <div className="bg-white/10 p-6 rounded-lg border border-white/20">
                <h4 className="text-white font-medium mb-4">Compact Section (32px)</h4>
                <p className="text-white/60">py-8 - Between related sections</p>
              </div>
              
              <div className="bg-white/10 p-6 rounded-lg border border-white/20">
                <h4 className="text-white font-medium mb-4">Default Section (48px)</h4>
                <p className="text-white/60">py-12 - Between major sections</p>
              </div>
              
              <div className="bg-white/10 p-6 rounded-lg border border-white/20">
                <h4 className="text-white font-medium mb-4">Spacious Section (64px)</h4>
                <p className="text-white/60">py-16 - Between page sections</p>
              </div>
              
              <div className="bg-white/10 p-6 rounded-lg border border-white/20">
                <h4 className="text-white font-medium mb-4">Hero Section (96px)</h4>
                <p className="text-white/60">py-24 - Hero sections and major breaks</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Responsive Design Examples */}
        <section className="space-y-8">
          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Responsive Design</CardTitle>
              <CardDescription className="text-white/70">
                Fluid adaptiveness that scales gracefully across devices
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Responsive Grid */}
              <div className="space-y-4">
                <h4 className="text-white font-medium">Responsive Grid Layout</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 xl:gap-8">
                  {Array.from({ length: 8 }, (_, i) => (
                    <div key={i} className="bg-white/10 p-4 rounded-lg border border-white/20">
                      <h5 className="text-white font-medium mb-2">Card {i + 1}</h5>
                      <p className="text-white/60 text-sm">
                        Responsive spacing: gap-4 on mobile, gap-6 on tablet, gap-8 on desktop
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Responsive Container */}
              <div className="space-y-4">
                <h4 className="text-white font-medium">Responsive Container Padding</h4>
                <div className="bg-white/10 p-4 sm:p-6 lg:p-8 xl:p-12 rounded-lg border border-white/20">
                  <p className="text-white/80">
                    This container demonstrates responsive padding that increases with screen size:
                  </p>
                  <ul className="text-white/60 text-sm mt-2 space-y-1">
                    <li>• Mobile: 16px padding (px-4)</li>
                    <li>• Tablet: 24px padding (px-6)</li>
                    <li>• Desktop: 32px padding (px-8)</li>
                    <li>• Wide: 48px padding (px-12)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Best Practices */}
        <section className="space-y-8">
          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Spacing Best Practices</CardTitle>
              <CardDescription className="text-white/70">
                Guidelines for implementing Apple-inspired spacing throughout your app
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-white font-medium">✅ Do's</h4>
                  <ul className="text-white/60 text-sm space-y-2">
                    <li>• Use multiples of 8px for all spacing</li>
                    <li>• Apply consistent padding inside similar components</li>
                    <li>• Use generous margins on larger screens</li>
                    <li>• Maintain 44px minimum touch targets</li>
                    <li>• Scale spacing with screen size</li>
                    <li>• Treat whitespace as a design element</li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-white font-medium">❌ Don'ts</h4>
                  <ul className="text-white/60 text-sm space-y-2">
                    <li>• Use arbitrary spacing values</li>
                    <li>• Cram content with insufficient padding</li>
                    <li>• Ignore touch target requirements</li>
                    <li>• Use inconsistent spacing patterns</li>
                    <li>• Forget responsive spacing adjustments</li>
                    <li>• Overlook visual rhythm and alignment</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/10 p-6 rounded-lg border border-white/20">
                <h4 className="text-white font-medium mb-4">Quick Reference</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-white font-medium">4px</p>
                    <p className="text-white/60">Fine adjustments</p>
                  </div>
                  <div>
                    <p className="text-white font-medium">8px</p>
                    <p className="text-white/60">Base unit</p>
                  </div>
                  <div>
                    <p className="text-white font-medium">16px</p>
                    <p className="text-white/60">Standard margin</p>
                  </div>
                  <div>
                    <p className="text-white font-medium">24px</p>
                    <p className="text-white/60">Comfortable spacing</p>
                  </div>
                  <div>
                    <p className="text-white font-medium">32px</p>
                    <p className="text-white/60">Section spacing</p>
                  </div>
                  <div>
                    <p className="text-white font-medium">48px</p>
                    <p className="text-white/60">Major spacing</p>
                  </div>
                  <div>
                    <p className="text-white font-medium">64px</p>
                    <p className="text-white/60">Page spacing</p>
                  </div>
                  <div>
                    <p className="text-white font-medium">96px</p>
                    <p className="text-white/60">Hero spacing</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

// Helper function for className concatenation
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

export default SpacingLayoutDemo; 