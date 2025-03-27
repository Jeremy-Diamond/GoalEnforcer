import { SignUpButton } from "@clerk/nextjs";
//import Link from "next/link";
export default function Home() {
  return (
    <div className="flex flex-col md:flex-row md:justify-center items-center gap-[64px] m-4 md:h-[calc(100dvh-96px)]">
        <div className="flex flex-col items-center text-center md:text-left">
          <h2 className="text-4xl ">
            <b>Set Goals. Track Progress. Achieve More.</b>
          </h2>
          <p className="mt-4 mb-4">GrindSet helps you define clear goals, track your progress, and stay motivated to achieve your dreams.</p>
          <SignUpButton>
            <button className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4">
              Start Now
            </button>
          </SignUpButton>
        </div>
        <div className="flex items-start bg-gray-700 p-8 rounded-lg">
          <div className="bg-gray-950 p-5 rounded-lg">
            <div className="mb-2">
              <b>My Goal Dashboard</b>
            </div>
            <div className="flex flex-col gap-[32px] row-start-2">
              <p className="border-2 border-solid p-4 rounded-md border-gray-500">Complete Next.js project</p>
              <p className="border-2 border-solid p-4 rounded-md border-gray-500">Run 5miles three times a week</p>
              <p className="border-2 border-solid p-4 rounded-md border-gray-500">Read 2 books this month</p>
              <p className="border-2 border-solid p-4 rounded-md border-gray-500">Launch side project</p>
            </div>
          </div>
        </div>
    </div>
  );
}
