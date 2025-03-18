//import { useRouter } from "next/router";
import Link from 'next/link';
import Image from "next/image";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    {/* //<div className="flex justify-items-center items-center min-h-screen"> */}
      {/* <Header /> */}
      <main className="flex flex-col gap-[32px] row-start-2 items-center ">
        <div className="flex justify-center">
          
          
        </div>
        <p>Welcome to <b>GrindSet</b>!</p>
        <p>Let's get to grindin' out those Goals!</p>
        {/* <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none">Grind</button> */}
        {/* <button 
          type="button"
          // onClick={() => router.push("/goals")} 
          
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          >
            Grind
        </button> */}
        <Link className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" href="/goals">Start Grind</Link>
        
        
          
        
        
      </main>
      {/* <Footer /> */}
    </div>
  );
}
