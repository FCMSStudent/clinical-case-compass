diff --git a/src/components/RecentActivityList.tsx b/src/components/RecentActivityList.tsx
index f694e64840b92ac77bfe27fb4049d101dc9e2304..5cadf2757c1b09d03e8cb86f8bab86f36507c21f 100644
--- a/src/components/RecentActivityList.tsx
+++ b/src/components/RecentActivityList.tsx
@@ -1,27 +1,27 @@
 import { useState, useEffect } from 'react';
-import { supabase } from './supabaseClient'; // Make sure you import your Supabase client
+import { supabase } from '@/integrations/supabase/client';
 
 function RecentActivityList() {
   // 1. Initialize state with an empty array
   const [activities, setActivities] = useState([]);
   const [loading, setLoading] = useState(true);
 
   useEffect(() => {
     async function getActivities() {
       try {
         setLoading(true);
         // 2. Replace 'activities' with your actual table name
         const { data, error } = await supabase
           .from('activities')
           .select('*') // Select all columns
           .limit(10); // Optionally limit the results
 
         if (error) {
           // 3. This will show an error in the console if the request fails
           console.error('Supabase error:', error.message);
           return;
         }
 
         // 4. CRITICAL: Log the data you receive from Supabase
         console.log('Fetched data:', data);
 
