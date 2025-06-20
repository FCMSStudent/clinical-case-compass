
import React from 'react';
import { Check, Save, AlertCircle } from 'lucide-react';
import { cn } from '@/shared/utils/utils';

interface AutosaveIndicatorProps {
  status: 'idle' | 'saving' | 'saved' | 'error';
  lastSaved?: Date;
  className?: string;
}

const AutosaveIndicator: React.FC<AutosaveIndicatorProps> = ({
  status,
  lastSaved,
  className
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'saving':
        return {
          icon: Save,
          text: 'Saving...',
          color: 'text-blue-400'
        };
      case 'saved':
        return {
          icon: Check,
          text: 'Saved',
          color: 'text-green-400'
        };
      case 'error':
        return {
          icon: AlertCircle,
          text: 'Error saving',
          color: 'text-red-400'
        };
      default:
        return null;
    }
  };

  const config = getStatusConfig();
  
  if (!config) return null;

  const Icon = config.icon;

  return (
    <div className={cn('flex items-center gap-2 text-sm', config.color, className)}>
      <Icon className="h-4 w-4" />
      <span>{config.text}</span>
      {status === 'saved' && lastSaved && (
        <span className="text-white/60 text-xs">
          {lastSaved.toLocaleTimeString()}
        </span>
      )}
    </div>
  );
};

export { AutosaveIndicator };
