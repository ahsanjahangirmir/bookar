import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../assets/styles/usertypeStyles';

const SignupScreen = () => {
  const [userType, setUserType] = useState('');
  const navigation = useNavigation();

  const handleNext = () => {
    navigation.navigate('SignUp1', { userType: userType });
  };

  return (
    <View style={{ backgroundColor: '#00170C', flex: 1, justifyContent: 'space-between' }}>
      <View style={[styles.joinFamilyContainer, { left: 27, top: 58, width: 286, height: 258 }]}>
        <Text style={styles.joinFamilyText}>Join the Family</Text>
      </View>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

          <TouchableOpacity
            onPress={() => setUserType('Player')}
            style={[styles.touchableOpacity, userType === 'Player' && styles.selected]}
          >
            <Image
              source={require('../../assets/images/playeroption.png')}
              // source={require('../assets/images/xxxxx.jpg')}
              style={[
                styles.icon,
                { width: 138, height: 140 },
                userType === 'Player' && styles.selectedImage,
              ]}
            />
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => setUserType('Owner')}
          style={[
            styles.touchableOpacity,
            userType === 'Owner' && styles.selected,
            { backgroundColor: 'transparent' } // Set background color to transparent
          ]}
        >
          <Image
            source={require('../../assets/images/owneroption.png')}
            style={[
              styles.icon,
              { width: 138, height: 140 },
              userType === 'Owner' && styles.selectedImage,
            ]}
          />
        </TouchableOpacity>
        </View>
      </View>
      {userType === 'Owner' || userType === 'Player' ? (
        <TouchableOpacity
  onPress={handleNext}
  style={[styles.nextButton]}
>
  <Text style={styles.nextText}>Next</Text>
</TouchableOpacity>
      ) : null}
    </View>
  );
};

export default SignupScreen;
