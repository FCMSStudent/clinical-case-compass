import React from 'react';
import { Check, X } from 'lucide-react';

interface PasswordStrengthIndicatorProps {
  password: string;
}

interface StrengthRequirement {
  label: string;
  test: (password: string) => boolean;
  met: boolean;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ password }) => {
  const requirements: StrengthRequirement[] = [
    {
      label: "At least 8 characters",
      test: (pwd) => pwd.length >= 8,
      met: password.length >= 8
    },
    {
      label: "One uppercase letter",
      test: (pwd) => /[A-Z]/.test(pwd),
      met: /[A-Z]/.test(password)
    },
    {
      label: "One lowercase letter",
      test: (pwd) => /[a-z]/.test(pwd),
      met: /[a-z]/.test(password)
    },
    {
      label: "One number",
      test: (pwd) => /[0-9]/.test(pwd),
      met: /[0-9]/.test(password)
    },
    {
      label: "One special character",
      test: (pwd) => /[^A-Za-z0-9]/.test(pwd),
      met: /[^A-Za-z0-9]/.test(password)
    }
  ];

  const metRequirements = requirements.filter(req => req.met).length;
  const totalRequirements = requirements.length;
  const strengthPercentage = (metRequirements / totalRequirements) * 100;

  // Only show if password has been entered
  if (!password) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="text-white/70">Password strength</span>
        <span className="text-white/90">{metRequirements}/{totalRequirements}</span>
      </div>
      
      <div className="w-full bg-white/10 rounded-full h-1.5">
        <div 
          className={`h-1.5 rounded-full transition-all duration-300 ${
            strengthPercentage <= 20 ? 'bg-red-400' :
            strengthPercentage <= 40 ? 'bg-orange-400' :
            strengthPercentage <= 60 ? 'bg-yellow-400' :
            strengthPercentage <= 80 ? 'bg-blue-400' :
            'bg-green-400'
          }`}
          style={{ width: `${strengthPercentage}%` }}
        />
      </div>
      
      <div className="space-y-1">
        {requirements.map((requirement, index) => (
          <div key={index} className="flex items-center gap-2 text-xs">
            {requirement.met ? (
              <Check className="w-3 h-3 text-green-400" />
            ) : (
              <X className="w-3 h-3 text-red-400" />
            )}
            <span className={requirement.met ? 'text-green-400' : 'text-red-400'}>
              {requirement.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator; 