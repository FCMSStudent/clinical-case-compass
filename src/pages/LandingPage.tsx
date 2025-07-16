
import React from 'react';
import Landing from '@/features/landing/Landing';
import PageLayout from './layouts/PageLayout';

const LandingPage: React.FC = () => {
  return (
    <PageLayout showHeader={false}>
      <Landing />
    </PageLayout>
  );
};

export default LandingPage;
