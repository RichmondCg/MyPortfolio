import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function ProjectsIndex({
  projects,
  categories,
  activeCategory,
  onCategoryChange,
  onMouseMove,
  onProjectEnter,
  onProjectLeave,
}) {
  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center gap-3">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => onCategoryChange(category)}
            className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] transition duration-300 sm:text-sm ${
              activeCategory === category
                ? "border-white bg-white text-[#0D1B2A]"
                : "border-white/30 text-white/80 hover:border-white hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <ul
        className="mt-10 w-full divide-y divide-white/15"
        onMouseMove={onMouseMove}
      >
        {projects.map((project) => (
          <li key={project.title}>
            <Link
              to={`/projects/${project.slug}`}
              onMouseEnter={() => onProjectEnter(project)}
              onMouseLeave={onProjectLeave}
              onFocus={() => onProjectEnter(project)}
              onBlur={onProjectLeave}
              className="group grid w-full grid-cols-1 items-start gap-2 px-4 py-5 text-left transition duration-300 hover:bg-white/10 hover:text-white sm:grid-cols-[1fr_auto_auto] sm:items-center sm:gap-6"
            >
              <span className="text-2xl font-bold sm:text-3xl">
                {project.title}
              </span>
              <div className="flex items-center justify-between gap-4 sm:contents">
                <span className="text-xs uppercase tracking-[0.35em] text-white/60 sm:text-sm">
                  {project.type}
                </span>
                <span className="text-sm uppercase tracking-[0.35em] text-white/60 transition duration-300 group-hover:scale-110 sm:justify-self-end">
                  <ArrowRight className="transition duration-300 group-hover:scale-110" />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectsIndex;
