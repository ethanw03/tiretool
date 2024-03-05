// src/app/components/ResultsDisplay.tsx
import React from 'react';
import { TireSize } from '../util/calculateEquivalentSizes';

interface ResultsDisplayProps {
  results: TireSize[];
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  return (
    <div>
      <h2>Equivalent Tire Sizes</h2>
      {results.map((result, index) => (
        <div key={index}>
          {`Rim Size: ${result.rimSize}, Width: ${result.width}, Aspect Ratio: ${result.aspectRatio}`}
        </div>
      ))}
    </div>
  );
};

export default ResultsDisplay;
