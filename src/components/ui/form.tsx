// -----------------------------------------------------------------------------
// Form Primitives – Liquid Glass Edition
// -----------------------------------------------------------------------------
// * Provides glassy wrappers for descriptions & error messages so field
//   metadata sits comfortably on frosted surfaces.
// * Keeps the same API as the original ShadCN-inspired helpers – drop-in safe.
// * Adds `error` prop pass-through to any controlled component so variants can
//   react (e.g. <Input variant="glass" error /> will turn the border red).
// -----------------------------------------------------------------------------

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import { AlertCircleIcon } from "lucide-react";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

// -----------------------------------------------------------------------------
// Contexts ---------------------------------------------------------------------

type FormFieldCtx<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldCtx>({} as FormFieldCtx);

// -----------------------------------------------------------------------------
// Form Root --------------------------------------------------------------------

export const Form = FormProvider;

// -----------------------------------------------------------------------------
// Field Wrapper (Controller) ----------------------------------------------------

export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

// -----------------------------------------------------------------------------
// Hooks ------------------------------------------------------------------------

export function useFormField() {
  const fieldCtx = React.useContext(FormFieldContext);
  const itemCtx = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  if (!fieldCtx) throw new Error("useFormField must be inside <FormField>");
  if (!itemCtx) throw new Error("useFormField must be inside <FormItem>");

  const fieldState = getFieldState(fieldCtx.name, formState);

  return {
    id: itemCtx.id,
    name: fieldCtx.name,
    formItemId: `${itemCtx.id}-input`,
    formDescriptionId: `${itemCtx.id}-description`,
    formMessageId: `${itemCtx.id}-message`,
    ...fieldState,
  } as const;
}

// -----------------------------------------------------------------------------
// Item Wrapper -----------------------------------------------------------------

type FormItemCtx = { id: string };
const FormItemContext = React.createContext<FormItemCtx>({} as FormItemCtx);

export const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const id = React.useId();
    return (
      <FormItemContext.Provider value={{ id }}>
        <div ref={ref} className={cn("space-y-2", className)} {...props} />
      </FormItemContext.Provider>
    );
  },
);
FormItem.displayName = "FormItem";

// -----------------------------------------------------------------------------
// Label ------------------------------------------------------------------------

export const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();
  return (
    <Label
      ref={ref}
      htmlFor={formItemId}
      className={cn(
        "text-sm font-medium leading-none text-white/90 peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        error && "text-red-300",
        className,
      )}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

// -----------------------------------------------------------------------------
// Control (Slot) ----------------------------------------------------------------

export const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ children, ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
  const child = React.Children.only(children) as React.ReactElement;
  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={error ? `${formDescriptionId} ${formMessageId}` : formDescriptionId}
      aria-invalid={!!error}
      {...props}
    >
      {React.cloneElement(child, { error: !!error })}
    </Slot>
  );
});
FormControl.displayName = "FormControl";

// -----------------------------------------------------------------------------
// Description ------------------------------------------------------------------

export const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();
  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn(
        "text-sm leading-relaxed text-white/80 mt-2 flex items-start gap-2",
        "glass-subtle border border-white/20 p-3 rounded-lg backdrop-blur-md",
        className,
      )}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

// -----------------------------------------------------------------------------
// Message ----------------------------------------------------------------------

export const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error.message) : children;
  if (!body) return null;
  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn(
        "text-sm font-medium text-red-300 flex items-center gap-1",
        "glass-elevated border border-red-500/30 p-2 backdrop-blur-lg",
        className,
      )}
      {...props}
    >
      <AlertCircleIcon className="h-4 w-4" />
      {body}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

// -----------------------------------------------------------------------------
// Exports ----------------------------------------------------------------------
export type {
  FormFieldCtx as FormFieldContextValue,
  FormItemCtx as FormItemContextValue,
};