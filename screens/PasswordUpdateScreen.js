import React, { useReducer, useContext } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { getAPI, putAPI } from '../api/ApiService';
import CommonStyles from '../styles/CommonStyles';
import CustomTextInput from '../styles/CustomTextInput';
import { AuthContext } from '../AuthContext'; // Import AuthContext
import CustomButton from '../styles/CustomButton';
import { initialState, reducer } from '../reducer/PasswordUpdateReducer';


const PasswordUpdateScreen = ({ navigation }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { user, updateUserPassword } = useContext(AuthContext); // Use context

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleUpdatePassword = async () => {
        let valid = true;

        // Reset error messages
        dispatch({ type: 'SET_EMAIL_ERROR', payload: '' });
        dispatch({ type: 'SET_NEW_PASSWORD_ERROR', payload: '' });
        dispatch({ type: 'SET_CONFIRM_NEW_PASSWORD_ERROR', payload: '' });

        // Validate email
        if (state.email.trim().length === 0) {
            dispatch({ type: 'SET_EMAIL_ERROR', payload: 'Email is required' });
            valid = false;
        } else if (!validateEmail(state.email)) {
            dispatch({ type: 'SET_EMAIL_ERROR', payload: 'Please enter a valid email' });
            valid = false;
        }

        // Validate new password
        if (state.newPassword.trim().length === 0) {
            dispatch({ type: 'SET_NEW_PASSWORD_ERROR', payload: 'New password is required' });
            valid = false;
        } else if (state.newPassword.trim().length < 6) {
            dispatch({ type: 'SET_NEW_PASSWORD_ERROR', payload: 'New password must have at least 6 characters' });
            valid = false;
        }

        // Validate confirm new password
        if (state.confirmNewPassword.trim().length === 0) {
            dispatch({ type: 'SET_CONFIRM_NEW_PASSWORD_ERROR', payload: 'Confirm new password is required' });
            valid = false;
        } else if (state.confirmNewPassword.trim().length < 6) {
            dispatch({ type: 'SET_CONFIRM_NEW_PASSWORD_ERROR', payload: 'Confirm new password must have at least 6 characters' });
            valid = false;
        } else if (state.newPassword !== state.confirmNewPassword) {
            dispatch({ type: 'SET_NEW_PASSWORD_ERROR', payload: 'Both new password and confirm new password should match' });
            valid = false;
        }

        if (valid) {
            try {
                dispatch({ type: 'SET_LOADING', payload: true }); // Show loading indicator

                const endpoint = "/users"; // Endpoint for fetching user data
                const users = await getAPI(endpoint); // Fetch user data

                // Find the user by email
                const user = users.find(user => user.email === state.email);

                if (user) {
                    const userId = user.id;
                    const updateEndpoint = `/users/${userId}`; // Endpoint for updating user data

                    // Update the user's password
                    const updatedUser = { ...user, password: state.newPassword };
                    await putAPI(updateEndpoint, updatedUser);

                    // Call context method to update the password in context if needed
                    if (updateUserPassword) {
                        updateUserPassword(userId, state.newPassword);
                    }

                    Alert.alert("Success", "Password updated successfully");

                    // Clear form fields
                    dispatch({ type: 'CLEAR_FORM' });
                    navigation.navigate('Login Screen'); // Navigate to Login Screen after successful password update
                } else {
                    Alert.alert("Error", "Email not found");
                }
            } catch (error) {
                console.error("Error updating password:", error);
                Alert.alert("Error", "An error occurred while updating password");
            } finally {
                dispatch({ type: 'SET_LOADING', payload: false }); // Hide loading indicator
            }
        }
    };

    return (
        <View style={CommonStyles.container}>
            <Text style={CommonStyles.header}>Update Password</Text>

            <CustomTextInput
                iconName="envelope"
                placeholder="Email ID"
                value={state.email}
                onChangeText={(text) => dispatch({ type: 'SET_EMAIL', payload: text })}
                keyboardType="email-address"
            />
            {state.emailError ? <Text style={CommonStyles.errorText}>{state.emailError}</Text> : null}

            <CustomTextInput
                iconName="lock"
                placeholder="New Password"
                value={state.newPassword}
                onChangeText={(text) => dispatch({ type: 'SET_NEW_PASSWORD', payload: text })}
                secureTextEntry={!state.showNewPassword}
                rightIcon={
                    <TouchableOpacity onPress={() => dispatch({ type: 'TOGGLE_SHOW_NEW_PASSWORD' })} style={CommonStyles.eyeIcon}>
                        <FontAwesome5 name={state.showNewPassword ? "eye-slash" : "eye"} size={20} color="black" />
                    </TouchableOpacity>
                }
            />
            {state.newPasswordError ? <Text style={CommonStyles.errorText}>{state.newPasswordError}</Text> : null}

            <CustomTextInput
                iconName="lock"
                placeholder="Confirm New Password"
                value={state.confirmNewPassword}
                onChangeText={(text) => dispatch({ type: 'SET_CONFIRM_NEW_PASSWORD', payload: text })}
                secureTextEntry={!state.showConfirmNewPassword}
                rightIcon={
                    <TouchableOpacity onPress={() => dispatch({ type: 'TOGGLE_SHOW_CONFIRM_NEW_PASSWORD' })} style={CommonStyles.eyeIcon}>
                        <FontAwesome5 name={state.showConfirmNewPassword ? "eye-slash" : "eye"} size={20} color="black" />
                    </TouchableOpacity>
                }
            />
            {state.confirmNewPasswordError ? <Text style={CommonStyles.errorText}>{state.confirmNewPasswordError}</Text> : null}

            {state.isLoading ? (
                <ActivityIndicator size="large" color="#007BFF" />
            ) : (
                <CustomButton onPress={handleUpdatePassword} title="Update Password" />
            )}

            <TouchableOpacity onPress={() => navigation.navigate('Login Screen')}>
                <Text style={CommonStyles.navigationText}>Back to Log In</Text>
            </TouchableOpacity>
        </View>
    );
};

export default PasswordUpdateScreen;
