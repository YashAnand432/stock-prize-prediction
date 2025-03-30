import React, { useEffect } from 'react'
import axios from 'axios';
import { useState } from 'react';
import bgImage from "../assets/6256878.jpg";
import LoadingPage from './LoadingPage';
import { useNavigate } from 'react-router-dom';

function Home() {
  
    const [ticker, setTicker] = useState("");
    const [days, setDays] = useState("");
    const [apiURL , setApiURL] = useState("");
    const [loading , setLoading] = useState(false);
    const [error , setError] = useState("");
    const [results, setResults] = useState(null);
    const [showLoading, setShowLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
      setTimeout(() => {
        setShowLoading(false);
      } , 2500);
    } , []);
  
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
        let apiURL = "https://1899-34-125-156-58.ngrok-free.app";
  
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

    if(showLoading){
      return (
        <LoadingPage />
      )
    }
  
    return (
      <div className='min-h-screen bg-black w-screen relative'>
        <div className="absolute top-0 left-0 h-screen w-full bg-cover bg-center" style={{ backgroundImage:  `url(${bgImage})` }}></div>
        
        {/* Overlay */}
        <div className="absolute top-0 left-0 h-full w-full bg-black opacity-50"></div>
  
        {/* Content Layer */}
        <div className="relative z-10 flex flex-col text-white text-3xl font-bold py-40 items-center h-full">
          <h1 className='text-5xl'>Stock Expert</h1>
          <h3 className='text-2xl text-gray-300 mt-2'>Your one-stop solution for stock-related queries.</h3>

          <button onClick={() => navigate('/prediction')} className='rounded-3xl hover:cursor-pointer py-2 px-5 my-10  text-xl bg-blue-800'>Get Started</button>
        </div>
      </div>
    )
}

export default Home
