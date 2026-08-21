import { useState } from "react";
import photo1 from "../assets/profiles/photo1.jpg";
import photo2 from "../assets/profiles/photo2.jpg";
import photo3 from "../assets/profiles/photo3.jpg";
const PHOTOS = [
  {
    src: photo1,
    alt: "Graduation Picture",
    rotate: "-9deg",
  },
  {
    src: photo2,
    alt: "Personal Picture",
    rotate: "-2deg",
  },
  {
    src: photo3,
    alt: "Graduation Picture Toga",
    rotate: "7deg",
  },
];

function PhotoStack() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="flex items-center justify-center px-4 py-6 sm:px-8">
      {PHOTOS.map((photo, i) => {
        const isHovered = hovered === i;
        return (
          <div
            key={photo.src}
            className={`relative cursor-pointer transition-all duration-500 ease-out will-change-transform w-[clamp(130px,24vw,210px)] lg:w-[clamp(150px,20vw,230px)] ${i === 0 ? "" : "-ml-[9vw] lg:-ml-[4vw]"}`}
            style={{
              transform: `translateY(${isHovered ? "-32px" : "0"}) rotate(${isHovered ? "0deg" : photo.rotate}) scale(${isHovered ? 1.15 : 1})`,
              zIndex: isHovered ? 20 : i + 1,
              filter: isHovered
                ? "grayscale(0) brightness(1)"
                : hovered !== null
                  ? "grayscale(1) brightness(0.55)"
                  : "grayscale(1)",
            }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="overflow-hidden rounded-lg border border-black/10 bg-black/5">
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="block aspect-[9/16] w-full object-cover"
                draggable="false"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PhotoStack;
