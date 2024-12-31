import React from 'react';
import { FaLaptopCode, FaUsers, FaChartLine, FaCalendarAlt } from 'react-icons/fa';

const features = [
  {
    title: 'Dynamic Learning Environment',
    description: 'Engage with real-time coding workshops and interactive tutorials.',
    icon: FaLaptopCode,
  },
  {
    title: 'Collaborative Projects',
    description: 'Team up with fellow tech enthusiasts on exciting projects.',
    icon: FaUsers,
  },
  {
    title: 'Personalized Dashboard',
    description: 'Track your progress and manage your learning journey.',
    icon: FaChartLine,
  },
  {
    title: 'Exclusive Events',
    description: 'Participate in live events, guest lectures, and hackathons.',
    icon: FaCalendarAlt,
  },
];

export function Features() {
  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Why Join Technoverse?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="bg-white p-6 rounded-lg shadow-md">
              <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}