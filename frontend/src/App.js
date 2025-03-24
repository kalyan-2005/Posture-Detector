import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home/Home";
import Yoga from "./pages/Yoga/Yoga";
import Gemini from "./pages/Query/Gemini";

import "./App.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/start" element={<Yoga />} />
        <Route path="/bot" element={<Gemini />} />
      </Routes>
    </Router>
  );
}
