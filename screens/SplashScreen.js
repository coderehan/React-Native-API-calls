import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const SplashScreen = ({ navigation }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.5)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            }),
        ]).start();

        const timer = setTimeout(() => {
            navigation.replace('Login Screen');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigation, fadeAnim, scaleAnim]);

    return (
        <View style={styles.container}>
            <Animated.Image
                source={require('../assets/images/react_native_image.png')}
                style={[
                    styles.image,
                    {
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }],
                    },
                ]}
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