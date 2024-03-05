// src/app/components/TireSizeSelector.tsx
import React, { useState } from 'react';

interface TireSizeSelectorProps {
  onSelect: (selectedSize: { rimSize: number; width: number; aspectRatio: number }) => void;
}

const TireSizeSelector: React.FC<TireSizeSelectorProps> = ({ onSelect }) => {
  const [rimSize, setRimSize] = useState(14);
  const [width, setWidth] = useState(145);
  const [aspectRatio, setAspectRatio] = useState(30);

  return (
    <div>
      <label>
        Rim Size:
        <select value={rimSize} onChange={(e) => setRimSize(parseInt(e.target.value))}>
          {[...Array(9)].map((_, i) => (
            <option key={i} value={14 + i}>
              {14 + i}
            </option>
          ))}
        </select>
      </label>
      <label>
        Width:
        <select value={width} onChange={(e) => setWidth(parseInt(e.target.value))}>
          {[...Array(25)].map((_, i) => (
            <option key={i} value={145 + i * 10}>
              {145 + i * 10}
            </option>
          ))}
        </select>
      </label>
      <label>
        Aspect Ratio:
        <select value={aspectRatio} onChange={(e) => setAspectRatio(parseInt(e.target.value))}>
          {[...Array(10)].map((_, i) => (
            <option key={i} value={30 + i * 5}>
              {30 + i * 5}
            </option>
          ))}
        </select>
      </label>
      <button onClick={() => onSelect({ rimSize, width, aspectRatio })}>Calculate</button>
    </div>
  );
};

export default TireSizeSelector;
