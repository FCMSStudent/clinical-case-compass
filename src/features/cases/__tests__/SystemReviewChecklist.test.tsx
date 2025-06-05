/** @vitest-environment jsdom */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import * as jestDomMatchers from '@testing-library/jest-dom/matchers';
import { describe, it, expect, vi } from 'vitest';
import { SystemReviewChecklist } from '../SystemReviewChecklist';
expect.extend(jestDomMatchers);

describe('SystemReviewChecklist', () => {
  it('selects and clears all symptoms for a system', () => {
    const onChange = vi.fn();
    render(<SystemReviewChecklist onSystemSymptomsChange={onChange} />);

    const trigger = screen.getByText('Urinary');
    fireEvent.click(trigger);

    const selectAll = screen.getByRole('button', { name: /all/i });
    fireEvent.click(selectAll);

    expect(screen.getByLabelText('Dysuria')).toBeChecked();
    expect(onChange).toHaveBeenLastCalledWith({
      Urinary: [
        'Dysuria',
        'Frequency',
        'Urgency',
        'Hematuria',
        'Incontinence',
        'Retention'
      ]
    });
    expect(screen.getByText('6/6')).toBeInTheDocument();

    const clear = screen.getByRole('button', { name: /clear/i });
    fireEvent.click(clear);

    expect(screen.getByLabelText('Dysuria')).not.toBeChecked();
    expect(onChange).toHaveBeenLastCalledWith({});
    expect(screen.queryByText('6/6')).not.toBeInTheDocument();
  });
});
