'use client'

import React, { useState } from 'react';
import TireSizeSelector from './components/TireSizeSelector';
import ResultsDisplay from './components/ResultsDisplay';
import { calculateEquivalentSizes, TireSize } from './util/calculateEquivalentSizes';
import './globals.css';
import tireLogo from '../../public/tireLogo.svg'

const HomePage = () => {
  const [results, setResults] = useState<TireSize[]>([]);

  const handleSelect = (selectedSize: { rimSize: number; width: number; aspectRatio: number }) => {
    const equivalents = calculateEquivalentSizes(selectedSize);
    setResults(equivalents);
  };

  return (<div>
    <div className='bg-wheat h-screen w-screen  font-sans'>
      <h1 className='flex justify-center py-5'>
        
      </h1>
      <TireSizeSelector onSelect={handleSelect} />
      <ResultsDisplay results={results} />
    </div></div>
  );
};

export default HomePage;
