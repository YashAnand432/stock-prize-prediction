import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import bgImage from "../assets/6256878.jpg";
import LoadingPage from "./LoadingPage";

// Custom Hook for Typewriter Effect
const useTypewriter = (text, speed) => {
  const [displayText, setDisplayText] = useState("");
  const indexRef = useRef(0);

  useEffect(() => {
    setDisplayText("");
    indexRef.current = 0;

    const typingInterval = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayText((prevText) => prevText + text.charAt(indexRef.current));
        indexRef.current += 1;
      } else {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => {
      clearInterval(typingInterval);
    };
  }, [text, speed]);

  return displayText;
};

function Home() {
  const [showLoading, setShowLoading] = useState(true);
  const [startTyping, setStartTyping] = useState(false);
  const typedText = useTypewriter(startTyping ? "Sttock Expert" : "", 150);
  const navigate = useNavigate();
  const aboutSectionRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setShowLoading(false);
      setStartTyping(true);
    }, 2500);
  }, []);

  const scrollToAboutSection = () => {
    if (aboutSectionRef.current) {
      window.scrollTo({
        top: aboutSectionRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  };

  if (showLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="w-screen bg-black">
      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col items-center justify-center text-white">
        {/* Background Image */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        ></div>

        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-5xl font-bold">{typedText}</h1>

          <motion.h3
            className="text-2xl text-gray-300 mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 1 }}
          >
            Your one-stop solution for stock-related queries.
          </motion.h3>

          <button
  onClick={() => navigate("/prediction")}
  className="mt-10 relative overflow-hidden group px-6 py-3 rounded-3xl text-xl bg-blue-800 shadow-lg transition-all duration-300"
>
  <div className="absolute inset-0 w-0 bg-white transition-all duration-300 group-hover:w-full rounded-3xl"></div>
  <span className="relative z-10 text-white group-hover:text-blue-800 transition-colors">
    Get Started
  </span>
</button>

        </div>

        {/* "What we do?" Button - Bottom Right */}
        <button
          onClick={scrollToAboutSection}
          className="absolute bottom-8 right-8 bg-orange-500 text-white py-3 px-5 rounded-full text-lg shadow-lg overflow-hidden group transition-all duration-300"
        >
          <div className="absolute inset-0 w-0 bg-white transition-all duration-300 group-hover:w-full"></div>
          <span className="relative z-10 group-hover:text-orange-600 transition-colors">
            What we do?
          </span>
        </button>
      </div>

      {/* About Section */}
      <div
        ref={aboutSectionRef}
        className="relative min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-7 overflow-hidden"
      >
        {/* Red tint overlay */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-red-500 to-transparent opacity-[15%] pointer-events-none z-0"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center">
          <h2 className="text-4xl font-bold mb-8">About Us</h2>
          <p className="text-xl max-w-3xl text-center">
            At Stock Expert, we provide accurate and data-driven predictions for stock market trends.
            Our platform leverages advanced algorithms to help investors make informed decisions.
            Whether you're a beginner or a seasoned trader, we offer insights that can improve your
            investment strategies.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
