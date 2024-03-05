// src/app/util/calculateEquivalentSizes.ts

export interface TireSize {
  rimSize: number;
  width: number;
  aspectRatio: number;
}

// Mock function to demonstrate calculation of equivalent sizes
export const calculateEquivalentSizes = (tireSize: TireSize): TireSize[] => {
  // Placeholder logic - replace with actual calculation
  return [
    { rimSize: tireSize.rimSize, width: tireSize.width + 10, aspectRatio: tireSize.aspectRatio },
    { rimSize: tireSize.rimSize, width: tireSize.width + 20, aspectRatio: tireSize.aspectRatio },
  ];
};
