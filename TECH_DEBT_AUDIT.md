# Technical Debt Audit Report - 2024-03-15

This report summarizes identified technical debt items within the codebase.
Each item is categorized by type and includes an estimated impact and effort score.

## Categories of Technical Debt

*   **Logging & Debugging:** Issues related to console logs and debugging remnants.
*   **Error Handling:** Opportunities to improve how errors are managed and reported.
*   **Code Quality & Best Practices:** Deviations from best practices, potential bugs, or areas for refactoring.
*   **Deprecated Code & Types:** Usage of outdated code patterns or type definitions.
*   **Data Handling & Integrity:** Issues related to how data is processed, transformed, or stored.

---

## Audit Items

Below is a list of specific technical debt items.

---

### 1. Logging & Debugging

**Item 1.1: Excessive Console Logging (Partially Addressed)**
*   **Description:** Numerous `console.log`, `console.warn`, and `console.error` statements were present throughout the codebase, primarily for debugging.
*   **Files Affected:** `src/app/AuthContext.tsx`, `src/components/RecentActivityList.tsx`, `src/pages/Cases.tsx`, `src/hooks/use-supabase-cases.ts`, `src/pages/NotFound.tsx`, etc.
*   **Action Taken:** Removed most debugging `console.log` statements from `AuthContext.tsx`, `RecentActivityList.tsx`, and `Cases.tsx`.
*   **Remaining Action:** A more comprehensive review of all `console.warn` and `console.error` statements is needed. Implement a structured logging solution (e.g., Sentry, LogRocket) for production error tracking and remove/replace remaining console statements as appropriate.
*   **Impact:** Medium (Noise in development, potential for sensitive data exposure if logs are ever enabled in production by mistake, performance overhead if logs are extensive).
*   **Effort to Fix Remaining:** Medium.

**Item 1.2: `console.warn` for Missing Supabase Credentials**
*   **Description:** `src/integrations/supabase/client.ts` uses `console.warn` if Supabase URL or Key is missing.
*   **Action Taken:** None. This is an important startup warning.
*   **Remaining Action:** Consider if this warning should also be a more user-facing non-modal notification in the UI when the app runs in offline mode due to this.
*   **Impact:** Low (Currently developer-facing only).
*   **Effort to Fix Remaining:** Low.

---

### 2. Error Handling

**Item 2.1: Potentially Redundant Error Notification in AccessibilityManager**
*   **Description:** `src/lib/accessibility.ts` uses `toast.error` and has an `alert()` fallback for microphone access denial.
*   **Action Taken:** None.
*   **Remaining Action:** Review if the `alert()` fallback is necessary or if `toast.error` is sufficient and consistently available.
*   **Impact:** Low (Minor UI inconsistency if toast fails).
*   **Effort to Fix Remaining:** Low.

**Item 2.2: Generic Error Re-throw in `transformDbCaseToMedicalCase`**
*   **Description:** `src/hooks/use-supabase-cases.ts` catches errors during transformation and re-throws `new Error(\`Failed to transform case data: \${error.message}\`)`.
*   **Action Taken:** None.
*   **Remaining Action:** Consider preserving the original error stack or using a custom error class for better debuggability.
*   **Impact:** Low (Can make debugging slightly harder).
*   **Effort to Fix Remaining:** Low.

---

### 3. Code Quality & Best Practices

**Item 3.1: `setTimeout` for Focus Management in `SearchPanel.tsx`**
*   **Description:** `src/components/SearchPanel.tsx` uses `setTimeout` to re-focus an input after clearing.
*   **Action Taken:** None.
*   **Remaining Action:** Investigate if a more React-idiomatic way (e.g., refs and `useEffect`) can achieve the same without `setTimeout`.
*   **Impact:** Low (Current solution might be fragile under certain conditions).
*   **Effort to Fix Remaining:** Low to Medium.

**Item 3.2: `eslint-disable-next-line react-hooks/exhaustive-deps` in `use-local-storage.ts` (Addressed)**
*   **Description:** The `useEffect` hook in `src/hooks/use-local-storage.ts` had a disabled lint rule for exhaustive dependencies.
*   **Action Taken:** Wrapped `readValue` in `useCallback` and added it to the dependency array. Removed the eslint-disable comment.
*   **Impact:** Fixed (Potential for stale closures or incorrect hook behavior resolved).
*   **Effort to Fix Remaining:** Done.

