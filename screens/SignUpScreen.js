import React, { useReducer, useContext } from 'react';
import { View, TouchableOpacity, Alert, Text, ActivityIndicator } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { postAPI } from '../api/ApiService';
import CommonStyles from '../styles/CommonStyles';
import CustomTextInput from '../styles/CustomTextInput';
import { AuthContext } from '../AuthContext';
import CustomButton from '../styles/CustomButton';
import { initialState, reducer } from '../reducer/SignUpReducer'; // Import reducer and initial state

const SignUpScreen = ({ navigation }) => {
    const { login } = useContext(AuthContext); // Use the context
    const [state, dispatch] = useReducer(reducer, initialState); // Initialize useReducer

    const {
        username,
        email,
        password,
        usernameError,
        emailError,
        passwordError,
        isLoading,
        showPassword
    } = state;

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSignUp = async () => {
        let valid = true;

        dispatch({ type: 'SET_USERNAME_ERROR', payload: '' });
        dispatch({ type: 'SET_EMAIL_ERROR', payload: '' });
        dispatch({ type: 'SET_PASSWORD_ERROR', payload: '' });

        if (username.trim().length === 0) {
            dispatch({ type: 'SET_USERNAME_ERROR', payload: 'Username is required' });
            valid = false;
        }

        if (email.trim().length === 0) {
            dispatch({ type: 'SET_EMAIL_ERROR', payload: 'Email is required' });
            valid = false;
        } else if (!validateEmail(email)) {
            dispatch({ type: 'SET_EMAIL_ERROR', payload: 'Please enter a valid email' });
            valid = false;
        }

        if (password.trim().length === 0) {
            dispatch({ type: 'SET_PASSWORD_ERROR', payload: 'Password is required' });
            valid = false;
        } else if (password.trim().length < 6) {
            dispatch({ type: 'SET_PASSWORD_ERROR', payload: 'Password must have at least 6 characters' });
            valid = false;
        }

        if (valid) {
            try {
                dispatch({ type: 'SET_LOADING', payload: true });

                const endpoint = "/users";
                const body = { username, email, password };

                const result = await postAPI(endpoint, body);

                if (result) {
                    console.log("User created successfully:", result);
                    Alert.alert("Success", "User created successfully");

                    login(result); // Use login function from context

                    // Clear the form data once data is submitted successfully
                    dispatch({ type: 'CLEAR_FORM' });
                    navigation.navigate('Login Screen');
                } else {
                    console.warn("Failed to create user:", result);
                    Alert.alert("Error", "Failed to create user");
                }
            } catch (error) {
                console.error("Error creating user:", error);
                Alert.alert("Error", "An error occurred during signup");
            } finally {
                dispatch({ type: 'SET_LOADING', payload: false });
            }
        }
    };

    return (
        <View style={CommonStyles.container}>
            <Text style={CommonStyles.header}>Sign Up</Text>

            <CustomTextInput
                iconName="user"
                placeholder="Username"
                value={username}
                onChangeText={(text) => dispatch({ type: 'SET_USERNAME', payload: text })}
            />
            {usernameError ? <Text style={CommonStyles.errorText}>{usernameError}</Text> : null}

            <CustomTextInput
                iconName="envelope"
                placeholder="Email ID"
                value={email}
                onChangeText={(text) => dispatch({ type: 'SET_EMAIL', payload: text })}
                keyboardType="email-address"
            />
            {emailError ? <Text style={CommonStyles.errorText}>{emailError}</Text> : null}

            <CustomTextInput
                iconName="lock"
                placeholder="Password"
                value={password}
                onChangeText={(text) => dispatch({ type: 'SET_PASSWORD', payload: text })}
                secureTextEntry={!showPassword}
                rightIcon={
                    <TouchableOpacity onPress={() => dispatch({ type: 'TOGGLE_SHOW_PASSWORD' })} style={CommonStyles.eyeIcon}>
                        <FontAwesome5 name={showPassword ? "eye-slash" : "eye"} size={20} color="black" />
                    </TouchableOpacity>
                }
            />
            {passwordError ? <Text style={CommonStyles.errorText}>{passwordError}</Text> : null}

            {isLoading ? (
                <ActivityIndicator size="large" color="#007BFF" />
            ) : (
                <CustomButton onPress={handleSignUp} title="Signup" />
            )}

            <TouchableOpacity onPress={() => navigation.navigate('Login Screen')}>
                <Text style={CommonStyles.navigationText}>Already have an account? Log in</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SignUpScreen;
