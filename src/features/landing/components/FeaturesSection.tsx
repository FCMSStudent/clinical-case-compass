
import React from 'react';
import { BentoCard } from '@/components/ui/bento-card';
import { FileText, Stethoscope, BookOpen, BrainCircuit, Users, BarChart } from 'lucide-react';
import { typography } from '@/lib/ui-styles';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <FileText />,
    title: 'Comprehensive Case Documentation',
    content: 'Capture every detail, from chief complaints to diagnoses and learning points, in a structured format.',
    layout: 'medium',
  },
  {
    icon: <Stethoscope />,
    title: 'Patient-Centric View',
    content: "Maintain a clear and concise record of each patient's medical history and associated cases.",
    layout: 'small',
  },
  {
    icon: <BookOpen />,
    title: 'Learning Points',
    content: 'Distill key takeaways from each case to reinforce your medical knowledge and improve future practice.',
    layout: 'small',
  },
  {
    icon: <BarChart />,
    title: 'Track Your Progress',
    content: 'Visualize your case exposure across different specialties and demographics to identify knowledge gaps.',
    layout: 'medium',
  },
  {
    icon: <Users />,
    title: 'Collaborate with Peers',
    content: 'Securely share anonymized cases with colleagues or mentors for feedback and discussion. (Coming Soon)',
    layout: 'large',
  },
  {
    icon: <BrainCircuit />,
    title: 'AI-Powered Insights',
    content: 'Leverage AI to suggest differential diagnoses and highlight critical information from case notes. (Coming Soon)',
    layout: 'medium',
  },
];


const FeaturesSection = () => {
  return (
    <motion.section 
        id="features" 
        className="py-24"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className={cn(typography.h2, "text-3xl md:text-4xl font-bold")}>Everything You Need for Clinical Excellence</h2>
          <p className={cn(typography.body.large, "mt-4 max-w-3xl mx-auto text-white/70")}>
            A powerful suite of tools designed for the modern medical professional, from student to seasoned expert.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {features.map((feature, index) => (
            <BentoCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              layout={feature.layout as any}
              variant="elevated"
              className="flex flex-col hover:border-blue-400/50"
            >
              <p className={cn(typography.body.small, 'text-white/80 flex-grow')}>{feature.content}</p>
            </BentoCard>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default FeaturesSection;
