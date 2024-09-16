import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
      });
      setSuccess(response.data.msg);
      setName('');
      setEmail('');
      setPassword('');
      setError(''); // Clear any previous errors
      // Navigate to the login page on successful signup
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.msg || 'An error occurred');
      setSuccess(''); // Clear any previous success messages
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
      {/* Background video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-10" // Position behind the form
        src="https://cdn.pixabay.com/video/2023/08/23/177314-857365374_large.mp4"
        autoPlay
        loop
        muted
      />

      {/* Signup Form Container */}
      <div className="relative z-10 w-full max-w-md p-8 bg-white rounded-3xl shadow-lg space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Signup</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-4 bg-opacity-90 backdrop-blur-md">
          <div>
            <label className="block mb-2 text-gray-700" htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border px-3 py-2 w-full rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-700" htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border px-3 py-2 w-full rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-700" htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border mb-2 px-3 py-2 w-full rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
