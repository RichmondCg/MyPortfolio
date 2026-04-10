import React from "react";

function BootLoader({ isExiting = false }) {
  return (
    <div
      className={`fixed inset-0 z-[999] flex items-center justify-center bg-white${
        isExiting ? " loader-fade" : ""
      }`}
    >
      <div className="relative flex flex-col items-center">
        <div className="mt-6 flex flex-col justify-center">
          <svg
            viewBox="0 0 120 120"
            xmlns="http://www.w3.org/2000/svg"
            className="loader-cross"
          >
            <defs>
              <clipPath id="cross-clip">
                <path d="M45 5H75V45H115V75H75V115H45V75H5V45H45V5Z" />
              </clipPath>
            </defs>
            <rect
              className="cross-fill"
              x="0"
              y="0"
              width="120"
              height="120"
              clipPath="url(#cross-clip)"
              fill="#0D1B2A"
            />
            <path
              d="M45 5H75V45H115V75H75V115H45V75H5V45H45V5Z"
              fill="none"
              stroke="#0D1B2A"
              strokeWidth="6"
              strokeLinejoin="round"
            />
          </svg>
          <h2>Loading...</h2>
        </div>
      </div>
    </div>
  );
}

export default BootLoader;
