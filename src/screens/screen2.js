import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Platform } from 'react-native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { HeaderBackButton } from '@react-navigation/stack';
import { KeyboardAvoidingView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Screen2 = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [reEnterPassword, setReEnterPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateAndNavigate = async () => {
    if (!username || !email || !phoneNumber || !password || !reEnterPassword) {
      setErrorMessage('All fields are required.');
    } else if (password !== reEnterPassword) {
      setErrorMessage('Passwords do not match.');
    } else if (!isValidEmail(email)) {
      setErrorMessage('Invalid email address.');
    } else if (!isValidPassword(password)) {
      setErrorMessage('Password must be at least 8 characters long.');
    } else {
      setErrorMessage(''); // Clear error message if validation passes
      try {
        const response = await fetch('http://localhost:3000/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            email,
            password,
            phoneNumber: phoneNumber,
          }),
        });
  
        if (response.ok) {
          navigation.navigate('Screen3');
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
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const isValidPassword = (password) => {
    // Password must be at least 8 characters long
    return password.length >= 8;
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >

    <View style={styles.container}>

      <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Signup')}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
        <Text style={styles.settingYou}>Setting you</Text>
        <Text style={styles.up}>up in</Text>
      </View>
      <View style={styles.errorContainer}>
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      </View>
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
  <TouchableOpacity style={styles.checkbox} />

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

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: -50, // Adjust this value as needed
    marginLeft:70,  // Adjust this value as needed
    marginTop: 5, // Adjust this value as needed
    paddingTop: 20, // Adjust this value as needed
  },
  checkbox: {
    width: 21,
    height: 21,
    borderWidth: 2, // Add this line
    borderColor: '#D45A01', // Add this line
    backgroundColor: 'transparent', // Change this line
    marginRight: 10, // Adjust this value as needed
  },
  acceptText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Urbanist', // Make sure this font is linked in your project
  },
  termsText: {
    color: '#D45A01',
    fontSize: 16,
    fontFamily: 'Urbanist',
    paddingLeft: 5, // Make sure this font is linked in your project
  },
  settingYou: {
    position: 'absolute',
    top: 58,
    left: 7,
    width: 286,
    height: 129, // Half of 258
    fontSize: 44.5,
    fontFamily: 'Montserrat',
    color: '#D45A01',
  },
  up: {
    position: 'absolute',
    top: 123, // 58 + 129
    left: 7,
    width: 286,
    height: 129, // Half of 258
    fontSize: 45,
    fontFamily: 'Montserrat',
    color: '#D45A01',
  },
  container: {
    flex: 2,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#00170C', // Changed background color
    height: 333, // Adjusted height to fit the content
  },
  errorContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: -10,
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputIcon: {
    flexDirection: 'row',
    // alignItems: 'center',
    marginBottom: 1,
  },
  icon: {
    width: 20, // Adjust icon width as needed
    height: 20, // Adjust icon height as needed
    position: 'absolute',
    left: 7, // Adjust left position to place the icon inside the TextInput
    marginTop: 21,
  },
  input: {
    fontSize: 16,
    height: 59,
    borderColor: '#853902',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 50, // Adjust paddingLeft to create space for the icon
    color: '#C4C4C4',
    backgroundColor: '#853902',
    borderRadius: 13,
    fontFamily: 'Urbanist',
    width: '95%', // Adjusted width to fit the screen
  },
  button: {
    backgroundColor: '#853902',
    borderRadius: 56.5,
    padding: 13,
    marginTop: 60,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#FF6347', // Orange color from Screen1
    width: '99%', // Adjusted width to fit the screen
  },
  buttonBackground: {
    backgroundColor: '#D45A01', // Orange color from Screen1
  },
  buttonText: {
    color: '#C4C4C4',
    textAlign: 'center',
    fontFamily: 'Urbanist',
    fontSize: 17, // Urbanist font
  },
});

export default Screen2;
