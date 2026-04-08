import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";
import { navLinks } from "../data/navigation";

function Navigation() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const handleLinkClick = (e, path, name) => {
    if (path.startsWith("/#") && location.pathname === "/") {
      e.preventDefault();
      const id = path.replace("/#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (name === "Home" && location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNavClick = (e, path, name) => {
    handleLinkClick(e, path, name);
    setIsOpen(false);
  };

  return (
    <nav className="relative z-50 flex justify-between items-center mx-4 lg:mx-15 mt-6 sm:mt-10">
      <ul className="hidden lg:flex gap-12 text-white">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              to={link.path}
              className="hover:text-[#E0E1DD] cursor-pointer"
              onClick={(e) => handleLinkClick(e, link.path, link.name)}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="hidden lg:flex gap-4">
        <a
          href="https://richmondcg.github.io/Richmondportfolio/"
          target="_blank"
          className="px-2 py-2 bg-white rounded-full flex items-center gap-2 cursor-pointer no-underline"
        >
          <p className="text-[#1B263B] font-medium m-0">Old Portfolio</p>
        </a>
        <Link
          to="/#cta"
          className="px-2 py-2 bg-white rounded-full flex items-center gap-2 cursor-pointer no-underline"
        >
          <p className="text-[#1B263B] font-medium m-0 pl-2">Get in touch</p>
          <div className="bg-[#1B263B] p-2 rounded-full flex items-center justify-center">
            <ArrowRight size={18} className="text-white" />
          </div>
        </Link>
      </div>

      <button
        type="button"
        className="lg:hidden ml-auto inline-flex items-center justify-center rounded-full bg-white/90 p-2 text-[#1B263B]"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-3 w-56 rounded-2xl bg-white/95 backdrop-blur shadow-lg p-4 flex flex-col gap-3 text-[#1B263B] lg:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="font-medium"
              onClick={(e) => handleNavClick(e, link.path, link.name)}
            >
              {link.name}
            </Link>
          ))}
          <a
            href="https://richmondcg.github.io/Richmondportfolio/"
            target="_blank"
            className="mt-2 inline-flex items-center justify-center rounded-full bg-[#1B263B] px-3 py-2 text-white"
          >
            Old Portfolio
          </a>
          <Link
            to="/#cta"
            className="inline-flex items-center justify-between rounded-full bg-[#1B263B] px-3 py-2 text-white"
            onClick={(e) => handleNavClick(e, "/#cta", "Get in touch")}
          >
            <span>Get in touch</span>
            <ArrowRight size={16} className="text-white" />
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
