import React from 'react';

const AboutUs = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-8 bg-green-50 min-h-screen">
      {/* Text Section */}
      <div className="flex-1 min-w-[300px] p-5">
        <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-6 text-center md:text-left">
          About Us
        </h1>
        <p className="text-lg text-gray-700 mb-4 text-center md:text-left">
          We are Green Nature — a dedicated team passionate about protecting the environment and promoting
          sustainable living. Our mission is to raise awareness and inspire actions that make the Earth greener and healthier.
        </p>
        <p className="text-lg text-gray-700 mb-6 text-center md:text-left">
          Through various projects and community initiatives, we aim to connect people with nature,
          support green campaigns, and encourage everyone to contribute to a more sustainable future.
        </p>
        <button className="bg-green-700 text-white py-3 px-6 rounded-lg hover:bg-green-800 transition">
          Join Our Mission
        </button>
      </div>

      {/* Image Placeholder */}
      <div className="flex-1 min-w-[300px] flex justify-center items-center p-5">
        <div className="w-[300px] h-[300px] bg-green-200 rounded-xl flex justify-center items-center shadow-md">
          {/* Replace with an actual image if needed */}
          <span className="text-green-800 text-xl font-semibold">Our Team</span>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
