
/** @vitest-environment jsdom */
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { screen, fireEvent } from '@testing-library/dom';
import * as jestDomMatchers from '@testing-library/jest-dom/matchers';
import { describe, it, expect, vi, afterEach } from 'vitest';

// Extend expect with jest-dom matchers once
expect.extend(jestDomMatchers);

import { SystemReviewChecklist } from '../SystemReviewChecklist';

// Clean up DOM after each test to prevent interference
afterEach(() => {
  cleanup();
});

// Helper functions for common test interactions
const expandSystem = (name: string) => {
  // Use getAllByRole as there might be multiple buttons with similar names,
  // targeting the collapsible trigger specifically if needed.
  // Assuming the first match is the system trigger.
  fireEvent.click(screen.getAllByRole('button', { name: new RegExp(name, 'i') })[0]);
};

const getCheckbox = (label: string) => {
  return screen.getByRole('checkbox', { name: label });
};

describe('SystemReviewChecklist', () => {
  // Test from 'codex/add-tests-for-systemreviewchecklist'
  it('marks symptoms as selected when clicked and updates onChange', () => {
    const onChange = vi.fn();
    render(<SystemReviewChecklist onSystemSymptomsChange={onChange} />);

    expandSystem('Cardiovascular'); // Expand the Cardiovascular system

    const checkbox = getCheckbox('Chest pain');
    expect(checkbox).toHaveAttribute('aria-checked', 'false');

    fireEvent.click(checkbox); // Click to select

    expect(checkbox).toHaveAttribute('aria-checked', 'true');
    expect(onChange).toHaveBeenLastCalledWith({ Cardiovascular: ['Chest pain'] });

    fireEvent.click(checkbox); // Click again to deselect
    expect(checkbox).toHaveAttribute('aria-checked', 'false');
    expect(onChange).toHaveBeenLastCalledWith({}); // Should clear the system if no symptoms are selected
  });

  // Test from 'codex/add-tests-for-systemreviewchecklist'
  it('collapsible sections expand and collapse correctly', () => {
    render(<SystemReviewChecklist />);
    const trigger = screen.getAllByRole('button', { name: /Neurological/i })[0];

    // Initially collapsed
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('checkbox', { name: 'Headache' })).not.toBeInTheDocument();

    fireEvent.click(trigger); // Expand
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('checkbox', { name: 'Headache' })).toBeInTheDocument(); // Symptom visible

    fireEvent.click(trigger); // Collapse
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('checkbox', { name: 'Headache' })).not.toBeInTheDocument(); // Symptom hidden
  });

  // Combined and refined test for 'select all' and 'clear' functionality
  it('select all and clear buttons work correctly and update onChange', () => {
    const onChange = vi.fn();
    render(<SystemReviewChecklist onSystemSymptomsChange={onChange} />);
    expandSystem('Respiratory'); // Expand the Respiratory system

    // Select all symptoms
    fireEvent.click(screen.getByRole('button', { name: /all/i }));
    const respiratorySymptoms = [
      'Cough', 'Shortness of breath', 'Wheezing',
      'Chest tightness', 'Sputum production', 'Hemoptysis',
    ];
    respiratorySymptoms.forEach((symptom) => {
      expect(getCheckbox(symptom)).toHaveAttribute('aria-checked', 'true');
    });
    // Verify onChange call with all symptoms
    expect(onChange).toHaveBeenLastCalledWith({ Respiratory: respiratorySymptoms });
    // Verify badge text
    expect(screen.getByText(`${respiratorySymptoms.length}/${respiratorySymptoms.length}`)).toBeInTheDocument();

    // Clear all symptoms
    fireEvent.click(screen.getByRole('button', { name: /clear/i }));
    respiratorySymptoms.forEach((symptom) => {
      expect(getCheckbox(symptom)).toHaveAttribute('aria-checked', 'false');
    });
    // Verify onChange call with empty object (or system removed)
    expect(onChange).toHaveBeenLastCalledWith({});
    // Verify badge is no longer present
    expect(screen.queryByText(`${respiratorySymptoms.length}/${respiratorySymptoms.length}`)).not.toBeInTheDocument();
  });

  // Test from 'main' branch
  it('updates selected symptoms when initialSystemSymptoms props change', () => {
    const { rerender } = render(
      <SystemReviewChecklist initialSystemSymptoms={{ Cardiovascular: ['Chest pain'] }} />
    );

    expandSystem('Cardiovascular'); // Expand Cardiovascular system

    // Initial checkbox should be checked
    const chestPain = getCheckbox('Chest pain');
    expect(chestPain).toBeChecked();

    // Rerender with new symptoms
    rerender(
      <SystemReviewChecklist initialSystemSymptoms={{ Cardiovascular: ['Edema'] }} />
    );

    // Edema should now be checked and Chest pain unchecked
    const edema = getCheckbox('Edema');
    expect(edema).toBeChecked();
    expect(chestPain).not.toBeChecked(); // Chest pain should be unchecked after rerender
  });
});
