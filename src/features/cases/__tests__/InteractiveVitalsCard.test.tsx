/** @vitest-environment jsdom */
import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, afterEach, vi, beforeAll } from 'vitest';
import * as jestDomMatchers from '@testing-library/jest-dom/matchers';
expect.extend(jestDomMatchers);

import { InteractiveVitalsCard } from '../InteractiveVitalsCard';

beforeAll(() => {
  class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  // @ts-expect-error ResizeObserver is not available in jsdom
  global.ResizeObserver = ResizeObserver;
});


describe('InteractiveVitalsCard', () => {
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it('calls onVitalsChange with updated values when a slider changes', () => {
    vi.useFakeTimers();
    const handleChange = vi.fn();
    render(<InteractiveVitalsCard onVitalsChange={handleChange} />);

    const sliders = screen.getAllByRole('slider');
    const heartSlider = sliders[1];
    heartSlider.focus();
    fireEvent.keyDown(heartSlider, { key: 'ArrowUp' });

    vi.advanceTimersByTime(150);

    expect(handleChange).toHaveBeenCalled();
    const lastCall = handleChange.mock.calls[handleChange.mock.calls.length - 1][0];
    expect(lastCall.heartRate).toBe('81');
    expect(heartSlider).toHaveAttribute('aria-valuenow', '81');
  });

  it('updates slider values when a preset button is clicked', () => {
    render(<InteractiveVitalsCard onVitalsChange={() => {}} />);

    fireEvent.click(screen.getByRole('button', { name: /fever/i }));

    const sliders = screen.getAllByRole('slider');
    expect(sliders[0]).toHaveAttribute('aria-valuenow', '39.5');
    expect(sliders[1]).toHaveAttribute('aria-valuenow', '110');
  });
});