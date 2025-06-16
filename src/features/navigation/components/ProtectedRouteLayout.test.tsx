import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ProtectedRouteLayout from './ProtectedRouteLayout';
import { AuthContext, AuthContextType } from '@/app/AuthContext';

// Mock dependencies
vi.mock('@/features/auth/PrivateRoute', () => ({
  PrivateRoute: ({ children }: { children: React.ReactNode }) => <div data-testid="private-route">{children}</div>,
}));

vi.mock('@/features/navigation/components/EnhancedAppLayout', () => ({
  EnhancedAppLayout: ({ children }: { children: React.ReactNode }) => <div data-testid="enhanced-app-layout">{children}</div>,
}));

vi.mock('@/components/ui/OfflineBanner', () => ({
  OfflineBanner: () => <div data-testid="offline-banner">Offline Banner</div>,
}));

const mockAuthContext = (isOfflineMode: boolean, session: boolean = true): AuthContextType => ({
  session: session ? { user: { id: 'test-user' } } : null, // Provide a minimal session object
  loading: false,
  isOfflineMode,
  signInWithGithub: vi.fn(),
  signOut: vi.fn(),
  user: null, // Add other necessary fields from AuthContextType if your component uses them
  error: null,
  setError: vi.fn(),
  login: vi.fn(),
  signup: vi.fn(),
  sendPasswordResetEmail: vi.fn(),
  updatePassword: vi.fn(),
});

describe('ProtectedRouteLayout', () => {
  it('renders children within PrivateRoute and EnhancedAppLayout', () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthContext(false)}>
          <ProtectedRouteLayout>
            <div>Test Child</div>
          </ProtectedRouteLayout>
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('private-route')).toBeInTheDocument();
    expect(screen.getByTestId('enhanced-app-layout')).toBeInTheDocument();
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('displays OfflineBanner when isOfflineMode is true', () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthContext(true)}>
          <ProtectedRouteLayout>
            <div>Test Child</div>
          </ProtectedRouteLayout>
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('offline-banner')).toBeInTheDocument();
  });

  it('does not display OfflineBanner when isOfflineMode is false', () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthContext(false)}>
          <ProtectedRouteLayout>
            <div>Test Child</div>
          </ProtectedRouteLayout>
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.queryByTestId('offline-banner')).not.toBeInTheDocument();
  });
});