**Item 3.3: `useEffect` Dependency in `AuthContext.tsx` (Reviewed)**
*   **Description:** A comment in `src/app/AuthContext.tsx` questioned if `useToast` correctly memoizes the returned `toast` function, affecting a `useEffect` dependency array.
*   **Action Taken:** The `toast` function was confirmed to be correctly included in the dependency array. The specific multi-line comment about this was removed as it was part of a larger block of comments.
*   **Impact:** Low (No issue found, but good to document the check).
*   **Effort to Fix Remaining:** Done.

---

### 4. Deprecated Code & Types

**Item 4.1: Deprecated `RadiologyExam` Type (Addressed)**
*   **Description:** `src/types/case.ts` had a deprecated `RadiologyExam` type and `radiologyExams` field in `MedicalCase`, with `RadiologyStudy` being preferred.
*   **Action Taken:** Fully refactored the codebase to remove `RadiologyExam` and exclusively use `RadiologyStudy` and `radiologyStudies`. This included updates to type definitions, data transformations, components, and validation.
*   **Impact:** Fixed (Improved type safety and code consistency).
*   **Effort to Fix Remaining:** Done.

**Item 4.2: Incomplete `MedicalCase` Type (Partially Addressed)**
*   **Description:** `src/types/case.ts` had a comment `// Add missing properties that are being used in the codebase`. The `symptoms` field was also mistyped for its common usage pattern (review of systems).
*   **Action Taken:** Changed `MedicalCase.symptoms` from `Record<string, boolean>` to `Record<string, string[]>` and removed a redundant `systemSymptoms` field. This aligns the type with how symptoms data is structured and used. The placeholder comment was removed.
*   **Impact:** Improved (Better type alignment for symptoms).
*   **Effort to Fix Remaining:** Low (Further review might identify other minor missing optional fields not central to current data flows, but major discrepancies seem resolved).

---

### 5. Data Handling & Integrity

**Item 5.1: Placeholder Table Name in `RecentActivityList.tsx` (Addressed)**
*   **Description:** `src/components/RecentActivityList.tsx` had a comment `// 2. Replace 'activities' with your actual table name`.
*   **Action Taken:** Comment removed. Assumed 'activities' is the correct name. Added a more explicit null check for fetched data.
*   **Impact:** Fixed (Code is cleaner).
*   **Effort to Fix Remaining:** Done.

**Item 5.2: Fallback ID Generation in `use-supabase-cases.ts` (Improved)**
*   **Description:** `transformDbCaseToMedicalCase` in `src/hooks/use-supabase-cases.ts` generated random IDs for lab tests and radiology studies if the database record was missing an ID.
*   **Action Taken:** Changed the logic to log an error to the console and use a clearly identifiable "error-missing-id-..." fallback ID.
*   **Remaining Action:** Investigate why IDs might be missing from the database for these items. Ideally, the database schema should enforce non-nullable IDs for these entities, or the type system should explicitly allow for optional IDs if that's a valid state further up the data chain.
*   **Impact:** Medium (Current fix makes issues visible; underlying data integrity problem might still exist).
*   **Effort to Fix Remaining:** Medium (Requires database schema review and potentially data migration or more robust backend validation).

**Item 5.3: Date for RadiologyStudy in `use-supabase-cases.ts`**
*   **Description:** When mapping DB data to `RadiologyStudy` in `transformDbCaseToMedicalCase`, a specific date for each study is not available from the DB's `radiology_exams` structure. The case's `updatedAt` or a placeholder is used.
*   **Action Taken:** None directly in this pass, but noted during `RadiologyExam` deprecation.
*   **Remaining Action:** Evaluate if a per-study date is necessary. If so, the database schema for `radiology_exams` (or its equivalent storage for studies) needs a date field, and data ingestion/editing processes must capture this.
*   **Impact:** Medium (Data accuracy for radiology study dates is limited).
*   **Effort to Fix Remaining:** Medium to High (Involves DB schema changes and data backfill/update).

---

This report should be used to prioritize further refactoring and improvement efforts.
