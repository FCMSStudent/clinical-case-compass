/** @vitest-environment jsdom */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import * as jestDomMatchers from '@testing-library/jest-dom/matchers';
expect.extend(jestDomMatchers);

import { SystemReviewChecklist } from '../SystemReviewChecklist';


describe('SystemReviewChecklist', () => {
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
