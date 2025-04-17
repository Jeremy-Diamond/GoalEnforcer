// Define the `Subtask` component, which displays a single subtask
export default function Subtask({ tt }: { tt: string }) {
  return (
    <div>
      {/* Render the subtask title inside a styled paragraph */}
      <p className="border-2 border-solid p-4 rounded-md border-gray-500 mb-4 hover:bg-[#2A2D3E]">
        {tt} {/* Display the subtask title passed as a prop */}
      </p>
    </div>
  );
}
