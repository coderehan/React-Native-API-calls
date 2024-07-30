import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { getAPI, putAPI } from '../api/ApiService';
import CommonStyles from '../styles/CommonStyles';
import CustomTextInput from '../styles/CustomTextInput';
import { AuthContext } from '../AuthContext'; // Import AuthContext

const PasswordUpdateScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');
    const [confirmNewPasswordError, setConfirmNewPasswordError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

    const { user, updateUserPassword } = useContext(AuthContext); // Use context

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleUpdatePassword = async () => {
        let valid = true;

        // Reset error messages
        setEmailError('');
        setNewPasswordError('');
        setConfirmNewPasswordError('');

        // Validate email
        if (email.trim().length === 0) {
            setEmailError('Email is required');
            valid = false;
        } else if (!validateEmail(email)) {
            setEmailError('Please enter a valid email');
            valid = false;
        }

        // Validate new password
        if (newPassword.trim().length === 0) {
            setNewPasswordError('New password is required');
            valid = false;
        } else if (newPassword.trim().length < 6) {
            setNewPasswordError('New password must have at least 6 characters');
            valid = false;
        }

        // Validate confirm new password
        if (confirmNewPassword.trim().length === 0) {
            setConfirmNewPasswordError('Confirm new password is required');
            valid = false;
        } else if (confirmNewPassword.trim().length < 6) {
            setConfirmNewPasswordError('Confirm new password must have at least 6 characters');
            valid = false;
        } else if (newPassword !== confirmNewPassword) {
            setNewPasswordError('Both new password and confirm new password should match');
            valid = false;
        }

        if (valid) {
            try {
                setIsLoading(true); // Show loading indicator

                const endpoint = "/users"; // Endpoint for fetching user data
                const users = await getAPI(endpoint); // Fetch user data

                // Find the user by email
                const user = users.find(user => user.email === email);

                if (user) {
                    const userId = user.id;
                    const updateEndpoint = `/users/${userId}`; // Endpoint for updating user data

                    // Update the user's password
                    const updatedUser = { ...user, password: newPassword };
                    await putAPI(updateEndpoint, updatedUser);

                    // Call context method to update the password in context if needed
                    if (updateUserPassword) {
                        updateUserPassword(userId, newPassword);
                    }

                    Alert.alert("Success", "Password updated successfully");

                    // Clear form fields
                    setEmail('');
                    setNewPassword('');
                    setConfirmNewPassword('');
                    navigation.navigate('Login Screen'); // Navigate to Login Screen after successful password update
                } else {
                    Alert.alert("Error", "Email not found");
                }
            } catch (error) {
                console.error("Error updating password:", error);
                Alert.alert("Error", "An error occurred while updating password");
            } finally {
                setIsLoading(false); // Hide loading indicator
            }
        }
    };

    return (
        <View style={CommonStyles.container}>
            <Text style={CommonStyles.header}>Update Password</Text>

            <CustomTextInput
                iconName="envelope"
                placeholder="Email ID"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            {emailError ? <Text style={CommonStyles.errorText}>{emailError}</Text> : null}

            <CustomTextInput
                iconName="lock"
                placeholder="New Password"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!showNewPassword}
                rightIcon={
                    <TouchableOpacity onPress={() => setShowNewPassword(prev => !prev)} style={CommonStyles.eyeIcon}>
                        <FontAwesome5 name={showNewPassword ? "eye-slash" : "eye"} size={20} color="black" />
                    </TouchableOpacity>
                }
            />
            {newPasswordError ? <Text style={CommonStyles.errorText}>{newPasswordError}</Text> : null}

            <CustomTextInput
                iconName="lock"
                placeholder="Confirm New Password"
                value={confirmNewPassword}
                onChangeText={setConfirmNewPassword}
                secureTextEntry={!showConfirmNewPassword}
                rightIcon={
                    <TouchableOpacity onPress={() => setShowConfirmNewPassword(prev => !prev)} style={CommonStyles.eyeIcon}>
                        <FontAwesome5 name={showConfirmNewPassword ? "eye-slash" : "eye"} size={20} color="black" />
                    </TouchableOpacity>
                }
            />
            {confirmNewPasswordError ? <Text style={CommonStyles.errorText}>{confirmNewPasswordError}</Text> : null}

            {isLoading ? (
                <ActivityIndicator size="large" color="#007BFF" />
            ) : (
                <TouchableOpacity onPress={handleUpdatePassword} style={CommonStyles.button}>
                    <Text style={CommonStyles.buttonText}>Update Password</Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity onPress={() => navigation.navigate('Login Screen')}>
                <Text style={CommonStyles.navigationText}>Back to Log In</Text>
            </TouchableOpacity>
        </View>
    );
};

export default PasswordUpdateScreen;
