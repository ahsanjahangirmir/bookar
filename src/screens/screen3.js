import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Screen3 = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [age, setAge] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateAndNavigate = () => {
    if (!fullName || !dateOfBirth || !gender || !city || !age) {
      setErrorMessage('All fields are required.');
    } else if (isNaN(Number(age))) {
      setErrorMessage('Age must be a number.');
    } else {
      setErrorMessage(''); // Clear error message if validation passes
      // Assuming your server endpoint for posting user information is '/signup'
      fetch('http://localhost:3000/complete-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          // dateOfBirth,
          // gender,
          // city,
          age: Number(age),
        }),
      })
        .then(response => {
          if (response.ok) {
            navigation.navigate('Verification');
          } else {
            throw new Error('Failed to create user');
          }
        })
        .catch(error => {
          console.error('Signup error:', error);
          Alert.alert('Error', 'Failed to create user. Please try again later.');
        });
    }
  };
  return (
    <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Screen2')}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Image source={require('../../assets/images/profilepic.png')} style={styles.image} />
      <Text style={styles.subheading}>Add Profile Picture</Text>
      <View style={styles.errorContainer}>
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputIcon}>
          <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor="rgba(255, 255, 255, 0.75)" onChangeText={setFullName} />
          <Image source={require('../../assets/images/fullname-icon.png')} style={styles.icon} />
        </View>
        <View style={styles.inputIcon}>
          <TextInput style={styles.input} placeholder="Date of Birth" placeholderTextColor="rgba(255, 255, 255, 0.75)" onChangeText={setDateOfBirth} />
          <Image source={require('../../assets/images/calender-icon.png')} style={styles.icon} />
        </View>
        <View style={styles.inputIcon}>
          <TextInput style={styles.input} placeholder="Gender" placeholderTextColor="rgba(255, 255, 255, 0.75)" onChangeText={setGender} />
          <Image source={require('../../assets/images/gender-icon.png')} style={styles.icon} />
        </View>
        <View style={styles.inputIcon}>
          <TextInput style={styles.input} placeholder="City" placeholderTextColor="rgba(255, 255, 255, 0.75)" onChangeText={setCity} />
          <Image source={require('../../assets/images/city-icon.png')} style={styles.icon} />
        </View>
        <View style={styles.inputIcon}>
          <TextInput style={styles.input} placeholder="Age" placeholderTextColor="rgba(255, 255, 255, 0.75)" onChangeText={setAge} />
          <Image source={require('../../assets/images/username-icon.png')} style={styles.icon} />
        </View>
      </View>
      <TouchableOpacity
        style={[styles.button, styles.buttonBackground, styles.nextButton]}
        onPress={validateAndNavigate}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 27,
    left: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00170C', // Black background
    paddingTop: 40,
  },
  subheading: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'Urbanist', // Montserrat font
    color: '#C4C4C4', // Orange color from Screen1
    opacity: 0.75,
  },
  errorContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputIcon: {
    flexDirection: 'row',
    // alignItems: 'center',
    marginBottom: 14,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 15,
    position: 'absolute',
    left: 7, // Adjust left position to place the icon inside the TextInput
    marginTop: 21,
  },
  image: {
    width: 113, // Adjust this value
    height: 113, // Adjust this value
    marginTop: 10,
  },
  input: {
    fontSize: 16,
    height: 59,
    borderColor: '#853902',
    borderWidth: 1,
    marginBottom: 1,
    paddingLeft: 50, // Adjust paddingLeft to create space for the icon
    color: '#C4C4C4',
    backgroundColor: '#853902',
    borderRadius: 13,
    fontFamily: 'Urbanist',
    width: '95%' // Adjust paddingLeft to create space for the icon
  },
  button: {
    backgroundColor: '#853902',
    borderRadius: 56.5,
    padding: 13,
    bottom: -65,
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

export default Screen3;
