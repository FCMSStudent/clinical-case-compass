
import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { cn } from '@/shared/utils/utils';

interface FormProgressProps {
  totalFields: number;
  completedFields: number;
  className?: string;
}

const FormProgress: React.FC<FormProgressProps> = ({
  totalFields,
  completedFields,
  className
}) => {
  const percentage = totalFields > 0 ? (completedFields / totalFields) * 100 : 0;

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-white/90">Profile Completion</span>
        <span className="text-sm text-white/70">{Math.round(percentage)}%</span>
      </div>
      
      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
        <div
          className="bg-gradient-to-r from-blue-500 to-green-500 h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      <div className="flex items-center gap-2 text-xs text-white/60">
        {percentage === 100 ? (
          <>
            <CheckCircle className="h-4 w-4 text-green-400" />
            <span>Profile complete!</span>
          </>
        ) : (
          <>
            <Circle className="h-4 w-4" />
            <span>{completedFields} of {totalFields} fields completed</span>
          </>
        )}
      </div>
    </div>
  );
};

export { FormProgress };
