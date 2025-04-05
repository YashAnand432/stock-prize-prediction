import React, { useState } from "react";
import axios from "axios";

function Prediction() {
  const [ticker, setTicker] = useState("");
  const [days, setDays] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ticker) {
      setError("Ticker invalid. Please enter a valid ticker");
      return;
    }
    if (!days) {
      setError("Number of days needed to predict.");
      return;
    }

    setLoading(true);
    setError("");
    setResults(null);

    try {
      let apiURL = "https://18b6-34-27-163-127.ngrok-free.app";
      const baseURL = apiURL.endsWith("/") ? apiURL.slice(0, -1) : apiURL;

      const response = await axios.post(`${baseURL}/predict`, {
        ticker: ticker.toUpperCase(),
        days: parseInt(days),
      });

      setResults(response.data);
    } catch (error) {
      console.log("Error fetching results. ", error);
      setError(error.response?.data?.error || "Failed to get prediction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-800 text-white py-5 px-5">
      <div className="w-full flex flex-col space-y-5">
        <form
          onSubmit={handleSubmit}
          className="mt-10 flex flex-col items-center"
        >
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-5">
              <label className="text-sm">Stock Name:</label>
              {/* <select
                className="bg-gray-900 text-white text-sm px-5 py-1 rounded"
                value={ticker}
                onChange={(e) => setTicker(e.target.value)}
              >
                <option value="">Ticker</option>
                <option value="TSLA">TSLA</option>
                <option value="TATA">TATA</option>
                <option value="AMZN">AMZN</option>
              </select> */}
              <input type="text" className="text-white bg-gray-900 px-2 py-1 rounded" value={ticker} onChange={(e)=>setTicker(e.target.value)} />
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-sm">Days:</label>
              <input
                type="number"
                className="bg-gray-900 text-white text-sm px-3 py-1 rounded w-16"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                min="1"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-gray-900 px-10 py-1 text-white text-sm rounded hover:border hover:border-white"
            >
              {loading ? "Predicting..." : "Predict"}
            </button>
          </div>
        </form>

        {error && <p className="text-red-500">{error}</p>}

        <div className="flex flex-col md:flex-row justify-center items-start space-y-5 md:space-y-0 md:space-x-10 mt-10">
          <div className="flex justify-center w-full">
            {results && results.predictions && (
              <div className="overflow-x-auto">
                <table className="border-collapse text-white">
                  <thead>
                    <tr>
                      <th className=" shadow-xl px-4 py-2">Date</th>
                      <th className="shadow-xl px-4 py-2">Predicted Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.predictions.map((prediction, index) => (
                      <tr key={index}>
                        <td className="shadow-md text-center px-4 py-2">
                          {prediction.date}
                        </td>
                        <td className="shadow-md text-center px-4 py-2">
                          {prediction.predicted_price.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="flex justify-center w-full">
            {results && results.graph && (
              <img
                src={`data:image/png;base64,${results.graph}`}
                className="w-100 h-auto rounded-lg shadow-lg"
                alt="stock price graph"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Prediction;
