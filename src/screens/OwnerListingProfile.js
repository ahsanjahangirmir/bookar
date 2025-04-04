import React, { useState, useRef, useEffect } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Modal, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { styles2 } from '../../assets/styles/ownerFieldProfileStyles.js';
import {ipAddr} from './ipconfig';

const CompanyProfile = ({ companyName, imageUrl, location, images, moreDetails, descriptionText, facilityIcons, facilityTexts, mapImage, reviewRating, reviewName, reviewDate, reviewContent, reviewPicture,companyEmail}) => {
  const [loaded] = useFonts({
    UrbanistRegular: require('../../assets/fonts/Urbanist/static/Urbanist-Regular.ttf'),
    UrbanistBold: require('../../assets/fonts/Urbanist/static/Urbanist-SemiBold.ttf'),
    UrbanistMedium: require('../../assets/fonts/Urbanist/static/Urbanist-Medium.ttf'),
    UrbanistSemiBold: require('../../assets/fonts/Urbanist/static/Urbanist-SemiBold.ttf'),
    UrbanistLight: require('../../assets/fonts/Urbanist/static/Urbanist-Light.ttf'), // Added UrbanistLight font
    MontserratBold: require('../../assets/fonts/Montserrat/static/Montserrat-Bold.ttf'),
    MontserratExtraLight: require('../../assets/fonts/Montserrat/static/Montserrat-ExtraLight.ttf'),
    MontserratSemiBold: require('../../assets/fonts/Montserrat/static/Montserrat-SemiBold.ttf'),
  });

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Make API call to fetch reviews based on company email
        const response = await fetch(`http://${ipAddr}:3000/reviews?email=${encodeURIComponent(companyEmail)}`);
        if (response.ok) {
          const reviewsData = await response.json(); // Assuming the response is in JSON format
          setReviews(reviewsData);
        } else {
          console.error('Failed to fetch reviews:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews(); // Call the fetchReviews function when the component mounts

    // Cleanup function
    return () => {
      // You can perform cleanup tasks here if needed
    };
  }, [companyEmail]);

  const [expanded, setExpanded] = useState(false); // State to track expansion of description
  const [expandedReviewIndex, setExpandedReviewIndex] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // State to track selected image

  const toggleDescription = () => {
    setExpanded(!expanded); // Toggle the expansion state
  };

  const toggleExpandReview = (index) => {
    setExpandedReviewIndex(index === expandedReviewIndex ? null : index); // Toggle the expanded review index
  };

  const handleImageClick = (image) => {
    setSelectedImage(image); // Set the selected image
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setSelectedImage(null); // Clear the selected image
  };

  return (
    <ScrollView contentContainerStyle={styles2.scrollView}>
      <View style={[styles2.container, { backgroundColor: '#000000' }]}>
        <Image
          source={imageUrl}
          style={styles2.image}
          resizeMode="cover"
        />
        <View style={styles2.textContainer}>
          <Text style={styles2.companyName}>{companyName}</Text>
          <View style={styles2.locationTextContainer}>
            <Image
              source={require('../../assets/images/Location.png')}
              style={styles2.locationIcon}
              resizeMode="contain"
            />
            <Text style={styles2.locationText}>{location}</Text>
          </View>
          <View style={styles2.galleryContainer}>
            <Text style={styles2.galleryText}>Gallery Photos</Text>
            <Text style={styles2.seeAllText}>See All</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles2.imageContainer}>
            {images.map((image, index) => (
              <TouchableOpacity key={index} onPress={() => handleImageClick(image)}>
                <Image source={image} style={styles2.imageThumbnail} />
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Modal visible={selectedImage !== null} transparent={true} onRequestClose={handleCloseModal}>
            <View style={styles2.modalContainer}>
              <TouchableOpacity onPress={handleCloseModal} style={styles2.closeButton}>
                <Text style={styles2.closeButtonText}>Close</Text>
              </TouchableOpacity>
              <Image source={selectedImage} style={styles2.selectedImage} resizeMode="contain" />
            </View>
          </Modal>

          <View style={styles2.detailsContainer}>
            <Text style={styles2.detailsText}>Details</Text>
          </View>
          {/* More details container */}
          <View style={styles2.moreDetailsContainer}>
            {moreDetails.map((detail, index) => (
              <View key={index} style={styles2.detailItem}>
                <Image source={detail.image} style={styles2.detailImage} />
                <Text style={styles2.detailText}>{detail.text}</Text>
              </View>
            ))}
          </View>
          <View style={styles2.descriptionContainer}>
            <Text style={styles2.descriptionTitle}>Description</Text>
            <View style={[styles2.descriptionTextBox, expanded ? { height: 'auto' } : null]}>
              <Text style={styles2.descriptionText}>{descriptionText}</Text>
            </View>
            {(
              <TouchableOpacity onPress={toggleDescription} style={styles2.readMoreButton}>
                <Text style={styles2.readMoreButtonText}>{expanded ? 'Read Less' : 'Read More'}</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles2.facilitiesHeaderContainer}>
            <Text style={styles2.facilitiesHeaderText}>Facilities</Text>
          </View>
          <View style={styles2.facilityContainer}>
            {facilityIcons.map((icon, index) => (
              <View key={index} style={styles2.facilityItem}>
                <Image source={icon} style={styles2.facilityIcon} />
                <Text style={styles2.facilityText}>{facilityTexts[index]}</Text>
              </View>
            ))}
          </View>
          <View style={styles2.locationPopupContainer}>
            <Text style={styles2.locationPopupText}>Location</Text>
            <Image source={mapImage} style={styles2.mapImage} resizeMode="contain" />
          </View>
          <View style={styles2.reviewsContainer}>
            <Text style={styles2.reviewsText}>Reviews</Text>
            <Image
              source={require('../../assets/images/gold_star.png')}
              style={styles2.starIcon}
              resizeMode="contain"
            />
            <Text style={styles2.reviewRating}>{reviewRating}</Text>
            <TouchableOpacity style={styles2.seeAllButton}>
              <Text style={styles2.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles2.reviewContainer}>
            {reviews.map((review, index) => (
              <View key={index} style={styles2.reviewWrapper}>
                <View style={styles2.review}>
                  <Image source={reviewPicture[index]} style={styles2.reviewPicture} />
                  <View style={styles2.reviewTextContainer}>
                    <Text style={styles2.reviewName}>{review.UserName}</Text>
                    <Text style={styles2.reviewDate}>{review.date}</Text>
                    <View style={styles2.reviewContentContainer}>
                      <Text style={styles2.reviewContent} numberOfLines={expandedReviewIndex === index ? null : 2} ellipsizeMode="tail">
                        {review.Comments}
                      </Text>
                      {(
                        <TouchableOpacity onPress={() => toggleExpandReview(index)} style={styles2.readMoreButton}>
                          <Text style={styles2.readMoreButtonText}>{expandedReviewIndex === index ? 'Read Less' : 'Read More'}</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const OwnerProfilesScreen = ({route, navigation}) => {
  // console.log('Route:', route); // Log the entire route object
  const { currcompany, user_email} = route.params;
  const images = [
    require('../../assets/images/swimmer.png'),
    require('../../assets/images/Lord.png'),
    require('../../assets/images/Fusion.png'),
    require('../../assets/images/swimmer.png'),
    require('../../assets/images/Lord.png'),
    require('../../assets/images/Fusion.png')
  ];

  const moreDetails = [
    { image: require('../../assets/images/football.png'), text: 'Football' },
    { image: require('../../assets/images/cricket.png'), text: 'Cricket' },
    { image: require('../../assets/images/basketball.png'), text: 'Basketball' },
    { image: require('../../assets/images/pool.png'),    text: 'Pool' },
  ];

  const facilityIcons = [
    require('../../assets/images/wifi.png'),
    require('../../assets/images/pool.png'),
    require('../../assets/images/dumbell.png'),
    require ('../../assets/images/24hr.png'),
    require('../../assets/images/elevator.png'),
    require ('../../assets/images/meeting_room.png'),
    require('../../assets/images/restaurant.png'),
    require('../../assets/images/parking.png'),
    require('../../assets/images/AC.png'),
    require('../../assets/images/basketball.png'),
  ];

  const facilityTexts = [
    'WiFi' , 
    'Pool' , 
    'Fitness Center', 
    '24 Hour Service' , 
    'Elevator' , 
    'Sauna' , 
    'Restaurant', 
    'Parking', 
    'A/C' , 
    'Equipment/Gear' , 
  ];

  const servicesMap = {
    'Tennis': require('../../assets/images/Tennis Racquet.png'),
    'Swimming': require('../../assets/images/Swimming (1).png'),
    'Cricket' : require('../../assets/images/cricket.png'),
    'Basketball' : require('../../assets/images/basketball.png'),
    'Gaming' : require('../../assets/images/gaming.png'),
    'Football' : require('../../assets/images/football.png'),
    'Badminton' : require('../../assets/images/Shuttlecock.png'),
    'Volleyball' : require('../../assets/images/Volleyball.png'),
    'Snooker':require('../../assets/images/Circled 8.png'),
    'Golf':require('../../assets/images/Golf.png'),
    'Squash':require('../../assets/images/Racquetball.png'),
    'Horse Riding': require('../../assets/images/Trotting Horse.png'),
    'Bowling':require('../../assets/images/Bowling Pins.png'), 
    'Gun Range': require('../../assets/images/Target.png'),
    'Gym':require('../../assets/images/Gym.png'),
  }

  const servicesArray = Object.keys(servicesMap).map(key => ({
    image: servicesMap[key],
    text: key
  }));

  const filteredFacilityIcons = [];
  const filteredFacilityTexts = [];

  if (currcompany.facilities && currcompany.facilities.length > 0) {
    currcompany.facilities.forEach(facility => {
      const index = facilityTexts.indexOf(facility);
      if (index !== -1) {
        filteredFacilityIcons.push(facilityIcons[index]);
        filteredFacilityTexts.push(facilityTexts[index]);
      }
    });
  }

  // Filter servicesArray based on currcompany.services
  let filteredServicesArray = [];

  if (currcompany.services && currcompany.services.length > 0) {
    filteredServicesArray = servicesArray.filter(service => {
      return currcompany.services.some(currService => currService.service === service.text);
    });
  }

  const mapImage = require('../../assets/images/map.png');
  const starImage = require('../../assets/images/gold_star.png');
  const reviewRating = '5.0 (4,345 reviews)';

  // const descriptionText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt aliqua. Read more...Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt aliqua. Read more...";

  const reviewName = ['John Doe', 'Alice Smith', 'Robert Johnson', 'Emily Brown'];
  const reviewDate = ['Jan 20, 2025', 'Feb 15, 2025', 'Mar 10, 2025', 'Apr 5, 2025'];
  const reviewContent = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
  ];
  
  const reviewPicture = [
    require('../../assets/images/pp1.png'),
    require('../../assets/images/pp2.png'),
    require('../../assets/images/pp3.png'),
    require('../../assets/images/pp4.png')
  ];

  const [showTopScreen, setShowTopScreen] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  
  useEffect(() => {
    if (showTopScreen) {
      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 500, // Adjust the duration as needed
          useNativeDriver: true,
        }
      ).start();
    } else {
      Animated.timing(
        fadeAnim,
        {
          toValue: 0,
          duration: 500, // Adjust the duration as needed
          useNativeDriver: true,
        }
      ).start();
    }
  }, [showTopScreen]);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    if (scrollPosition > 380) {
      setShowTopScreen(true);
    } else {
      setShowTopScreen(false);
    }
  };

  const handleBackButtonPress = () => {
    navigation.navigate('OwnerHomepage', {
      emailProp: user_email,
    });
    // You can add functionality here if needed in the future
  };

  // const base64Image = Buffer.from(currcompany.Image.data).toString('base64');
  let base64Image = null; // Initialize the variable to null by default

  try {
    // Attempt to convert image data to base64 string if it exists
    if (currcompany.Image && currcompany.Image.data) {
      base64Image = Buffer.from(currcompany.Image.data).toString('base64');
    }
  } catch (error) {
    console.error('Failed to convert image data to base64:', error);
    base64Image = null; // Ensure base64Image is null if there's an error
  }


  return (
    <>
      <Animated.View style={[styles2.topScreen, { opacity: fadeAnim }]}>
        <View style={styles2.headerContainer}>
          <TouchableOpacity onPress={handleBackButtonPress} style={styles2.backArrowContainer}>
            <Image
              source={require('../../assets/images/white_back_arrow.png')}
              style={styles2.backArrow}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles2.companyNameTop}>{currcompany.Company_Name}</Text>
        </View>
      </Animated.View>
      <ScrollView
        contentContainerStyle={styles2.scrollView}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        
        <CompanyProfile
          companyName={currcompany.Company_Name}
          imageUrl={base64Image ? { uri: `data:image/png;base64,${base64Image}` } : require('../../assets/images/fifthgen.png')}
          location={currcompany.Location}
          images={images}
          moreDetails={filteredServicesArray}
          descriptionText={currcompany.Description}
          facilityIcons={filteredFacilityIcons}
          facilityTexts={filteredFacilityTexts}
          mapImage={mapImage}
          starImage={starImage}
          reviewRating={reviewRating}
          reviewName={reviewName}
          reviewDate={reviewDate}
          reviewContent={reviewContent}
          reviewPicture={reviewPicture}
          companyEmail={currcompany.Email}
        />
    </ScrollView>
  </>
);
};

export default OwnerProfilesScreen;