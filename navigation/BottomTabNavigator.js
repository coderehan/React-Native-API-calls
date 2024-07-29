import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/HomeScreen";
import { ListScreen } from "../screens/ListScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const BottomTab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
    return (
        <BottomTab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
                let iconName;
                if (route.name === 'Home') {
                    iconName = 'home';
                } else if (route.name === 'List') {
                    iconName = 'list';
                } else if (route.name === 'Profile') {
                    iconName = 'user';
                }
                return <FontAwesome5 name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor: 'gray',
            tabBarLabelStyle: {
                fontSize: 20,
            },
        })}
        >
            <BottomTab.Screen name='Home' component={HomeScreen} />
            <BottomTab.Screen name='List' component={ListScreen} />
            <BottomTab.Screen name='Profile' component={ProfileScreen} />
        </BottomTab.Navigator>
    )
}