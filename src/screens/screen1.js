import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignupScreen = () => {
  const [userType, setUserType] = useState('');
  const navigation = useNavigation();

  const handleNext = () => {
    // Navigate to the next screen
    navigation.navigate('Screen2');
  };

  return (
    <View style={{ backgroundColor: '#00170C', flex: 1, justifyContent: 'space-between' }}>
      <View style={[styles.joinFamilyContainer, { left: 27, top: 58, width: 286, height: 258 }]}>
        <Text style={styles.joinFamilyText}>Join the Family</Text>
      </View>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

          <TouchableOpacity
            onPress={() => setUserType('Guest')}
            style={[styles.touchableOpacity, userType === 'Guest' && styles.selected]}
          >
            <Image
              source={require('../../assets/images/xxxxx.jpg')}
              // source={require('../assets/images/xxxxx.jpg')}
              style={[
                styles.icon,
                { width: 138, height: 140 },
                userType === 'Guest' && styles.selectedImage,
              ]}
            />
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => setUserType('Host')}
          style={[
            styles.touchableOpacity,
            userType === 'Host' && styles.selected,
            { backgroundColor: 'transparent' } // Set background color to transparent
          ]}
        >
          <Image
            source={require('../../assets/images/xxxx.jpg')}
            style={[
              styles.icon,
              { width: 138, height: 140 },
              userType === 'Host' && styles.selectedImage,
            ]}
          />
        </TouchableOpacity>
        </View>
      </View>
      {userType === 'Host' || userType === 'Guest' ? (
        <TouchableOpacity
          onPress={handleNext}
          style={[styles.nextButton, { backgroundColor: '#D45A01', borderRadius: 26.5 }]}
        >
          <Text style={{ color: '#FFF' }}>Next</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  joinFamilyContainer: {
    position: 'absolute',
    alignItems: 'flex-start',
  },
  joinFamilyText: {
    fontSize: 45
    ,
    color: '#D45A01',
    // fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
  icon: {
    width: 150,
    height: 150,
  },
  // ...
  buttonText: {
    color: '#FFF',
    fontFamily: 'Montserrat',
    fontSize: 19,
    backgroundColor: 'transparent', // Add this line
  },
  touchableOpacity: {
    alignItems: 'center',
    borderWidth: 2, // Outline width
    backgroundColor: 'transparent',
    width: 150, // Add this line
    height: 150,
    borderRadius: 10,
  },
  // ...
  // Add the same for the text underneath if it has a separate style
  textUnderneath: {
    // ...
    backgroundColor: 'transparent', // Add this line
  },
  // ...

  selected: {
    borderColor: '#D45A01',
    borderWidth: 5.5,
    borderRadius: 10, // Selected outline color
  },
  // selectedImage: {
  //   borderColor: '#FFB8B8', // Selected image outline color
  // },
  nextButton: {
    alignItems: 'center',
    backgroundColor: '#D45A01',
    padding: 13,
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 26.5,
    marginTop: -55,
    
    
  },
});

export default SignupScreen;
