import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRouteLayout from '@/features/navigation/components/ProtectedRouteLayout';
import LandingPage from '@/features/landing/Landing';
import Auth from '@/features/auth/Auth';
import Dashboard from '@/features/dashboard/Dashboard';
import Cases from '@/features/cases/Cases';
import CaseDetail from '@/features/cases/CaseDetail';
import CaseEdit from '@/features/cases/CaseEdit';
import CreateCaseFlow from '@/features/cases/CreateCaseFlow';
import Account from '@/features/auth/Account';
import NotFound from '@/shared/components/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/auth',
    element: <Auth />,
  },
  {
    path: '/app',
    element: <ProtectedRouteLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'cases',
        element: <Cases />,
      },
      {
        path: 'cases/:id',
        element: <CaseDetail />,
      },
      {
        path: 'cases/:id/edit',
        element: <CaseEdit />,
      },
      {
        path: 'cases/create',
        element: <CreateCaseFlow />,
      },
      {
        path: 'account',
        element: <Account />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}