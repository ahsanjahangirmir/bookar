import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, FlatList, Animated } from 'react-native';
import { useFonts } from 'expo-font';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ipAddr } from './ipconfig';

const ManageListingsScreen = () => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const slideUpAnimation = new Animated.Value(400); // Animation value for sliding-up effect
  const navigation = useNavigation();
  const route = useRoute(); // Use useRoute to access route params
  const { email} = route.params;
  const [mockListings, setMockListings] = useState([]);

  useEffect(() => {
    fetch(`http://${ipAddr}:3000/get-companies-owner?email=${email}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setMockListings(data);
      })
      .catch(error => {
        console.error('Error fetching listings:', error);
      });
  }, [email]);

  const handleDeleteListing2 = (listing) => {
    setSelectedListing(listing);
    setShowDeleteConfirmation(true);
  };
  
  useEffect(() => {
    if (showDeleteConfirmation) {
      Animated.timing(slideUpAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideUpAnimation, {
        toValue: 400,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [showDeleteConfirmation]);

  const handleDeleteListing = async (name) => {
    if (!selectedListing) {
      console.error('No listing selected for deletion');
      return;
    }
  
    try {
      const response = await fetch(`http://${ipAddr}:3000/listing-deleter`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });
  
      if (response.ok) {
        // Remove the deleted listing from the state
        setMockListings(prevListings => prevListings.filter(item => item.Company_Name !== name));
        setSelectedListing(null);
      } else {
        console.error('Failed to delete listing');
      }
    } catch (error) {
      console.error('Error deleting listing:', error);
    }
  };
  
  // const handleDeleteListing = async (name) => {
  //   if (!selectedListing) {
  //     console.error('No listing selected for deletion');
  //     return;
  //   }
  
  //   try {
  //     const response = await fetch(`http://${ipAddr}:3000/listing-deleter`, {
  //       method: 'DELETE',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ name, email }),
  //     });
  
  //     if (response.ok) {
  //       setMockListings(prevListings => prevListings.filter(item => item.name !== name));
  //       setSelectedListing(null);
  //       fetch(`http://${ipAddr}:3000/get-listings?email=${email}`)
  //         .then(response => {
  //           if (!response.ok) {
  //             throw new Error('Network response was not ok');
  //           }
  //           return response.json();
  //         })
  //         .then(data => {
  //           setMockListings(data);
  //         })
  //         .catch(error => {
  //           console.error('Error fetching listings:', error);
  //         });
  //     } else {
  //       console.error('Failed to delete listing');
  //     }
  //   } catch (error) {
  //     console.error('Error deleting listing:', error);
  //   }
  // };

  const handleBackPress = () => {
    navigation.goBack({ email: email });
  };

  const handleClose = () => {
    Animated.timing(slideUpAnimation, {
      toValue: 400,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const renderItem = ({ item, index }) => {
    // Check for null or undefined values in item or item.Image.data
    if (!item || !item.Image || !item.Image.data) {
        console.log('Missing image data for item:', item);
        return null; // Optionally, you can render a placeholder or fallback UI here
    }

    return (
        <View key={index} style={styles.listingContainer}>
            <Image
                source={{ uri: `data:image/jpeg;base64,${Buffer.from(item.Image.data).toString('base64')}` }}
                style={styles.image}
                resizeMode="cover"
            />
            <View style={styles.bottomHalf}>
                <Text style={styles.fieldName}>{item.Company_Name}</Text>
                <Text style={styles.fieldLocation}>{item.Location}</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, styles.editButton]}
                        onPress={() => navigation.navigate('UpdateListing', { email: email, name: item.Company_Name })}
                    >
                        <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.deleteButton]}
                        onPress={() => handleDeleteListing2(item)}
                    >
                        <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          <Image
            source={require('../../assets/images/white_back_arrow.png')}
            style={styles.backArrow}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Manage Listings</Text>
      </View>
      <FlatList
        data={mockListings}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.scrollContainer}
      />
      {showDeleteConfirmation && (
        <TouchableOpacity
          style={styles.overlay}
          onPress={handleClose}
        >
          <Animated.View style={[styles.deleteConfirmation, { transform: [{ translateY: slideUpAnimation }] }]}>
            <View style={styles.popup}>
              <Text style={styles.popupTitle}>Delete Listing</Text>
              <View style={styles.line}></View>
              <Text style={styles.confirmationText}>
                Are you sure you want to{' '}
                <Text style={styles.permanentlyText}>permanently</Text>{' '}
                delete your listing?
              </Text>
              <Text style={styles.additionalText}>
                Your listing and all its data will completely be lost. You cannot undo this action.
              </Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity onPress={handleClose} style={[styles.buttonNew, { backgroundColor: '#433434' }]}>
                  <Text style={styles.buttonTextNew}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteListing(selectedListing.Company_Name)} style={[styles.buttonNew, { backgroundColor: '#1AB65C' }]}>
                  <Text style={styles.buttonTextNew}>Yes, Continue</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingHorizontal: 0,
    paddingTop: 40,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  backArrow: {
    width: 28,
    height: 28,
    marginRight: 10,
  },
  headerText: {
    color: '#D45A01',
    fontSize: 16,
    fontFamily: 'MontserratRegular',
  },
  scrollContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20,
  },
  listingContainer: {
    width: 310,
    height: 272,
    marginBottom: 40,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  bottomHalf: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
    backgroundColor: 'rgba(212, 90, 1, 0.8)',
    borderRadius: 20,
    padding: 20,
    paddingTop: 15,
  },
  fieldName: {
    color: '#C4C4C4',
    fontSize: 20,
    fontFamily: 'LatoBold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: 124,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C4C4C4',
    borderWidth: 1,
    borderRadius: 8,
  },
  buttonText: {
    color: '#C4C4C4',
    fontFamily: 'LatoRegular',
    fontSize: 15,
  },
  editButton: {
    marginRight: 10,
  },
  deleteButton: {
    marginLeft: 10,
  },
  deleteConfirmation: {
    width: 391,
    height: 281,
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'transparent',
    zIndex: 100,
  },
  popup: {
    width: '100%',
    height: 281,
    marginRight: 200,
    backgroundColor: '#0B0B0B',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  popupTitle: {
    fontSize: 22,
    fontFamily: 'UrbanistBold',
    color: '#F75555',
    textAlign: 'center',
    marginBottom: 20,
  },
  line: {
    width: 348,
    height: 1,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
  },
  confirmationText: {
    fontFamily: 'UrbanistSemiBold',
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  permanentlyText: {
    color: '#FF7878',
  },
  additionalText: {
    color: '#FFFFFF',
    fontFamily: 'UrbanistRegular',
    fontSize: 12,
    textAlign: 'center',
    width: 331,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  closeButtonText: {
    color: '#F75555',
    fontFamily: 'UrbanistRegular',
    fontSize: 18,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  buttonNew: {
    width: 164,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  buttonTextNew: {
    color: '#FFFFFF',
    fontFamily: 'UrbanistSemiBold',
    fontSize: 14,
  },
  warningContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  warningPill: {
    backgroundColor: '#35383F',
    borderRadius: 29,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  warningImage: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  warningText: {
    fontFamily: 'UrbanistRegular',
    fontSize: 11,
    color: '#FF7878',
  },
});

export default ManageListingsScreen;
