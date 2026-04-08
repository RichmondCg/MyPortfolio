import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import BootLoader from "./BootLoader";

function RouteLoader() {
  const location = useLocation();
  const isFirst = useRef(true);
  const [showLoader, setShowLoader] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    let isCancelled = false;
    setShowLoader(true);
    setIsExiting(false);

    const waitForImages = () => {
      const images = Array.from(document.images || []).filter(
        (img) => img.loading !== "lazy",
      );
      if (images.length === 0) return Promise.resolve();

      return Promise.all(
        images.map((img) => {
          if (img.complete) return Promise.resolve();

          return new Promise((resolve) => {
            const done = () => resolve();
            img.addEventListener("load", done, { once: true });
            img.addEventListener("error", done, { once: true });
          });
        }),
      );
    };

    const startExit = () => {
      if (isCancelled) return;
      setIsExiting(true);
      setTimeout(() => {
        if (!isCancelled) setShowLoader(false);
      }, 400);
    };

    requestAnimationFrame(() => {
      waitForImages().then(startExit);
    });

    return () => {
      isCancelled = true;
    };
  }, [location.pathname, location.search, location.hash]);

  if (!showLoader) return null;

  return <BootLoader isExiting={isExiting} />;
}

export default RouteLoader;
