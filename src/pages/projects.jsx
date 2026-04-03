import React, { useState } from "react";
import Footer from "../components/footer";
import Navigation from "../components/navigation";
import ProjectsCaseStudies from "../components/projects/ProjectsCaseStudies";
import ProjectsHero from "../components/projects/ProjectsHero";
import ProjectsIndex from "../components/projects/ProjectsIndex";
import paps from "../assets/images/projects//website/paps.png";
import nueva from "../assets/images/projects//website/nueva.png";
import clinic from "../assets/images/projects//website/clinic.png";
import pos from "../assets/images/projects//website/pos.png";
import smartfit from "../assets/images/projects/website/smartfit.png";
import fixit from "../assets/images/projects/website/fixit.jpg";
import hydro from "../assets/images/projects/iot/hydro.jpg";
import champion from "../assets/images/projects/iot/champion.jpg";
import quail from "../assets/images/projects/iot/quail.jpg";
import sfads from "../assets/images/projects/iot/sfads.jpg";

function Projects() {
  const caseStudies = [
    {
      title: "NuevaCare Clinic",
      type: "Web App / Case Study",
      summary:
        "A modern healthcare website with 3d object and chatbot integration using pre-built model for appointment scheduling and patient support.",
      image: clinic,
    },
    {
      title: "SweetCrumbs POS/Inventory System",
      type: "Web App / Case Study",
      summary:
        "A user-friendly POS and inventory management system built with React, Node.js, and MySQL, designed to streamline operations for small businesses.",
      image: pos,
    },
    {
      title: "SmartFit",
      type: "Landing Page / Wordpress",
      summary:
        "A Wordpress-based landing page for a fitness brand, using the free of Wordpress ",
      image: smartfit,
    },
    {
      title: "FixIt",
      type: "Web App / Capstone Project",
      summary:
        "A React-based web app for blue-collar workers to connect with clients, featuring job listings, profiles, and a secure messaging system.",
      image: fixit,
    },
  ];

  const projects = [
    {
      title: "PAPS Barbershop",
      type: "Web App",
      category: "Web Dev",
      image: paps,
    },
    {
      title: "Nueva Insights Marketing",
      type: "Website",
      category: "Web Dev",
      image: nueva,
    },
    {
      title: "NuevaCare Clinic",
      type: "Web App",
      category: "Web Dev",
      image: clinic,
    },
    {
      title: "SweetCrumbs POS/Inventory System",
      type: "Web App",
      category: "Web Dev",
      image: pos,
    },
    {
      title: "SmartFit",
      type: "Landing Page",
      category: "Web Dev",
      image: smartfit,
    },
    {
      title: "FixIt",
      type: "Web App",
      category: "Web Dev",
      image: fixit,
    },
    {
      title: "Solar-Powered Arduino-Based Automated Irrigation System",
      type: "Arduino",
      category: "IoT",
      image: hydro,
    },
    {
      title:
        "Solar Powered Automated Irrigation System for Farmers with Monitoring App",
      type: "IoT",
      category: "IoT",
      image: champion,
    },
    {
      title:
        "SFADS – Smart Feeding and Drinking System with SMS Updates for Poultry Farmers",
      type: "IoT",
      category: "IoT",
      image: sfads,
    },
    {
      title: "Solar-Powered Automatic Feed Dispenser for Quails",
      type: "Arduino",
      category: "IoT",
      image: quail,
    },
  ];

  const [hoveredProject, setHoveredProject] = useState(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Web Dev", "IoT", "Mobile Dev"];
  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  const handleMouseMove = (event) => {
    const previewWidth = 280;
    const previewHeight = 200;
    const offset = 24;
    const maxX = window.innerWidth - previewWidth - offset;
    const maxY = window.innerHeight - previewHeight - offset;
    const nextX = Math.min(event.clientX + offset, maxX);
    const nextY = Math.min(event.clientY + offset, maxY);

    setCursor({ x: nextX, y: nextY });
  };

  return (
    <>
      <main className="min-h-screen bg-gradient-to-tr from-[#2D5D90] to-[#0D1B2A] text-white">
        <section className="relative overflow-hidden pb-16">
          <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-white/10 blur-[120px]" />
          <div className="absolute -right-10 top-32 h-80 w-80 rounded-full bg-[#1B263B] opacity-60 blur-[140px]" />

          <Navigation />
          <div className="relative z-10 w-full px-6 pt-16 sm:px-10 lg:px-14">
            <ProjectsHero />
            <h2 className="text-2xl lg:text-3xl font-bold mt-6">
              Case Studies
            </h2>
            <ProjectsCaseStudies caseStudies={caseStudies} />
          </div>
        </section>

        <section className="relative pb-24">
          <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14">
            <ProjectsIndex
              projects={filteredProjects}
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              onMouseMove={handleMouseMove}
              onProjectEnter={(project) => setHoveredProject(project)}
              onProjectLeave={() => setHoveredProject(null)}
            />
          </div>

          {hoveredProject && (
            <div
              className="pointer-events-none fixed z-50 hidden h-[300px] w-[280px] overflow-hidden border border-white/20 bg-white/10 shadow-2xl backdrop-blur-md sm:block"
              style={{ left: cursor.x, top: cursor.y }}
            >
              <img
                src={hoveredProject.image}
                alt={hoveredProject.title}
                className="h-full w-full object-cover object-top"
              />
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Projects;
