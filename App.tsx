import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthenticationStackNavigator, HomeStackNavigator } from "./navigation/StackNavigator";
import { AppProvider, AppContext } from "./AppContext"; // Adjust the path as needed

const App = () => {
  // Use context to determine which navigator to show
  const { user } = useContext(AppContext);

  return (
    <AppProvider>
      <NavigationContainer>
        {user ? <HomeStackNavigator /> : <AuthenticationStackNavigator />}
      </NavigationContainer>
    </AppProvider>
  );
};

export default App;
