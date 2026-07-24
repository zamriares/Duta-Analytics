import { useState, useEffect } from "react";

export function Loader() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="loader" className={loaded ? "loaded" : ""}>
      <div className="loader__container">
        <svg
          className="loader__logo"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Staggered animated SVG cubes */}
          <rect
            id="cube_01"
            x="15"
            y="15"
            width="32"
            height="32"
            rx="4"
            fill="rgb(15, 17, 23)"
          />
          <rect
            id="cube_02"
            x="53"
            y="15"
            width="32"
            height="32"
            rx="4"
            fill="rgb(0, 102, 255)"
          />
          <rect
            id="cube_03"
            x="15"
            y="53"
            width="32"
            height="32"
            rx="4"
            fill="rgb(90, 95, 108)"
          />
          <rect
            id="cube_04"
            x="53"
            y="53"
            width="32"
            height="32"
            rx="4"
            fill="rgb(15, 17, 23)"
          />
        </svg>
        <div className="loader__text">
          <span className="loader__brand">DUTA ANALYTICS</span>
          <span className="loader__status">INITIALIZING SYSTEM</span>
        </div>
      </div>
    </div>
  );
}
