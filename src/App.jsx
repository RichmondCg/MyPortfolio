import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import AboutPage from "./pages/about";
import Projects from "./pages/projects";
import SingleProject from "./pages/singleProject";
import BootLoader from "./components/BootLoader";
import RouteLoader from "./components/RouteLoader";
import ScrollToTop from "./components/ScrollToTop";
import useBootLoader from "./hooks/useBootLoader";
import "../src/App.css";
function App() {
  const { showLoader, isExiting } = useBootLoader({
    delayMs: 1200,
    exitMs: 400,
  });

  return (
    <>
      {showLoader && <BootLoader isExiting={isExiting} />}
      <BrowserRouter basename="/MyPortfolio/">
        <ScrollToTop />
        <RouteLoader />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<SingleProject />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
