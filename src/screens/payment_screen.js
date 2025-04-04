import React, { useState, useEffect, useCallback} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView , Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Ensure you've installed this package
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import {ipAddr} from './ipconfig'

const SuccessScreen = () => {
    // Replace with your actual navigation logic
    const handlePressDone = () => {
      console.log('Done pressed, navigate to the desired screen');
    };

    const navigation = useNavigation();
    const route = useRoute(); // Use useRoute to access route params
    const { listingData,ogname: ogname} = route.params;
    const email = listingData.Email
    const name = ogname

    const updateListingData = async (email, name, listingData) => {
      try {
        // Make API call to update the listing data
        const response = await fetch(`http://${ipAddr}:3000/listing-updater`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, updatedData: listingData }), // Pass email, name, and listingData
        });
    
        if (response.ok) {
          console.log('Listing data updated successfully');
          // Navigate to the desired screen upon successful update
          // navigation.navigate('listings');
        } else {
          console.error('Failed to update listing data', response);
          // Handle error scenario
        }
      } catch (error) {
        console.error('Error updating listing data:', error);
        // Handle error scenario
      }
    };
    
    // Call the updateListingData function when the component mounts
    useEffect(() => {
      updateListingData(email, name, listingData);
    }, []);
    
  
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Image
            source={require('../../assets/images/large_icon.png')} // Replace with your success image in the assets directory
            style={styles.successImage}
          />
          <Text style={styles.successText}>Changes Saved Successfully</Text>
      <Image source={require('../../assets/images/baar4.png')} style={styles.barImage} />

        </View>
        <TouchableOpacity style={styles.doneButton} onPress={() => navigation.navigate('OwnerHomepage',{ email: email })}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    );
  };
  

const styles = StyleSheet.create({
    barImage: {
        marginLeft: 1,
        marginTop: 275,
      },
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  successImage: {
    marginTop: 350,
    width: 100, // Set the width as needed
    height: 100, // Set the height as needed
  },
  successText: {
    color: '#C4C4C4',
    fontSize: 16,
    marginVertical: 20,
    fontFamily: 'Montserrat-Regular',
  },
  doneButton: {
    backgroundColor: 'rgba(212, 90, 1, 0.5)',
    paddingVertical: 15, // Adjust this to control the button's height
    paddingHorizontal: 20, // Adjust this to control the button's width
    margin: 20,
    marginHorizontal: 60,   
    borderRadius: 26.5,
    alignItems: 'center',
    marginTop: 18,
    width: 238, // Keep this if you want a fixed width
    marginBottom   : 40,
  },
  doneButtonText: {
    color: '#C4C4C4',
    fontFamily: 'Urbanist-Bold',
    fontSize: 17,
  },
});

export default SuccessScreen;
