/** @vitest-environment jsdom */
import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import * as jestDomMatchers from '@testing-library/jest-dom/matchers';
import { describe, it, expect, vi, afterEach } from 'vitest';

expect.extend(jestDomMatchers);

import { SystemReviewChecklist } from '../SystemReviewChecklist';

afterEach(() => {
  cleanup();
});

const expandSystem = (name: string) => {
  fireEvent.click(screen.getAllByRole('button', { name })[0]);
};

const getCheckbox = (label: string) => {
  return screen.getByRole('checkbox', { name: label });
};

describe('SystemReviewChecklist', () => {
  it('marks symptoms as selected when clicked', () => {
    const onChange = vi.fn();
    render(<SystemReviewChecklist onSystemSymptomsChange={onChange} />);
    expandSystem('Cardiovascular');

    const checkbox = getCheckbox('Chest pain');
    expect(checkbox).toHaveAttribute('aria-checked', 'false');
    fireEvent.click(checkbox);
    expect(checkbox).toHaveAttribute('aria-checked', 'true');
    expect(onChange).toHaveBeenLastCalledWith({ Cardiovascular: ['Chest pain'] });
  });

  it('collapsible sections expand and collapse', () => {
    render(<SystemReviewChecklist />);
    const trigger = screen.getAllByRole('button', { name: 'Neurological' })[0];

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('checkbox', { name: 'Headache' })).toBeInTheDocument();
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('select all and clear buttons work correctly', () => {
    const onChange = vi.fn();
    render(<SystemReviewChecklist onSystemSymptomsChange={onChange} />);
    expandSystem('Respiratory');

    fireEvent.click(screen.getByRole('button', { name: 'Select All' }));
    const respiratorySymptoms = [
      'Cough',
      'Shortness of breath',
      'Wheezing',
      'Chest tightness',
      'Sputum production',
      'Hemoptysis',
    ];
    respiratorySymptoms.forEach((symptom) => {
      expect(getCheckbox(symptom)).toHaveAttribute('aria-checked', 'true');
    });
    expect(onChange).toHaveBeenLastCalledWith({ Respiratory: respiratorySymptoms });

    fireEvent.click(screen.getByRole('button', { name: 'Clear' }));
    respiratorySymptoms.forEach((symptom) => {
      expect(getCheckbox(symptom)).toHaveAttribute('aria-checked', 'false');
    });
    expect(onChange).toHaveBeenLastCalledWith({});
  });
});
