import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import React, { useEffect, useState } from 'react';

import Slider from 'react-slick';

interface TireSizeSelectorProps {
  onSelect: (selectedSize: { rimSize: number; width: number; aspectRatio: number }) => void;
}

const TireSizeSelector: React.FC<TireSizeSelectorProps> = ({ onSelect }) => {
  const [rimSize, setRimSize] = useState<number | undefined>(undefined);
  const [width, setWidth] = useState<number | undefined>(undefined);
  const [aspectRatio, setAspectRatio] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (rimSize !== undefined && width !== undefined && aspectRatio !== undefined) {
      onSelect({ rimSize, width, aspectRatio });
    }
  }, [rimSize, width, aspectRatio, onSelect]);

  const handleRimSizeChange = (size: number) => {
  console.log('Rim size selected:', size);
  setRimSize(size);
};

const handleWidthChange = (size: number) => {
  console.log('Width selected:', size);
  setWidth(size);
};

const handleAspectRatioChange = (size: number) => {
  console.log('Aspect ratio selected:', size);
  setAspectRatio(size);
};

  const handleSubmit = () => {
  console.log('Submitted:', { rimSize, width, aspectRatio });
  if (rimSize !== undefined && width !== undefined && aspectRatio !== undefined) {
    onSelect({ rimSize, width, aspectRatio });
  } else {
    alert('Please select all tire sizes.');
  }
};


  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    variableWidth: true,
    centerMode: true,
    swipeToSlide: true, // Enable swipe to slide
    touchThreshold: 10, // Adjust touch threshold for smoother sliding
    easing: 'ease', // Use easing for smoother transitions
  };

  // Generating arrays for dynamic values
  const rimSizes = Array.from({ length: 9 }, (_, i) => 14 + i);
  const widths = Array.from({ length: 25 }, (_, i) => 145 + i * 10);
  const aspectRatios = Array.from({ length: 10 }, (_, i) => 30 + i * 5);

  return (
    <div className="space-y-4">
      <div className="text-center text-2xl font-semibold">RIM SIZE</div>
      <Slider {...settings}>
        {rimSizes.map((size) => (
          <div key={size} className="outline-none focus:outline-none">
            <div className="p-4" onClick={() => handleRimSizeChange(size)}>
              {size}
            </div>
          </div>
        ))}
      </Slider>

      <div className="text-center">Width</div>
      <Slider {...settings}>
        {widths.map((size) => (
          <div key={size} className="outline-none focus:outline-none">
            <div className="p-4" onClick={() => handleWidthChange(size)}>
              {size}
            </div>
          </div>
        ))}
      </Slider>

      <div className="text-center">Aspect Ratio</div>
      <Slider {...settings}>
        {aspectRatios.map((size) => (
          <div key={size} className="outline-none focus:outline-none">
            <div className="p-4" onClick={() => handleAspectRatioChange(size)}>
              {size}
            </div>
          </div>
        ))}
      </Slider>

      <div className="text-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default TireSizeSelector;
