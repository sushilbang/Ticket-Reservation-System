import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Added Link for routing
import { useAuth } from '../context/AuthContext'; // Import useAuth
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth(); // Access login function from AuthContext

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            toast.success('Login successful!');
            login(response.data.token); // Pass the email to login
            navigate('/'); // Redirect to train search page
        } catch (err) {
            toast.error(err.response?.data?.msg || 'An error occurred');
            setError(err.response?.data?.msg || 'An error occurred');
        }
    };
    

    // Mock Google sign-in function
    const handleGoogleSignIn = () => {
        toast.info("Google sign-in not implemented yet.");
        // Add your Google sign-in logic here
    };

    return (
        <div className="relative h-screen w-full">
            {/* Background video */}
            <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                src="https://cdn.pixabay.com/video/2023/08/23/177314-857365374_large.mp4" // Ensure this is the correct path to your video file
                autoPlay
                loop
                muted
            />

            {/* Overlay and Blur */}
            <div className="absolute inset-0 bg-black opacity-40 backdrop-blur-lg"></div>

            {/* Centered Login Form */}
            <div className="relative flex items-center justify-center h-full">
                <form
                    className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6 border border-gray-300 relative z-10"
                    onSubmit={handleSubmit}
                >
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Login</h1>
                    {error && <p className="text-red-500">{error}</p>}
                    
                    {/* Email Input */}
                    <div>
                        <label className="block mb-2 text-gray-700" htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="border px-3 py-2 w-full rounded-md bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    
                    {/* Password Input */}
                    <div>
                        <label className="block mb-2 text-gray-700" htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="border mb-2 px-3 py-2 w-full rounded-md bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <div className="text-right">
                            <Link to="/forgot-password" className="text-blue-600 hover:underline text-sm">Forgot password?</Link>
                        </div>
                    </div>
                    
                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Login
                    </button>
                    
                    {/* Or Sign In with Google */}
                    <div className="flex items-center justify-center my-4">
                        <span className="text-gray-500">or</span>
                    </div>
                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300 flex items-center justify-center"
                    >
                        <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                            <path fill="#EA4335" d="M24 9.5c3.3 0 6 1.1 8.2 3.2l6-6c-3.8-3.5-8.6-5.7-14.2-5.7C12.6 1 3.9 7.3 1.2 16.3l6.9 5.4C9.8 13.4 16.2 9.5 24 9.5z"></path>
                            <path fill="#34A853" d="M46.7 24.5c0-1.5-.1-2.9-.3-4.3H24v8.3h12.8c-.6 3.3-2.4 6.1-5.1 8.1l6.7 5.2c4-3.7 6.3-9.2 6.3-15.3z"></path>
                            <path fill="#4A90E2" d="M7.9 29.9c-1-3-1-6.3 0-9.3L1 15.2C-1.2 19.5-1.2 26 1 30.3l6.9-5.4z"></path>
                            <path fill="#FBBC05" d="M24 46c5.4 0 10-1.8 13.4-5l-6.7-5.2c-2.1 1.5-4.8 2.3-7.8 2.3-7.1 0-13.2-4.8-15.4-11.5l-6.9 5.4C7.8 41.5 15.4 46 24 46z"></path>
                        </svg>
                        Sign in with Google
                    </button>

                    {/* Sign Up Link */}
                    <div className="text-center mt-4">
                        <span className="text-gray-600">Don't have an account? </span>
                        <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
