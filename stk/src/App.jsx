import { useState } from 'react'
import bgImage from "./assets/6256878.jpg";
import axios from 'axios';
import './App.css'

function App() {
  const [ticker, setTicker] = useState("");
  const [days, setDays] = useState("");
  const [apiURL , setApiURL] = useState("");
  const [loading , setLoading] = useState(false);
  const [error , setError] = useState("");
  const [results, setResults] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    // if(!apiURL){
    //   setError("URL needed to connect to backend");
    // }
    if(!ticker){
      setError("Ticker invalid. Please enter a valid ticker");
      return;
    }
    if(!days){
      setError("Number of days needed to predict.");
      return;
    }

    setLoading(true);
    setError('');
    setResults(null);

    try {
      let apiURL = "https://8724-34-106-228-74.ngrok-free.app";

      const baseURL = apiURL.endsWith('/') ? apiURL.slice(0,-1) : apiURL;

      const response = await axios.post(`${baseURL}/predict`, {
        ticker : ticker.toUpperCase(),
        days : parseInt(days),
      })
      
      setResults(response.data);

    } catch (error) {
        console.log("Error fetching results. " , error);
        setError(error.response?.data?.error || "Failed to get prediction");
    } finally{
      setLoading(false);
    }

  };

  return (
    <div className='min-h-screen bg-black w-screen relative'>
      <div className="absolute top-0 left-0 h-screen w-full bg-cover bg-center" style={{ backgroundImage:  `url(${bgImage})` }}></div>
      
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
                value={ticker}
                onChange={(e) => setTicker(e.target.value)}
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
            <button type="submit" disabled={loading} className="bg-gray-800 w-full px-30 py-2 text-white text-sm rounded hover:border hover:border-white">
              {loading ? "Predicting Stock Prizes" :  "Predict"}
            </button>
          </div>
        </form>

        {/* results section */}
        {results && (
          <div className='w-full flex flex-col items-center justify-center'>
            {/* name of the stock */}
            <h2 className='text-2xl'>{results?.ticker}</h2>
            {/* graph */}
            <div>
              <img src={`data:image/png;base64,${results.graph}`} className='w-1/2 rounded-lg shadow-lg' alt="stock prize graph" />
            </div>

            {/* table */}
            <div className='overflow-x-auto'>
              <table className='border-collapse'>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Predicted Prize</th>
                  </tr>
                </thead>
                <tbody>
                  {results.predictions.map((prediction, index) => (
                    <tr key={index}>
                      <td className='text-center'>{prediction.date}</td>
                      <td className='text-center'>{prediction.predicted_price.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App;
