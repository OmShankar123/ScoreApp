import React, { useEffect, useRef } from 'react';
import { View, ImageBackground, Image, StyleSheet, Text, Animated } from 'react-native';

const SplashScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        navigation.navigate('Login');
      }, 1000);
    });
  }, [fadeAnim, navigation]);

  return (
    // <ImageBackground
    //   source={require('../assests/Images/scorebg.webp')}
    //   style={styles.backgroundImage}
    // >
      
      <View style={styles.container}>
        <Animated.Image
          style={[styles.logo, { opacity: fadeAnim }]}
          source={require('../assests/Images/scorelogo.webp')}
        />
        <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>Score App Design and Build By Om</Animated.Text>
        <Animated.Text style={[styles.subtitle, { opacity: fadeAnim }]}>
          Enter Your Score 
        </Animated.Text>
      </View>
    //  </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#FFA500',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    resizeMode: 'cover',
    alignItems: 'center',

  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default SplashScreen;
