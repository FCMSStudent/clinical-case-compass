
import { useAuth } from "@/app/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSidebar } from "@/layouts/Sidebar";
import { LogOut } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function UserProfileDisplay() {
  const { user, signOut } = useAuth();
  const { open, isMobile } = useSidebar();
  
  if (!user) {
    return null;
  }
  
  // Get the first letter of the user's email as a fallback
  const emailInitial = user.email ? user.email[0].toUpperCase() : "U";
  
  // Collapsed sidebar on desktop
  if (!open && !isMobile) {
    return (
      <div className="border-t border-border mt-auto pt-4 px-4">
        <div className="flex flex-col items-center space-y-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar className="h-8 w-8">
                <AvatarImage src="" />
                <AvatarFallback>{emailInitial}</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent side="right">
              {user.email}
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={() => signOut()} className="h-8 w-8">
                <LogOut className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              Logout
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    );
  }
  
  // Expanded sidebar
  return (
    <div className="border-t border-border mt-auto pt-4">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback>{emailInitial}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm font-medium truncate">{user.email}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={() => signOut()}>
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
