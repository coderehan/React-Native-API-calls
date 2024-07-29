import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { getAPI, putAPI } from '../api/ApiService';

const PasswordUpdateScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');
    const [confirmNewPasswordError, setConfirmNewPasswordError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfrimNewPassword, setShowConfirmNewPassword] = useState(false); 

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
            setNewPasswordError('New Password must have at least 6 characters');
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
        <View style={styles.container}>
            <Text style={styles.header}>Update Password</Text>

            <View style={styles.inputContainer}>
                <FontAwesome5 name="envelope" size={20} color="black" style={styles.icon} />
                <TextInput
                    placeholder="Email ID"
                    style={[styles.input, emailError ? styles.inputError : null]}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
            </View>
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

            <View style={styles.inputContainer}>
                <FontAwesome5 name="lock" size={20} color="black" style={styles.icon} />
                <TextInput
                    placeholder="New Password"
                    style={[styles.input, newPasswordError ? styles.inputError : null]}
                    value={newPassword}
                    onChangeText={setNewPassword}
                    secureTextEntry={!showNewPassword} // Toggle password visibility
                />
                <TouchableOpacity onPress={() => setShowNewPassword(prev => !prev)} style={styles.eyeIcon}>
                    <FontAwesome5 name={showNewPassword ? "eye-slash" : "eye"} size={20} color="black" />
                </TouchableOpacity>
            </View>
            {newPasswordError ? <Text style={styles.errorText}>{newPasswordError}</Text> : null}

            <View style={styles.inputContainer}>
                <FontAwesome5 name="lock" size={20} color="black" style={styles.icon} />
                <TextInput
                    placeholder="Confirm New Password"
                    style={[styles.input, confirmNewPasswordError ? styles.inputError : null]}
                    value={confirmNewPassword}
                    onChangeText={setConfirmNewPassword}
                    secureTextEntry={!showConfrimNewPassword} // Toggle password visibility
                />
                <TouchableOpacity onPress={() => setShowConfirmNewPassword(prev => !prev)} style={styles.eyeIcon}>
                    <FontAwesome5 name={showConfrimNewPassword ? "eye-slash" : "eye"} size={20} color="black" />
                </TouchableOpacity>
            </View>
            {confirmNewPasswordError ? <Text style={styles.errorText}>{confirmNewPasswordError}</Text> : null}

            {isLoading ? (
                <ActivityIndicator size="large" color="#007BFF" />
            ) : (
                <Button
                    title="Update Password"
                    onPress={handleUpdatePassword}
                    color="#007BFF"
                    style={styles.button}
                />
            )}

            <TouchableOpacity onPress={() => navigation.navigate('Login Screen')}>
                <Text style={styles.loginText}>Back to Log In</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'white',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
    },
    input: {
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
    },
    inputError: {
        borderColor: 'red',
    },
    icon: {
        paddingHorizontal: 10,
    },
    eyeIcon: {
        paddingHorizontal: 10,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    button: {
        marginTop: 20,
    },
    loginText: {
        textAlign: 'center',
        marginTop: 20,
        color: '#007BFF',
    },
});

export default PasswordUpdateScreen;
