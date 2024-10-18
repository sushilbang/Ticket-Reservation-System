import React, { useState, useEffect } from 'react';
import { Card, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [date, setDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [stations, setStations] = useState([]); // State for station names
    const [filteredStations, setFilteredStations] = useState([]); // State for filtered station names
    const [searchFrom, setSearchFrom] = useState(''); // Search input for 'From'
    const [searchTo, setSearchTo] = useState(''); // Search input for 'To'
    const [showFromDropdown, setShowFromDropdown] = useState(false); // Toggle dropdown visibility for 'From'
    const [showToDropdown, setShowToDropdown] = useState(false); // Toggle dropdown visibility for 'To'
    const navigate = useNavigate();

    // Fetch distinct station names from the server
    useEffect(() => {
        const fetchStations = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/stations');
                if (response.ok) {
                    const data = await response.json();
                    setStations(data); // Set the distinct stations
                    setFilteredStations(data); // Initialize filtered stations
                } else {
                    setError('Failed to fetch station names');
                }
            } catch (error) {
                console.error('Error:', error);
                setError('An error occurred while fetching station names');
            }
        };

        fetchStations();
    }, []);

    // Filter stations based on the search input for 'From'
    useEffect(() => {
        setFilteredStations(
            stations.filter(station =>
                station.toLowerCase().includes(searchFrom.toLowerCase())
            )
        );
    }, [searchFrom, stations]);

    // Filter stations based on the search input for 'To'
    useEffect(() => {
        setFilteredStations(
            stations.filter(station =>
                station.toLowerCase().includes(searchTo.toLowerCase())
            )
        );
    }, [searchTo, stations]);

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
                        <input
                            type="text"
                            placeholder="Type to search..."
                            value={searchFrom}
                            onChange={(e) => {
                                setSearchFrom(e.target.value);
                                setFrom(e.target.value); // Set selected station
                                setShowFromDropdown(true); // Show dropdown when typing
                            }}
                            onFocus={() => setShowFromDropdown(true)} // Show dropdown on focus
                            onBlur={() => setTimeout(() => setShowFromDropdown(false), 200)} // Delay hiding dropdown to allow click events
                            className="border border-gray-300 rounded-md p-2"
                        />
                        {showFromDropdown && filteredStations.length > 0 && (
                            <ul className="border border-gray-300 rounded-md absolute bg-white z-10">
                                {filteredStations.map((station) => (
                                    <li key={station} className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() => {
                                        setFrom(station);
                                        setSearchFrom(station);
                                        setShowFromDropdown(false);
                                    }}>
                                        {station}
                                    </li>
                                ))}
                            </ul>
                        )}
                        
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            To
                        </Typography>
                        <input
                            type="text"
                            placeholder="Type to search..."
                            value={searchTo}
                            onChange={(e) => {
                                setSearchTo(e.target.value);
                                setTo(e.target.value); // Set selected station
                                setShowToDropdown(true); // Show dropdown when typing
                            }}
                            onFocus={() => setShowToDropdown(true)} // Show dropdown on focus
                            onBlur={() => setTimeout(() => setShowToDropdown(false), 200)} // Delay hiding dropdown to allow click events
                            className="border border-gray-300 rounded-md p-2"
                        />
                        {showToDropdown && filteredStations.length > 0 && (
                            <ul className="border border-gray-300 rounded-md absolute bg-white z-10">
                                {filteredStations.map((station) => (
                                    <li key={station} className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() => {
                                        setTo(station);
                                        setSearchTo(station);
                                        setShowToDropdown(false);
                                    }}>
                                        {station}
                                    </li>
                                ))}
                            </ul>
                        )}

                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Date
                        </Typography>
                        <input
                            type="date"
                            size="lg"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="border border-gray-300 rounded-md p-2"
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
