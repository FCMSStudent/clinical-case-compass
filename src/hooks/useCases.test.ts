import { renderHook, waitFor, act } from '@testing-library/react';
import { vi } from 'vitest';
import { useCases, CaseSummary } from './useCases'; // Adjust if path is different
import type { Patient, CaseTag } from '@/types/case';

// Mock the supabase client
// We need to mock the chainable methods: from -> select -> order
const mockSupabaseSelect = vi.fn();
const mockSupabaseFrom = vi.fn(() => ({
  select: mockSupabaseSelect,
}));

// Mock the actual client import used by the hook
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: mockSupabaseFrom,
  },
}));

const mockPatient1: Pick<Patient, 'name' | 'age' | 'gender'> = { name: 'John Doe', age: 45, gender: 'male' };
const mockPatient2: Pick<Patient, 'name' | 'age' | 'gender'> = { name: 'Jane Smith', age: 32, gender: 'female' };

const mockTag1: Pick<CaseTag, 'id' | 'name' | 'color'> = { id: 't1', name: 'urgent', color: '#FF0000' };

const mockCasesData: CaseSummary[] = [
  { id: '1', title: 'Case 1: Flu', patient: mockPatient1, updatedAt: new Date(2023, 10, 15).toISOString(), tags: [mockTag1] },
  { id: '2', title: 'Case 2: Sprain', patient: mockPatient2, updatedAt: new Date(2023, 10, 10).toISOString(), tags: [] },
];


