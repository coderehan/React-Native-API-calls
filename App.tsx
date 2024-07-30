import React, { useContext, useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthenticationStackNavigator, HomeStackNavigator } from './navigation/StackNavigator';
import { AuthContext, AuthProvider } from './AuthContext';

const AppContent = () => {
  const { user } = useContext(AuthContext); // Use context inside a component wrapped with AuthProvider
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect(() => {
    // Context should already handle authentication status
    setIsLoading(false); // Set loading to false once context is loaded
  }, [user]); // Depend on user context

  if (isLoading) {
    // Show a loading indicator while checking login status
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? (
        <HomeStackNavigator />
      ) : (
        <AuthenticationStackNavigator />
      )}
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
