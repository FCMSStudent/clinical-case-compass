import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient'; // Make sure you import your Supabase client

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

        if (data) {
          setActivities(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    getActivities();
  }, []); // The empty array [] ensures this runs only once when the component mounts

  // 5. Handle the loading state
  if (loading) {
    return <div>Loading activities...</div>;
  }

  // 6. Handle the empty state
  if (!activities || activities.length === 0) {
    return <div>No recent activity found.</div>;
  }

  // 7. Render the list if data exists
  return (
    <ul>
      {activities.map((activity) => (
        <li key={activity.id}>{activity.description}</li> // Use a real property from your data
      ))}
    </ul>
  );
}

export default RecentActivityList;
