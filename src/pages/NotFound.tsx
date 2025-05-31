
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Home, ArrowLeft, Search, FileQuestion } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background p-4">
      <div className="w-full max-w-md">
        <Card className="border-2 shadow-xl">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-6 h-24 w-24 rounded-full bg-muted flex items-center justify-center">
              <FileQuestion className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-4xl xs:text-5xl font-bold text-primary mb-2">404</h1>
            <h2 className="text-xl xs:text-2xl font-semibold mb-2">Page Not Found</h2>
            <p className="text-sm xs:text-base text-muted-foreground leading-relaxed">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <p className="text-xs text-muted-foreground">
                Requested path: <code className="bg-background px-1 py-0.5 rounded text-xs">{location.pathname}</code>
              </p>
            </div>
            
            <div className="grid gap-3">
              <Button asChild className="w-full">
                <Link to="/cases">
                  <Home className="mr-2 h-4 w-4" />
                  Go to Cases
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="w-full">
                <Link to="/" onClick={() => window.history.back()}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Go Back
                </Link>
              </Button>
              
              <Button asChild variant="ghost" className="w-full">
                <Link to="/cases">
                  <Search className="mr-2 h-4 w-4" />
                  Browse All Cases
                </Link>
              </Button>
            </div>
            
            <div className="text-center pt-2">
              <p className="text-xs text-muted-foreground">
                Need help? Check our{" "}
                <Link to="/cases" className="text-primary hover:underline">
                  main dashboard
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            Error Code: 404 • Page Not Found
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
