import React from "react";
import { Link } from "react-router-dom";
function ErrorPage() {
  return (
    <main className="flex justify-center items-center w-full h-full">
      <div>
        <h1 className="text-[12rem] font-black">Error 404</h1>
        <div className="my-10 border-t border-black/10 py-10 text-center">
          <Link
            to="/"
            className="group inline-flex items-center gap-4 rounded-full border border-black px-8 py-4 text-[11px] tracking-[0.25em] uppercase transition-colors duration-300 hover:bg-black hover:text-white"
          >
            Back home
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-x-1 group-hover:translate-y-1"
            >
              <path
                d="M11 1L1 11M1 11H9M1 11V3"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default ErrorPage;
