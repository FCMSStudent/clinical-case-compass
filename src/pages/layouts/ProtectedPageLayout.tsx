import React from 'react';
import { ProtectedRouteLayout } from '@/features/navigation';
import PageLayout from './PageLayout';

interface ProtectedPageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
  showHeader?: boolean;
}

const ProtectedPageLayout: React.FC<ProtectedPageLayoutProps> = ({
  children,
  title,
  description,
  className,
  showHeader
}) => {
  return (
    <ProtectedRouteLayout>
      <PageLayout
        title={title}
        description={description}
        className={className}
        showHeader={showHeader}
      >
        {children}
      </PageLayout>
    </ProtectedRouteLayout>
  );
};

export default ProtectedPageLayout; 