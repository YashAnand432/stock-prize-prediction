import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import bgImage from "../assets/6256878.jpg";
import LoadingPage from "./LoadingPage";

// Custom Hook for Typewriter Effect
const useTypewriter = (text, speed) => {
    const [displayText, setDisplayText] = useState("");

    useEffect(() => {
        setDisplayText(""); // Reset text on refresh or text change
        let i = 0;

        const typingInterval = setInterval(() => {
            if (i < text.length) {
                setDisplayText((prevText) => prevText + text.charAt(i));
                i++;
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
    const typedText = useTypewriter("Stock Expert", 150); // Using the custom hook
    const navigate = useNavigate();
    const aboutSectionRef = useRef(null);

    // Simulate loading screen
    useEffect(() => {
        setTimeout(() => {
            setShowLoading(false);
        }, 2500);
    }, []);

    // Scroll to "About Us" section
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
                    {/* Typewriter Effect */}
                    <h1 className="text-5xl font-bold">{typedText}</h1>

                    {/* Fade-in Effect for Subheading */}
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
                        className="mt-10 px-6 py-3 bg-blue-800 rounded-3xl text-xl hover:bg-blue-700 transition"
                    >
                        Get Started
                    </button>
                </div>
            </div>

            {/* "What we do?" Button - Bottom Right */}
            <button
                onClick={scrollToAboutSection}
                className="fixed bottom-5 right-5 bg-orange-500 text-white py-3 px-5 rounded-full text-lg shadow-lg hover:bg-orange-600 transition"
            >
                What we do?
            </button>

            {/* "About Us" Section */}
            <div
                ref={aboutSectionRef}
                className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-7"
            >
                <h2 className="text-4xl font-bold mb-8">About Us</h2>
                <p className="text-xl max-w-3xl text-center">
                    At Stock Expert, we provide accurate and data-driven predictions for stock market trends.
                    Our platform leverages advanced algorithms to help investors make informed decisions.
                    Whether you're a beginner or a seasoned trader, we offer insights that can improve your
                    investment strategies.
                </p>
            </div>
        </div>
    );
}

export default Home;
