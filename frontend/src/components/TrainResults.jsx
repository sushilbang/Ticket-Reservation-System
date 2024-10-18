import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Typography, Button, Spinner } from "@material-tailwind/react";

const TrainResults = () => {
    const { state } = useLocation();
    const { trains = [] } = state || {};
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleBookNow = (train) => {
        setLoading(true);
        // Redirect to booking page with train details
        navigate('/booking', { state: { train, distance: train.Destination.Distance - train.Source.Distance } });
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4 pt-20"> {/* Add padding to top */}
            <Typography variant="h4" color="blue-gray" className="mt-6 font-bold text-center">
                Train Results
            </Typography>

            <div className="mt-6 w-full max-w-3xl">
                {trains.length === 0 ? (
                    <Typography variant="body1" color="gray" className="text-center">
                        No trains found.
                    </Typography>
                ) : (
                    trains.map((train, index) => (
                        <Card 
                            key={index} 
                            color="white" 
                            shadow={true} 
                            className="p-4 mb-4 rounded-lg flex flex-col border border-gray-200"
                        >
                            <Typography 
                                variant="h6" 
                                color="blue-gray" 
                                className="text-center mb-2 font-semibold"
                            >
                                {train.Source.Station_Name} → {train.Destination.Station_Name}
                            </Typography>
                            <div className="flex justify-between items-center">
                                <div className="flex flex-col">
                                    <Typography variant="body1" color="blue-gray" className="mb-1">
                                        Train No: {train.Train_No || 'N/A'}
                                    </Typography>
                                    <Typography variant="body1" color="blue-gray">
                                        Distance: {train.Destination.Distance && train.Source.Distance 
                                            ? `${train.Destination.Distance - train.Source.Distance} km` 
                                            : 'N/A'}
                                    </Typography>
                                </div>
                                <Button
                                    color="blue"
                                    onClick={() => handleBookNow(train)}
                                    disabled={loading}
                                    className="ml-4"
                                >
                                    {loading ? <Spinner size="sm" /> : 'Book Now'}
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
