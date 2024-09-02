import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Typography } from "@material-tailwind/react";

const TrainResults = () => {
    const { state } = useLocation();
    const { trains } = state || { trains: [] };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100">
            <Typography variant="h4" color="blue-gray" className="mt-6">
                Train Results
            </Typography>
            <div className="mt-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {trains.length === 0 ? (
                    <Typography variant="paragraph" color="gray">
                        No trains found.
                    </Typography>
                ) : (
                    trains.map((train, index) => (
                        <Card key={index} color="blue-gray" shadow={true} className="p-4 w-80">
                            <div className="flex justify-between">
                                <Typography variant="h6" color="gray">
                                    {train.Source.Station_Name}
                                </Typography>
                                <Typography variant="h6" color="gray">
                                    {train.Destination.Station_Name}
                                </Typography>
                            </div>
                            <Typography variant="paragraph" color="gray" className="mt-4">
                                Train No: {train.Train_No}
                            </Typography>
                            <Typography variant="paragraph" color="gray">
                                Distance: {train.Destination.Distance - train.Source.Distance}
                            </Typography>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default TrainResults;