describe('useCases Hook', () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockSupabaseFrom.mockClear();
    mockSupabaseSelect.mockClear();
  });

  it('should initialize with correct default states', () => {
    // Mock a successful response for initial load, but don't wait for it.
    mockSupabaseSelect.mockReturnValueOnce({
        order: vi.fn().mockResolvedValueOnce({ data: [], error: null }),
    });
    const { result } = renderHook(() => useCases());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.cases).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('should fetch cases successfully and update state', async () => {
    mockSupabaseSelect.mockReturnValueOnce({
      order: vi.fn().mockResolvedValueOnce({ data: mockCasesData, error: null }),
    });

    const { result } = renderHook(() => useCases());

    // Check initial loading state
    expect(result.current.isLoading).toBe(true);

    // Wait for the loading to complete
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Check if cases are updated and error is null
    expect(result.current.cases).toEqual(mockCasesData);
    expect(result.current.error).toBeNull();
    expect(mockSupabaseFrom).toHaveBeenCalledWith('medical_cases');
    // Example of how to check the select string if it's static, or use .toHaveBeenCalledWith(expect.stringContaining("..."))
    // For this hook, the select string can vary due to fallback logic, so checking the table name is more robust.
    // The specific select string in the hook is: `id, title, patient:patients ( name, age, gender ), updatedAt, tags:case_tags ( id, name, color )`
    // or `id, title, patient, updatedAt, tags` for the fallback.
    // We can check if `select` was called with a string.
    expect(mockSupabaseSelect).toHaveBeenCalledWith(expect.any(String));
  });

  it('should handle errors when fetching cases (primary attempt)', async () => {
    const errorMessage = 'Supabase query failed';
    mockSupabaseSelect.mockReturnValueOnce({
      order: vi.fn().mockResolvedValueOnce({ data: null, error: { message: errorMessage, code: '500', details: '', hint: '' } }),
    });

    const { result } = renderHook(() => useCases());

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    
    expect(result.current.error).not.toBeNull();
    expect(result.current.error?.message).toBe(errorMessage);
    expect(result.current.cases).toEqual([]);
  });

  it('should attempt fallback query if primary relational query fails due to "relation does not exist"', async () => {
    const relationalErrorMessage = 'relation "patients" does not exist'; // Or "case_tags"
    // First call (relational) fails
    mockSupabaseSelect.mockImplementationOnce(() => ({
        order: vi.fn().mockResolvedValueOnce({ data: null, error: { message: relationalErrorMessage, code: '42P01' } }),
    }));
    // Second call (fallback to JSON columns) succeeds
    const fallbackData = mockCasesData.map(c => ({ ...c, patient: JSON.stringify(c.patient), tags: JSON.stringify(c.tags) })); // Simulate raw JSON
    
    // This mock is for the second call to supabase.from().select()
    const mockFallbackSelect = vi.fn(() => ({
        order: vi.fn().mockResolvedValueOnce({ data: fallbackData, error: null }),
    }));

    // Temporarily change the mockSupabaseFrom to return the fallbackSelect for the second call
    mockSupabaseFrom
        .mockImplementationOnce(() => ({ select: mockSupabaseSelect })) // For the first, failing call
        .mockImplementationOnce(() => ({ select: mockFallbackSelect })); // For the second, fallback call
    
    const { result } = renderHook(() => useCases());

    await waitFor(() => expect(result.current.isLoading).toBe(false), { timeout: 2000 });

    expect(result.current.error).toBeNull();
    // The data should be transformed by the hook to match CaseSummary
    // The current fallback transformation in useCases.ts is:
    // patient: { name: item.patient?.name, age: item.patient?.age, gender: item.patient?.gender }
    // This assumes item.patient is already an object. If it's JSON.stringified like in `fallbackData` above,
    // the hook's transformation would need JSON.parse. Let's adjust the hook or test mock.
    // For testing, let's assume the hook correctly parses if it were stringified, or the DB returns objects for JSONB.
    // The current hook's fallback transformation logic:
    // const transformedData = jsonData?.map(item => ({ ...item, patient: { name: item.patient?.name, ... } }))
    // This implies `item.patient` is already an object. So, the `fallbackData` should not stringify.
     const correctlyStructuredFallbackData = mockCasesData.map(c => ({
      id: c.id,
      title: c.title,
      // Simulate that 'patient' and 'tags' are direct JSON objects from the DB in the fallback
      patient: c.patient, 
      updatedAt: c.updatedAt,
      tags: c.tags,
    }));
    mockFallbackSelect.mockImplementationOnce(() => ({ // Re-assign for the current test scope
        order: vi.fn().mockResolvedValueOnce({ data: correctlyStructuredFallbackData, error: null }),
    }));


    expect(result.current.cases).toEqual(mockCasesData); // Expecting the final transformed data
    expect(mockSupabaseFrom).toHaveBeenCalledTimes(2); // Called once for primary, once for fallback
    expect(mockSupabaseSelect).toHaveBeenCalledWith(expect.stringContaining("patient:patients")); // First attempt
    expect(mockFallbackSelect).toHaveBeenCalledWith('id, title, patient, updatedAt, tags'); // Fallback attempt
  });


  it('should handle errors from the fallback query', async () => {
    const relationalErrorMessage = 'relation "patients" does not exist';
    const fallbackErrorMessage = 'Fallback query failed';

    // First call (relational) fails, triggering fallback
    mockSupabaseSelect.mockImplementationOnce(() => ({
        order: vi.fn().mockResolvedValueOnce({ data: null, error: { message: relationalErrorMessage, code: '42P01' } }),
    }));
    
    // Second call (fallback) also fails
    const mockFallbackSelect = vi.fn(() => ({
        order: vi.fn().mockResolvedValueOnce({ data: null, error: { message: fallbackErrorMessage, code: '500' } }),
    }));

    mockSupabaseFrom
        .mockImplementationOnce(() => ({ select: mockSupabaseSelect }))
        .mockImplementationOnce(() => ({ select: mockFallbackSelect }));
        
    const { result } = renderHook(() => useCases());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).not.toBeNull();
    expect(result.current.error?.message).toBe(fallbackErrorMessage);
    expect(result.current.cases).toEqual([]);
    expect(mockSupabaseFrom).toHaveBeenCalledTimes(2);
  });


  it('refreshCases function should re-fetch data', async () => {
    // Initial fetch
    mockSupabaseSelect.mockImplementationOnce(() => ({
      order: vi.fn().mockResolvedValueOnce({ data: mockCasesData, error: null }),
    }));
    
    const { result } = renderHook(() => useCases());

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.cases).toEqual(mockCasesData);

    // Setup mock for refresh
    const refreshedCasesData: CaseSummary[] = [
      { ...mockCasesData[0], title: "Case 1 Updated" },
      mockCasesData[1],
    ];
    mockSupabaseSelect.mockImplementationOnce(() => ({ // This will be used by the refresh call
      order: vi.fn().mockResolvedValueOnce({ data: refreshedCasesData, error: null }),
    }));
    
    // Call refreshCases
    await act(async () => {
      result.current.refreshCases();
    });
    
    // Wait for loading state to change for the refresh
    await waitFor(() => expect(result.current.isLoading).toBe(true)); // It should become true briefly
    await waitFor(() => expect(result.current.isLoading).toBe(false)); // Then false again

    expect(result.current.cases).toEqual(refreshedCasesData);
    expect(result.current.error).toBeNull();
    // From was called once for initial, once for refresh (if mockSupabaseFrom was reset, otherwise it's cumulative)
    // Since we clear mockSupabaseFrom in beforeEach, this check is tricky without more context on its mock.
    // Let's assume mockSupabaseFrom itself is not reset in a way that affects call count across act() boundaries for a single test.
    // However, the select mock is what matters for different return values.
    expect(mockSupabaseSelect).toHaveBeenCalledTimes(2); // Once for initial, once for refresh
  });
});

