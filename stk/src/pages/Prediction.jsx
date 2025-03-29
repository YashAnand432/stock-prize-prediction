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
      let apiURL = "https://1899-34-125-156-58.ngrok-free.app";
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
    <div className="h-screen w-full bg-gray-800 text-white py-5 px-5">
      <div className="w-full flex flex-col space-y-5">
        <form onSubmit={handleSubmit} className="mt-10 flex flex-col items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-5">
              <label className="text-sm">Stock Name:</label>
              <select
                className="bg-gray-900 text-white text-sm px-5 py-1 rounded"
                value={ticker}
                onChange={(e) => setTicker(e.target.value)}
              >
                <option value="">Ticker</option>
                <option value="TSLA">TSLA</option>
                <option value="TATA">TATA</option>
                <option value="AMZN">AMZN</option>
              </select>
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

        <div className="flex flex-row justify-center items-center">
            <div>

                {results && results.predictions && (
                    <div className="overflow-x-auto">
                    <table className="border-collapse">
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Predicted Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {results.predictions.map((prediction, index) => (
                            <tr key={index}>
                            <td className="text-center">{prediction.date}</td>
                            <td className="text-center">
                                {prediction.predicted_price.toFixed(2)}
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                ) }
            </div>
            <div>
                {results && results.graph && (
                    <div>
                    <img
                        src={`data:image/png;base64,${results.graph}`}
                        className="w-1/2 rounded-lg shadow-lg"
                        alt="stock price graph"
                    />
                    </div>
                ) }
            </div>

        </div>
      </div>
    </div>
  );
}

export default Prediction;