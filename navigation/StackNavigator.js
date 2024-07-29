// StackNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignupScreen from "../screens/SignUpScreen";
import LoginScreen from "../screens/LoginScreen";
import { BottomTabNavigator } from "./BottomTabNavigator"; 
import PasswordUpdateScreen from "../screens/PasswordUpdateScreen";

const Stack = createStackNavigator();

export const StackNavigator = () => {
  
  return (
    <Stack.Navigator initialRouteName={'Login Screen'}>
      <Stack.Screen name="Login Screen" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp Screen" component={SignupScreen} />
      <Stack.Screen name="Password Update Screen" component={PasswordUpdateScreen} />
      <Stack.Screen name="Home Screen" component={BottomTabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
