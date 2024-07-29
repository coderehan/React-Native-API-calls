// SplashScreen.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Login Screen'); 
        }, 3000);

        return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/image_reactnative.png')} 
                style={styles.image}
            />
            <Text style={styles.text}>Welcome to React Native App!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    image: {
        width: 150, 
        height: 150, 
        marginBottom: 20, 
    },
    text: {
        fontSize: 24,
        color: 'black',
    },
});

export default SplashScreen;
