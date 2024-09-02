import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      // Handle successful login
      console.log(response.data);
      navigate('/'); // Redirect to home or dashboard
    } catch (err) {
      setError('Invalid Credentials');
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-r from-black to-gray-900 text-white">
      <div className="md:w-1/2 flex items-center justify-center p-12">
        <div className="bg-gray-800 p-8 rounded-3xl shadow-lg w-full max-w-md space-y-6">
          <h1 className="text-3xl font-bold text-white mb-6">Login</h1>
          {error && <p className="text-red-500">{error}</p>}
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
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition duration-300"
          >
            Login
          </button>
        </div>
      </div>
      <div className="md:w-1/2 flex items-center justify-center">
        <img
          src="../public/vandebharat.jpg"
          alt="Vande Bharat Train"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
