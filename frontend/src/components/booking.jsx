import React from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Input, Typography } from "@material-tailwind/react";

const Booking = () => {
    const { state } = useLocation();
    const { train } = state || {};

    const handleBooking = (e) => {
        e.preventDefault();
        // Handle the booking logic here, e.g., sending data to the backend
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

                {/* User details */}
                <Input label="Full Name" required className="mb-4" />
                <Input label="Email" type="email" required className="mb-4" />
                <Input label="Phone Number" type="tel" required className="mb-4" />
                <Input label="Number of Passengers" type="number" required className="mb-4" />

                <Button type="submit" color="blue">
                    Confirm Booking
                </Button>
            </form>
        </div>
    );
};

export default Booking;
