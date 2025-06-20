import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { CaseCard } from './CaseCard';

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: React.forwardRef(({ children, ...props }: any, ref: any) => (
      <div ref={ref} {...props}>{children}</div>
    )),
  },
  AnimatePresence: ({ children }: any) => children,
}));

const mockCase = {
  id: '1',
  title: 'Test Case',
  description: 'A test case description',
  tags: ['cardiology', 'emergency'],
  difficulty: 'intermediate' as const,
  created_at: '2024-01-01T00:00:00.000Z',
  updated_at: '2024-01-01T00:00:00.000Z',
  patient_age: 45,
  patient_gender: 'male' as const,
  chief_complaint: 'Chest pain',
  diagnosis: 'Myocardial infarction',
  learning_points: ['Point 1', 'Point 2'],
  status: 'published' as const,
  author_id: 'user-1',
  case_type: 'clinical' as const,
};

const renderCaseCard = (props = {}) => {
  return render(
    <BrowserRouter>
      <CaseCard case={mockCase} {...props} />
    </BrowserRouter>
  );
};

describe('CaseCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders case information correctly', () => {
    renderCaseCard();
    
    expect(screen.getByText('Test Case')).toBeInTheDocument();
    expect(screen.getByText('A test case description')).toBeInTheDocument();
    expect(screen.getByText('cardiology')).toBeInTheDocument();
    expect(screen.getByText('emergency')).toBeInTheDocument();
  });

  it('displays patient information', () => {
    renderCaseCard();
    
    expect(screen.getByText(/45.*male/i)).toBeInTheDocument();
    expect(screen.getByText('Chest pain')).toBeInTheDocument();
  });

  it('shows difficulty badge', () => {
    renderCaseCard();
    
    expect(screen.getByText('intermediate')).toBeInTheDocument();
  });

  it('navigates to case detail when clicked', () => {
    renderCaseCard();
    
    const card = screen.getByRole('article');
    fireEvent.click(card);
    
    expect(mockNavigate).toHaveBeenCalledWith('/cases/1');
  });

  it('handles missing optional fields gracefully', () => {
    const caseWithoutOptionalFields = {
      ...mockCase,
      description: '',
      tags: [],
      patient_age: undefined,
      patient_gender: undefined,
    };
    
    render(
      <BrowserRouter>
        <CaseCard case={caseWithoutOptionalFields} />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Test Case')).toBeInTheDocument();
    // Should not crash when optional fields are missing
  });

  it('applies custom className', () => {
    const { container } = renderCaseCard({ className: 'custom-class' });
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders in loading state', () => {
    renderCaseCard({ isLoading: true });
    
    // Should show skeleton or loading state
    expect(screen.queryByText('Test Case')).not.toBeInTheDocument();
  });

  it('displays correct case status', () => {
    renderCaseCard();
    
    expect(screen.getByText('published')).toBeInTheDocument();
  });

  it('formats creation date correctly', () => {
    renderCaseCard();
    
    // Should display formatted date
    expect(screen.getByText(/Jan 1, 2024/i)).toBeInTheDocument();
  });

  it('handles long case titles appropriately', () => {
    const caseWithLongTitle = {
      ...mockCase,
      title: 'This is a very long case title that should be truncated appropriately in the UI',
    };
    
    render(
      <BrowserRouter>
        <CaseCard case={caseWithLongTitle} />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/This is a very long case title/)).toBeInTheDocument();
  });

  it('supports keyboard navigation', () => {
    renderCaseCard();
    
    const card = screen.getByRole('article');
    card.focus();
    
    fireEvent.keyDown(card, { key: 'Enter', code: 'Enter' });
    expect(mockNavigate).toHaveBeenCalledWith('/cases/1');
    
    vi.clearAllMocks();
    
    fireEvent.keyDown(card, { key: ' ', code: 'Space' });
    expect(mockNavigate).toHaveBeenCalledWith('/cases/1');
  });
});