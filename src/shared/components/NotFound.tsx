import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/shared/components/button";
import { Card, CardContent, CardHeader } from "@/shared/components/card";
import { Home, ArrowLeft, Search, FileQuestion } from "lucide-react";
import { typo, responsiveType, createTypographyClass } from "@/design-system/tokens/typography";
import { cn } from "@/shared/utils/utils";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 dark:from-blue-900 dark:via-blue-800 dark:to-blue-900 relative p-4">
      {/* Glassy background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/3 rounded-full blur-3xl"></div>
      </div>
      <div className="relative z-10 w-full max-w-md">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl"></div>
        <Card className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-6 h-24 w-24 rounded-full bg-white/10 flex items-center justify-center">
              <FileQuestion className="h-12 w-12 text-white/70" />
            </div>
            <h1 className={cn(responsiveType.display, "text-white mb-2")}>404</h1>
            <h2 className={cn(responsiveType.h2, "text-white mb-2")}>Page Not Found</h2>
            <p className={cn(typo.body, "text-white/70 leading-relaxed")}>
              The page you're looking for doesn't exist or has been moved.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <p className={cn(typo.caption, "text-white/70")}>
                Requested path: <code className={cn(typo.code, "bg-white/10 px-1 py-1 rounded text-white/80")}>{location.pathname}</code>
              </p>
            </div>
            <div className="grid gap-3">
              <Button asChild className="w-full bg-white/10 border border-white/20 text-white hover:bg-white/20">
                <Link to="/cases">
                  <Home className="mr-2 h-4 w-4" />
                  Go to Cases
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full bg-white/10 border border-white/20 text-white hover:bg-white/20">
                <Link to="/" onClick={() => window.history.back()}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Go Back
                </Link>
              </Button>
              <Button asChild variant="ghost" className="w-full text-white hover:bg-white/10">
                <Link to="/cases">
                  <Search className="mr-2 h-4 w-4" />
                  Browse All Cases
                </Link>
              </Button>
            </div>
            <div className="text-center pt-2">
              <p className={cn(typo.caption, "text-white/70")}>
                Need help? Check our {" "}
                <Link to="/cases" className={cn(typo.link, "text-white underline hover:text-blue-200")}>
                  main dashboard
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
        <div className="mt-6 text-center">
          <p className={cn(typo.caption, "text-white/70")}>
            Error Code: 404 • Page Not Found
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
