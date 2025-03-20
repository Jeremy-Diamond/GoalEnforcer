'use client';

import { useState } from 'react';
import { createGoal } from '../lib/actions';

export default function CreateGoal() {
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
    console.log("Form submitted with title:", title, "and description:", description);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    await createGoal(formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </label>
      <label>
        Description:
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </label>
      <button type="submit">Create Goal</button>
    </form>
  );
}