import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { MedicalCase, Patient, CaseTag, Diagnosis, SPECIALTIES } from "@/types/case";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/ui/page-header";
import {
  ChevronLeft,
  FileText,
  Clipboard,
  UserCircle,
  Stethoscope,
  ArrowRight,
  ArrowLeft,
  CheckCheck,
  HelpCircle,
  Save,
  AlertCircle
} from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert";
import { getAllTags } from "@/data/mock-data";
import { FormProgressIndicator } from "@/components/cases/FormProgressIndicator";
import { AutosaveIndicator } from "@/components/cases/AutosaveIndicator";
import { SymptomChecklist } from "@/components/cases/SymptomChecklist";
import { LabResultsCard, LabTest } from "@/components/cases/LabResultsCard";
import { RadiologyCard, RadiologyExam } from "@/components/cases/RadiologyCard";
import { InteractiveBodyDiagram } from "@/components/cases/InteractiveBodyDiagram";
import { InteractiveVitalsCard } from "@/components/cases/InteractiveVitalsCard";

// Enhanced form schema with better validation
const formSchema = z.object({
  title: z.string()
    .min(3, { message: "Title must be at least 3 characters" })
    .max(200, { message: "Title must be less than 200 characters" }),
  patientName: z.string()
    .min(2, { message: "Patient name is required" })
    .max(100, { message: "Patient name must be less than 100 characters" }),
  patientAge: z.string()
    .min(1, { message: "Age is required" })
    .refine((val) => {
      const age = parseInt(val);
      return age > 0 && age <= 150;
    }, { message: "Age must be between 1 and 150" }),
  patientGender: z.enum(["male", "female", "other"], {
    required_error: "Gender is required",
  }),
  patientMRN: z.string().optional(),
  chiefComplaint: z.string()
    .min(3, { message: "Chief complaint is required" })
    .max(500, { message: "Chief complaint must be less than 500 characters" }),
  chiefComplaintAnalysis: z.string().max(2000).optional(),
  tags: z.string().min(1, { message: "Please select at least one specialty" }),
  history: z.string().max(5000).optional(),
  physicalExam: z.string().max(5000).optional(),
  learningPoints: z.string().max(3000).optional(),
  systemSymptoms: z.record(z.string(), z.array(z.string())).optional(),
  vitals: z.record(z.string(), z.string()).optional(),
  labResults: z.array(z.object({
    id: z.string(),
    n
