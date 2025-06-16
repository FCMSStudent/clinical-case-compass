import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Stethoscope,
  Activity
} from 'lucide-react';
import { 
  getComponentStyles,
  animations
} from '@/lib/design-system';
import { BentoContainer } from '@/components/ui/bento-container';
import { BentoCard } from '@/components/ui/bento-card';

export const BentoGridDemo: React.FC = () => {
  return (
    <motion.section
      variants={animations.staggeredContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold text-white">Bento Grid System</h2>
      
      <BentoContainer layout="default">
        <BentoCard
          layout="small"
          variant="elevated"
          icon={<Stethoscope />}
          title="Medical Records"
          subtitle="Patient data management"
        >
          <div className="space-y-2">
            <div className="text-2xl font-bold text-white">1,234</div>
            <div className="text-sm text-white/70">Active records</div>
          </div>
        </BentoCard>

        <BentoCard
          layout="medium"
          variant="interactive"
          icon={<Activity />}
          title="Patient Monitoring"
          subtitle="Real-time health tracking"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white/70">Heart Rate</span>
              <span className="text-white font-semibold">72 BPM</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/70">Blood Pressure</span>
              <span className="text-white font-semibold">120/80</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div className="bg-green-400 h-2 rounded-full" style={{ width: '75%' }} />
            </div>
          </div>
        </BentoCard>

        <BentoCard
          layout="large"
          variant="featured"
          title="Case Analytics"
          subtitle="Comprehensive medical insights"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">89%</div>
                <div className="text-sm text-white/70">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">234</div>
                <div className="text-sm text-white/70">Cases Handled</div>
              </div>
            </div>
            <Button className={`w-full ${getComponentStyles('button', 'primary', 'md')}`}>
              View Details
            </Button>
          </div>
        </BentoCard>
      </BentoContainer>
    </motion.section>
  );
}; 