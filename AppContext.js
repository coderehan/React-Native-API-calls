import React, { createContext, useState } from 'react';

// Create Context
export const AppContext = createContext();

// Create a Provider Component
export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Example state

    // Example functions to manipulate the state
    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AppContext.Provider value={{ user, login, logout }}>
            {children}
        </AppContext.Provider>
    );
};
