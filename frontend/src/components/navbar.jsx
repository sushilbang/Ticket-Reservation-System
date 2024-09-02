import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          <Link to="/">Ticket Reservation System</Link>
        </div>
        <div className="space-x-4">
          <Link
            to="/login"
            className="text-white hover:bg-teal-700 px-3 py-2 rounded-md"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="text-white hover:bg-teal-700 px-3 py-2 rounded-md"
          >
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
