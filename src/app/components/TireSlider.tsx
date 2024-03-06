// src/components/TireSlider.tsx

import React, { useEffect, useRef, useState } from 'react';

interface TireSliderProps {
  items: number[]; // Assuming items are numerical values for this example
  onSelect: (value: number) => void;
}

const TireSlider: React.FC<TireSliderProps> = ({ items, onSelect }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const handleEnd = () => {
      setIsDragging(false);
    };

    const slider = containerRef.current;
    if (slider) {
      slider.addEventListener('mouseup', handleEnd);
      slider.addEventListener('mouseleave', handleEnd);
    }

    return () => {
      if (slider) {
        slider.removeEventListener('mouseup', handleEnd);
        slider.removeEventListener('mouseleave', handleEnd);
      }
    };
  }, []);

  const startDragging = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current!.offsetLeft);
    setScrollLeft(containerRef.current!.scrollLeft);
  };

  const onDrag = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isDragging) return;
    const x = e.pageX - containerRef.current!.offsetLeft;
    const walk = (x - startX) * 2; // Scroll-fastness
    containerRef.current!.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={startDragging}
      onMouseMove={onDrag}
      className="overflow-auto whitespace-nowrap cursor-pointer select-none"
      style={{ userSelect: 'none' }}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className="inline-block p-4 m-2 border border-gray-300 rounded-lg"
          onClick={() => onSelect(item)}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default TireSlider;
