import React from 'react';
import Cases from '@/features/cases/Cases';
import ProtectedPageLayout from './layouts/ProtectedPageLayout';

const CasesPage: React.FC = () => {
  return (
    <ProtectedPageLayout
      title="Clinical Cases"
      description="Browse and manage your clinical case collection"
      showHeader={false}
    >
      <Cases />
    </ProtectedPageLayout>
  );
};

export default CasesPage; 