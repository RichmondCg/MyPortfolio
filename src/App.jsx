import React from "react";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import AboutPage from "./pages/about";
import Projects from "./pages/projects";
import "../src/App.css";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
