import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from "../assets/6256878.jpg";
import LoadingPage from './LoadingPage';

function Home() {
    const [showLoading, setShowLoading] = useState(true);
    const navigate = useNavigate();
    const aboutSectionRef = useRef(null); // Reference for the "About Us" section

    useEffect(() => {
        setTimeout(() => {
            setShowLoading(false);
        }, 2500);
    }, []);

    const scrollToAboutSection = () => {
        if (aboutSectionRef.current) {
            window.scrollTo({
                top: aboutSectionRef.current.offsetTop,
                behavior: 'smooth',
            });
        }
    };

    if (showLoading) {
        return <LoadingPage />;
    }

    return (
        <div className='w-screen bg-black'>
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
                    <h1 className='text-5xl font-bold'>Stock Expert</h1>
                    <h3 className='text-2xl text-gray-300 mt-2'>Your one-stop solution for stock-related queries.</h3>

                    <button
                        onClick={() => navigate('/prediction')}
                        className='mt-10 px-6 py-3 bg-blue-800 rounded-3xl text-xl hover:bg-blue-700 transition'
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
            <div ref={aboutSectionRef} className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-7">
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
