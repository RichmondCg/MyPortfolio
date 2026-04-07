import React, { useState } from "react";
import Footer from "../components/footer";
import Navigation from "../components/navigation";
import ProjectsCaseStudies from "../components/projects/ProjectsCaseStudies";
import ProjectsHero from "../components/projects/ProjectsHero";
import ProjectsIndex from "../components/projects/ProjectsIndex";
import { projects, caseStudies, categories } from "../data/projects";

function Projects() {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [activeCategory, setActiveCategory] = useState("All");
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
