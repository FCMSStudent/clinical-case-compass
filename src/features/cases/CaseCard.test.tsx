
/** @vitest-environment jsdom */
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // Link component needs a router context
import { describe, it, expect, afterEach } from 'vitest'; // Import Vitest globals
import * as jestDomMatchers from '@testing-library/jest-dom/matchers';
expect.extend(jestDomMatchers); // Extend Vitest's expect with jest-dom matchers

import { CaseCard } from './CaseCard';
import { MedicalCase } from '@/types/case';

// Minimal mock data for MedicalCase
const mockMedicalCase: MedicalCase = {
  id: '1',
  title: 'Test Case Title',
  patient: {
    id: 'p1',
    name: 'John Doe',
    age: 30,
    gender: 'male', // Fixed: changed from 'Male' to 'male'
  },
  chiefComplaint: 'Test chief complaint',
  summary: 'Test summary',
  diagnoses: [], // Can be empty for a smoke test
  tags: [], // Can be empty for a smoke test
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  status: 'draft',
  visibility: 'private',
  userId: 'user1',
  // Add any other potentially required fields with default/mock values
  // For example, if sections or learningPoints were non-optional
  // sections: [],
  // learningPoints: [],
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

    // Check for a key element or text to confirm rendering
    // For example, the title of the case
    expect(screen.getByText('Test Case Title')).toBeInTheDocument();
    // Or the patient's name
    expect(screen.getByText(/John Doe, 30 y\/o male/i)).toBeInTheDocument();
    // Or chief complaint
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

  it('renders primary diagnosis if provided', () => {
    const caseWithDx: MedicalCase = {
      ...mockMedicalCase,
      diagnoses: [{ id: 'd1', name: 'Flu', status: 'confirmed' }], // Fixed: removed icd10Code
    };
    render(
      <BrowserRouter>
        <CaseCard medicalCase={caseWithDx} />
      </BrowserRouter>
    );
    expect(screen.getByText('Flu')).toBeInTheDocument();
  });
});
