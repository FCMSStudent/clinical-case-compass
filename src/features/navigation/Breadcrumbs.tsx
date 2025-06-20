import React from "react";
import { ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/shared/utils/utils";

interface BreadcrumbItem {
  label: string;
  path: string;
  isActive?: boolean;
}

const getBreadcrumbs = (pathname: string): BreadcrumbItem[] => {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Dashboard", path: "/dashboard" }
  ];

  if (segments.length === 0 || segments[0] === 'dashboard') {
    breadcrumbs[0].isActive = true;
    return breadcrumbs;
  }

  let currentPath = '';
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    
    if (segment === 'cases') {
      if (segments[index + 1] === 'new') {
        breadcrumbs.push(
          { label: "Cases", path: "/cases" },
          { label: "New Case", path: "/cases/new", isActive: true }
        );
      } else if (segments[index + 1] && segments[index + 1] !== 'new') {
        const caseId = segments[index + 1];
        breadcrumbs.push(
          { label: "Cases", path: "/cases" },
          { 
            label: `Case #${caseId.slice(0, 8)}...`, 
            path: `/cases/${caseId}`,
            isActive: segments[index + 2] === undefined
          }
        );
        
        if (segments[index + 2] === 'edit') {
          breadcrumbs.push({
            label: "Edit",
            path: `/cases/${caseId}/edit`,
            isActive: true
          });
        }
      } else {
        breadcrumbs.push({ label: "Cases", path: "/cases", isActive: true });
      }
    } else if (segment === 'settings') {
      breadcrumbs.push({ label: "Settings", path: "/settings", isActive: true });
    } else if (segment === 'profile') {
      breadcrumbs.push({ label: "Profile", path: "/profile", isActive: true });
    }
  });

  return breadcrumbs;
};

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const breadcrumbs = getBreadcrumbs(location.pathname);

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs.map((item, index) => (
          <li key={item.path} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 text-white/50 mx-2" aria-hidden="true" />
            )}
            {item.isActive ? (
              <span className="text-white font-medium" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link
                to={item.path}
                className={cn(
                  "text-white/70 transition-colors",
                  index === 0 && "flex items-center space-x-1"
                )}
              >
                {index === 0 && <Home className="h-4 w-4" aria-hidden="true" />}
                <span>{item.label}</span>
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
