import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { medicalSection, formField } from "@/lib/ui-styles";
import { MedicalCase } from "@/types/case";

interface CaseTextSectionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>; // Dynamic field names require flexible typing
  fieldName: string;
  title: string;
  placeholder: string;
  icon?: React.ReactNode;
}

export const CaseTextSection: React.FC<CaseTextSectionProps> = ({
  form,
  fieldName,
  title,
  placeholder,
  icon
}) => {
  return (
    <Card className={medicalSection.container}>
      <CardHeader className={medicalSection.header}>
        <CardTitle className={medicalSection.title}>
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className={medicalSection.content}>
        <FormField
          control={form.control}
          name={fieldName}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder={placeholder}
                  variant="medical"
                  size="lg"
                  error={!!fieldState.error}
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};
