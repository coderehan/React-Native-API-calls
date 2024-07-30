import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check for stored user ID and name on app start
        const checkAuthStatus = async () => {
            try {
                const userId = await AsyncStorage.getItem('userId');
                const userName = await AsyncStorage.getItem('userName');
                if (userId && userName) {
                    setUser({ id: userId, name: userName });
                }
            } catch (error) {
                console.error('Error checking auth status:', error);
            }
        };

        checkAuthStatus();
    }, []);

    const login = (userData) => {
        setUser(userData);
        // Store user ID and name in AsyncStorage
        AsyncStorage.setItem('userId', userData.id.toString());
        AsyncStorage.setItem('userName', userData.name);
    };

    const logout = async () => {
        setUser(null);
        // Remove user ID and name from AsyncStorage
        await AsyncStorage.removeItem('userId');
        await AsyncStorage.removeItem('userName');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
