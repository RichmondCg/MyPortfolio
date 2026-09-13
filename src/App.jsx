import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import gsap from "gsap";
import Lenis from "lenis";
import Hero from "./components/Hero.jsx";
import Works from "./components/Works.jsx";
import AllWorks from "./components/AllWorks.jsx";
import AboutMe from "./components/AboutMe.jsx";
import Story from "./components/Story.jsx";
import Experience from "./components/Experience.jsx";
import Stack from "./components/Stack.jsx";
import Certifications from "./components/Certifications.jsx";
import Footer from "./components/Footer.jsx";
import CoreSkills from "./components/CoreSkills.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import { ProjectDetailPage } from "./components/ProjectDetail.jsx";
import { projects } from "./data/projects.js";

function SmoothScroll() {
  const location = useLocation();

  // Keep native wheel and touch scrolling eased across every route.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      syncTouch: true,
    });

    let animationFrame;
    const raf = (time) => {
      lenis.raf(time);
      animationFrame = requestAnimationFrame(raf);
    };

    animationFrame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrame);
      lenis.destroy();
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Smooth scroll for anchor links
  useEffect(() => {
    const handleClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        gsap.to(window, {
          scrollTo: { y: target, offsetY: 80, autoKill: true },
          duration: 1,
          ease: "power3.inOut",
        });
        history.pushState(null, "", href);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}

function RouteMetadata() {
  const location = useLocation();

  useEffect(() => {
    const metadata = {
      "/": {
        title: "Richmond Gillaco | Full-stack Web Developer",
        description:
          "The portfolio of Richmond Gillaco, a full-stack web developer creating practical digital solutions and engaging web experiences for businesses.",
      },
      "/works": {
        title: "Selected Works | Richmond Gillaco",
        description:
          "Explore selected web development, UI/UX, full-stack, and automation projects by Richmond Gillaco.",
      },
      "/me": {
        title: "About Richmond Gillaco | Full-stack Web Developer",
        description:
          "Learn about Richmond Gillaco's approach to full-stack development, interaction design, and AI-assisted web development.",
      },
      "/story": {
        title: "The Story | Richmond Gillaco",
        description:
          "Follow Richmond Gillaco's journey from learning HTML and CSS to building full-stack digital products.",
      },
      "/experience": {
        title: "Experience | Richmond Gillaco",
        description:
          "Review Richmond Gillaco's experience in web development, software development, IoT, and technical projects.",
      },
      "/stack": {
        title: "Technology Stack | Richmond Gillaco",
        description:
          "See the frameworks, tools, databases, and platforms Richmond Gillaco uses to build digital products.",
      },
      "/certifications": {
        title: "Certifications and Awards | Richmond Gillaco",
        description:
          "View Richmond Gillaco's professional certifications, academic distinctions, and technology competition awards.",
      },
    };
    const projectMatch = location.pathname.match(/^\/works\/([^/]+)$/);
    const project = projectMatch
      ? projects.find((item) => item.id === projectMatch[1])
      : undefined;
    const route = project
      ? {
          title: `${project.title} | Richmond Gillaco`,
          description: `${project.tagline}. View the ${project.title} case study by Richmond Gillaco.`,
        }
      : metadata[location.pathname] || metadata["/"];
    const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");
    const canonicalPath =
      location.pathname === "/"
        ? `${baseUrl}/`
        : `${baseUrl}${location.pathname}`;
    const canonicalUrl = `${window.location.origin}${canonicalPath}`;

    document.title = route.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", route.description);
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute("href", canonicalUrl);
    document
      .querySelector('meta[property="og:url"]')
      ?.setAttribute("content", canonicalUrl);
  }, [location.pathname]);

  return null;
}

function Home() {
  return (
    <div className="overflow-x-hidden bg-white font-mono text-black">
      <Hero />
      <Works />
      {/* <Testimonials /> */}
      <CoreSkills />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter basename="/MyPortfolio">
      <SmoothScroll />
      <RouteMetadata />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/works" element={<AllWorks />} />
        <Route path="/works/:projectId" element={<ProjectDetailPage />} />
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
