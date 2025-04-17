"use client"; // Indicates that this component is a client-side component

// Import necessary hooks and utilities
import { addDays, format, parseISO } from "date-fns"; // For date manipulation and formatting
import { useRouter, useSearchParams } from "next/navigation"; // For navigation and query parameter handling
import { useState } from "react"; // For managing component state

// Define the `DateNav` component, which provides navigation for selecting dates
export default function DateNav() {
  const router = useRouter(); // Hook for programmatic navigation
  const searchParams = useSearchParams(); // Hook for accessing query parameters
  const rawDate = searchParams.get("date"); // Get the `date` parameter from the query string
  const baseDate = rawDate ? parseISO(rawDate) : new Date(); // Parse the date or default to today's date

  // State to manage the visibility of the calendar
  const [showCalendar, setShowCalendar] = useState(false);
  // State to manage the currently selected date
  const [selectedDate, setSelectedDate] = useState(
    format(baseDate, "yyyy-MM-dd")
  );

  // Format the base date for display
  const formattedDate = format(baseDate, "yyyy-MM-dd");

  // Handle navigation to the previous or next date
  const handleNavigate = (delta: number) => {
    const newDate = format(addDays(baseDate, delta), "yyyy-MM-dd"); // Calculate the new date
    setSelectedDate(newDate); // Update the local state with the new date
    router.push(`/goals?date=${newDate}`); // Navigate to the new date
  };

  // Handle changes to the date input field
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = event.target.value; // Get the new date from the input field
    setSelectedDate(newDate); // Update the local state with the new date
    router.push(`/goals?date=${newDate}`); // Navigate to the new date
    setShowCalendar(false); // Close the calendar after selecting a date
  };

  // Toggle the visibility of the calendar
  const handleDateClick = () => {
    setShowCalendar(!showCalendar); // Toggle the `showCalendar` state
  };

  return (
    <div className="flex items-center justify-center gap-4 py-4 text-white">
      {/* Button to navigate to the previous date */}
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
          {formattedDate} {/* Display the currently selected date */}
        </button>

        {/* Calendar input field for selecting a date */}
        {showCalendar && (
          <input
            title="selectedDate"
            type="date"
            value={selectedDate} // Bind the input value to the selected date
            onChange={handleDateChange} // Handle changes to the input field
            className="absolute top-10 left-0 bg-white border rounded p-2"
            autoFocus // Automatically focus the input field when it appears
          />
        )}
      </div>

      {/* Button to navigate to the next date */}
      <button
        onClick={() => handleNavigate(1)}
        className="px-4 py-2 border border-gray-500 rounded hover:bg-gray-700"
      >
        Next ➡
      </button>
    </div>
  );
}
