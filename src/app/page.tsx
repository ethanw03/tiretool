// src/app/page/index.tsx
import React, { useState } from 'react';
import TireSizeSelector from './components/TireSizeSelector';
import ResultsDisplay from './components/ResultsDisplay';
import { calculateEquivalentSizes, TireSize } from './util/calculateEquivalentSizes';

const HomePage = () => {
  const [results, setResults] = useState<TireSize[]>([]);

  const handleSelect = (selectedSize: { rimSize: number; width: number; aspectRatio: number }) => {
    const equivalents = calculateEquivalentSizes(selectedSize);
    setResults(equivalents);
  };

  return (
    <div>
      <h1>Tire Size Calculator</h1>
      <TireSizeSelector onSelect={handleSelect} />
      <ResultsDisplay results={results} />
    </div>
  );
};

export default HomePage;
