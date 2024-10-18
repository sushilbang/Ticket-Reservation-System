import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Input, Typography } from "@material-tailwind/react";
import { useAuth } from '../context/AuthContext';

const classFareMapping = {
    '1A': 10,
    '2A': 8,
    '3A': 5,
    'Sleeper': 3,
};

const generatedIds = new Set();

const generateUniqueJourneyId = () => {
    let journeyId;
    do {
        journeyId = `PNR${Math.floor(Math.random() * 1000000)}`;
    } while (generatedIds.has(journeyId));
    generatedIds.add(journeyId);
    return journeyId;
};

const Booking = () => {
    const { state } = useLocation();
    const { train, distance } = state || {}; // Get the distance from the state
    const { userEmail } = useAuth();
    const navigate = useNavigate();

    const [fullName, setFullName] = useState('');
    const [numPassengers, setNumPassengers] = useState(1);
    const [seatClass, setSeatClass] = useState('1A');
    const [totalFare, setTotalFare] = useState(0);

    useEffect(() => {
        // Calculate initial fare based on distance and class when the component mounts
        if (seatClass && distance) {
            const farePerKm = classFareMapping[seatClass] || 0;
            const fare = farePerKm * distance * numPassengers;
            setTotalFare(fare);
        }
    }, [seatClass, distance, numPassengers]);

    const handleBooking = async (e) => {
        e.preventDefault();
    
        if (!fullName || !userEmail || !numPassengers || !seatClass || totalFare <= 0) {
            console.error('All fields are required:', { fullName, userEmail, numPassengers, seatClass, totalFare });
            return;
        }
    
        const reservationData = {
            email: userEmail,
            total_fare: totalFare,
            journey_id: generateUniqueJourneyId(),
            status: 'confirmed',
            seat_class_id: seatClass,
            seats_reserved: numPassengers,
            Train_No: train.Train_No,
            Source: train.Source.Station_Name,
            Destination: train.Destination.Station_Name,
        };
    
        try {
            const response = await fetch('http://localhost:5000/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reservationData),
            });
    
            if (response.ok) {
                const result = await response.json();
                console.log('Reservation successful:', result);
                navigate('/confirmation', { state: { reservation: result } });
            } else {
                const errorData = await response.json();
                console.error('Error creating reservation:', errorData);
                alert(errorData.msg || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Network error:', error);
            alert('Network error: ' + error.message);
        }
    };
    
    
    if (!train) {
        return (
            <Typography variant="paragraph" color="red" className="text-center mt-6">
                No train selected for booking.
            </Typography>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleBooking} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6">
                <Typography variant="h5" color="blue-gray">
                    Booking for {train.Train_No} - {train.Source.Station_Name} to {train.Destination.Station_Name}
                </Typography>

                <Input 
                    label="Full Name" 
                    required 
                    className="mb-4" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)} 
                />
                <Input 
                    label="Number of Passengers" 
                    type="number" 
                    min={1} 
                    required 
                    className="mb-4" 
                    value={numPassengers}
                    onChange={(e) => {
                        const value = Number(e.target.value);
                        setNumPassengers(value);
                    }} 
                />
                <select 
                    className="mb-4 p-2" 
                    value={seatClass} 
                    onChange={(e) => {
                        setSeatClass(e.target.value);
                    }}
                >
                    <option value="1A">1A</option>
                    <option value="2A">2A</option>
                    <option value="3A">3A</option>
                    <option value="Sleeper">Sleeper</option>
                </select>
                <Input 
                    label="Total Fare" 
                    type="number" 
                    readOnly 
                    value={totalFare} 
                    className="mb-4" 
                />

                <Button type="submit" color="blue">
                    Confirm Booking
                </Button>
            </form>
        </div>
    );
};

export default Booking;
