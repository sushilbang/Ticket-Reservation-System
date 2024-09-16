import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="backdrop-blur-lg bg-gray-800 bg-opacity-50 p-4 fixed top-0 left-0 right-0 z-50">
            <div className="container mx-auto flex items-center justify-between">
                <Link to="/" className="text-white text-lg font-semibold">Ticket Reservation</Link>
                <div className="flex items-center space-x-4">
                    {isAuthenticated ? (
                        <>
                            <button
                                onClick={() => navigate('/profile')}
                                className="text-white hover:text-gray-300 transition duration-300"
                            >
                                Profile
                            </button>
                            <button
                                onClick={handleLogout}
                                className="text-white hover:text-gray-300 transition duration-300"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="text-white hover:text-gray-300 transition duration-300"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="ml-4 text-white hover:text-gray-300 transition duration-300"
                            >
                                Signup
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
