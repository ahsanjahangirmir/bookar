import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView  } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import {ipAddr} from './ipconfig';
import Icon from 'react-native-vector-icons/FontAwesome'; // Example, adjust the library and icon name as needed

const Reviews = ({ navigation, route }) => {

  const { emailProp, currentUser } = route.params;
  const [reviews, setReviews] = useState(null);
  const [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    getReviews();
  }, []); // Fetch reviews when the component mounts

  const getReviews = async () => {
    try {
      const response = await fetch(`http://${ipAddr}:3000/get-reviews?companyEmail=${emailProp}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // Process the fetched reviews data as needed
      console.log("Reviews: ", data); // For example, you can log the fetched reviews data
      setReviews(data)

      if (data.length === 0) {
        setAvgRating(0);
      } else {
        const totalRating = data.reduce((sum, review) => sum + review.Rating, 0);
        const average = totalRating / data.length;
        let temp = parseFloat(average.toFixed(2))
        if (temp > 5)
        {
          temp -= 1
          setAvgRating(temp);
        }
        else
        {
          setAvgRating(temp);
        }
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };
  
  const [expandedReviewIndex, setExpandedReviewIndex] = useState(null);

  const toggleExpandReview = (index) => {
    setExpandedReviewIndex(index === expandedReviewIndex ? null : index); // Toggle the expanded review index
  };

  // Function to render star rating images
  const renderStarRating = (rating) => {
    const goldStar = require('../../assets/images/gold_star.png');
    const emptyStar = require('../../assets/images/empty_star.png');
    const starImages = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        starImages.push(goldStar);
      } else {
        starImages.push(emptyStar);
      }
    }

    return (
      <View style={styles.starContainer}>
        {starImages.map((star, index) => (
          <Image key={index} source={star} style={styles.starImage} />
        ))}
      </View>
    );
  };

  const [selectedTab, setSelectedTab] = useState('home');


  const handleTabPress = (tabName) => {

    setSelectedTab(tabName);

    switch (tabName) {
      case 'home':
          navigation.navigate('OwnerHomepage', { email: emailProp });
          setSelectedTab('home');
        break;
        case 'list':
          navigation.navigate('OwnerBookings', {
            emailProp: emailProp,
            currentUser: currentUser
          })
          break;
      case 'cart':
        // Navigate to 'OwnerInventory' screen when cart tab is pressed
        navigation.navigate('OwnerInventory', { emailProp: emailProp, currentUser: currentUser });
        break;
      case 'person':
        navigation.navigate('StatScreen', { emailProp: emailProp, currentUser: currentUser });
        // Navigate to earnings or other related screen for 'person' tab
        break;
      default:
        // Handle default case or no tab selected
        break;
    }
};

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-left" size={24} color="#C4C4C4" />
      </TouchableOpacity>
      <Text style={styles.title}>My Reviews</Text>
      <View style={styles.ratingContainer}>
        <View>
          <Text style={styles.ratingText}>Your current Rating</Text>
        </View>
        </View>
        <View style={styles.averageRatingContainer}>
          <Text style={styles.averageRating}>{avgRating}</Text>
          <Image source={require('../../assets/images/star2.png')} style={styles.menuIcon} />
        </View>
      
      <View style={styles.sliderContainer}>
        <LinearGradient
          colors={['red', 'yellow', 'green']}
          style={styles.sliderTrack}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
        <View style={[styles.sliderPoint, { left: `${(avgRating / 5) * 100}%` }]} />
      </View>
      <ScrollView style={styles.reviewContainer}>
        {reviews && reviews.map((review, index) => (
          <View key={index} style={styles.reviewWrapper}>
            <View style={styles.review}>
              <View style={styles.reviewTextContainer}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.reviewName}>{review.UserName}</Text>
                  <View style={styles.ratingContainer}>
                    {renderStarRating(review.Rating)}
                  </View>
                </View>
                <Text style={styles.reviewContent} numberOfLines={expandedReviewIndex === index ? null : 3} ellipsizeMode="tail">
                  {review.Comments}
                </Text>
                {review.Comments.length > 90 && (
                  <TouchableOpacity onPress={() => toggleExpandReview(index)} style={styles.readMoreButton}>
                    <Text style={styles.readMoreButtonText}>{expandedReviewIndex === index ? 'Read Less' : 'Read More'}</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={{ height: 70 }} />
      <View style={styles.navbar}>
        <TouchableOpacity
          style={selectedTab === 'home' ? styles.navbarTabSelected : styles.navbarTab}
          onPress={() => handleTabPress('home')}
        >
          <Ionicons
            name={selectedTab === 'home' ? 'home' : 'home-outline'}
            size={24}
            color={selectedTab === 'home' ? '#D45A01' : '#7D7D7D'}
          />
          <Text style={styles.navbarText}>Listings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={selectedTab === 'list' ? styles.navbarTabSelected : styles.navbarTab}
          onPress={() => handleTabPress('list')}
        >
          <Ionicons
            name={selectedTab === 'calender' ? 'calendar' : 'calendar-outline'}
            size={24}
            color={selectedTab === 'list' ? '#D45A01' : '#7D7D7D'}
          />
          <Text style={styles.navbarText}>Calendar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={selectedTab === 'cart' ? styles.navbarTabSelected : styles.navbarTab}
          onPress={() => handleTabPress('cart')}
        >
          <Ionicons
            name={selectedTab === 'cart' ? 'cart' : 'cart-outline'}
            size={24}
            color={selectedTab === 'cart' ? '#D45A01' : '#7D7D7D'}
          />
          <Text style={styles.navbarText}>Inventory</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={selectedTab === 'person' ? styles.navbarTabSelected : styles.navbarTab}
          onPress={() => handleTabPress('person')}
        >
          <Ionicons
            name={selectedTab === 'person' ? 'logo-usd' : 'logo-usd'}
            size={24}
            color={selectedTab === 'person' ? '#D45A01' : '#7D7D7D'}
          />
          <Text style={styles.navbarText}>Earnings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: 'MontserratSemiBold',
    fontSize: 24,
    color: '#FFFFFF',
    marginTop: 40,
    marginBottom: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingText: {
    fontFamily: 'UrbanistRegular',
    fontSize: 30,
    color: '#FFFFFF',
    marginRight: 10,
  },
  averageRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  averageRating: {
    fontFamily: 'UrbanistSemiBold',
    fontSize: 80,
    color: '#FFFFFF',
    marginRight: 5,
  },
  menuIcon: {
    width: 70,
    height: 70,
  },
  sliderContainer: {
    width: '100%',
    height: 20,
    backgroundColor: '#333',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  sliderTrack: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  sliderPoint: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
    transform: [{ translateX: -10 }, { translateY: 0 }],
  },
  reviewContainer: {
    marginTop: 10,
  },
  reviewWrapper: {
    width: 348,
    minHeight: 143,
    backgroundColor: 'rgba(133, 57, 2, 0.75)',
    borderRadius: 12,
    marginBottom: 20,
  },
  review: {
    flexDirection: 'row',
    padding: 10,
  },
  reviewPicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginTop: 10,
  },
  reviewTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 10,
    marginRight: 5,
    marginLeft: 5,
  },
  reviewName: {
    fontFamily: 'UrbanistSemiBold',
    fontSize: 16,
    color: '#C4C4C4',
    marginTop: 15,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  starContainer: {
    flexDirection: 'row',
  },
  starImage: {
    width: 20,
    height: 20,
    marginRight: 2,
    marginTop: 13,
  },
  reviewContent: {
    fontFamily: 'UrbanistRegular',
    fontSize: 14,
    color: '#C4C4C4',
    marginBottom: 10,
    marginTop: 15,
  },
  readMoreButton: {
    marginTop: 5,
  },
  readMoreButtonText: {
    color: '#D45A01',
    fontFamily: 'UrbanistSemiBold',
    fontSize: 14,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '110%',
    height: '10%',
    backgroundColor: '#000000',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 12, 
    borderTopRightRadius: 12,
  },
  navbarTab: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  navbarTabSelected: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'orange',
  },
  navbarText: {
    fontSize: 10,
    marginTop: 4,
    color: '#C4C4C4',
  }
});

export default Reviews;
