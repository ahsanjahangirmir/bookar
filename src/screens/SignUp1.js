import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, Animated } from 'react-native';
import { Platform } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from '../../assets/styles/signup1Styles';
import {ipAddr} from './ipconfig.js';

const Screen2 = ({ navigation, route }) => {
  const {userType} = route.params; 
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [reEnterPassword, setReEnterPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Error Message Animation 
  
  const [errorMessage, setErrorMessage] = useState('');
  const [slideDownAnim] = useState(new Animated.Value(-50));
  const [fadeAnim] = useState(new Animated.Value(0));

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };

  const slideDown = () => {
    Animated.timing(slideDownAnim, {
      toValue: Platform.OS === 'ios' ? -350 : 0, // Adjust this value to slide to the correct position from the top
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  
  const slideUp = () => {
    Animated.timing(slideDownAnim, {
      toValue: -1000, // Start off-screen, above the view
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  
  
  const setErrorMessageWithAnimation = (message) => {
    setErrorMessage(message);
    fadeIn();
    slideDown();
  
    setTimeout(() => {
      fadeOut();
      slideUp();
    }, 3000); // Adjust timing as needed
  };

  const errorBubbleStyle = {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: 'red', // Red bubble
    borderRadius: 20, // Rounded corners
    padding: 10,
    paddingHorizontal: 20,
    zIndex: 10, // Ensure it's above other components
  };

  const validateAndNavigate = async () => {
    if (!username || !email || !phoneNumber || !password || !reEnterPassword) {
      setErrorMessageWithAnimation('All fields are required.');
    } else if (!isValidUsername(username)) {
      setErrorMessageWithAnimation('Username must be between 4 and 30 characters.');
    } else if (password !== reEnterPassword) {
      setErrorMessageWithAnimation('Passwords do not match.');
    } else if (!isValidEmail(email)) {
      setErrorMessageWithAnimation('Please enter a valid email address.');
    } else if (!isValidPassword(password)) {
      setErrorMessageWithAnimation('Password must be at least 8 characters long and include a mix of uppercase, lowercase, numbers, and special characters.');
    } else if (!isValidPhoneNumber(phoneNumber)) {
      setErrorMessageWithAnimation('Phone number must start with 03 and contain 11 digits.');
    } else {
      try {
        const response = await fetch(`http://${ipAddr}:3000/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            email,
            password,
            phoneNumber,
          }),
        });
  
        if (response.ok) {
          navigation.navigate('SignUp2', { userType, username, email, phoneNumber, password });
        } else {
          throw new Error('Failed to sign up');
        }
      } catch (error) {
        console.error('Signup error:', error);
        Alert.alert('Error', 'Failed to sign up');
      }
    }
  };
  
  
  const isValidEmail = (email) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  };
  
  
  const isValidPassword = (password) => {
    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // return passwordRegex.test(password);
    return password.length >= 8;
  };

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^03\d{9}$/;
    return phoneRegex.test(phoneNumber);
  };

  const isValidUsername = (username) => {
    const usernameRegex = /^[A-Za-z]{4,30}$/;
    return usernameRegex.test(username);
  };
  

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >

    <View style={styles.container}>

      <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('UserType')}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.settingYou}>
        <Text>Setting</Text>{'\n'}
        <Text>You</Text>{'\n'}
        <Text>Up</Text>{'\n'}
      </Text>
      </View>
      <Animated.View
          style={[
            errorBubbleStyle,
            { 
              opacity: fadeAnim,
              transform: [{ translateY: slideDownAnim }] // Animate vertical position
            }
          ]}
        >
          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      </Animated.View>
      <View style={styles.inputContainer}>
        <View style={styles.inputIcon}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="rgba(255, 255, 255, 0.75)"
            onChangeText={setUsername}
          />
          <Image source={require('../../assets/images/username-icon.png')} style={styles.icon} />
        </View>
        <View style={styles.inputIcon}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="rgba(255, 255, 255, 0.75)"
            onChangeText={setEmail}
          />
          <Image source={require('../../assets/images/email-icon.png')} style={styles.icon} />
        </View>
        <View style={styles.inputIcon}>
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="rgba(255, 255, 255, 0.75)"
            keyboardType='numeric'
            onChangeText={setPhoneNumber}
          />
          <Image source={require('../../assets/images/phone-icon.png')} style={styles.icon} />
        </View>
        <View style={styles.inputIcon}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="rgba(255, 255, 255, 0.75)"
            secureTextEntry
            onChangeText={setPassword}
          />
          <Image source={require('../../assets/images/pw-lock-icon.png')} style={styles.icon} />
        </View>
        <View style={styles.inputIcon}>
          <TextInput
            style={styles.input}
            placeholder="Re-enter Password"
            placeholderTextColor="rgba(255, 255, 255, 0.75)"
            secureTextEntry
            onChangeText={setReEnterPassword}
          />
          <Image source={require('../../assets/images/pw-lock-icon.png')} style={styles.icon} />
        </View>
      </View>
      <View style={styles.termsContainer}>
  <TouchableOpacity style={styles.checkbox} onPress={() => setTermsAccepted(!termsAccepted)}>
    {termsAccepted && <Text style={styles.tickMark}>✔</Text>}
  </TouchableOpacity>

  <Text style={styles.acceptText}>Accept</Text>
  <Text style={styles.termsText}>Terms & Conditions</Text>
</View>
      <TouchableOpacity
        style={[styles.button, styles.buttonBackground]}
        onPress={validateAndNavigate}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
    </KeyboardAvoidingView>
  );
  };  
  Screen2.navigationOptions = {
    headerShown: false,
  };
export default Screen2;
