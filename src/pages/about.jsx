import React from "react";
import Navigation from "../components/navigation";
import Footer from "../components/footer";
import AboutHero from "../components/about/AboutHero";
import AboutBio from "../components/about/AboutBio";
import TimelineSection from "../components/about/TimelineSection";
import ZigzagTimelineSection from "../components/about/ZigzagTimelineSection";
import AwardsSection from "../components/about/AwardsSection";
import {
  timeline,
  highlights,
  educationTimeline,
  awardsData,
} from "../data/about";

function AboutPage() {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-tr from-[#2D5D90] to-[#0D1B2A] text-white">
        <section className="relative overflow-hidden pb-16">
          <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-white/10 blur-[120px]" />
          <div className="absolute -right-10 top-32 h-80 w-80 rounded-full bg-[#1B263B] opacity-60 blur-[140px]" />

          <Navigation />

          <AboutHero />
        </section>
        <AboutBio highlights={highlights} />
        <ZigzagTimelineSection
          title="Experience timeline"
          eyebrow="Growth over time"
          items={timeline}
        />
        <TimelineSection
          title="Education"
          eyebrow="Academic Background"
          items={educationTimeline}
          offset={1}
        />
        <AwardsSection
          title="Awards & Certificates"
          eyebrow="Recognition"
          items={awardsData}
        />
      </main>
      <Footer />
    </>
  );
}

export default AboutPage;
