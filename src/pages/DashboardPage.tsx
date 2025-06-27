import React from 'react';
import Dashboard from '@/features/dashboard/Dashboard';
import ProtectedPageLayout from './layouts/ProtectedPageLayout';

const DashboardPage: React.FC = () => {
  return (
    <ProtectedPageLayout
      title="Dashboard"
      description="Track your clinical learning progress and recent activity"
      showHeader={false}
    >
      <Dashboard />
    </ProtectedPageLayout>
  );
};

export default DashboardPage; 