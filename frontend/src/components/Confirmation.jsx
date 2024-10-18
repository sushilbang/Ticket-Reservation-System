// src/components/Confirmation.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography, Button } from "@material-tailwind/react";

const Confirmation = () => {
    const { state } = useLocation();
    const { reservation } = state || {};
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5); // Initialize countdown
    const [userEmail, setUserEmail] = useState(''); // State to hold user email

    // Decode JWT to get email
    const decodeJWT = (token) => {
        const base64Url = token.split('.')[1]; // Get the payload part of the JWT
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Handle base64 encoding
        const jsonPayload = decodeURIComponent(escape(atob(base64))); // Decode and escape
        return JSON.parse(jsonPayload); // Return the parsed JSON
    };

    useEffect(() => {
        if (reservation?.email) {
            try {
                const decodedToken = decodeJWT(reservation.email); // Decode the JWT token
                setUserEmail(decodedToken.email); // Set the extracted email
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, [reservation]);

    // Countdown timer
    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    navigate('/'); // Redirect to home page when countdown ends
                    return 0; // Set to 0 when timer ends
                }
                return prev - 1; // Decrease countdown
            });
        }, 1000); // Update every second

        return () => clearInterval(timer); // Cleanup timer on unmount
    }, [navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6">
                <Typography variant="h5" color="green">
                    Booking Confirmed!
                </Typography>
                <Typography variant="body1">
                    Thank you for your booking. Here are your details:
                </Typography>
                <Typography variant="body1">
                    <strong>Train No:</strong> {reservation?.Train_No || 'N/A'} {/* Display the Train No */}
                </Typography>
                <Typography variant="body1">
                    <strong>Total Fare:</strong> Rs.{reservation?.total_fare}
                </Typography>
                <Typography variant="body1">
                    <strong>Email:</strong> {userEmail} {/* Display the extracted email */}
                </Typography>
                <Typography variant="body1" className={`text-lg font-bold ${reservation?.status === 'confirmed' ? 'text-green-500' : 'text-red-500'}`}>
                    <strong>Status:</strong> {reservation?.status}
                </Typography>
                {/* More details can be added here */}
                <div className="bg-yellow-200 p-4 text-center rounded-lg">
                    <Typography variant="h6" color="orange" className="font-bold">
                        Redirecting in {countdown} seconds...
                    </Typography>
                </div>
                <Button onClick={() => navigate('/')} color="blue">
                    Go to Home
                </Button>
            </div>
        </div>
    );
    
};

export default Confirmation;
