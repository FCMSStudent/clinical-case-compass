// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://fdyvwrmnfzrnizsrhpym.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkeXZ3cm1uZnpybml6c3JocHltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NTU5NjEsImV4cCI6MjA2MzIzMTk2MX0.3eYyywkmhv_PEgFWUwcKOuhaJH4ZTZPFyDdJrh9JQns";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);