"use client";

import { useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource.js";
import { useRouter } from 'next/router';
import React from "react";

const client = generateClient<Schema>();

export default function AddEvent() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date()); // Add end date
  const router = useRouter();

  async function handleSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault();
    try {
    await client.models.Event.create({
      title,
      description,
      startDate: startDate.toISOString(), // Convert to ISO string
      endDate: endDate.toISOString(),
    });
    router.push('/');
    console.log('Event created successfully!');
    } catch (error) {
      console.error('Error creating event:', error);
      // Handle the error, e.g., display an error message to the user
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} 
 />
      </div>
      <div>
        <label htmlFor="description">Description:</label> 

        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label htmlFor="startDate">Start Date:</label>
        <input type="date" id="startDate" value={startDate.toISOString().split('T')[0]} onChange={(e) => setStartDate(new Date(e.target.value))}   
 />
      </div>
      <div>
        <label htmlFor="endDate">End Date:</label>
        <input type="date" id="endDate" value={endDate.toISOString().split('T')[0]} onChange={(e) => setEndDate(new Date(e.target.value))}   
 />
      </div>
      <button type="submit">Create Event</button>
    </form>
  );
}