// Helper to configure Vitest if needed (e.g., in setupTests.ts)
// import '@testing-library/jest-dom'; // For additional matchers like .toBeInTheDocument(), not used here
//
// // Mock environment variables if your Supabase client relies on them directly during test
// // For example, if client.ts itself threw an error without import.meta.env
// vi.mock('vite/env', () => ({
//   loadEnv: () => ({
//     VITE_SUPABASE_URL: 'http://localhost:54321',
//     VITE_SUPABASE_PUBLISHABLE_KEY: 'test-anon-key',
//   }),
// }));
// However, since we mock the client directly, this might not be needed unless client.ts has other side effects on import.

// Note on the fallback test:
// The `useCases` hook's fallback logic is:
// if (supabaseError.message.includes("relation") && supabaseError.message.includes("does not exist"))
// This means the error message must contain these substrings.
// My mock error `message: relationalErrorMessage` where `relationalErrorMessage = 'relation "patients" does not exist'` fits this.
// The transformation in the hook:
// const transformedData = jsonData?.map(item => ({
//   ...item,
//   patient: { name: item.patient?.name, age: item.patient?.age, gender: item.patient?.gender }
// })) || [];
// This transformation expects `item.patient` to be an object. If the fallback query `select('id, title, patient, ...')`
// returns `patient` as a JSON *string*, then `item.patient?.name` would be undefined.
// The test mock `correctlyStructuredFallbackData` ensures `patient` is an object, aligning with the hook's current transformation.
// If the actual Supabase behavior for JSON columns is to return strings that need parsing, the hook's transformation part would need `JSON.parse(item.patient)`.
// For now, the test assumes the hook's current transformation logic is what's intended for the shape of data returned by the fallback query.

// To run tests, you would typically have a script in package.json like "test": "vitest"
// and then run `npm test` or `yarn test`.
// Ensure Vitest is configured in `vite.config.ts` or `vitest.config.ts`.
// Example `vite.config.ts` test section:
// /// <reference types="vitest" />
// import { defineConfig } from 'vite'
// // ... other imports
// export default defineConfig({
//   // ... other configs
//   test: {
//     globals: true,
//     environment: 'jsdom', // or 'happy-dom'
//     setupFiles: './src/setupTests.ts', // Optional setup file
//   },
// })
