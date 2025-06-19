import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { colors, themeColors } from '@/lib/colors';

export default function AppleLiquidGlassDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-900">
            Apple Liquid Glass Color System
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Sophisticated neutral palette with minimal accents, featuring Apple's signature translucency 
            and refined color harmony for a polished, professional interface.
          </p>
        </div>

        {/* Color Palette Showcase */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-slate-800">Color Palette</h2>
          
          {/* Apple Blue */}
          <Card className="backdrop-blur-md bg-white/60 border-slate-200/50 shadow-glass">
            <CardHeader>
              <CardTitle className="text-slate-800">Apple Blue</CardTitle>
              <CardDescription>
                Refined to match iOS 15+ system blue - deeper, less teal than traditional blues
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-4">
                {Object.entries(colors.primary).map(([shade, color]) => (
                  <div key={shade} className="text-center space-y-2">
                    <div 
                      className="h-16 rounded-lg shadow-inner-highlight"
                      style={{ backgroundColor: color }}
                    />
                    <div className="text-xs font-medium text-slate-600">
                      {shade}
                    </div>
                    <div className="text-xs text-slate-500 font-mono">
                      {color}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Neutral Grays */}
          <Card className="backdrop-blur-md bg-white/60 border-slate-200/50 shadow-glass">
            <CardHeader>
              <CardTitle className="text-slate-800">Neutral Grays</CardTitle>
              <CardDescription>
                Apple-inspired grays with blue undertones for sophisticated backgrounds
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-4">
                {Object.entries(colors.gray).map(([shade, color]) => (
                  <div key={shade} className="text-center space-y-2">
                    <div 
                      className="h-16 rounded-lg shadow-inner-highlight"
                      style={{ backgroundColor: color }}
                    />
                    <div className="text-xs font-medium text-slate-600">
                      {shade}
                    </div>
                    <div className="text-xs text-slate-500 font-mono">
                      {color}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Slate Grays */}
          <Card className="backdrop-blur-md bg-white/60 border-slate-200/50 shadow-glass">
            <CardHeader>
              <CardTitle className="text-slate-800">Slate Grays</CardTitle>
              <CardDescription>
                Apple's preferred neutral palette for sophisticated backgrounds and text
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-4">
                {Object.entries(colors.slate).map(([shade, color]) => (
                  <div key={shade} className="text-center space-y-2">
                    <div 
                      className="h-16 rounded-lg shadow-inner-highlight"
                      style={{ backgroundColor: color }}
                    />
                    <div className="text-xs font-medium text-slate-600">
                      {shade}
                    </div>
                    <div className="text-xs text-slate-500 font-mono">
                      {color}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Status Colors */}
          <Card className="backdrop-blur-md bg-white/60 border-slate-200/50 shadow-glass">
            <CardHeader>
              <CardTitle className="text-slate-800">Status Colors</CardTitle>
              <CardDescription>
                Desaturated status colors for sophisticated, non-intrusive feedback
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-6">
                {Object.entries({
                  success: colors.success,
                  warning: colors.warning,
                  error: colors.error,
                  info: colors.info
                }).map(([status, colorScale]) => (
                  <div key={status} className="space-y-4">
                    <h3 className="font-medium text-slate-700 capitalize">{status}</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(colorScale).slice(0, 6).map(([shade, color]) => (
                        <div key={shade} className="text-center space-y-1">
                          <div 
                            className="h-12 rounded-md shadow-inner-highlight"
                            style={{ backgroundColor: color }}
                          />
                          <div className="text-xs text-slate-500 font-mono">
                            {color}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Glass Effects Showcase */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-slate-800">Glass Effects</h2>
          
          {/* Light Glass Variants */}
          <Card className="backdrop-blur-md bg-white/60 border-slate-200/50 shadow-glass">
            <CardHeader>
              <CardTitle className="text-slate-800">Light Glass Variants</CardTitle>
              <CardDescription>
                Translucent panels with varying opacity levels for different contexts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-4">
                  <div className="h-32 rounded-xl bg-glass-white backdrop-blur-md border border-white/20 shadow-glass">
                    <div className="p-4">
                      <h4 className="font-medium text-slate-800">Standard Glass</h4>
                      <p className="text-sm text-slate-600">80% opacity</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="h-32 rounded-xl bg-glass-white-subtle backdrop-blur-md border border-white/10 shadow-glass">
                    <div className="p-4">
                      <h4 className="font-medium text-slate-800">Subtle Glass</h4>
                      <p className="text-sm text-slate-600">40% opacity</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="h-32 rounded-xl bg-glass-white-vibrant backdrop-blur-md border border-white/30 shadow-glass-elevated">
                    <div className="p-4">
                      <h4 className="font-medium text-slate-800">Vibrant Glass</h4>
                      <p className="text-sm text-slate-600">90% opacity</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="h-32 rounded-xl bg-glass-slate backdrop-blur-md border border-slate-200/20 shadow-glass">
                    <div className="p-4">
                      <h4 className="font-medium text-slate-800">Slate Glass</h4>
                      <p className="text-sm text-slate-600">Neutral tint</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dark Glass Variants */}
          <Card className="backdrop-blur-md bg-slate-800/60 border-slate-700/50 shadow-glass-dark">
            <CardHeader>
              <CardTitle className="text-slate-100">Dark Glass Variants</CardTitle>
              <CardDescription className="text-slate-300">
                Dark mode glass effects with sophisticated translucency
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-4">
                  <div className="h-32 rounded-xl bg-glass-dark backdrop-blur-md border border-slate-600/20 shadow-glass-dark">
                    <div className="p-4">
                      <h4 className="font-medium text-slate-100">Dark Glass</h4>
                      <p className="text-sm text-slate-300">80% opacity</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="h-32 rounded-xl bg-glass-dark-subtle backdrop-blur-md border border-slate-600/10 shadow-glass-dark">
                    <div className="p-4">
                      <h4 className="font-medium text-slate-100">Subtle Dark</h4>
                      <p className="text-sm text-slate-300">40% opacity</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="h-32 rounded-xl bg-glass-dark-vibrant backdrop-blur-md border border-slate-600/30 shadow-glass-dark-elevated">
                    <div className="p-4">
                      <h4 className="font-medium text-slate-100">Vibrant Dark</h4>
                      <p className="text-sm text-slate-300">90% opacity</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="h-32 rounded-xl bg-backdrop-dark backdrop-blur-md border border-slate-600/20 shadow-glass-dark">
                    <div className="p-4">
                      <h4 className="font-medium text-slate-100">Backdrop Dark</h4>
                      <p className="text-sm text-slate-300">Light overlay</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Component Examples */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-slate-800">Component Examples</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Buttons */}
            <Card className="backdrop-blur-md bg-white/60 border-slate-200/50 shadow-glass">
              <CardHeader>
                <CardTitle className="text-slate-800">Buttons</CardTitle>
                <CardDescription>
                  Apple-inspired button styles with refined colors
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Button className="bg-primary-500 hover:bg-primary-600 text-white">
                    Primary Action
                  </Button>
                  <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50">
                    Secondary
                  </Button>
                  <Button variant="ghost" className="text-slate-600 hover:bg-slate-100">
                    Ghost
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <Button size="sm" className="bg-success-500 hover:bg-success-600 text-white">
                    Success
                  </Button>
                  <Button size="sm" className="bg-warning-500 hover:bg-warning-600 text-white">
                    Warning
                  </Button>
                  <Button size="sm" className="bg-error-500 hover:bg-error-600 text-white">
                    Error
                  </Button>
                  <Button size="sm" className="bg-info-500 hover:bg-info-600 text-white">
                    Info
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Badges */}
            <Card className="backdrop-blur-md bg-white/60 border-slate-200/50 shadow-glass">
              <CardHeader>
                <CardTitle className="text-slate-800">Badges & Status</CardTitle>
                <CardDescription>
                  Refined status indicators with Apple's color philosophy
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Badge className="bg-success-100 text-success-700 border-success-200">
                    Success
                  </Badge>
                  <Badge className="bg-warning-100 text-warning-700 border-warning-200">
                    Warning
                  </Badge>
                  <Badge className="bg-error-100 text-error-700 border-error-200">
                    Error
                  </Badge>
                  <Badge className="bg-info-100 text-info-700 border-info-200">
                    Info
                  </Badge>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <Badge variant="outline" className="border-slate-300 text-slate-600">
                    Neutral
                  </Badge>
                  <Badge variant="outline" className="border-primary-300 text-primary-600">
                    Primary
                  </Badge>
                  <Badge variant="secondary" className="bg-slate-100 text-slate-700">
                    Secondary
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Theme Comparison */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-slate-800">Theme Comparison</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Medical Theme */}
            <Card className="backdrop-blur-md bg-white/60 border-slate-200/50 shadow-glass">
              <CardHeader>
                <CardTitle className="text-slate-800">Medical Theme</CardTitle>
                <CardDescription>
                  Neutral base with subtle blue accents
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div 
                  className="h-24 rounded-lg"
                  style={{ background: themeColors.medical.background }}
                />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Primary:</span>
                    <span className="font-mono text-slate-500">{themeColors.medical.primary}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Background:</span>
                    <span className="font-mono text-slate-500">Neutral gradient</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Apple Light Theme */}
            <Card className="backdrop-blur-md bg-white/60 border-slate-200/50 shadow-glass">
              <CardHeader>
                <CardTitle className="text-slate-800">Apple Light</CardTitle>
                <CardDescription>
                  Pure Apple-inspired light theme
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div 
                  className="h-24 rounded-lg bg-slate-100"
                />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Primary:</span>
                    <span className="font-mono text-slate-500">{themeColors.apple.primary}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Background:</span>
                    <span className="font-mono text-slate-500">{themeColors.apple.background}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Apple Dark Theme */}
            <Card className="backdrop-blur-md bg-slate-800/60 border-slate-700/50 shadow-glass-dark">
              <CardHeader>
                <CardTitle className="text-slate-100">Apple Dark</CardTitle>
                <CardDescription className="text-slate-300">
                  Apple's sophisticated dark mode
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div 
                  className="h-24 rounded-lg bg-slate-900"
                />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Primary:</span>
                    <span className="font-mono text-slate-400">{themeColors.appleDark.primary}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Background:</span>
                    <span className="font-mono text-slate-400">{themeColors.appleDark.background}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Design Principles */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-slate-800">Design Principles</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="backdrop-blur-md bg-white/60 border-slate-200/50 shadow-glass">
              <CardHeader>
                <CardTitle className="text-slate-800">Neutral Base, Minimal Accents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• Slate grays provide sophisticated neutral foundation</li>
                  <li>• Apple Blue (#0A84FF) for primary actions only</li>
                  <li>• Desaturated status colors for subtle feedback</li>
                  <li>• Pure white reserved for content, not backgrounds</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-md bg-white/60 border-slate-200/50 shadow-glass">
              <CardHeader>
                <CardTitle className="text-slate-800">Translucency & Depth</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• Contextual glass opacity levels</li>
                  <li>• Subtle backdrop blur for depth</li>
                  <li>• Inner highlights for glass realism</li>
                  <li>• Adaptive glass based on content underneath</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
} 