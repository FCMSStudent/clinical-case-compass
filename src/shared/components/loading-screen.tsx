
import React from 'react';
import { LoadingSpinner } from './loading-spinner';
import UnifiedBackground from '@/shared/components/UnifiedBackground';
import { typography } from '@/design-system/tokens/typography';
import { cn } from '@/shared/utils/utils';

const LoadingScreen = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center text-white">
      <UnifiedBackground />
      <div className="relative z-10 flex flex-col items-center gap-4">
        <LoadingSpinner size="lg" />
        <p className={cn(typography.body.large, "text-white/80")}>Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
