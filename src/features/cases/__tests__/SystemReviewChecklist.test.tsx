/** @vitest-environment jsdom */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import * as jestDomMatchers from '@testing-library/jest-dom/matchers';
import { describe, it, expect, vi } from 'vitest';
import { SystemReviewChecklist } from '../SystemReviewChecklist';

// Extend expect with jest-dom matchers
expect.extend(jestDomMatchers);

describe('SystemReviewChecklist', () => {
  // Test from 'codex/add-select-all-and-clear-buttons'
  it('selects and clears all symptoms for a system', () => {
    const onChange = vi.fn();
    render(<SystemReviewChecklist onSystemSymptomsChange={onChange} />);

    // Mock systemSymptoms for the test, as it's an external dependency
    // In a real scenario, you'd mock the module or ensure it's available.
    // For this example, I'll assume 'Urinary' system exists with symptoms.
    // This is a crucial part, as the component relies on 'systemSymptoms'.
    // If 'systemSymptoms' is imported, ensure it's available in the test environment.
    // For the sake of making this test runnable, let's assume a basic structure.
    // In a real project, you might mock the module: vi.mock('./systemSymptoms', () => ({ ... }));

    fireEvent.click(screen.getByText('Urinary', { selector: 'span.font-medium' }));


    const selectAll = screen.getByRole('button', { name: /all/i });
    fireEvent.click(selectAll);

    // Assertions based on the expected behavior when 'select all' is clicked
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
    // Check for the badge update after selecting all
    expect(screen.getByText('6/6')).toBeInTheDocument();

    const clear = screen.getByRole('button', { name: /clear/i });
    fireEvent.click(clear);

    // Assertions after 'clear' is clicked
    expect(screen.getByLabelText('Dysuria')).not.toBeChecked();
    expect(onChange).toHaveBeenLastCalledWith({});
    // Check that the badge is no longer in the document after clearing
    expect(screen.queryByText('6/6')).not.toBeInTheDocument();
  });

  // Test from 'main' branch
  it('updates selected symptoms when props change', () => {
    const { rerender } = render(
      <SystemReviewChecklist initialSystemSymptoms={{ Cardiovascular: ['Chest pain'] }} />
    );

    // Expand Cardiovascular system
    fireEvent.click(screen.getByRole('button', { name: /Cardiovascular/i }));

    // Initial checkbox should be checked
    const chestPain = screen.getByLabelText('Chest pain');
    expect(chestPain).toBeChecked();

    // Rerender with new symptoms
    rerender(
      <SystemReviewChecklist initialSystemSymptoms={{ Cardiovascular: ['Edema'] }} />
    );

    // Edema should now be checked and Chest pain unchecked
    const edema = screen.getByLabelText('Edema');
    expect(edema).toBeChecked();
    expect(chestPain).not.toBeChecked();
  });
});