/** @vitest-environment jsdom */
import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, afterEach, vi } from 'vitest';
import * as jestDomMatchers from '@testing-library/jest-dom/matchers';
expect.extend(jestDomMatchers);

import { CaseListItem } from '../CaseListItem';
import { MedicalCase } from '@/types/case';

const mockCase: MedicalCase = {
  id: '1',
  title: 'Test Case',
  priority: 'medium',
  patient: { id: 'p1', name: 'John Doe', age: 30, gender: 'male' },
  chiefComplaint: 'Headache',
  diagnoses: [],
  tags: [],
  resources: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  status: 'draft',
};

describe('CaseListItem', () => {
  afterEach(() => {
    cleanup();
  });

  it('calls onDelete when delete button is clicked', () => {
    const onDelete = vi.fn();
    render(
      <BrowserRouter>
        <CaseListItem medicalCase={mockCase} onDelete={onDelete} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /delete case/i }));
    expect(onDelete).toHaveBeenCalledWith(mockCase.id);
  });
});
