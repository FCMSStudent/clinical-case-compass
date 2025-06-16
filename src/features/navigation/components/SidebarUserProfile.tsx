import React, { useState, useRef } from "react";
import { User, LogOut } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/app/AuthContext';
import type { UserMetadata } from '@/types/auth';
import { getInteractionStates, getGlassmorphicStyles } from '@/lib/component-system';

interface SidebarUserProfileProps {
  collapsed: boolean;
  isMobile: boolean;
}

export const SidebarUserProfile: React.FC<SidebarUserProfileProps> = ({ collapsed, isMobile }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  if (!user) {
    return null;
  }

  const fullName = (user.user_metadata as UserMetadata)?.full_name || user.email;

  const handleSignOut = () => {
    signOut();
    setShowUserMenu(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (collapsed) {
        setShowUserMenu(!showUserMenu);
      } else {
        navigate("/account");
      }
    }
  };

  if (collapsed && !isMobile) {
    return (
      <div className="group relative">
        <button
          className={cn(
            "flex w-full items-center justify-center rounded-xl p-2 text-white",
            getGlassmorphicStyles('light'),
            getInteractionStates('medium', 'default', 'subtle')
          )}
          onClick={() => setShowUserMenu(!showUserMenu)}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowTooltip(true)}
          onBlur={() => setShowTooltip(false)}
          aria-label={`User profile: ${fullName}`}
          aria-expanded={showUserMenu}
          aria-haspopup="true"
          aria-describedby={showTooltip ? "user-tooltip" : undefined}
        >
          <div className={cn("flex h-8 w-8 items-center justify-center rounded-full", getGlassmorphicStyles('medium'))}>
            <User className="h-4 w-4 text-white" aria-hidden="true" />
          </div>
        </button>

        {/* Tooltip */}
        {showTooltip && (
          <div 
            id="user-tooltip"
            className="absolute top-1/2 left-full ml-2 -translate-y-1/2 z-50"
            role="tooltip"
          >
            <div className="relative">
              <div className={cn("absolute inset-0", getGlassmorphicStyles('elevated'))}></div>
              <div className={cn("relative px-3 py-2 text-xs text-white shadow-md min-w-[200px]", getGlassmorphicStyles('medium'))}>
                <div className="font-medium">{fullName}</div>
                <div className="text-white/70">{user.email}</div>
              </div>
            </div>
          </div>
        )}

        {/* User Menu */}
        {showUserMenu && (
          <div 
            ref={userMenuRef}
            className="absolute top-full left-0 mt-2 w-48 z-50"
            role="menu"
            aria-label="User menu"
          >
            <div className="relative">
              <div className={cn("absolute inset-0", getGlassmorphicStyles('elevated'))}></div>
              <div className={cn("relative py-2", getGlassmorphicStyles('medium'))}>
                <button
                  className={cn(
                    "w-full px-4 py-2 text-sm text-left text-white flex items-center space-x-2",
                    getInteractionStates('light', 'default', 'subtle')
                  )}
                  onClick={() => { navigate("/account"); setShowUserMenu(false); }}
                  role="menuitem"
                >
                  <User className="h-4 w-4" aria-hidden="true" />
                  <span>Account</span>
                </button>
                <div className="h-px bg-white/20 my-2" role="separator" />
                <button 
                  className={cn(
                    "w-full px-4 py-2 text-sm text-left text-red-300 flex items-center space-x-2",
                    getInteractionStates('light', 'default', 'subtle')
                  )}
                  onClick={handleSignOut}
                  role="menuitem"
                >
                  <LogOut className="h-4 w-4" aria-hidden="true" />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="border-t border-white/20 pt-4">
      <div
        className={cn(
          "flex items-center space-x-3 rounded-xl p-3 cursor-pointer text-white",
          getGlassmorphicStyles('light'),
          getInteractionStates('medium', 'default', 'subtle')
        )}
        onClick={() => navigate("/account")}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`User profile: ${fullName}`}
      >
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-full", getGlassmorphicStyles('medium'))}>
          <User className="h-5 w-5 text-white" aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="truncate text-sm font-medium text-white">{fullName}</p>
          <p className="truncate text-xs text-white/70">{user.email}</p>
        </div>
        <button
          className={cn(
            "p-1 rounded-lg text-white",
            getGlassmorphicStyles('light'),
            getInteractionStates('medium', 'default', 'subtle')
          )}
          aria-label="Sign out"
          onClick={e => { e.stopPropagation(); signOut(); }}
        >
          <LogOut className="h-4 w-4 text-white" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}; 