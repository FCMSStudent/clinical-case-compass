export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      case_tag_assignments: {
        Row: {
          case_id: string
          id: string
          tag_id: string
        }
        Insert: {
          case_id: string
          id?: string
          tag_id: string
        }
        Update: {
          case_id?: string
          id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "case_tag_assignments_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "medical_cases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "case_tag_assignments_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "case_tags"
            referencedColumns: ["id"]
          },
        ]
      }
      case_tags: {
        Row: {
          color: string
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          color?: string
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          color?: string
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      diagnoses: {
        Row: {
          case_id: string
          created_at: string | null
          id: string
          name: string
          notes: string | null
          status: Database["public"]["Enums"]["diagnosis_status"]
        }
        Insert: {
          case_id: string
          created_at?: string | null
          id?: string
          name: string
          notes?: string | null
          status?: Database["public"]["Enums"]["diagnosis_status"]
        }
        Update: {
          case_id?: string
          created_at?: string | null
          id?: string
          name?: string
          notes?: string | null
          status?: Database["public"]["Enums"]["diagnosis_status"]
        }
        Relationships: [
          {
            foreignKeyName: "diagnoses_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "medical_cases"
            referencedColumns: ["id"]
          },
        ]
      }
      medical_cases: {
        Row: {
          chief_complaint: string
          chief_complaint_analysis: string | null
          created_at: string | null
          history: string | null
          id: string
          lab_tests: Json | null
          learning_points: string | null
          patient_id: string
          physical_exam: string | null
          radiology_exams: Json | null
          symptoms: Json | null
          title: string
          updated_at: string | null
          urinary_symptoms: string[] | null
          user_id: string
          vitals: Json | null
        }
        Insert: {
          chief_complaint: string
          chief_complaint_analysis?: string | null
          created_at?: string | null
          history?: string | null
          id?: string
          lab_tests?: Json | null
          learning_points?: string | null
          patient_id: string
          physical_exam?: string | null
          radiology_exams?: Json | null
          symptoms?: Json | null
          title: string
          updated_at?: string | null
          urinary_symptoms?: string[] | null
          user_id: string
          vitals?: Json | null
        }
        Update: {
          chief_complaint?: string
          chief_complaint_analysis?: string | null
          created_at?: string | null
          history?: string | null
          id?: string
          lab_tests?: Json | null
          learning_points?: string | null
          patient_id?: string
          physical_exam?: string | null
          radiology_exams?: Json | null
          symptoms?: Json | null
          title?: string
          updated_at?: string | null
          urinary_symptoms?: string[] | null
          user_id?: string
          vitals?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "medical_cases_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patients: {
        Row: {
          age: number
          created_at: string | null
          gender: Database["public"]["Enums"]["gender_type"]
          id: string
          medical_record_number: string | null
          name: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          age: number
          created_at?: string | null
          gender: Database["public"]["Enums"]["gender_type"]
          id?: string
          medical_record_number?: string | null
          name: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          age?: number
          created_at?: string | null
          gender?: Database["public"]["Enums"]["gender_type"]
          id?: string
          medical_record_number?: string | null
          name?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          specialty: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          specialty?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          specialty?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      resources: {
        Row: {
          case_id: string
          created_at: string | null
          id: string
          notes: string | null
          title: string
          type: Database["public"]["Enums"]["resource_type"]
          url: string | null
        }
        Insert: {
          case_id: string
          created_at?: string | null
          id?: string
          notes?: string | null
          title: string
          type?: Database["public"]["Enums"]["resource_type"]
          url?: string | null
        }
        Update: {
          case_id?: string
          created_at?: string | null
          id?: string
          notes?: string | null
          title?: string
          type?: Database["public"]["Enums"]["resource_type"]
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "resources_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "medical_cases"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      diagnosis_status: "confirmed" | "differential" | "ruled_out"
      gender_type: "male" | "female" | "other"
      resource_type: "guideline" | "textbook" | "article" | "video" | "other"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      diagnosis_status: ["confirmed", "differential", "ruled_out"],
      gender_type: ["male", "female", "other"],
      resource_type: ["guideline", "textbook", "article", "video", "other"],
    },
  },
} as const
