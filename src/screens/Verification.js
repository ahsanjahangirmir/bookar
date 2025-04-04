import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Animated, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from '../../assets/styles/verificationStyles';
import { ipAddr } from './ipconfig.js';

export default function VerificationScreen() {
  const [code, setCode] = useState(new Array(4).fill(''));
  const [statusText, setStatusText] = useState('A code has been sent to your email.');
  const [timer, setTimer] = useState(30); // you can adjust the resend timer as needed
  const [codeError, setCodeError] = useState(false);
  const inputRefs = useRef([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { email, userType } = route.params; // assuming you are passing the email as a route param
  const [slideDownAnim] = useState(new Animated.Value(-50));
  const [fadeAnim] = useState(new Animated.Value(0));

// Fetch the verification code from the server when the component mounts
useEffect(() => {
  
  const sendVerificationCode = async () => {
    try {
      const response = await fetch(`http://${ipAddr}:3000/send-verification-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (data.success) {
        // Handle success, perhaps by updating state to indicate the code has been sent
        console.log('Verification code sent successfully.');
      } else {
        // Handle error case, perhaps by setting an error message in state
        console.error('Failed to send verification code:', data.message);
      }
    } catch (error) {
      // Handle network error, perhaps by setting an error message in state
      console.error('Network error when trying to send verification code:', error);
    }
  };

  sendVerificationCode();
}, []);

  // Timer to handle resend code option
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setStatusText('Resend Code.');
    }

    return () => clearInterval(interval);
  }, [timer]);

  const verifyCode = async () => {
    const enteredCode = code.join('');
    if (enteredCode.length === 4 && /^\d{4}$/.test(enteredCode)) {
      try {
        const response = await fetch(`http://${ipAddr}:3000/verify-code`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, code: enteredCode })
        });
  
        if (response.ok) { // Check if the status code is in the 200-299 range
          if (userType == 'Player')
          {
            navigation.navigate('HomePage', { emailProp: email });
          }
          else
          {
            navigation.navigate('OwnerHomepage', { emailProp: email });
          }
        } else {
          setCodeError(true);
          const data = await response.json(); // Optionally log the error message from the server
          console.error('Verification failed:', data.message);
        }
      } catch (error) {
        setCodeError(true);
        console.error('Error verifying code:', error);
      }
    } else {
      setCodeError(true);
    }
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
    setCodeError(true); // Set your error state to true
    setStatusText(message); // Update the status text with the error message
    fadeIn();
    slideDown();
  
    setTimeout(() => {
      fadeOut();
      slideUp();
      setCodeError(false); // Optionally reset the error state after the animation
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
  

  const resendCode = async () => {
    // Call the backend API to resend the code
    try {
      const response = await fetch(`http://${ipAddr}:3000/resend-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      if (data.success) {
        setTimer(30);
        setStatusText('A new code has been sent to your email.');
        setCode(new Array(4).fill(''));
      } else {
        console.error('Error resending code:', data.message);
      }
    } catch (error) {
      console.error('Error resending code:', error);
    }
  };

  const handleChangeText = (index, value) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setCodeError(false);

    if (value.length === 1 && index < code.length - 1) {
      inputRefs.current[index + 1].focus();
    }

    if (value.length === 0 && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => {}}>
            <Text style={styles.backButtonText}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Almost There</Text>
        </View>
        <View style={styles.content}>
          <Image source={require('../../assets/images/checkmark.jpeg')} style={styles.checkmark} />
          <Text style={styles.subtitle}>Code has been sent to your Email</Text>
          <View style={styles.codeInputContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.codeInput}
                onChangeText={(value) => handleChangeText(index, value)}
                value={digit}
                maxLength={1}
                keyboardType="numeric"
                ref={(ref) => (inputRefs.current[index] = ref)}
                onSubmitEditing={() => index === code.length - 1 && verifyCode()}
              />
            ))}
          </View>
          {/* {codeError && <Text style={styles.errorText}>Please enter a valid code</Text>} */}
          <Animated.View
            style={[
              errorBubbleStyle, // Define this style
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideDownAnim }],
              },
            ]}
          >
            {codeError && <Text style={styles.errorText}>Please enter a valid code</Text>}
          </Animated.View>
          {timer > 0 ? (
            <Text style={styles.status}>
              Time left:{' '}
              <Text style={{ color: '#ff6600' }}>{timer}</Text>
              s
            </Text>
          ) : (
            <TouchableOpacity style={styles.resendButton} onPress={resendCode}>
              <Text style={styles.resendButtonText}>Resend Code</Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={styles.button} onPress={verifyCode}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}
