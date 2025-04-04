// 
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Alert, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImageManipulator from 'expo-image-manipulator';
import { ipAddr } from './ipconfig.js';

const UploadImagesScreen = ({ route }) => {
  const navigation = useNavigation();
  const { email, name, address, description, services, facilities, location, openHours } = route.params;
  const [coverImage, setCoverImage] = useState(null);
  const [imgRcvd, setImgRcvd] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Permission Required',
            'Please grant permission to access photos in order to upload images.',
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
          );
        }
      }
    })();
  }, []);

  const handlePickAvatar = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        const manipResult = await ImageManipulator.manipulateAsync(
          result.assets[0].uri
        );
        setCoverImage(manipResult.uri);
        const imageBuffer = await fetch(manipResult.uri);
        const arrayBuffer = await imageBuffer.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        setImgRcvd(buffer)
        // You may need to handle this buffer according to your backend's requirements
      }
    } catch (error) {
      console.log('Error picking image:', error);
    }
  };

  const handleSubmit = async () => {
    const listingData = {
      email,
      name,
      address,
      description,
      services,
      facilities,
      location,
      openHours,
      imgRcvd
      // You will need to handle coverImg and galleryImg uploads separately,
      // possibly before this stage, and include their references (e.g., URLs) here.
    };

    try {
      const response = await fetch(`http://${ipAddr}:3000/createlisting`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(listingData),
      });

      const jsonResponse = await response.json();
      console.log('Success:', jsonResponse);

      // Handle navigation or UI feedback based on success response
    } catch (error) {
      console.error('Error:', error);
      // Handle error feedback
    }

    navigation.navigate('CreateSuccess', { email: email });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#C4C4C4" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Upload Images</Text>
      </View>

      <View style={styles.uploadSection}>
        <Text style={styles.sectionTitle}>Cover Image</Text>
        <TouchableOpacity
          style={styles.uploadBox}
          onPress={handlePickAvatar}
        >
          {coverImage && (
            <Image source={{ uri: coverImage }} style={styles.uploadedImage} />
          )}
          <TouchableOpacity style={styles.browseButton}>
            <Text style={styles.browseButtonText}>Browse</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.continueButton} onPress={handleSubmit}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    barImage: {
        marginLeft: 40,
        marginTop: 25,
      },
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginTop:30
  },
  headerTitle: {
    color: '#D45A01',
    fontSize: 16,
    marginLeft: 10,
    fontFamily: 'Montserrat-Regular',
  },
  uploadSection: {
    padding: 20,
  },
  sectionTitle: {
    color: '#C4C4C4',
    fontSize: 12,
    marginBottom: 30,
    fontFamily: 'Montserrat-Regular',

  },
  uploadedImage: {
    width: 170,
    height: 170,
    borderRadius: 30, // 50% of width or height (150 / 2)
    resizeMode: 'cover',
    marginRight: 10,
  },
  uploadBox: {
    borderColor: '#D45A01',
    borderWidth: 0.3,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft  : 50,
    width: 274, // Add this line
    height: 210,
  },
  uploadText: {
    color: '#C4C4C4',
    marginBottom: 10,
    fontFamily: 'Montserrat-Regular',
fontSize: 14.33,
  },
  browseButton: {
    backgroundColor: '#D45A01',
    padding: 10,
    borderRadius: 5,
  },
  browseButtonText: {
    color: '#C4C4C4',
    fontFamily: 'Montserrat-Regular',
    fontSize: 13.33,

  },
  continueButton: {
    backgroundColor: 'rgba(212, 90, 1, 0.5)',
    paddingVertical: 15, // Adjust this to control the button's height
    paddingHorizontal: 20, // Adjust this to control the button's width
    margin: 20,
    marginHorizontal: 60,   
    borderRadius: 26.5,
    alignItems: 'center',
    marginTop: 18,
    width: 238,
     // Keep this if you want a fixed width
     marginLeft : 90,
  },
  continueButtonText: {
    color: '#C4C4C4',
    fontFamily: 'Urbanist-Bold',
    fontSize: 17,
  },
});

export default UploadImagesScreen;
