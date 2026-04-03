import React from "react";
import Navigation from "../components/navigation";
import Footer from "../components/footer";
import AboutHero from "../components/about/AboutHero";
import AboutBio from "../components/about/AboutBio";
import TimelineSection from "../components/about/TimelineSection";
import ZigzagTimelineSection from "../components/about/ZigzagTimelineSection";
import AwardsSection from "../components/about/AwardsSection";

import { Code2, Server, LayoutTemplate, Cpu } from "lucide-react";

function AboutPage() {
  const timeline = [
    {
      year: "Started in 2023",
      title: "IoT Freelancer",
      company: "Freelance",
      lists: [
        "Designed and Developed Solar Powered NodeMCU-based IoT solutions for smart garden automation with real-time monitoring, control and notifications using Blynk.",
        "Built and developed a Smart Feeding and Drinking Poultry System using Arduino with SMS notifications.",
        "Built an Automatic Feeds Dispenser using Arduino for Quail.",
      ],
    },
    {
      year: "March 2025 - September 2025",
      title: "Data Entry Associate",
      company: "Dagaz HR Consultancy and Recruitment Company",
      lists: [
        "Performed data entry tasks with a focus on accuracy, speed, and efficiency.",
        "Maintained data integrity by verifying and correcting information as needed.",
      ],
    },

    {
      year: "2026 - Present",
      title: "Web Developer (OJT)",
      company: "Metaverse Holdings Corporation",
      lists: [
        "Collaborated with the team to create visually appealing and user-friendly web pages.",
        "Learned and applied new technologies to improve web development skills.",
        "Worked on multiple projects simultaneously, managing time and priorities effectively.",
      ],
    },
  ];

  const highlights = [
    {
      text: "Frontend development with React and Tailwind",
      icon: <Code2 className="w-5 h-5 text-[#93c5fd]" />,
    },
    {
      text: "System design that balances UX and performance",
      icon: <Server className="w-5 h-5 text-[#93c5fd]" />,
    },
    {
      text: "WordPress + Elementor for rapid content delivery",
      icon: <LayoutTemplate className="w-5 h-5 text-[#93c5fd]" />,
    },
    {
      text: "IoT prototyping and device storytelling",
      icon: <Cpu className="w-5 h-5 text-[#93c5fd]" />,
    },
  ];

  const educationTimeline = [
    {
      year: "2022 - Present",
      title: "Nueva Ecija University of Science and Technology",
      lists: [
        "Bachelor of Science in Information Technology",
        "Major in Database Systems Technology",
        "FixIT: A platform connecting blue-collar workers with clients - Thesis",
        "CICT Techno Day C++ Competition - 2nd Runner Up",
        "CICT Techno Day Figma Competition - 4th Place",
      ],
    },
    {
      year: "2020 - 2022",
      title: "Palayan City National Senior High School",
      lists: [
        "Science, Technology, Engineering, and Mathematics (STEM) Strand",
        "Top Research Study",
      ],
    },
    {
      year: "2016 - 2020",
      title: "Palayan City National High School",
      lists: [
        "Science, Technology, Engineering (STE)",
        "Division Science & Technology Fair - Leader and Representative of Group Research Category - Grade 10",
      ],
    },
  ];

  const awardsData = [
    {
      title: "IT Specialist - Databases Certificate",
      issuer: "Certiport - A Pearson VUE Business",
      date: "2025",
    },
    {
      title: "Google Project Management Certificate",
      issuer: "Coursera",
      date: "2025",
    },
    {
      title: "Associate Data Engineer Certification",
      issuer: "DataCamp",
      date: "2025",
    },
    {
      title: "AI & Analytics Masterclass Series",
      issuer: "NEUST",
      date: "2025",
    },

    {
      title: "CICT Techno Day C++ Competition - 2nd Runner Up",
      issuer: "NEUST College of Information and Communications Technology",
      date: "2024",
    },
    {
      title: "CICT Techno Day Figma Competition - 4th Place",
      issuer: "NEUST College of Information and Communications Technology",
      date: "2026",
    },
  ];

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
