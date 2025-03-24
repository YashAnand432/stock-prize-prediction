import { useState } from 'react'
import bgImage from "./assets/6256878.jpg"
import './App.css'

function App() {
  const [stock, setStock] = useState("");
  const [days, setDays] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected Stock:", stock);
    console.log("Number of Days:", days);
  };

  return (
    <div className='h-screen w-screen relative'>
      <div className="absolute top-0 left-0 h-full w-full bg-cover bg-center" style={{ backgroundImage:  `url(${bgImage})` }}></div>
      
      {/* Overlay */}
      <div className="absolute top-0 left-0 h-full w-full bg-black opacity-50"></div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col text-white text-3xl font-bold py-40 items-center h-full">
        <h1 className='text-5xl'>Stock Expert</h1>
        <h3 className='text-2xl text-gray-300 mt-2'>Your one-stop solution for stock-related queries.</h3>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-10 flex flex-col items-center">
          {/* Stock Selection & Days Input (Same Row) */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm">Stock Name:</label>
              <select 
                className="bg-gray-800 text-white text-sm px-3 py-1 rounded"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              >
                <option value="">Select</option>
                <option value="TSLA">TSLA</option>
                <option value="TATA">TATA</option>
                <option value="AMZN">AMZN</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-sm">Days:</label>
              <input 
                type="number"
                className="bg-gray-800 text-white text-sm px-3 py-1 rounded w-16"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                min="1"
              />
            </div>
          </div>

          {/* Submit Button (Next Line) */}
          <div className="mt-4">
            <button type="submit" className="bg-gray-800 w-full px-30 py-2 text-white text-sm rounded hover:border hover:border-white">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default App;
