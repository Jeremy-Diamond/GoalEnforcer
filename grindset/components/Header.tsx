import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="flex justify-end items-center p-4 h-16">
      <SignedOut>
        <SignUpButton>
          <button className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 m-2">
            Register
          </button>
        </SignUpButton>
        <SignInButton>
          <button className="text-white hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 m-2">
            Log In
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton showName />
      </SignedIn>
    </header>
  );
}
