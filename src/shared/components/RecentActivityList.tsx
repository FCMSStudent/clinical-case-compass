import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Activity {
  id: string;
  description: string;
  created_at: string;
}

function RecentActivityList() {
  // 1. Initialize state with an empty array
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getActivities() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('activities')
          .select('*') // Select all columns
          .limit(10); // Optionally limit the results

        if (error) {
          // 3. This will show an error in the console if the request fails
          console.error('Supabase error:', error.message);
          return;
        }

        // Assuming 'data' is an array of activities, update the state
        // You might want to add a check for 'data' being null or undefined
        if (data) {
          setActivities(data as Activity[]);
        } else {
          setActivities([]);
        }

      } catch (error) {
        console.error('Unexpected error fetching activities:', error);
      } finally {
        setLoading(false);
      }
    }

    getActivities();
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) {
    return <div>Loading activities...</div>;
  }

  return (
    <div>
      <h2>Recent Activity</h2>
      {activities.length === 0 ? (
        <p>No recent activity found.</p>
      ) : (
        <ul>
          {/* You'll need to adjust how you render each activity based on your 'activities' table schema.
            For example, if each activity has a 'description' and 'timestamp' column:
          */}
          {activities.map((activity: Activity) => (
            <li key={activity.id}> {/* Assuming each activity has a unique 'id' */}
              {/* Replace with your actual activity data fields */}
              {activity.description} - {new Date(activity.created_at).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RecentActivityList;
