import React from 'react';
import CaseDetail from '@/features/cases/CaseDetail';
import ProtectedPageLayout from './layouts/ProtectedPageLayout';

const CaseDetailPage: React.FC = () => {
  return (
    <ProtectedPageLayout
      title="Case Details"
      description="View comprehensive case information and clinical details"
      showHeader={false}
    >
      <CaseDetail />
    </ProtectedPageLayout>
  );
};

export default CaseDetailPage; 