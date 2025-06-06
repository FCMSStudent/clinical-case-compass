/** @vitest-environment jsdom */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import * as jestDomMatchers from '@testing-library/jest-dom/matchers';
expect.extend(jestDomMatchers);
import { InteractiveBodyDiagram } from '../InteractiveBodyDiagram';

// jsdom lacks ResizeObserver which Radix components rely on
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
(globalThis as unknown as { ResizeObserver: typeof ResizeObserver }).ResizeObserver = ResizeObserver;

describe('InteractiveBodyDiagram severity filter', () => {
  it('shows only critical parts when filter is set to critical', () => {
    render(<InteractiveBodyDiagram onBodyPartSelected={() => {}} />);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'critical' } });

    const chest = screen.getByLabelText(/Chest – critical priority/i);
    const neck = screen.getByLabelText(/Neck – low priority/i);

    expect(chest.getAttribute('fill')).not.toBe('hsl(var(--muted) / 0.2)');
    expect(neck.getAttribute('fill')).toBe('hsl(var(--muted) / 0.2)');
  });
});
