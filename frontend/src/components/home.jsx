import React, { useState } from 'react';
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [date, setDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!from || !to || !date) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const queryString = new URLSearchParams({
                from,
                to,
                date
            }).toString();

            const response = await fetch(`http://localhost:5000/api/searchTrains?${queryString}`);

            if (response.ok) {
                const data = await response.json();
                navigate('/train-results', { state: { trains: data } });
            } else {
                setError('Failed to fetch trains');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while fetching the data');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            {/* Background video */}
            <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                src="https://cdn.pixabay.com/video/2023/08/23/177314-857365374_large.mp4" // Ensure this is the correct path to your video file
                autoPlay
                loop
                muted
            />
            <Card color="bg-slate-200" shadow={true} className="p-6 w-180 max-w-md">
                <Typography variant="h4" color="blue-gray">
                    Search Trains
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Enter your journey details to search for trains.
                </Typography>
                <form onSubmit={handleSubmit} className="mt-8 mb-2">
                    <div className="mb-6 flex flex-col gap-6">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            From
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="Enter departure station"
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            To
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="Enter destination station"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Date
                        </Typography>
                        <Input
                            type="date"
                            size="lg"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                    </div>
                    <Button type="submit" className="mt-6" fullWidth>
                        {loading ? 'Searching...' : 'Search'}
                    </Button>
                </form>
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </Card>
        </div>
    );
};

export default Home;
