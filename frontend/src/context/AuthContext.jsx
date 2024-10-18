import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    const login = (email) => {
        setIsAuthenticated(true);
        setUserEmail(email); // Store user email on login
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserEmail(''); // Clear user email on logout
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userEmail, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
