import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import AboutPage from "./pages/about";
import Projects from "./pages/projects";
import SingleProject from "./pages/singleProject";
import "../src/App.css";
function App() {
  return (
    <BrowserRouter basename="/MyPortfolio/">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<SingleProject />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
