
import * as React from "react";
import { motion } from "framer-motion";
import { 
  Stethoscope, 
  Activity, 
  Heart, 
  Pill, 
  User, 
  Settings, 
  Plus,
  AlertTriangle,
  CheckCircle,
  Info,
  XCircle
} from "lucide-react";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Container,
  Flex,
  Grid,
  Section,
  BentoContainer,
  BentoCard,
  AnimatedDiv,
  StaggeredContainer,
  StaggeredItem,
  GlassyHover,
  Floating,
  PulseGlow,
  MedicalPulse,
} from "@/components/ui";
import * as designSystem from "@/lib/design-system";
import { useTheme } from "@/lib/design-system";

export const UnifiedComponentSystemExample: React.FC = () => {
  const { currentTheme } = useTheme();
  return (
    <Container variant="default">
      <Section spacing="xl">
        <AnimatedDiv variant="glassmorphicEntrance" className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Phase 3: Unified Component System
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Standardized component variants, interaction states, glassmorphic effects, 
            layout primitives, and animation standards for consistent medical UI.
          </p>
        </AnimatedDiv>

        {/* Button Variants Section */}
        <StaggeredContainer className="space-y-8">
          <StaggeredItem>
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Standardized Button Variants
                </CardTitle>
                <CardDescription>
                  Consistent interaction states and glassmorphic effects across all button types
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Grid variant="responsive" gap="md">
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-white/70 uppercase tracking-wide">Primary Variants</h4>
                    <Flex variant="start" className="flex-wrap gap-3">
                      <Button variant="primary" size="sm">Primary</Button>
                      <Button variant="secondary" size="sm">Secondary</Button>
                      <Button variant="outline" size="sm">Outline</Button>
                      <Button variant="ghost" size="sm">Ghost</Button>
                    </Flex>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-white/70 uppercase tracking-wide">Status Variants</h4>
                    <Flex variant="start" className="flex-wrap gap-3">
                      <Button variant="success" size="sm">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Success
                      </Button>
                      <Button variant="warning" size="sm">
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        Warning
                      </Button>
                      <Button variant="error" size="sm">
                        <XCircle className="h-4 w-4 mr-1" />
                        Error
                      </Button>
                      <Button variant="info" size="sm">
                        <Info className="h-4 w-4 mr-1" />
                        Info
                      </Button>
                    </Flex>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-white/70 uppercase tracking-wide">Medical Variants</h4>
                    <Flex variant="start" className="flex-wrap gap-3">
                      <Button variant="medical" size="sm">
                        <Stethoscope className="h-4 w-4 mr-1" />
                        Medical
                      </Button>
                      <Button variant="critical" size="sm">
                        <Heart className="h-4 w-4 mr-1" />
                        Critical
                      </Button>
                    </Flex>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-white/70 uppercase tracking-wide">Sizes</h4>
                    <Flex variant="start" className="flex-wrap gap-3">
                      <Button variant="primary" size="xs">XS</Button>
                      <Button variant="primary" size="sm">Small</Button>
                      <Button variant="primary" size="md">Medium</Button>
                      <Button variant="primary" size="lg">Large</Button>
                      <Button variant="primary" size="xl">XL</Button>
                    </Flex>
                  </div>
                </Grid>
              </CardContent>
            </Card>
          </StaggeredItem>

          {/* Input Variants Section */}
          <StaggeredItem>
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Standardized Input Variants
                </CardTitle>
                <CardDescription>
                  Consistent glassmorphic effects and interaction states for form inputs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Grid variant="responsive" gap="md">
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-white/70 uppercase tracking-wide">Input Variants</h4>
                    <div className="space-y-3">
                      <Input variant="default" placeholder="Default input variant" />
                      <Input variant="elevated" placeholder="Elevated input variant" />
                      <Input variant="subtle" placeholder="Subtle input variant" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-white/70 uppercase tracking-wide">Input Sizes</h4>
                    <div className="space-y-3">
                      <Input size="xs" placeholder="Extra small input" />
                      <Input size="sm" placeholder="Small input" />
                      <Input size="md" placeholder="Medium input" />
                      <Input size="lg" placeholder="Large input" />
                      <Input size="xl" placeholder="Extra large input" />
                    </div>
                  </div>
                </Grid>
              </CardContent>
            </Card>
          </StaggeredItem>

          {/* Card Variants Section */}
          <StaggeredItem>
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Standardized Card Variants
                </CardTitle>
                <CardDescription>
                  Glassmorphic effects and interaction states for different card types
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Grid variant="responsive" gap="md">
                  <Card variant="default">
                    <CardHeader>
                      <CardTitle>Default Card</CardTitle>
                      <CardDescription>Standard glassmorphic card</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-white/70">Hover for subtle interaction effects</p>
                    </CardContent>
                  </Card>
                  
                  <Card variant="elevated">
                    <CardHeader>
                      <CardTitle>Elevated Card</CardTitle>
                      <CardDescription>Enhanced glassmorphic effects</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-white/70">More pronounced visual depth</p>
                    </CardContent>
                  </Card>
                  
                  <Card variant="interactive">
                    <CardHeader>
                      <CardTitle>Interactive Card</CardTitle>
                      <CardDescription>Enhanced hover and focus states</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-white/70">Clickable with strong feedback</p>
                    </CardContent>
                  </Card>
                  
                  <Card variant="featured">
                    <CardHeader>
                      <CardTitle>Featured Card</CardTitle>
                      <CardDescription>Premium visual treatment</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-white/70">Ring border and enhanced effects</p>
                    </CardContent>
                  </Card>
                  
                  <Card variant="success">
                    <CardHeader>
                      <CardTitle>Success Card</CardTitle>
                      <CardDescription>Positive status indication</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-white/70">Green accent colors</p>
                    </CardContent>
                  </Card>
                  
                  <Card variant="error">
                    <CardHeader>
                      <CardTitle>Error Card</CardTitle>
                      <CardDescription>Critical status indication</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-white/70">Red accent colors</p>
                    </CardContent>
                  </Card>
                </Grid>
              </CardContent>
            </Card>
          </StaggeredItem>

          {/* Layout Primitives Section */}
          <StaggeredItem>
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Layout Primitives & Grid Systems
                </CardTitle>
                <CardDescription>
                  Standardized layout components and responsive grid systems
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Flex Layouts */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-white/70 uppercase tracking-wide">Flex Layouts</h4>
                  <Grid variant="responsive" gap="sm">
                    <Flex variant="center" className="h-20 bg-white/10 rounded-lg">
                      <span className="text-sm text-white/70">Center</span>
                    </Flex>
                    <Flex variant="between" className="h-20 bg-white/10 rounded-lg px-4">
                      <span className="text-sm text-white/70">Start</span>
                      <span className="text-sm text-white/70">End</span>
                    </Flex>
                    <Flex variant="col" className="h-20 bg-white/10 rounded-lg p-4">
                      <span className="text-sm text-white/70">Column</span>
                      <span className="text-sm text-white/70">Layout</span>
                    </Flex>
                  </Grid>
                </div>

                {/* Grid Layouts */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-white/70 uppercase tracking-wide">Grid Layouts</h4>
                  <Grid variant="responsive" gap="sm">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="h-16 bg-white/10 rounded-lg flex items-center justify-center">
                        <span className="text-sm text-white/70">Item {i + 1}</span>
                      </div>
                    ))}
                  </Grid>
                </div>
              </CardContent>
            </Card>
          </StaggeredItem>

          {/* Bento Grid Section */}
          <StaggeredItem>
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Enhanced Bento Grid System
                </CardTitle>
                <CardDescription>
                  Responsive 6-column grid with standardized card layouts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BentoContainer layout="default">
                  <BentoCard
                    layout="small"
                    variant="default"
                    icon={<Stethoscope className="h-5 w-5 text-white" />}
                    title="Patient Records"
                    subtitle="1,234 active cases"
                  >
                    <div className="text-2xl font-bold text-white">1,234</div>
                  </BentoCard>

                  <BentoCard
                    layout="medium"
                    variant="interactive"
                    icon={<Heart className="h-5 w-5 text-white" />}
                    title="Vital Signs"
                    subtitle="Real-time monitoring"
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-white/70">Heart Rate</span>
                        <span className="text-white font-semibold">72 BPM</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div className="bg-green-400 h-2 rounded-full" style={{ width: '75%' }} />
                      </div>
                    </div>
                  </BentoCard>

                  <BentoCard
                    layout="large"
                    variant="featured"
                    icon={<Pill className="h-5 w-5 text-white" />}
                    title="Medications"
                    subtitle="Active prescriptions"
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Active</span>
                        <span className="text-white font-semibold">12</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Pending</span>
                        <span className="text-white font-semibold">3</span>
                      </div>
                    </div>
                  </BentoCard>

                  <BentoCard
                    layout="hero"
                    variant="elevated"
                    icon={<Activity className="h-5 w-5 text-white" />}
                    title="Recent Activity"
                    subtitle="Latest patient updates"
                  >
                    <div className="space-y-2">
                      <div className="text-sm text-white/70">Dr. Smith updated Case #1234</div>
                      <div className="text-sm text-white/70">New lab results available</div>
                      <div className="text-sm text-white/70">Appointment scheduled</div>
                    </div>
                  </BentoCard>
                </BentoContainer>
              </CardContent>
            </Card>
          </StaggeredItem>

          {/* Animation Standards Section */}
          <StaggeredItem>
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Animation & Transition Standards
                </CardTitle>
                <CardDescription>
                  Standardized animation variants and transition effects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Grid variant="responsive" gap="md">
                  <GlassyHover intensity="medium" className="p-6 bg-white/10 rounded-lg">
                    <h4 className="text-sm font-medium text-white/70 mb-2">Glassy Hover</h4>
                    <p className="text-sm text-white/70">3D hover effects with brightness</p>
                  </GlassyHover>

                  <Floating className="p-6 bg-white/10 rounded-lg">
                    <h4 className="text-sm font-medium text-white/70 mb-2">Floating</h4>
                    <p className="text-sm text-white/70">Continuous floating animation</p>
                  </Floating>

                  <PulseGlow className="p-6 bg-white/10 rounded-lg">
                    <h4 className="text-sm font-medium text-white/70 mb-2">Pulse Glow</h4>
                    <p className="text-sm text-white/70">Pulsing glow effect</p>
                  </PulseGlow>

                  <MedicalPulse className="p-6 bg-white/10 rounded-lg">
                    <h4 className="text-sm font-medium text-white/70 mb-2">Medical Pulse</h4>
                    <p className="text-sm text-white/70">Medical-specific pulse animation</p>
                  </MedicalPulse>
                </Grid>
              </CardContent>
            </Card>
          </StaggeredItem>

          {/* Utility Functions Section */}
          <StaggeredItem>
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Utility Functions
                </CardTitle>
                <CardDescription>
                  Helper functions for consistent component styling
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Grid variant="responsive" gap="md">
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-white/70 uppercase tracking-wide">Component Styles</h4>
                    <div className="space-y-2">
                      <Button className={designSystem.getComponentStyles('button', 'primary', 'md')}>
                        Dynamic Button
                      </Button>
                      <Input className={designSystem.getComponentStyles('input', 'elevated', 'md')} placeholder="Dynamic Input" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-white/70 uppercase tracking-wide">Glassmorphic Styles</h4>
                    <div className="space-y-2">
                      <div className="p-4 rounded-lg" style={designSystem.getGlassmorphicStyles(currentTheme, 'subtle')}>
                        <span className="text-sm text-white/70">Subtle glassmorphic effect</span>
                      </div>
                      <div className="p-4 rounded-lg" style={designSystem.getGlassmorphicStyles(currentTheme, 'elevated')}>
                        <span className="text-sm text-white/70">Elevated glassmorphic effect</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-white/70 uppercase tracking-wide">Interaction States</h4>
                    <div className="space-y-2">
                      <p className="text-sm text-white/70">Interaction states are now built into components.</p>
                    </div>
                  </div>
                </Grid>
              </CardContent>
            </Card>
          </StaggeredItem>
        </StaggeredContainer>
      </Section>
    </Container>
  );
};
