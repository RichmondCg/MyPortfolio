import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router";
import Navigation from "../components/navigation";
import Hero from "../components/landing/hero";
import About from "../components/landing/about";
import Approach from "../components/landing/approach";
import Why from "../components/landing/why";
import Cta from "../components/cta";
import Footer from "../components/footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function LandingPage() {
  const location = useLocation();
  const mainRef = useRef(null);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => element.scrollIntoView({ behavior: "smooth" }), 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(".recede");

      sections.forEach((sec) => {
        gsap.fromTo(
          sec,
          { scale: 1 },
          {
            scale: 0.8,
            ease: "none",
            scrollTrigger: {
              trigger: sec,
              start: "top top",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef}>
      <div className="recede origin-top w-full">
        <Hero />
      </div>
      <div className="recede origin-top w-full">
        <About />
      </div>
      <div className="w-full">
        <Approach />
      </div>
      <div className="w-full">
        <Why />
      </div>
      <div className="w-full">
        <Cta />
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </main>
  );
}

export default LandingPage;
