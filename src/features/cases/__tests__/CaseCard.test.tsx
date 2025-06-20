/** @vitest-environment jsdom */
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, afterEach } from 'vitest';
import * as jestDomMatchers from '@testing-library/jest-dom/matchers';
expect.extend(jestDomMatchers);

import { CaseCard } from '../CaseCard';
import { MedicalCase } from '@/shared/types/case';

const mockMedicalCase: MedicalCase = {
  id: '1',
  title: 'Test Case Title',
  priority: 'medium',
  patient: {
    id: 'p1',
    name: 'John Doe',
    age: 30,
    gender: 'male',
  },
  chiefComplaint: 'Test chief complaint',
  diagnoses: [],
  tags: [],
  resources: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  status: 'draft',
};

describe('CaseCard', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders without crashing with minimal props', () => {
    render(
      <BrowserRouter>
        <CaseCard medicalCase={mockMedicalCase} />
      </BrowserRouter>
    );

    expect(screen.getByText('Test Case Title')).toBeInTheDocument();
    expect(screen.getByText(/John Doe, 30 y\/o male/i)).toBeInTheDocument();
    expect(screen.getByText('Test chief complaint')).toBeInTheDocument();
  });

  it('renders patient information correctly', () => {
    render(
      <BrowserRouter>
        <CaseCard medicalCase={mockMedicalCase} />
      </BrowserRouter>
    );
    expect(screen.getByText('John Doe, 30 y/o male')).toBeInTheDocument();
  });

  it('renders chief complaint correctly', () => {
    render(
      <BrowserRouter>
        <CaseCard medicalCase={mockMedicalCase} />
      </BrowserRouter>
    );
    expect(screen.getByText('Test chief complaint')).toBeInTheDocument();
  });

  it('renders "View Details" button', () => {
    render(
      <BrowserRouter>
        <CaseCard medicalCase={mockMedicalCase} />
      </BrowserRouter>
    );
    expect(screen.getByRole('link', { name: /view details/i })).toBeInTheDocument();
  });

  it('renders tags if provided', () => {
    const caseWithTags: MedicalCase = {
      ...mockMedicalCase,
      tags: [{ id: 't1', name: 'Urgent', color: '#FF0000' }],
    };
    render(
      <BrowserRouter>
        <CaseCard medicalCase={caseWithTags} />
      </BrowserRouter>
    );
    expect(screen.getByText('Urgent')).toBeInTheDocument();
  });

  it('shows "+N" indicator when tag count exceeds the visible limit', () => {
    const caseWithManyTags: MedicalCase = {
      ...mockMedicalCase,
      tags: [
        { id: 't1', name: 'Urgent', color: '#FF0000' },
        { id: 't2', name: 'Important', color: '#00FF00' },
        { id: 't3', name: 'Emergency', color: '#0000FF' },
      ],
    };

    render(
      <BrowserRouter>
        <CaseCard medicalCase={caseWithManyTags} />
      </BrowserRouter>
    );

    expect(screen.getByText('Urgent')).toBeInTheDocument();
    expect(screen.getByText('Important')).toBeInTheDocument();
    expect(screen.getByText('+1')).toBeInTheDocument();
  });

  it('renders primary diagnosis if provided', () => {
    const caseWithDx: MedicalCase = {
      ...mockMedicalCase,
      diagnoses: [{ id: 'd1', name: 'Flu', status: 'confirmed' }],
    };
    render(
      <BrowserRouter>
        <CaseCard medicalCase={caseWithDx} />
      </BrowserRouter>
    );
    expect(screen.getByText('Flu')).toBeInTheDocument();
  });
});
