
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, User, BrainCircuit } from 'lucide-react';
import { cn } from '@/shared/utils/utils';
import { typography } from '@/design-system/design-system';

const FeatureCard = ({ icon, title, description, image, reverse = false }: { icon: React.ReactNode, title: string, description: string, image: string, reverse?: boolean }) => {
  const imageContent = (
    <motion.div 
      className="w-full md:w-1/2 p-4"
      initial={{ opacity: 0, x: reverse ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8 }}
    >
      <div className="bg-white/5 rounded-2xl p-2 shadow-2xl shadow-black/30">
        <img src={image} alt={title} className="rounded-xl object-cover w-full h-full" />
      </div>
    </motion.div>
  );

  const textContent = (
    <motion.div 
      className="w-full md:w-1/2 p-4 flex flex-col justify-center"
      initial={{ opacity: 0, x: reverse ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-white/10 p-3 rounded-full">
          {icon}
        </div>
        <h3 className={cn(typography.h3, "text-2xl")}>{title}</h3>
      </div>
      <p className={cn(typography.body.large, "text-white/80")}>{description}</p>
    </motion.div>
  );

  return (
    <div className={cn("flex flex-col md:flex-row items-center my-16", reverse && "md:flex-row-reverse")}>
      {imageContent}
      {textContent}
    </div>
  );
};

const FeaturesSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={cn(typography.h2, "text-3xl md:text-5xl font-extrabold")}>
            A Smarter Way to Practice Medicine
          </h2>
          <p className={cn(typography.body.large, "mt-4 max-w-3xl mx-auto text-white/80")}>
            Medica is more than just a digital notebook. It's an intelligent partner designed to enhance your clinical skills.
          </p>
        </motion.div>
        
        <div className="space-y-12">
            <FeatureCard 
                icon={<BookOpen className="h-8 w-8 text-blue-300" />}
                title="Streamlined Case Documentation"
                description="Quickly capture every detail of your patient encounters with our intuitive, structured forms. Spend less time on paperwork and more on what matters."
                image="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop"
            />
            <FeatureCard 
                icon={<User className="h-8 w-8 text-green-300" />}
                title="Holistic Patient Timelines"
                description="Maintain a complete, chronological history for each patient. Securely link multiple cases to a single profile for a comprehensive overview at a glance."
                image="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?q=80&w=2070&auto=format&fit=crop"
                reverse={true}
            />
            <FeatureCard 
                icon={<BrainCircuit className="h-8 w-8 text-purple-300" />}
                title="AI-Powered Insights"
                description="Unlock the hidden knowledge in your case logs. Our AI analyzes your data to identify patterns, suggest differential diagnoses, and highlight key learning opportunities."
                image="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2070&auto=format&fit=crop"
            />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
