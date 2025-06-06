/** @vitest-environment jsdom */
import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, afterEach, vi } from 'vitest';
import * as jestDomMatchers from '@testing-library/jest-dom/matchers';
expect.extend(jestDomMatchers);

vi.mock('@/app/AuthContext', () => ({
  useAuth: () => ({ user: null, signOut: vi.fn() }),
}));

import { SidebarProvider, SidebarTrigger, useSidebar } from '..';
import * as sidebarUtils from '@/constants/sidebar';
const { SIDEBAR_CONFIG, getInitialSidebarState } = sidebarUtils;

const SidebarStateDisplay = () => {
  const { open } = useSidebar();
  return <div data-testid="sidebar-state">{open ? 'open' : 'closed'}</div>;
};

const renderWithProviders = (ui: React.ReactNode) =>
  render(
    <BrowserRouter>
      <SidebarProvider>{ui}</SidebarProvider>
    </BrowserRouter>
  );

const clearSidebarStorage = () => {
  localStorage.removeItem(SIDEBAR_CONFIG.STORAGE_KEY);
};

describe('Sidebar Provider', () => {
  afterEach(() => {
    cleanup();
    clearSidebarStorage();
  });

  it('getInitialSidebarState reads open and closed values from localStorage', () => {
    localStorage.setItem(SIDEBAR_CONFIG.STORAGE_KEY, 'true');
    expect(getInitialSidebarState(false)).toBe(true);
    localStorage.setItem(SIDEBAR_CONFIG.STORAGE_KEY, 'false');
    expect(getInitialSidebarState(true)).toBe(false);
  });

  it('SidebarTrigger toggles state on desktop', () => {
    const saveSpy = vi.spyOn(sidebarUtils, 'saveSidebarState').mockImplementation(() => {});
    window.innerWidth = 1024;
    renderWithProviders(
      <>
        <SidebarTrigger />
        <SidebarStateDisplay />
      </>
    );
    const btn = screen.getByRole('button', { name: /toggle sidebar/i });
    fireEvent.click(btn);
    expect(saveSpy.mock.calls.some(([arg]) => arg === true)).toBe(true);
    fireEvent.click(btn);
    expect(saveSpy.mock.calls.some(([arg]) => arg === false)).toBe(true);
    saveSpy.mockRestore();
  });

  it('SidebarTrigger toggles state on mobile', () => {
    const saveSpy = vi.spyOn(sidebarUtils, 'saveSidebarState').mockImplementation(() => {});
    window.innerWidth = 375;
    window.dispatchEvent(new Event('resize'));
    renderWithProviders(
      <>
        <SidebarTrigger />
        <SidebarStateDisplay />
      </>
    );
    const btn = screen.getByRole('button', { name: /toggle sidebar/i });
    fireEvent.click(btn);
    expect(saveSpy.mock.calls.some(([arg]) => arg === true)).toBe(true);
    saveSpy.mockRestore();
  });

  it('keyboard shortcut toggles the sidebar', () => {
    const saveSpy = vi.spyOn(sidebarUtils, 'saveSidebarState').mockImplementation(() => {});
    renderWithProviders(<SidebarStateDisplay />);
    fireEvent.keyDown(window, {
      key: SIDEBAR_CONFIG.KEYBOARD_SHORTCUT,
      ctrlKey: true,
    });
    expect(saveSpy.mock.calls.some(([arg]) => arg === true)).toBe(true);
    fireEvent.keyDown(window, {
      key: SIDEBAR_CONFIG.KEYBOARD_SHORTCUT,
      ctrlKey: true,
    });
    expect(saveSpy.mock.calls.some(([arg]) => arg === false)).toBe(true);
    saveSpy.mockRestore();
  });
});
