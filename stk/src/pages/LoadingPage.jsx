import React from 'react';
import buffet from "../assets/warren_buffet.jpg";

function LoadingPage() {
  return (
    <div className="bg-black h-screen text-white flex items-center justify-center">
      <div className="flex flex-row items-center justify-center space-x-10">
        
        {/* Quote & Name Container */}
        <div className="flex flex-col items-end w-1/2 text-right">
          <p className="text-lg italic">"Stock market is a tool to transfer money from the impatient to the patient."</p>
          <p className="mt-2 font-semibold text-orange-400">- Warren Buffett</p>
        </div>
        
        {/* Image Container */}
        <div className="border border-orange-400 rounded-full p-1">
          <img src={buffet} alt="Warren Buffett" className="h-24 w-24 rounded-full" />
        </div>

      </div>
    </div>
  );
}

export default LoadingPage;
