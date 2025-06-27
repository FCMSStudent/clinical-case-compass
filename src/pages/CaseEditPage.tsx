import React from 'react';
import CaseEdit from '@/features/cases/CaseEdit';
import ProtectedPageLayout from './layouts/ProtectedPageLayout';

const CaseEditPage: React.FC = () => {
  return (
    <ProtectedPageLayout
      title="Edit Case"
      description="Modify case information and clinical details"
      showHeader={false}
    >
      <CaseEdit />
    </ProtectedPageLayout>
  );
};

export default CaseEditPage; 