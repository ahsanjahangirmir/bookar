import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Alert, Button, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImageManipulator from 'expo-image-manipulator';

const UploadImagesScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { listingData, ogname,user } = route.params;
  const [coverImage, setCoverImage] = useState(null);

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
        listingData.Image = buffer; // Set listingData.Image to buffer
      }
    } catch (error) {
      console.log('Error picking image:', error);
    }
  };
  

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack(listingData, ogname)}>
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

      <View style={styles.uploadSection}>
        <Text style={styles.sectionTitle}>Gallery Images</Text>
      </View>

      <TouchableOpacity style={styles.continueButton} onPress={() => navigation.navigate('UploadPayment', { listingData, ogname})}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
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
  uploadBox: {
    borderColor: '#D45A01',
    borderWidth: 0.3,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 50,
    width: 274,
    height: 210,
  },
  uploadedImage: {
    width: 170,
    height: 170,
    borderRadius: 30, // 50% of width or height (150 / 2)
    resizeMode: 'cover',
    marginRight: 10,
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
    paddingVertical: 15,
    paddingHorizontal: 20,
    margin: 20,
    marginHorizontal: 60,
    borderRadius: 26.5,
    alignItems: 'center',
    marginTop: 18,
    width: 238,
    marginLeft: 90,
    marginBottom: 30,
  },
  continueButtonText: {
    color: '#C4C4C4',
    fontFamily: 'Urbanist-Bold',
    fontSize: 17,
  },
});

export default UploadImagesScreen;
