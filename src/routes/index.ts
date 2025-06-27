import { RouteConfig } from './types';

// Route configuration
export const routes: RouteConfig[] = [
  // Public routes
  {
    path: '/landing',
    name: 'Landing',
    public: true,
    component: 'LandingPage'
  },
  {
    path: '/auth',
    name: 'Authentication',
    public: true,
    component: 'AuthPage'
  },
  
  // Protected routes
  {
    path: '/dashboard',
    name: 'Dashboard',
    public: false,
    component: 'DashboardPage'
  },
  {
    path: '/cases',
    name: 'Cases',
    public: false,
    component: 'CasesPage'
  },
  {
    path: '/cases/:id',
    name: 'Case Detail',
    public: false,
    component: 'CaseDetailPage'
  },
  {
    path: '/cases/edit/:id',
    name: 'Edit Case',
    public: false,
    component: 'CaseEditPage'
  },
  {
    path: '/cases/new',
    name: 'Create Case',
    public: false,
    component: 'CreateCasePage'
  },
  {
    path: '/account',
    name: 'Account',
    public: false,
    component: 'AccountPage'
  }
];

// Navigation routes (for sidebar)
export const navigationRoutes = routes.filter(route => 
  ['/dashboard', '/cases', '/account'].includes(route.path)
);

// Public routes only
export const publicRoutes = routes.filter(route => route.public);

// Protected routes only
export const protectedRoutes = routes.filter(route => !route.public); 