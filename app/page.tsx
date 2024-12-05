"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "/Users/dad/amplify_test/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { useRouter } from 'next/router'; // Import for routing
import React from "react";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  const [events, setEvents] = useState<Array<Schema["Event"]["type"]>>([]);
  
  function listEvents() {
    client.models.Event.observeQuery().subscribe({
      next: (data) => setEvents([...data.items]),
    });
  }

  function deleteEvent(id: string) {
    client.models.Event.delete({ id });
  }

  useEffect(() => {
    listEvents();
  }, []);

  function createEvent() {
    <button onClick={() => window.location.href = '/addevent'}>Add Event</button>
  }

  // ... (your filtering logic here)

  return (
    <main>
      <h1>My Events</h1>
      <button onClick={createEvent}>+ Add Event</button>
      {/* ... (your filtering UI elements here) */}
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            {event.title}
            <button onClick={() => deleteEvent(event.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {/* ... (rest of your component) */}
    </main>
  );
}