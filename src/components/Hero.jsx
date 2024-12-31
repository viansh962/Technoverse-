import React from 'react';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Welcome to Technoverse
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Your Premier Tech Community at UIT RGPV Shivpuri
        </p>
        <div className="space-x-4">
          <Link
            to="/signup"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Join Now
          </Link>
          <Link
            to="/events"
            className="border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
          >
            Explore Events
          </Link>
        </div>
      </div>
    </div>
  );
}