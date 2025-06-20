// src/components/ui/ErrorSummary.tsx
import React from "react";
import { FieldErrors, FieldValues, Path } from "react-hook-form"; // Using Path for more type safety with setFocus
import { cn } from "@/shared/utils/utils";
import { Alert, AlertTitle, AlertDescription } from "@/shared/components/alert";

interface ErrorSummaryProps<TFieldValues extends FieldValues = FieldValues> {
  errors: FieldErrors<TFieldValues>;
  setFocus?: (name: Path<TFieldValues>) => void;
  className?: string;
  formId?: string; // Optional: to link errors to specific form fields if IDs are available
}

// Helper to get a more readable label
const getFieldLabel = (fieldName: string): string => {
  const result = fieldName
    .replace(/([A-Z])/g, " $1") // Add space before uppercase letters
    .replace(/_/g, " "); // Replace underscores with spaces
  return result.charAt(0).toUpperCase() + result.slice(1); // Capitalize first letter
};

export const ErrorSummary = <TFieldValues extends FieldValues = FieldValues>({
  errors,
  setFocus,
  className,
  formId,
}: ErrorSummaryProps<TFieldValues>) => {
  const errorEntries = Object.entries(errors);

  if (errorEntries.length === 0) {
    return null;
  }

  const handleFocusField = (fieldName: string) => {
    if (setFocus) {
      // Cast to Path<TFieldValues> as we know fieldName is a key of errors
      setFocus(fieldName as Path<TFieldValues>);

      // Attempt to scroll into view, setFocus might already do this depending on RHF version and setup
      // Using a timeout to allow focus to settle before scrolling.
      setTimeout(() => {
        let element: HTMLElement | null = null;
        if (formId) {
          // Attempt to find by specific ID if formId is provided
          element =
            document.getElementById(`${formId}-${fieldName}`) ||
            document.getElementById(fieldName) ||
            (document.getElementsByName(fieldName)[0] as HTMLElement);
        } else {
          element =
            document.getElementById(fieldName) ||
            (document.getElementsByName(fieldName)[0] as HTMLElement);
        }

        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        } else {
          // Fallback for complex field names or if ID/name is not directly on the input
          const formItem = document.getElementById(`${fieldName}-form-item`); // Convention from form.tsx
          if (formItem) {
            formItem.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }
      }, 50);
    }
  };

  return (
    <Alert
      variant="destructive"
      aria-live="assertive"
      className={cn("mb-6", className)}
    >
      <AlertTitle>
        Please correct the following {errorEntries.length} error(s):
      </AlertTitle>
      <AlertDescription>
        <ul className="list-disc list-inside space-y-1">
          {errorEntries.map(([fieldName, error]) => {
            // Check if error and error.message exist and error.message is a string
            if (error && typeof error.message === "string") {
              return (
                <li key={fieldName} className="text-sm">
                  <button
                    type="button"
                    onClick={() => handleFocusField(fieldName)}
                    className="text-left hover:underline text-destructive font-medium focus:outline-none focus:ring-1 focus:ring-destructive-foreground rounded"
                  >
                    {getFieldLabel(fieldName)}:
                  </button>
                  <span className="ml-1">{error.message}</span>
                </li>
              );
            }
            // Handle cases where error.message might not be a string (e.g. nested errors)
            // For now, we skip rendering if message is not a direct string.
            // A more robust solution might recursively display nested errors.
            return null;
          })}
        </ul>
      </AlertDescription>
    </Alert>
  );
};
