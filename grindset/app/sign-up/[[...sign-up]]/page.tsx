// Import the `SignUp` component from Clerk, which provides a pre-built sign-up form
import { SignUp } from "@clerk/nextjs";

// Define the `Page` component, which renders the sign-up page
export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* Render the `SignUp` component to display the sign-up form */}
      <SignUp />
    </div>
  );
}
