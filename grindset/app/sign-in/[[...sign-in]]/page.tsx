// Import the `SignIn` component from Clerk, which provides a pre-built sign-in form
import { SignIn } from "@clerk/nextjs";

// Define the `Page` component, which renders the sign-in page
export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* Render the `SignIn` component to display the sign-in form */}
      <SignIn />
    </div>
  );
}
