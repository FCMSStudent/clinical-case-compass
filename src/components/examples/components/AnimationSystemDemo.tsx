import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart,
  Activity,
  TrendingUp
} from 'lucide-react';
import { card } from "@/lib/components";
import { 
  animations
} from '@/lib/design-system';

export const AnimationSystemDemo: React.FC = () => {
  return (
    <motion.section
      variants={animations.staggeredContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold text-white">Animation System</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <motion.div
          variants={animations.fadeIn}
          whileHover={{ scale: 1.05 }}
          className={`${card.base} ${card.variant.interactive} ${card.padding.lg}`}
        >
          <div className="text-center space-y-2">
            <Heart className="h-8 w-8 text-red-400 mx-auto" />
            <h3 className="text-lg font-semibold text-white">Fade In</h3>
            <p className="text-sm text-white/70">Smooth entrance animation</p>
          </div>
        </motion.div>

        <motion.div
          variants={animations.glassyHover}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          className={`${card.base} ${card.variant.interactive} ${card.padding.lg}`}
        >
          <div className="text-center space-y-2">
            <Activity className="h-8 w-8 text-green-400 mx-auto" />
            <h3 className="text-lg font-semibold text-white">Glassy Hover</h3>
            <p className="text-sm text-white/70">3D hover effect</p>
          </div>
        </motion.div>

        <motion.div
          variants={animations.floating}
          initial="initial"
          animate="animate"
          className={`${card.base} ${card.variant.interactive} ${card.padding.lg}`}
        >
          <div className="text-center space-y-2">
            <TrendingUp className="h-8 w-8 text-blue-400 mx-auto" />
            <h3 className="text-lg font-semibold text-white">Floating</h3>
            <p className="text-sm text-white/70">Continuous float animation</p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}; 