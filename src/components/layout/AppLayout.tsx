
import { Sidebar } from "./Sidebar";
import { Toaster } from "@/components/ui/sonner";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="md:ml-64 min-h-screen">
        <main className="medical-container py-6 animate-fade-in">
          {children}
        </main>
      </div>
      <Toaster position="top-right" richColors />
    </div>
  );
}
