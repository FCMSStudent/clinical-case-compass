import React from 'react';
import { motion } from 'framer-motion';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
  showHeader?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  description,
  className = '',
  showHeader = true
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`min-h-screen bg-gradient-to-br from-black via-gray-900 to-black ${className}`}
    >
      {showHeader && (title || description) && (
        <div className="container mx-auto px-4 py-8">
          {title && (
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl font-bold text-white mb-2"
            >
              {title}
            </motion.h1>
          )}
          {description && (
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-300 text-lg"
            >
              {description}
            </motion.p>
          )}
        </div>
      )}
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex-1"
      >
        {children}
      </motion.main>
    </motion.div>
  );
};

export default PageLayout; 