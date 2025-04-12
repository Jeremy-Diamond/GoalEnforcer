"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { format, addDays, parseISO } from "date-fns";
import { useState } from "react";

export default function DateNav() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawDate = searchParams.get("date");
  const baseDate = rawDate ? parseISO(rawDate) : new Date();

  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(format(baseDate, "yyyy-MM-dd"));

  // Format the date for display
  const formattedDate = format(baseDate, "yyyy-MM-dd");

  const handleNavigate = (delta: number) => {
    const newDate = format(addDays(baseDate, delta), "yyyy-MM-dd");
    setSelectedDate(newDate); // Update local state
    router.push(`/goals?date=${newDate}`);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = event.target.value;
    setSelectedDate(newDate);
    router.push(`/goals?date=${newDate}`);
    setShowCalendar(false); // Close the calendar after date selection
  };

  const handleDateClick = () => {
    setShowCalendar(!showCalendar); // Toggle the calendar
  };

  return (
    <div className="flex items-center justify-center gap-4 py-4 text-white">
      <button
        onClick={() => handleNavigate(-1)}
        className="px-4 py-2 border border-gray-500 rounded hover:bg-gray-700"
      >
        ⬅ Prev
      </button>
      
      {/* Date Button that lets you toggle the calendar */}
      <div className="relative">
        <button
          onClick={handleDateClick}
          className="px-4 py-2 border border-gray-500 rounded hover:bg-gray-700"
        >
          {formattedDate}
        </button>
        
        {showCalendar && (
          <input
            title="selectedDate"
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="absolute top-10 left-0 bg-white border rounded p-2"
            autoFocus
          />
        )}
      </div>

      <button
        onClick={() => handleNavigate(1)}
        className="px-4 py-2 border border-gray-500 rounded hover:bg-gray-700"
      >
        Next ➡
      </button>
    </div>
  );
}
