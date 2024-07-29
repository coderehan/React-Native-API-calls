import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { getAPI } from '../api/ApiService';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleLogin = async () => {
        let valid = true;

        // Reset error messages
        setEmailError('');
        setPasswordError('');

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

                const endpoint = "/users"; // Endpoint for fetching user data
                const users = await getAPI(endpoint); // Fetch user data using axiosSystemInstance

                // Check if email and password match any user
                const user = users.find(user => user.email === email && user.password === password);

                if (user) {
                    Alert.alert("Success", "Login successful");
                    // Clear form fields
                    setEmail('');
                    setPassword('');
                    navigation.navigate('Home Screen'); // Navigate to Home screen after successful login
                } else {
                    Alert.alert("Error", "Invalid email or password");
                }
            } catch (error) {
                console.error("Error logging in:", error);
                Alert.alert("Error", "An error occurred during login");
            } finally {
                setIsLoading(false); // Hide loading indicator
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Log In</Text>

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
                    title="Login"
                    onPress={handleLogin}
                    color="#007BFF"
                    style={styles.button}
                />
            )}

            <TouchableOpacity onPress={() => navigation.navigate('SignUp Screen')}>
                <Text style={styles.signUpText}>Don't have an account? Sign up</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Password Update Screen')}>
                <Text style={styles.signUpText}>Forgot Password?</Text>
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
    signUpText: {
        textAlign: 'center',
        marginTop: 20,
        color: '#007BFF',
    },
});

export default LoginScreen;
