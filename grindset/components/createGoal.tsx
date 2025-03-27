'use client';

import { useState } from 'react';
import { createGoal } from '../lib/actions';
import { useUser } from '@clerk/nextjs'



export default function CreateGoal() {
  const user = useUser();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  interface FormElements extends HTMLFormControlsCollection {
    title: HTMLInputElement;
    description: HTMLTextAreaElement;
  }

  interface GoalFormElement extends HTMLFormElement {
    readonly elements: FormElements;
  }

  async function handleSubmit(event: React.FormEvent<GoalFormElement>) {
    event.preventDefault();
    //console.log("Form submitted with title:", title, "and description:", description);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('userId', user.user?.id || '');
    formData.append('startDate', new Date().toISOString());
    formData.append('endDate', new Date().toISOString());
    formData.append('completed', 'false');
    createGoal(formData);
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">
            Title:
          </label>
          <input
            type="text"
            title="Title"
            placeholder="Enter the title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="w-full p-2 text-gray-900 rounded-md border border-gray-600 placeholder-gray-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">
            Description:
          </label>
          <textarea
            title="Description"
            placeholder="Enter the description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="w-full p-2 text-gray-900 rounded-md border border-gray-600 placeholder-gray-500"
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Create Goal
        </button>
      </form>
    </div>
  );
}