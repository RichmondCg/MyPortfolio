import React from "react";
import { Link } from "react-router-dom";
import { FOOTERLINKS } from "../data/footerLinks";

function Footer() {
  return (
    <footer className="flex flex-col lg:flex-row justify-between mx-7 lg:mx-20 my-4 space-y-4 lg:space-y-0 text-base text-[#1B263B]">
      <ul className="flex gap-12">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/projects">Projects</Link>
        </li>
      </ul>
      <p>&copy; 2026 Richmond Gillaco. All rights reserved.</p>
      <div className="flex items-center gap-4">
        {FOOTERLINKS.map((link, index) => {
          return (
            <a
              key={index}
              href={link.link}
              aria-label={link.label}
              className="transition-opacity hover:opacity-80"
              target="_blank"
              rel="noreferrer"
            >
              <img src={link.imageSrc} alt={link.label} className="h-5 w-5" />
            </a>
          );
        })}
      </div>
    </footer>
  );
}

export default Footer;
