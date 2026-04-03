import React from "react";

function Footer() {
  return (
    <footer className="flex flex-col lg:flex-row justify-between mx-7 lg:mx-20 my-4 space-y-4 lg:space-y-0 text-base text-[#1B263B]">
      <ul className="flex gap-12">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/projects">Projects</a>
        </li>
      </ul>
      <p>&copy; 2026 Richmond Gillaco. All rights reserved.</p>
      <div className="flex items-center gap-4">
        <a
          href="#"
          aria-label="GitHub"
          className="transition-opacity hover:opacity-80"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="https://img.icons8.com/ios-filled/24/1B263B/github.png"
            alt="GitHub"
            className="h-5 w-5"
          />
        </a>
        <a
          href="#"
          aria-label="LinkedIn"
          className="transition-opacity hover:opacity-80"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="https://img.icons8.com/ios-filled/24/1B263B/linkedin.png"
            alt="LinkedIn"
            className="h-5 w-5"
          />
        </a>
        <a
          href="#"
          aria-label="Facebook"
          className="transition-opacity hover:opacity-80"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="https://img.icons8.com/ios-filled/24/1B263B/facebook-new.png"
            alt="Facebook"
            className="h-5 w-5"
          />
        </a>
        <a
          href="#"
          aria-label="Instagram"
          className="transition-opacity hover:opacity-80"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="https://img.icons8.com/ios-filled/24/1B263B/instagram-new.png"
            alt="Instagram"
            className="h-5 w-5"
          />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
