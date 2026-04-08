import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import AboutPage from "./pages/about";
import Projects from "./pages/projects";
import SingleProject from "./pages/singleProject";
import BootLoader from "./components/BootLoader";
import RouteLoader from "./components/RouteLoader";
import ScrollToTop from "./components/ScrollToTop";
import "../src/App.css";
function App() {
  const [showLoader, setShowLoader] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const waitForImages = () => {
      const images = Array.from(document.images || []).filter(
        (img) => img.loading !== "lazy",
      );
      if (images.length === 0) return Promise.resolve();

      return Promise.all(
        images.map((img) => {
          if (img.complete) return Promise.resolve();

          return new Promise((resolve) => {
            const done = () => resolve();
            img.addEventListener("load", done, { once: true });
            img.addEventListener("error", done, { once: true });
          });
        }),
      );
    };

    const startExit = () => {
      if (isCancelled) return;
      setIsExiting(true);
      setTimeout(() => {
        if (!isCancelled) setShowLoader(false);
      }, 400);
    };

    const handleReady = () => {
      waitForImages().then(startExit);
    };

    if (document.readyState === "complete") {
      handleReady();
    } else {
      window.addEventListener("load", handleReady, { once: true });
    }

    return () => {
      isCancelled = true;
      window.removeEventListener("load", handleReady);
    };
  }, []);

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
