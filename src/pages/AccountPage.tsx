import React from 'react';
import Account from '@/features/auth/Account';
import ProtectedPageLayout from './layouts/ProtectedPageLayout';

const AccountPage: React.FC = () => {
  return (
    <ProtectedPageLayout
      title="Account Settings"
      description="Manage your profile, preferences, and account settings"
      showHeader={false}
    >
      <Account />
    </ProtectedPageLayout>
  );
};

export default AccountPage; 