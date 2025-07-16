
import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { cn } from '@/shared/utils/utils';
import { buttonVariants, typography } from '@/design-system/unified-system';
import { ArrowRight } from 'lucide-react';

const CtaSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="bg-white/10 rounded-3xl p-10 md:p-16 text-center shadow-2xl backdrop-blur-lg border border-white/20"
        >
          <h2 className={cn(typography.h2, "text-3xl md:text-5xl font-extrabold")}>
            Ready to Transform Your Clinical Workflow?
          </h2>
          <p className={cn(typography.body.large, "mt-6 max-w-3xl mx-auto text-white/80")}>
            Join hundreds of clinicians who are already using Medica to enhance their practice, accelerate learning, and provide better patient care.
          </p>
          <div className="mt-10">
            <NavLink to="/auth" className={cn(buttonVariants.primary, "h-14 px-10 text-lg font-semibold shadow-lg shadow-blue-500/40")}>
              Start Your Free Trial
              <ArrowRight className="h-6 w-6 ml-2" />
            </NavLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
