// Example within a React component (App.tsx)
import React, { useEffect, useState } from 'react';
import { getLegislation } from './GoogleSheetsService.ts'; // Adjust path if needed
import { LegislationData } from '../types.ts';

function Tester() {
  const [legislation, setLegislation] = useState<LegislationData[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Attempting to fetch legislation...");
        const data = await getLegislation(); // Actually CALL the function
        console.log("Fetched legislation data:", data);
        setLegislation(data);
        setError(null); // Clear previous errors
      } catch (err) {
        console.error("Error in useEffect fetching legislation:", err);
        // Set error state to display feedback to the user
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("An unknown error occurred.");
        }
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs once on mount

  // ... rest of your component rendering logic
  // You can display the legislation data or the error message
  return (
    <div>
      <h1>Legislation Data</h1>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {legislation ? (
        <ul>
          {legislation.map(item => (
            <li key={item.id}>{item.billName} - {item.status}</li>
          ))}
        </ul>
      ) : (
        !error && <p>Loading legislation...</p>
      )}
    </div>
  );
}

export default Tester;