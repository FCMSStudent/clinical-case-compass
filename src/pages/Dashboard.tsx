import React, { memo } from "react";
import { UserRound } from "lucide-react";

import { PageHeader } from "@/components/ui/page-header";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { SearchBar } from "@/components/dashboard/SearchBar";
import { ActiveCasesWidget } from "@/components/dashboard/ActiveCasesWidget";
import { DraftsWidget } from "@/components/dashboard/DraftsWidget";
import { CompletedWidget } from "@/components/dashboard/CompletedWidget";
import { QuickStartPanel } from "@/components/dashboard/QuickStartPanel";
import { RecentActivity } from "@/components/dashboard/RecentActivity";

import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Types                                                                     */
/* -------------------------------------------------------------------------- */
export interface DashboardProps {
  /** Logged-in user’s display name for a friendlier greeting. */
  userName?: string;
  /** Hide the welcome alert entirely. */
  hideWelcome?: boolean;
  /** Extra class names for the outer wrapper. */
  className?: string;
}

/* -------------------------------------------------------------------------- */
/* Constants                                                                  */
/* -------------------------------------------------------------------------- */
const KPI_WIDGETS = [
  ActiveCasesWidget,
  DraftsWidget,
  CompletedWidget,
] as const;

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */
export const Dashboard: React.FC<DashboardProps> = memo(
  ({ userName, hideWelcome = false, className }) => {
    const greeting = userName ? `Welcome back, ${userName}!` : "Welcome back!";

    return (
      <section className={cn("space-y-6", className)}>
        {/* Welcome alert */}
        {!hideWelcome && (
          <Alert className="border-primary/20 bg-primary/5" role="status">
            <UserRound className="h-5 w-5 text-primary" aria-hidden />
            <AlertDescription className="text-primary">
              {greeting} This is your central hub for managing clinical cases.
            </AlertDescription>
          </Alert>
        )}

        {/* Header + search */}
        <PageHeader
          title="Dashboard"
          description="Overview of your clinical case activities."
        />
        <SearchBar />

        {/* KPI widgets */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {KPI_WIDGETS.map((Widget, i) => (
            <Widget key={i} />
          ))}
        </div>

        {/* Quick start + recent activity */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <QuickStartPanel />
          </div>
          <RecentActivity />
        </div>
      </section>
    );
  },
);

Dashboard.displayName = "Dashboard";
