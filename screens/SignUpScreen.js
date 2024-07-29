import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, TextInput, Button, Text, ActivityIndicator } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { postAPI } from '../api/ApiService';

const SignUpScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSignUp = async () => {
        let valid = true;

        // Reset error messages
        setUsernameError('');
        setEmailError('');
        setPasswordError('');

        // Validate username
        if (username.trim().length === 0) {
            setUsernameError('Username is required');
            valid = false;
        }

        // Validate email
        if (email.trim().length === 0) {
            setEmailError('Email is required');
            valid = false;
        } else if (!validateEmail(email)) {
            setEmailError('Please enter a valid email');
            valid = false;
        }

        // Validate password
        if (password.trim().length === 0) {
            setPasswordError('Password is required');
            valid = false;
        } else if (password.trim().length < 6) {
            setPasswordError('Password must have at least 6 characters');
            valid = false;
        }

        if (valid) {
            try {
                setIsLoading(true); // Show loading indicator

                const endpoint = "/users";
                const body = { username, email, password };

                // Call the API service to perform POST request
                const result = await postAPI(endpoint, body);

                if (result) {
                    console.log("User created successfully:", result);
                    Alert.alert("Success", "User created successfully");
                    // Clear form fields
                    setUsername('');
                    setEmail('');
                    setPassword('');
                    navigation.navigate('Login Screen'); // Navigate to Login Screen after successful signup
                } else {
                    console.warn("Failed to create user:", result);
                    Alert.alert("Error", "Failed to create user");
                }
            } catch (error) {
                console.error("Error creating user:", error);
                Alert.alert("Error", "An error occurred during signup");
            } finally {
                setIsLoading(false); // Hide loading indicator
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Sign Up</Text>

            <View style={styles.inputContainer}>
                <FontAwesome5 name="user" size={20} color="black" style={styles.icon} />
                <TextInput
                    placeholder="Username"
                    style={[styles.input, usernameError ? styles.inputError : null]}
                    value={username}
                    onChangeText={setUsername}
                />
            </View>
            {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}

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
                    placeholder="Password"
                    style={[styles.input, passwordError ? styles.inputError : null]}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword} // Toggle password visibility
                />
                <TouchableOpacity onPress={() => setShowPassword(prev => !prev)} style={styles.eyeIcon}>
                    <FontAwesome5 name={showPassword ? "eye-slash" : "eye"} size={20} color="black" />
                </TouchableOpacity>
            </View>

            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

            {isLoading ? (
                <ActivityIndicator size="large" color="#007BFF" />
            ) : (
                <Button
                    title="Signup"
                    onPress={handleSignUp}
                    color="#007BFF"
                    style={styles.button}
                />
            )}

            <TouchableOpacity onPress={() => navigation.navigate('Login Screen')}>
                <Text style={styles.loginText}>Already have an account? Log in</Text>
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
    loginText: {
        textAlign: 'center',
        marginTop: 20,
        color: '#007BFF',
    },
    button: {
        marginTop: 20,
    },
});

export default SignUpScreen;
