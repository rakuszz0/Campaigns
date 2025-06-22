import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className="flex flex-col min-h-screen bg-green-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md py-4 px-8">
        <ul className="flex flex-wrap justify-center md:justify-start gap-6">
          <li className="hover:bg-green-100 px-3 py-1 rounded transition">
            <Link to="/" className="text-green-700 font-medium hover:text-green-900">
              Home
            </Link>
          </li>
          <li className="hover:bg-green-100 px-3 py-1 rounded transition">
            <Link to="/about-us" className="text-green-700 font-medium hover:text-green-900">
              About
            </Link>
          </li>
          <li className="hover:bg-green-100 px-3 py-1 rounded transition">
            <Link to="/vision-mission" className="text-green-700 font-medium hover:text-green-900">
              Visi Misi
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row items-center justify-between p-8 flex-grow">
        {/* Text Section */}
        <div className="flex-1 min-w-[300px] p-5 md:pr-10">
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
          <div className="text-center md:text-left">
            <button className="bg-green-700 text-white py-3 px-6 rounded-lg hover:bg-green-800 transition duration-300 shadow-md hover:shadow-lg">
              Join Our Mission
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex-1 min-w-[300px] flex justify-center items-center p-5">
          <div className="w-full max-w-[400px] h-[400px] bg-green-200 rounded-xl flex justify-center items-center shadow-lg overflow-hidden">
            {/* Replace with an actual image */}
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
              alt="Our Team" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;