import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { X, Settings, Info, MessageCircle, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { liquidGlassClasses, translucentBackgrounds } from '@/lib/glass-effects';

export const FrostedGlassOverlaysDemo: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-bold text-white">
            Frosted Glass Overlays
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Enhanced translucent overlays with Apple-inspired frosted glass effects for modals, panels, and overlays
          </p>
        </motion.div>

        {/* Demo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Modal Demo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className={cn("border-white/20", translucentBackgrounds.card)}>
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Modal Overlay
                </CardTitle>
                <CardDescription className="text-white/70">
                  Enhanced frosted glass modal with 25% opacity and 50px blur
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-white/80 text-sm space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-white/20 text-white">25% Opacity</Badge>
                    <Badge variant="secondary" className="bg-white/20 text-white">50px Blur</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-white/20 text-white">200% Saturation</Badge>
                    <Badge variant="secondary" className="bg-white/20 text-white">115% Contrast</Badge>
                  </div>
                </div>
                
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full" variant="outline">
                      Open Frosted Modal
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="border-white/25 bg-white/25 backdrop-blur-[50px] saturate-200 contrast-115 shadow-[0_16px_64px_rgba(0,0,0,0.2)] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]">
                    <DialogHeader>
                      <DialogTitle className="text-white">Frosted Glass Modal</DialogTitle>
                      <DialogDescription className="text-white/70">
                        This modal demonstrates the enhanced frosted glass overlay with higher opacity, stronger blur, and enhanced contrast.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                        <p className="text-white/80 text-sm">
                          Notice the vibrant glass effect with enhanced contrast and the subtle inner highlight that gives it depth.
                        </p>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => setIsModalOpen(false)}>
                          Confirm
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sheet Demo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className={cn("border-white/20", translucentBackgrounds.card)}>
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Menu className="h-5 w-5" />
                  Sheet Overlay
                </CardTitle>
                <CardDescription className="text-white/70">
                  Frosted glass sheet with enhanced backdrop blur and contrast
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-white/80 text-sm space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-white/20 text-white">25% Opacity</Badge>
                    <Badge variant="secondary" className="bg-white/20 text-white">50px Blur</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-white/20 text-white">200% Saturation</Badge>
                    <Badge variant="secondary" className="bg-white/20 text-white">115% Contrast</Badge>
                  </div>
                </div>
                
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                  <SheetTrigger asChild>
                    <Button className="w-full" variant="outline">
                      Open Frosted Sheet
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="border-white/25 bg-white/25 backdrop-blur-[50px] saturate-200 contrast-115 shadow-[0_16px_64px_rgba(0,0,0,0.2)] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]">
                    <SheetHeader>
                      <SheetTitle className="text-white">Frosted Glass Sheet</SheetTitle>
                      <SheetDescription className="text-white/70">
                        This sheet demonstrates the enhanced frosted glass overlay with proper elevation and contrast.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="space-y-4 mt-6">
                      <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                        <p className="text-white/80 text-sm">
                          The sheet maintains the same frosted glass quality as the modal with enhanced visual hierarchy.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                          <Settings className="h-4 w-4 text-white/70" />
                          <span className="text-white">Settings</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                          <Info className="h-4 w-4 text-white/70" />
                          <span className="text-white">Information</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                          <MessageCircle className="h-4 w-4 text-white/70" />
                          <span className="text-white">Messages</span>
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </CardContent>
            </Card>
          </motion.div>

          {/* Popover Demo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className={cn("border-white/20", translucentBackgrounds.card)}>
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Popover Overlay
                </CardTitle>
                <CardDescription className="text-white/70">
                  Enhanced frosted glass popover with vibrant contrast
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-white/80 text-sm space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-white/20 text-white">25% Opacity</Badge>
                    <Badge variant="secondary" className="bg-white/20 text-white">40px Blur</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-white/20 text-white">200% Saturation</Badge>
                    <Badge variant="secondary" className="bg-white/20 text-white">115% Contrast</Badge>
                  </div>
                </div>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button className="w-full" variant="outline">
                      Open Frosted Popover
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="border-white/25 bg-white/25 backdrop-blur-[40px] saturate-200 contrast-115 shadow-[0_16px_64px_rgba(0,0,0,0.2)] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]">
                    <div className="space-y-2">
                      <h4 className="font-medium text-white">Frosted Glass Popover</h4>
                      <p className="text-white/70 text-sm">
                        This popover demonstrates the enhanced frosted glass effect with proper elevation and vibrant contrast.
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <Badge variant="secondary" className="bg-white/20 text-white text-xs">Enhanced</Badge>
                        <Badge variant="secondary" className="bg-white/20 text-white text-xs">Vibrant</Badge>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Technical Specifications */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-semibold text-white">Technical Specifications</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className={cn("border-white/20", translucentBackgrounds.medium.white)}>
              <CardHeader>
                <CardTitle className="text-white">Backdrop Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-white/80 text-sm">
                  <strong>Background:</strong> rgba(255,255,255,0.25)
                </div>
                <div className="text-white/80 text-sm">
                  <strong>Backdrop Blur:</strong> 30-50px
                </div>
                <div className="text-white/80 text-sm">
                  <strong>Saturation:</strong> 200%
                </div>
                <div className="text-white/80 text-sm">
                  <strong>Contrast:</strong> 115%
                </div>
                <div className="text-white/80 text-sm">
                  <strong>Border:</strong> 1px solid rgba(255,255,255,0.25)
                </div>
              </CardContent>
            </Card>

            <Card className={cn("border-white/20", translucentBackgrounds.medium.white)}>
              <CardHeader>
                <CardTitle className="text-white">Shadow & Elevation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-white/80 text-sm">
                  <strong>Drop Shadow:</strong> 0 16px 64px rgba(0,0,0,0.2)
                </div>
                <div className="text-white/80 text-sm">
                  <strong>Inner Highlight:</strong> inset 0 1px 0 rgba(255,255,255,0.3)
                </div>
                <div className="text-white/80 text-sm">
                  <strong>Border Radius:</strong> 16px (rounded-2xl)
                </div>
                <div className="text-white/80 text-sm">
                  <strong>Z-Index:</strong> 50 (overlay), 50+ (content)
                </div>
                <div className="text-white/80 text-sm">
                  <strong>Animation:</strong> Smooth fade and scale transitions
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Implementation Guide */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-semibold text-white">Implementation Guide</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className={cn("border-white/20", translucentBackgrounds.light.white)}>
              <CardHeader>
                <CardTitle className="text-white">CSS Classes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-white/80 text-sm">
                  <strong>Modal:</strong> bg-white/25 backdrop-blur-[50px] saturate-200 contrast-115
                </div>
                <div className="text-white/80 text-sm">
                  <strong>Sheet:</strong> bg-white/25 backdrop-blur-[50px] saturate-200 contrast-115
                </div>
                <div className="text-white/80 text-sm">
                  <strong>Popover:</strong> bg-white/25 backdrop-blur-[40px] saturate-200 contrast-115
                </div>
                <div className="text-white/80 text-sm">
                  <strong>Panel:</strong> bg-white/20 backdrop-blur-[40px] saturate-180 contrast-110
                </div>
              </CardContent>
            </Card>

            <Card className={cn("border-white/20", translucentBackgrounds.light.white)}>
              <CardHeader>
                <CardTitle className="text-white">Best Practices</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-white/80 text-sm">
                  <strong>Layer Appropriately:</strong> Use higher opacity for important overlays
                </div>
                <div className="text-white/80 text-sm">
                  <strong>Maintain Contrast:</strong> Ensure text remains readable
                </div>
                <div className="text-white/80 text-sm">
                  <strong>Consider Context:</strong> Choose blur intensity based on importance
                </div>
                <div className="text-white/80 text-sm">
                  <strong>Performance:</strong> Use appropriate blur values for target devices
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.section>
      </div>
    </div>
  );
}; 