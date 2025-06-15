
import React, { useState, useEffect } from "react";
import { useAuth } from "@/app/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { EnhancedAppLayout } from "@/features/navigation/components/EnhancedAppLayout";
import { User, Mail, Calendar, Shield, Edit3, Save, X } from "lucide-react";
import { toast } from "sonner";

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user?.user_metadata?.full_name) {
      setDisplayName(user.user_metadata.full_name);
    }
  }, [user]);

  const handleSave = async () => {
    if (!displayName.trim()) {
      toast.error("Display name cannot be empty");
      return;
    }

    setIsLoading(true);
    try {
      await updateProfile({ full_name: displayName });
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setDisplayName(user?.user_metadata?.full_name || "");
    setIsEditing(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <EnhancedAppLayout>
      <div className="w-full max-w-4xl mx-auto space-y-6">
        <PageHeader
          title="Profile"
          description="Manage your account settings and preferences"
          icon={<User className="h-8 w-8" />}
        />

        {/* Profile Overview Card */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-white flex items-center">
              <User className="mr-2 h-5 w-5" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={user?.user_metadata?.avatar_url}
                  alt={displayName || "User avatar"}
                />
                <AvatarFallback className="bg-blue-500/20 text-white text-lg">
                  {displayName ? getInitials(displayName) : "U"}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                {isEditing ? (
                  <div className="flex items-center space-x-2">
                    <div className="space-y-1">
                      <Label htmlFor="displayName" className="text-white text-sm">
                        Display Name
                      </Label>
                      <Input
                        id="displayName"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="flex items-end space-x-1 pb-1">
                      <Button
                        size="sm"
                        onClick={handleSave}
                        disabled={isLoading}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCancel}
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <h2 className="text-xl font-semibold text-white">
                      {displayName || "No name set"}
                    </h2>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setIsEditing(true)}
                      className="text-white/70 hover:text-white hover:bg-white/10"
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                <div className="flex items-center space-x-2 text-white/70">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">{user?.email}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Information */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-white flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Account Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-white/70 text-sm">User ID</Label>
                <p className="text-white text-sm font-mono bg-white/5 p-2 rounded-lg break-all">
                  {user?.id}
                </p>
              </div>
              
              <div className="space-y-2">
                <Label className="text-white/70 text-sm">Account Created</Label>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-white/70" />
                  <p className="text-white text-sm">
                    {user?.created_at ? formatDate(user.created_at) : "Unknown"}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-white/70 text-sm">Email Status</Label>
                <Badge variant={user?.email_confirmed_at ? "default" : "secondary"} className="bg-green-500/20 text-green-300">
                  {user?.email_confirmed_at ? "Verified" : "Unverified"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-white">
                Activity Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-white/70 text-sm">Last Sign In</Label>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-white/70" />
                  <p className="text-white text-sm">
                    {user?.last_sign_in_at ? formatDate(user.last_sign_in_at) : "Unknown"}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-white/70 text-sm">Authentication Provider</Label>
                <Badge className="bg-blue-500/20 text-blue-300 capitalize">
                  {user?.app_metadata?.provider || "email"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </EnhancedAppLayout>
  );
};

export default Profile;
