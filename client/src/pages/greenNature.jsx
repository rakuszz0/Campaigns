import React from 'react';

const GreenNatureLandingPage = () => {
  return (
    <div className="flex flex-wrap items-center justify-between p-5 bg-yellow-400 min-h-screen">
      <div className="flex-1 min-w-[300px] p-5">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-600 mb-5 text-center md:text-left">Welcome to Green Nature</h1>
        <p className="text-base text-gray-800 mb-5 text-center md:text-left">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at ipsum vitae lacus lobortis
          lacinia. Donec tristique arcu massa, at pharetra tortor feugiat non.
        </p>
        <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-all">
          Explore Now
        </button>
      </div>
      <div className="flex-1 min-w-[300px] flex justify-center items-center p-5">
        <div className="w-[300px] h-[300px] bg-green-200 rounded-xl flex justify-center items-center mb-5">
          {/* Placeholder for image */}
        </div>
      </div>
    </div>
  );
};

export default GreenNatureLandingPage;
