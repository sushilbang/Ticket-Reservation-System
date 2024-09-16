import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Added useNavigate for navigation
import { Card, Typography, Button } from "@material-tailwind/react";

const TrainResults = () => {
    const { state } = useLocation();
    const { trains } = state || { trains: [] };
    const navigate = useNavigate();

    const handleBookNow = (train) => {
        // Redirect to booking page with train details
        navigate('/booking', { state: { train } });
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100">
            <Typography variant="h4" color="blue-gray" className="mt-6">
                Train Results
            </Typography>
            <div className="mt-6 w-full px-4">
                {trains.length === 0 ? (
                    <Typography variant="paragraph" color="gray" className="text-center">
                        No trains found.
                    </Typography>
                ) : (
                    trains.map((train, index) => (
                        <Card 
                            key={index} 
                            color="blue-gray" 
                            shadow={true} 
                            className="p-4 w-full mb-4 flex flex-col"
                        >
                            <Typography 
                                variant="h6" 
                                color="gray" 
                                className="text-center mb-4"
                            >
                                {train.Source.Station_Name} → {train.Destination.Station_Name}
                            </Typography>
                            <div className="flex justify-between items-center">
                                <div className="flex flex-col">
                                    <Typography variant="paragraph" color="gray">
                                        Train No: {train.Train_No}
                                    </Typography>
                                    <Typography variant="paragraph" color="gray">
                                        Distance: {train.Destination.Distance - train.Source.Distance} km
                                    </Typography>
                                </div>
                                <Button
                                    color="blue"
                                    onClick={() => handleBookNow(train)}
                                >
                                    Book Now
                                </Button>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default TrainResults;
