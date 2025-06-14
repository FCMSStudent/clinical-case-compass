import React, { useState, useRef } from 'react';
import { Camera, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AvatarUploadProps {
  currentAvatar?: string;
  onAvatarChange?: (file: File) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({
  currentAvatar,
  onAvatarChange,
  className,
  size = 'lg'
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-20 h-20',
    lg: 'w-24 h-24'
  };

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onAvatarChange?.(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const avatarSrc = preview || currentAvatar;

  return (
    <div className={cn('relative group cursor-pointer', className)}>
      <div
        className={cn(
          'relative rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden border-4 border-white/20 transition-all duration-300',
          sizeClasses[size],
          isDragging && 'scale-105 border-blue-400/50'
        )}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
        onClick={handleClick}
      >
        {avatarSrc ? (
          <img
            src={avatarSrc}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-white text-lg font-bold">
            {getInitials('User')}
          </span>
        )}
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-300 flex items-center justify-center">
          <Camera className="h-6 w-6 text-white" />
        </div>
      </div>

      {/* Upload Button */}
      <Button
        size="sm"
        className="absolute -bottom-2 -right-2 rounded-full bg-blue-600 w-8 h-8 p-0 shadow-lg"
        onClick={handleClick}
      >
        <Upload className="h-4 w-4" />
      </Button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileSelect(file);
        }}
        className="hidden"
      />
    </div>
  );
};

export { AvatarUpload };
