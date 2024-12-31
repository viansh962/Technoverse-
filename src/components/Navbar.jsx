import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const navigation = [
  { name: 'Home', to: '/' },
  { name: 'Events', to: '/events' },
  { name: 'Resources', to: '/resources' },
  { name: 'About', to: '/about' },
];

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link to="/" className="flex items-center">
                  <span className="text-2xl font-bold text-blue-600">Technoverse</span>
                </Link>
              </div>
              <div className="hidden md:flex md:items-center md:space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700"
                  >
                    Login
                  </Link>
                )}
              </div>
              <Disclosure.Button className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700">
                {open ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
              </Disclosure.Button>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                >
                  {item.name}
                </Link>
              ))}
              {user ? (
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Login
                </Link>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}