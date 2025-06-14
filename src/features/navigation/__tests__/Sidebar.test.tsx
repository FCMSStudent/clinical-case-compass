
/** @vitest-environment jsdom */
import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, afterEach, vi } from 'vitest';
import * as jestDomMatchers from '@testing-library/jest-dom/matchers';
expect.extend(jestDomMatchers);

vi.mock('@/app/AuthContext', () => ({
  useAuth: () => ({ user: null, signOut: vi.fn() }),
}));

import { SidebarProvider, SidebarTrigger, useSidebar, Sidebar } from '..';
import * as sidebarUtils from '@/constants/sidebar';
const { SIDEBAR_CONFIG, getInitialSidebarState } = sidebarUtils;

const SidebarStateDisplay = () => {
  const { open } = useSidebar();
  return <div data-testid="sidebar-state">{open ? 'open' : 'closed'}</div>;
};

const renderWithProviders = (ui: React.ReactNode, initialPath = '/') =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <SidebarProvider>{ui}</SidebarProvider>
    </MemoryRouter>
  );

const clearSidebarStorage = () => {
  localStorage.removeItem(SIDEBAR_CONFIG.STORAGE_KEY);
  // Also clear any potential cookie if it was used before, for complete cleanup.
  document.cookie = `${SIDEBAR_CONFIG.COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

describe('Sidebar Provider', () => {
  afterEach(() => {
    cleanup();
    clearSidebarStorage();
    // Reset window width and dispatch resize event for tests that depend on it
    window.innerWidth = 1024;
    window.dispatchEvent(new Event('resize'));
  });

  it('getInitialSidebarState reads open and closed values from localStorage', () => {
    localStorage.setItem(SIDEBAR_CONFIG.STORAGE_KEY, 'true');
    expect(getInitialSidebarState()).toBe(true);
    localStorage.setItem(SIDEBAR_CONFIG.STORAGE_KEY, 'false');
    expect(getInitialSidebarState()).toBe(false);
  });

  it('SidebarTrigger toggles state on desktop', () => {
    window.innerWidth = 1024;
    renderWithProviders(
      <>
        <SidebarTrigger />
        <SidebarStateDisplay />
      </>
    );
    const btn = screen.getByRole('button', { name: /toggle sidebar/i });
    // default open on desktop
    expect(screen.getByTestId('sidebar-state')).toHaveTextContent('open');
    fireEvent.click(btn);
    expect(screen.getByTestId('sidebar-state')).toHaveTextContent('closed');
    fireEvent.click(btn);
    expect(screen.getByTestId('sidebar-state')).toHaveTextContent('open');
  });

  it('SidebarTrigger toggles state on mobile', () => {
    window.innerWidth = 375;
    window.dispatchEvent(new Event('resize'));
    renderWithProviders(
      <>
        <SidebarTrigger />
        <SidebarStateDisplay />
      </>,
      '/'
    );
    const btn = screen.getByRole('button', { name: /toggle sidebar/i });
    // default closed on mobile
    expect(screen.getByTestId('sidebar-state')).toHaveTextContent('closed');
    fireEvent.click(btn);
    expect(screen.getByTestId('sidebar-state')).toHaveTextContent('open');
  });

  it('keyboard shortcut toggles the sidebar', () => {
    renderWithProviders(<SidebarStateDisplay />);
    expect(screen.getByTestId('sidebar-state')).toHaveTextContent('open');
    fireEvent.keyDown(window, {
      key: SIDEBAR_CONFIG.KEYBOARD_SHORTCUT,
      ctrlKey: true,
    });
    expect(screen.getByTestId('sidebar-state')).toHaveTextContent('closed');
    fireEvent.keyDown(window, {
      key: SIDEBAR_CONFIG.KEYBOARD_SHORTCUT,
      ctrlKey: true,
    });
    expect(screen.getByTestId('sidebar-state')).toHaveTextContent('open');
  });

  it('navigation does not reload the page and highlights active link', () => {
    renderWithProviders(<Sidebar />, '/dashboard');
    const nav = screen.getByRole('navigation');
    const dashboardLink = screen.getByRole('link', { name: /dashboard/i });
    const casesLink = screen.getByRole('link', { name: /cases/i });
    expect(dashboardLink).toHaveClass('bg-accent');
    expect(casesLink).not.toHaveClass('bg-accent');
    fireEvent.click(casesLink);
    expect(nav).toBeInTheDocument();
    // NavLink automatically adds aria-current="page" to the active link
    expect(casesLink).toHaveAttribute('aria-current', 'page');
    expect(casesLink).toHaveClass('bg-accent');
    expect(dashboardLink).not.toHaveClass('bg-accent');
  });
});
