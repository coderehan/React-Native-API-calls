import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// This context contains the authentication-related data and functions such as user, login, and logout.
// Create a context for authentication
export const AuthContext = createContext();

// Create a provider component for authentication
export const AuthProvider = ({ children }) => {
    // State to hold the current user data
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Function to check for stored user ID and name on app start
        const checkAuthStatus = async () => {
            try {
                // Retrieve user ID and name from AsyncStorage
                const userId = await AsyncStorage.getItem('userId');
                const userName = await AsyncStorage.getItem('userName');
                console.log('Retrieved User ID:', userId);
                console.log('Retrieved User Name:', userName);
                // If user ID and name are found, set the user state
                if (userId && userName) {
                    setUser({ id: userId, name: userName });
                }
            } catch (error) {
                // Log any errors that occur during retrieval
                console.error('Error checking auth status:', error);
            }
        };

        // Call the checkAuthStatus function when the component mounts
        checkAuthStatus();
    }, []);

    // Function to log in the user
    const login = (userData) => {
        // Set the user state with the provided user data
        setUser(userData);
        // Store user ID and name in AsyncStorage
        AsyncStorage.setItem('userId', userData.id.toString());
        AsyncStorage.setItem('userName', userData.name);
    };

    // Function to log out the user
    const logout = async () => {
        // Clear the user state
        setUser(null);
        // Remove user ID and name from AsyncStorage
        await AsyncStorage.removeItem('userId');
        await AsyncStorage.removeItem('userName');
    };

    // Provide the user, login, and logout functions to the rest of the app
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
