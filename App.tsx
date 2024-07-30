import React, { useContext, useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthenticationStackNavigator, HomeStackNavigator } from './navigation/StackNavigator';
import { AuthContext, AuthProvider } from './AuthContext';

const AppContent = () => {
  // Use the AuthContext to get the current user
  const { user } = useContext(AuthContext);
  // State to track loading status
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Effect to handle the loading state based on user context
    setIsLoading(false); // Set loading to false once context is loaded
  }, [user]); // Run this effect when 'user' changes

  if (isLoading) {
    // Show a loading indicator while checking login status
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    // Conditionally render the stack navigator based on the user's authentication status
    <NavigationContainer>
      {user ? (
        <HomeStackNavigator /> // Show home stack if user is authenticated
      ) : (
        <AuthenticationStackNavigator /> // Show authentication stack if user is not authenticated
      )}
    </NavigationContainer>
  );
};

const App = () => {
  return (
    // Wrap the app content with the AuthProvider to provide authentication context
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
