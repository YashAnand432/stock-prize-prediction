import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import bgImage from "./assets/6256878.jpg";
import Home from "./pages/Home.jsx";
// import Prediction from "./pages/Prediction.jsx";
import axios from 'axios';
import './App.css'
import Prediction from './pages/Prediction.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/prediction' element={<Prediction />} />
      </Routes>
    </Router>
  )
}

export default App;
