import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { shadows } from '@/lib/spacing';
import { liquidGlassClasses, getGlassClasses } from '@/lib/glass-effects';

export const SofterShadowsDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Softer Shadows & Highlights Demo
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Apple-inspired glass design with very soft, diffuse shadows and subtle inner highlights 
            that suggest elevation without hard edges, creating translucent panes of glass floating above content.
          </p>
        </motion.div>

        {/* Shadow System Showcase */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-semibold text-white mb-6">Shadow System</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Base Shadows */}
            <Card variant="default" className="p-6">
              <CardHeader>
                <CardTitle className="text-white">Base Shadows</CardTitle>
                <CardDescription className="text-white/70">
                  Softer and more diffuse than traditional shadows
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-4 bg-white/10 rounded-lg shadow-sm text-white/80 text-sm">
                    shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.08)
                  </div>
                  <div className="p-4 bg-white/10 rounded-lg shadow-md text-white/80 text-sm">
                    shadow-md: 0 4px 12px -2px rgba(0, 0, 0, 0.08)
                  </div>
                  <div className="p-4 bg-white/10 rounded-lg shadow-lg text-white/80 text-sm">
                    shadow-lg: 0 10px 25px -3px rgba(0, 0, 0, 0.08)
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Glass Shadows */}
            <Card variant="elevated" className="p-6">
              <CardHeader>
                <CardTitle className="text-white">Glass Shadows</CardTitle>
                <CardDescription className="text-white/70">
                  Very soft and diffuse for floating elements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-4 bg-white/10 rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.08)] text-white/80 text-sm">
                    glass: 0 8px 32px rgba(0, 0, 0, 0.08)
                  </div>
                  <div className="p-4 bg-white/10 rounded-lg shadow-[0_12px_48px_rgba(0,0,0,0.12)] text-white/80 text-sm">
                    glassElevated: 0 12px 48px rgba(0, 0, 0, 0.12)
                  </div>
                  <div className="p-4 bg-white/10 rounded-lg shadow-[0_24px_80px_rgba(0,0,0,0.15)] text-white/80 text-sm">
                    glassModal: 0 24px 80px rgba(0, 0, 0, 0.15)
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Inner Highlights */}
            <Card variant="featured" className="p-6">
              <CardHeader>
                <CardTitle className="text-white">Inner Highlights</CardTitle>
                <CardDescription className="text-white/70">
                  Subtle luminous edges like macOS windows
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-4 bg-white/10 rounded-lg shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] text-white/80 text-sm">
                    innerHighlight: inset 0 1px 0 rgba(255, 255, 255, 0.3)
                  </div>
                  <div className="p-4 bg-white/10 rounded-lg shadow-[inset_0_2px_4px_rgba(255,255,255,0.2)] text-white/80 text-sm">
                    innerHighlightMedium: inset 0 2px 4px rgba(255, 255, 255, 0.2)
                  </div>
                  <div className="p-4 bg-white/10 rounded-lg shadow-[inset_0_4px_8px_rgba(255,255,255,0.15)] text-white/80 text-sm">
                    innerHighlightStrong: inset 0 4px 8px rgba(255, 255, 255, 0.15)
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Component Showcase */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-semibold text-white mb-6">Component Showcase</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Cards */}
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-white">Cards with Softer Shadows</h3>
              <div className="space-y-4">
                <Card variant="default" className="p-4">
                  <CardTitle className="text-white">Default Card</CardTitle>
                  <CardDescription className="text-white/70">
                    Uses glassWithHighlight shadow
                  </CardDescription>
                </Card>
                
                <Card variant="elevated" className="p-4">
                  <CardTitle className="text-white">Elevated Card</CardTitle>
                  <CardDescription className="text-white/70">
                    Uses glassElevatedWithHighlight shadow
                  </CardDescription>
                </Card>
                
                <Card variant="featured" className="p-4">
                  <CardTitle className="text-white">Featured Card</CardTitle>
                  <CardDescription className="text-white/70">
                    Uses glassFloatingWithHighlight shadow
                  </CardDescription>
                </Card>
              </div>
            </div>

            {/* Interactive Elements */}
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-white">Interactive Elements</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Input Field</label>
                  <Input placeholder="Type something..." />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Buttons</label>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Badges</label>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="default">Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Glass Classes Demo */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-semibold text-white mb-6">Glass Classes Demo</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className={`${getGlassClasses('card')} p-6 rounded-xl`}>
              <h3 className="text-lg font-semibold text-white mb-2">Card Glass</h3>
              <p className="text-white/70 text-sm">
                Uses card glass classes with softer shadows and inner highlights
              </p>
            </div>
            
            <div className={`${getGlassClasses('navigation')} p-6 rounded-xl`}>
              <h3 className="text-lg font-semibold text-white mb-2">Navigation Glass</h3>
              <p className="text-white/70 text-sm">
                Uses navigation glass classes with enhanced backdrop blur
              </p>
            </div>
            
            <div className={`${getGlassClasses('modal')} p-6 rounded-xl`}>
              <h3 className="text-lg font-semibold text-white mb-2">Modal Glass</h3>
              <p className="text-white/70 text-sm">
                Uses modal glass classes with heavy backdrop blur and contrast
              </p>
            </div>
            
            <div className={`${getGlassClasses('alert')} p-6 rounded-xl`}>
              <h3 className="text-lg font-semibold text-white mb-2">Alert Glass</h3>
              <p className="text-white/70 text-sm">
                Uses alert glass classes with medium backdrop blur
              </p>
            </div>
            
            <div className={`${getGlassClasses('dropdown')} p-6 rounded-xl`}>
              <h3 className="text-lg font-semibold text-white mb-2">Dropdown Glass</h3>
              <p className="text-white/70 text-sm">
                Uses dropdown glass classes with enhanced brightness
              </p>
            </div>
            
            <div className={`${getGlassClasses('button')} p-6 rounded-xl`}>
              <h3 className="text-lg font-semibold text-white mb-2">Button Glass</h3>
              <p className="text-white/70 text-sm">
                Uses button glass classes with light backdrop blur
              </p>
            </div>
          </div>
        </motion.section>

        {/* Elevation Demo */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-semibold text-white mb-6">Elevation System</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className={`${liquidGlassClasses.elevation50} p-4 rounded-xl`}>
              <h4 className="text-sm font-medium text-white mb-1">Elevation 50</h4>
              <p className="text-white/60 text-xs">Ultra-soft shadow</p>
            </div>
            
            <div className={`${liquidGlassClasses.elevation100} p-4 rounded-xl`}>
              <h4 className="text-sm font-medium text-white mb-1">Elevation 100</h4>
              <p className="text-white/60 text-xs">Soft shadow</p>
            </div>
            
            <div className={`${liquidGlassClasses.elevation200} p-4 rounded-xl`}>
              <h4 className="text-sm font-medium text-white mb-1">Elevation 200</h4>
              <p className="text-white/60 text-xs">Medium shadow</p>
            </div>
            
            <div className={`${liquidGlassClasses.elevation300} p-4 rounded-xl`}>
              <h4 className="text-sm font-medium text-white mb-1">Elevation 300</h4>
              <p className="text-white/60 text-xs">Elevated shadow</p>
            </div>
            
            <div className={`${liquidGlassClasses.elevation400} p-4 rounded-xl`}>
              <h4 className="text-sm font-medium text-white mb-1">Elevation 400</h4>
              <p className="text-white/60 text-xs">High shadow</p>
            </div>
          </div>
        </motion.section>

        {/* Alerts Demo */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-semibold text-white mb-6">Alerts with Softer Shadows</h2>
          
          <div className="space-y-4">
            <Alert className="border-green-500/30 bg-green-500/10">
              <AlertDescription className="text-green-300">
                Success alert with softer shadows and inner highlights
              </AlertDescription>
            </Alert>
            
            <Alert className="border-yellow-500/30 bg-yellow-500/10">
              <AlertDescription className="text-yellow-300">
                Warning alert with softer shadows and inner highlights
              </AlertDescription>
            </Alert>
            
            <Alert className="border-red-500/30 bg-red-500/10">
              <AlertDescription className="text-red-300">
                Error alert with softer shadows and inner highlights
              </AlertDescription>
            </Alert>
          </div>
        </motion.section>

        {/* Technical Details */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-semibold text-white mb-6">Technical Implementation</h2>
          
          <Card variant="default" className="p-6">
            <CardHeader>
              <CardTitle className="text-white">Key Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-lg font-medium text-white">Softer Shadows</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Larger blur radii with lower opacity</li>
                    <li>• Avoid harsh, dark drop-shadows</li>
                    <li>• Use pre-defined "glass" shadows</li>
                    <li>• Soften shadows further for floating elements</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-lg font-medium text-white">Inner Highlights</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Subtle inner shadow or border</li>
                    <li>• Light color to simulate light catching edges</li>
                    <li>• Creates luminous edge like macOS windows</li>
                    <li>• Makes components feel like translucent glass</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-white/5 rounded-lg">
                <h4 className="text-lg font-medium text-white mb-2">Example Shadow Token</h4>
                <code className="text-green-300 text-sm">
                  glassWithHighlight: '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                </code>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </div>
  );
};

export default SofterShadowsDemo; 