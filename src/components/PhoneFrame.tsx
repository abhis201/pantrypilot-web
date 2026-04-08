"use client";

import { useEffect, useRef } from "react";

interface ScreenShowcaseProps {
  images: string[];
  activeIndex: number;
}

export default function ScreenShowcase({
  images,
  activeIndex,
}: ScreenShowcaseProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const prevIndex = useRef(activeIndex);

  // Reset scroll to top whenever active image changes
  useEffect(() => {
    if (prevIndex.current !== activeIndex && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
    prevIndex.current = activeIndex;
  }, [activeIndex]);

  return (
    <div className="flex flex-col items-center">
      <div ref={scrollRef} className="screen-showcase">
        {/* Only render active image — instant switch, no crossfade confusion with scroll */}
        <img
          src={images[activeIndex]}
          alt={`App screen ${activeIndex + 1}`}
          className="screen-showcase-img"
          draggable={false}
        />
      </div>

    </div>
  );
}
