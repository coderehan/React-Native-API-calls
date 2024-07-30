import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignupScreen from "../screens/SignUpScreen";
import LoginScreen from "../screens/LoginScreen";
import { BottomTabNavigator } from "./BottomTabNavigator";
import PasswordUpdateScreen from "../screens/PasswordUpdateScreen";
import SplashScreen from "../screens/SplashScreen";

const Stack = createStackNavigator();

export const AuthenticationStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={'Splash Screen'}>
      <Stack.Screen name="Splash Screen" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login Screen" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp Screen" component={SignupScreen} />
      <Stack.Screen name="Password Update Screen" component={PasswordUpdateScreen} />
    </Stack.Navigator>
  );
};

export const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home Screen" component={BottomTabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
