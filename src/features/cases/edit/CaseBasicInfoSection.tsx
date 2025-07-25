
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/shared/components/form";
import { Input } from "@/shared/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/select";
import { typography } from '@/design-system/tokens/typography';

interface CaseBasicInfoSectionProps {
  form: UseFormReturn<any>;
}

export const CaseBasicInfoSection: React.FC<CaseBasicInfoSectionProps> = ({ form }) => {
  return (
    <Card className={`${typography.grid.responsive} gap-4`}>
      <CardHeader className={`${typography.grid.responsive} gap-4`}>
        <CardTitle className={typography.title.h2}>
          Basic Information
        </CardTitle>
      </CardHeader>
      <CardContent className={`${typography.grid.responsive} gap-4`}>
        <div className={typography.grid.responsive}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className={typography.formField.container}>
                <FormLabel className={typography.formField.label}>Case Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className={typography.formField.input}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="chiefComplaint"
            render={({ field }) => (
              <FormItem className={typography.formField.container}>
                <FormLabel className={typography.formField.label}>
                  Chief Complaint
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className={typography.formField.input}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="patientName"
            render={({ field }) => (
              <FormItem className={typography.formField.container}>
                <FormLabel className={typography.formField.label}>
                  Patient Name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className={typography.formField.input}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className={typography.grid.threeCol}>
            <FormField
              control={form.control}
              name="patientAge"
              render={({ field }) => (
                <FormItem className={typography.formField.container}>
                  <FormLabel className={typography.formField.label}>Age</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min={0}
                      max={120}
                      className={typography.formField.input}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="patientGender"
              render={({ field }) => (
                <FormItem className={`col-span-2 ${typography.formField.container}`}>
                  <FormLabel className={typography.formField.label}>Gender</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger className={typography.formField.input}>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent className="bg-white/10 backdrop-blur-md border border-white/20">
                        <SelectItem
                          value="male"
                          className="text-white hover:bg-white/20"
                        >
                          Male
                        </SelectItem>
                        <SelectItem
                          value="female"
                          className="text-white hover:bg-white/20"
                        >
                          Female
                        </SelectItem>
                        <SelectItem
                          value="other"
                          className="text-white hover:bg-white/20"
                        >
                          Other
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="patientMRN"
            render={({ field }) => (
              <FormItem className={typography.formField.container}>
                <FormLabel className={typography.formField.label}>
                  Medical Record Number (Optional)
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className={typography.formField.input}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};
