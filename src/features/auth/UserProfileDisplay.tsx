
import { useAuth } from "@/app/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User } from "lucide-react";

export function UserProfileDisplay() {
  const { user, signOut } = useAuth();
  
  if (!user) {
    return null;
  }
  
  return (
    <div className="flex items-center justify-between px-4 py-2">
      <div className="flex items-center space-x-3">
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>
            <User className="h-4 w-4 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <p className="text-sm font-medium truncate">{user.email}</p>
        </div>
      </div>
      <Button variant="ghost" size="icon" onClick={() => signOut()}>
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  );
}
