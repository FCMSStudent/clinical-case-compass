import React from 'react';
import CreateCaseFlow from '@/features/cases/CreateCaseFlow';
import ProtectedPageLayout from './layouts/ProtectedPageLayout';

const CreateCasePage: React.FC = () => {
  return (
    <ProtectedPageLayout
      title="Create New Case"
      description="Add a new clinical case to your collection"
      showHeader={false}
    >
      <CreateCaseFlow />
    </ProtectedPageLayout>
  );
};

export default CreateCasePage; 