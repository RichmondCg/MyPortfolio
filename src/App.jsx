import { BrowserRouter, Routes, Route } from "react-router-dom";
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
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
