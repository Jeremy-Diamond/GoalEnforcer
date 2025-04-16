// Import components from Clerk for authentication
import {
  SignedIn, // Component to conditionally render content when the user is signed in
  SignedOut, // Component to conditionally render content when the user is signed out
  SignInButton, // Button to trigger the sign-in flow
  SignUpButton, // Button to trigger the sign-up flow
  UserButton, // Component to display the user profile button
} from "@clerk/nextjs";

// Define the `Header` component
export default function Header() {
  return (
    <header className="flex justify-end items-center p-4 h-16">
      {/* Render content for signed-out users */}
      <SignedOut>
        {/* Sign-up button */}
        <SignUpButton>
          <button className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 m-2">
            Register
          </button>
        </SignUpButton>
        {/* Sign-in button */}
        <SignInButton>
          <button className="text-white hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 m-2">
            Log In
          </button>
        </SignInButton>
      </SignedOut>

      {/* Render content for signed-in users */}
      <SignedIn>
        {/* User profile button */}
        <UserButton showName />{" "}
        {/* Displays the user's profile picture and name */}
      </SignedIn>
    </header>
  );
}
