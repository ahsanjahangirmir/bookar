
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, Animated} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from '../../assets/styles/signup2Styles';
import DropDownPicker from "react-native-dropdown-picker";
import { ipAddr } from './ipconfig';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {useRef } from 'react';
const Screen3 = ({ navigation, route }) => {
  const { userType, username, email, phoneNumber, password } = route.params;
  const [fullName, setFullName] = useState('');
  // const [dateOfBirth, setDateOfBirth] = useState('');
  const [slideDownAnim] = useState(new Animated.Value(-50));
  const [fadeAnim] = useState(new Animated.Value(0));
  const [ setShowDatePicker] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [dateSelected, setDateSelected] = useState(false);
  const [isGenderPickerVisible, setIsGenderPickerVisible] = useState(false);
  const [isCityPickerVisible, setIsCityPickerVisible] = useState(false);
  const [genderItems, setGenderItems] = useState([
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ]);
  const [openGenderPicker, setOpenGenderPicker] = useState(false);
const [openCityPicker, setOpenCityPicker] = useState(false);
const [cityItems, setCityItems] = useState([
  { label: 'Lahore', value: 'Lahore' },
  { label: 'Karachi', value: 'Karachi' },
  { label: 'Islamabad', value: 'Islamabad' },
  { label: 'Faisalabad', value: 'Faisalabad' },
  { label: 'Multan', value: 'Multan' },
  { label: 'Sialkot', value: 'Sialkot' },
  { label: 'Gujranwala', value: 'Gujranwala' },
]);
const scrollViewRef = useRef();
const genderInputRef = useRef();
const [gender, setGender] = useState(null);
  const [city, setCity] = useState('');
  const [age, setAge] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    let localOffset = date.getTimezoneOffset() * 60000;
    let localDate = new Date(date - localOffset);
    setDateOfBirth(localDate.toISOString().split('T')[0]); // Format date to YYYY-MM-DD
    setAge(calculateAge(date));
    hideDatePicker();
  };
  
  // Updated calculateAge function to use the correct date format
  const calculateAge = (date) => {
    const today = new Date();
    const birthDate = new Date(date); // Ensure date is a Date object
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age.toString(); // Return age as a string
  };
  
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;
    setDateSelected(true); // Update state to indicate the user has selected a date
    setAge(calculateAge(currentDate)); // Automatically calculate and set age
  };

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

  const isValidFullName = (fullName) => {
    const nameRegex = /^[A-Za-z ]{5,20}$/;
    return nameRegex.test(fullName);
  };
  

  const validateAndNavigate = () => {
    if (!fullName || !dateOfBirth || !gender || !city || !age) {
      setErrorMessageWithAnimation('All fields are required.');
    } else if (!isValidFullName(fullName)) {
      setErrorMessageWithAnimation('Full name must be between 5 and 20 alphabetic characters.');
    } else if (isNaN(Number(age))) {
      setErrorMessageWithAnimation('Age must be a number.');
    } else {
      fetch(`http://${ipAddr}:3000/create-profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName, userType, username, email, phoneNumber, password, age: Number(age), gender, city
        }),
      })
      .then(response => {
        if (response.status === 201) {
          navigation.navigate('Verification', { email: email , userType: userType});
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
      <View style={styles.errorContainer}>
        
        <View style={styles.inputContainer}>
      <View style={styles.inputIcon}>
        <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor="rgba(255, 255, 255, 0.75)" onChangeText={setFullName} />
        <Image source={require('../../assets/images/fullname-icon.png')} style={styles.icon} />
      </View>
      <TouchableOpacity onPress={showDatePicker} style={styles.inputIcon}>
        <TextInput
          style={styles.input}
          placeholder="Date of Birth"
          placeholderTextColor="rgba(255, 255, 255, 0.75)"
          value={dateOfBirth} // Display the selected date as text
          editable={false} // Optional: Prevent manual editing
        />
        <Image source={require('../../assets/images/calender-icon.png')} style={styles.icon} />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        textColor="black" // Set text color to black
      />
    </View>
  <View style={[styles.inputIcon, {zIndex: openGenderPicker ? 3000 : 1000}]}>
  <DropDownPicker
    open={openGenderPicker}
    value={gender}
    items={genderItems}
    setOpen={setOpenGenderPicker}
    setValue={setGender}
    setItems={setGenderItems}
    placeholder="Gender"
    style={styles.dropdownPicker}
    dropDownContainerStyle={styles.dropdownPickerContainer}
    textStyle={styles.dropdownPickerText}
  />
  <Image
    source={require('../../assets/images/gender-icon.png')}
    style={{
      ...styles.icon,
      position: 'absolute',
      right: 20,
      marginLeft: 10,
      zIndex: openGenderPicker ? 5001 : 7001 // Ensure icon is above the dropdown
    }}
    resizeMode="contain"
  />
</View>
<View style={[styles.inputIcon, {zIndex: openCityPicker ? 2000 : 1000}]}>
  <DropDownPicker
    open={openCityPicker}
    value={city}
    items={cityItems}
    setOpen={setOpenCityPicker}
    setValue={setCity}
    setItems={setCityItems}
    placeholder="City"
    style={styles.dropdownPicker}
    dropDownContainerStyle={styles.dropdownPickerContainer}
    textStyle={styles.dropdownPickerText}
    placeholderStyle={styles.dropdownPickerPlaceholder}
  />
  <Image
    source={require('../../assets/images/city-icon.png')}
    style={{
      ...styles.icon,
      position: 'absolute',
      right: 20,
      marginLeft: 10,
      zIndex: openCityPicker ? 2001 : 7001 // Ensure icon is above the dropdown
    }}
    resizeMode="contain"
  />
</View>
        <View style={styles.inputContainer}>
        <View style={styles.inputIcon}>
        <View style={styles.input}>
            <Text style={styles.ageText}>
              {age ? `${age} years` : 'Age'}
            </Text>
            <Image source={require('../../assets/images/username-icon.png')} style={styles.icon} />
          </View>
        </View> 
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

export default Screen3;
