import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import gsap from "gsap";
import Hero from "./components/Hero.jsx";
import Works from "./components/Works.jsx";
import AllWorks from "./components/AllWorks.jsx";
import AboutMe from "./components/AboutMe.jsx";
import Story from "./components/Story.jsx";
import Experience from "./components/Experience.jsx";
import Stack from "./components/Stack.jsx";
import Certifications from "./components/Certifications.jsx";
import Footer from "./components/Footer.jsx";
import ErrorPage from "./components/ErrorPage.jsx";

function SmoothScroll() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    gsap.to(window, { scrollTo: { y: 0, autoKill: false }, duration: 0.8, ease: "power3.out" });
  }, [location.pathname]);

  // Smooth scroll for anchor links
  useEffect(() => {
    const handleClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        gsap.to(window, { scrollTo: { y: target, offsetY: 80, autoKill: true }, duration: 1, ease: "power3.inOut" });
        history.pushState(null, '', href);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}

function Home() {
  return (
    <div className="overflow-x-hidden bg-white font-mono text-black">
      <Hero />
      <Works />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <SmoothScroll />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/works" element={<AllWorks />} />
        <Route path="/me" element={<AboutMe />} />
        <Route path="/story" element={<Story />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/stack" element={<Stack />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
