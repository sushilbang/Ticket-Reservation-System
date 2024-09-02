import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
    } catch (err) {
      setError(err.response?.data?.msg || 'An error occurred');
      setSuccess(''); // Clear any previous success messages
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-black to-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-3xl shadow-lg w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-white mb-6">Signup</h1>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-gray-300" htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border px-3 py-2 w-full rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-300" htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border px-3 py-2 w-full rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-300" htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border mb-2 px-3 py-2 w-full rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <button type="submit" className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition duration-300">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
