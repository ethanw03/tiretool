'use client'

import React, { useEffect, useState } from 'react';
import { TireSize, calculateEquivalentSizes } from './util/calculateEquivalentSizes';

import Image from 'next/image';
import ResultsDisplay from './components/ResultsDisplay';
import TireSizeSelector from './components/TireSizeSelector';
import tireLogo from '../../public/tireLogo.svg';

const HomePage: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState<{ rimSize?: number; width?: number; aspectRatio?: number } | null>(null);
  const [results, setResults] = useState<TireSize[]>([]);

  useEffect(() => {
    // Check if all three values (rimSize, width, aspectRatio) have been selected
    if (selectedSize && selectedSize.rimSize !== undefined && selectedSize.width !== undefined && selectedSize.aspectRatio !== undefined) {
      // Since selectedSize's properties are confirmed to be numbers, TypeScript should not complain here
      const equivalents = calculateEquivalentSizes(selectedSize as TireSize);
      setResults(equivalents);
    }
  }, [selectedSize]); // This effect depends on selectedSize

  // Debugging line to test calculateEquivalentSizes function with known inputs
  useEffect(() => {
    console.log("Equivalent Sizes for 15, 205, 55:", calculateEquivalentSizes({ rimSize: 15, width: 205, aspectRatio: 55 }));
  }, []);

  // Logging selectedSize to ensure it's being passed correctly
  useEffect(() => {
    console.log("Selected tire size:", selectedSize);
  }, [selectedSize]);

  // Logging results to ensure they're being passed correctly
  useEffect(() => {
    console.log("Results:", results);
  }, [results]);

  return (
    <div className='bg-wheat h-screen w-screen font-sans'>
      <div className='flex justify-center'>
        <Image src={tireLogo} alt="Tire Logo" width={300} height={300} />
      </div>
      <TireSizeSelector onSelect={(size) => setSelectedSize(size)} />
      <ResultsDisplay results={results} />
    </div>
  );
};

export default HomePage;
