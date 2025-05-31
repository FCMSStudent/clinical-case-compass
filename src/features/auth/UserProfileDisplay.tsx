
import { useAuth } from "@/app/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserProfileDisplay() {
  const { user, signOut } = useAuth();
  
  if (!user) {
    return null;
  }
  
  // Get the first letter of the user's email as a fallback
  const emailInitial = user.email ? user.email[0].toUpperCase() : "U";
  
  return (
    <div className="border-t border-border mt-auto pt-4">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback>{emailInitial}</AvatarFallback>
          </Avatar>
          <div className="space-y-0.5">
            <p className="text-sm font-medium">{user.email}</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={() => signOut()}>
          Logout
        </Button>
      </div>
    </div>
  );
}
