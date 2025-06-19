import React from 'react';
import { LoadingSpinner } from './loading-spinner';
import UnifiedBackground from '@/components/backgrounds/UnifiedBackground';
import { responsiveType } from '@/lib/typography';
import { cn } from '@/lib/utils';

const LoadingScreen = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center text-white">
      <UnifiedBackground />
      <div className="relative z-10 flex flex-col items-center gap-4">
        <LoadingSpinner size="lg" />
        <p className={cn(responsiveType.bodyLarge, "text-white/80")}>Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
