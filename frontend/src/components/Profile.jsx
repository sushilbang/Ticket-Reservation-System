// components/Profile.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Import useAuth

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { isAuthenticated, logout } = useAuth(); // Access auth context

    useEffect(() => {
        if (isAuthenticated) {
            // Fetch user data from the server
            axios.get('http://localhost:5000/api/auth/user')
                .then(response => {
                    setUser(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                    setLoading(false);
                });
        } else {
            // Handle unauthenticated state
            setLoading(false);
        }
    }, [isAuthenticated]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <div>You must be logged in to view this page.</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold">Profile Page</h1>
            {user ? (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <p className="text-lg font-semibold">Name: {user.name}</p>
                    <p className="text-lg font-semibold">Email: {user.email}</p>
                    <p className="text-lg font-semibold">Phone: {user.phone}</p>
                    <p className="text-lg font-semibold">Address: {user.address}</p>
                    <button
                        onClick={logout}
                        className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <p>No user data available.</p>
            )}
        </div>
    );
};

export default Profile;
