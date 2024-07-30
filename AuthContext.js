import React, { createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActionTypes, AuthReducer } from './reducer/AuthReducer';

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
    // Initialize state with useReducer
    const [state, dispatch] = useReducer(AuthReducer, { user: null });

    useEffect(() => {
        // Function to check authentication status on app start
        const checkAuthStatus = async () => {
            try {
                const userId = await AsyncStorage.getItem('userId');
                const userName = await AsyncStorage.getItem('userName');
                if (userId && userName) {
                    // Dispatch LOGIN action if user data is found
                    dispatch({
                        type: ActionTypes.LOGIN,
                        payload: { id: userId, name: userName },
                    });
                }
            } catch (error) {
                console.error('Error checking auth status:', error);
            }
        };

        checkAuthStatus();
    }, []);

    // Function to log in the user
    const login = async (userData) => {
        dispatch({
            type: ActionTypes.LOGIN,
            payload: userData,
        });
        await AsyncStorage.setItem('userId', userData.id.toString());
        await AsyncStorage.setItem('userName', userData.name);
    };

    // Function to log out the user
    const logout = async () => {
        dispatch({
            type: ActionTypes.LOGOUT,
        });
        await AsyncStorage.removeItem('userId');
    };

    return (
        <AuthContext.Provider value={{ user: state.user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
