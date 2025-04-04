import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../assets/styles/homepageStyles';
import SearchField from '../screens/Search';
import ImageBox from './ImageBox';
import { Buffer } from 'buffer'; 
import {ipAddr} from './ipconfig';

export default function HomePage({ route, navigation }) {
  const { emailProp } = route.params;
  console.log("hOME PAGe route: ", emailProp)
  const [selectedPill, setSelectedPill] = useState('Recommended');
  const [selectedTab, setSelectedTab] = useState('home');
  const [loaded] = useFonts({
    UrbanistRegular: require('../../assets/fonts/Urbanist/static/Urbanist-Regular.ttf'),
    UrbanistBold: require('../../assets/fonts/Urbanist/static/Urbanist-SemiBold.ttf'),
    UrbanistMedium: require('../../assets/fonts/Urbanist/static/Urbanist-Medium.ttf'),
    MontserratBold: require('../../assets/fonts/Montserrat/static/Montserrat-Bold.ttf'),
    MontserratExtraLight: require('../../assets/fonts/Montserrat/static/Montserrat-ExtraLight.ttf'),
    MontserratSemiBold: require('../../assets/fonts/Montserrat/static/Montserrat-SemiBold.ttf'),
  });

  // Define states for companies, bookings, user, and toggling bookings
  const [companies, setCompanies] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState({});
  const [containerWidth, setContainerWidth] = useState(0);
  const [showBookings, setShowBookings] = useState(false);
  const [query, setQuery] = useState('');
  const [fields, setFields] = useState([]);

  useEffect(() => {
    fetchCompanies();
    fetchMyBookings();
    userDetails();
  }, []);

  useEffect(() => {
    // Calculate the container width based on the number of companies
    const newWidth = companies.length * (266 + 21); // Adjust item width and spacing as necessary
    setContainerWidth(newWidth);
  }, [companies]);
  
  const handlePillPress = (pill) => {
    setSelectedPill(pill);
    setCompanies([...companies.reverse()]);
  };

  const fetchMyBookings = async () => {
    try {
      const response = await fetch(`http://${ipAddr}:3000/my-bookings?userEmail=${emailProp}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      // console.log("jiiii")
      
      // Remove duplicate bookings based on email
      const uniqueBookings = [];
      const emailSet = new Set();
      data.forEach(booking => {
        if (!emailSet.has(booking.User_Email)) {
          uniqueBookings.push(booking);
          emailSet.add(booking.User_Email);
        }
      });
  
      setBookings(uniqueBookings);
      setShowBookings(true);
      console.log(uniqueBookings)
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const userDetails = async () => {
    try {
      const response = await fetch(`http://${ipAddr}:3000/get-user?userEmail=${emailProp}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const fetchCompanies = async () => {
    try {
      const response = await fetch(`http://${ipAddr}:3000/get-companies`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
  
      // Fetch reviews for each company
      const companiesWithReviews = await Promise.all(data.map(async (company) => {
        try {
          const response = await fetch(`http://${ipAddr}:3000/reviewRating?email=${encodeURIComponent(company.Email)}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const reviewData = await response.json();
          return {
            ...company,
            avgRating: isNaN(reviewData.averageRating) ? 0 : reviewData.averageRating,
          }; // Return the average rating from the response
        } catch (error) {
          console.error('Error fetching average rating:', error);
          return {
            ...company,
            avgRating: 0, // Return a default value in case of error
          };
        }
      }));
  
      setCompanies(companiesWithReviews)
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const handleTabPress = (tabName) => {
    if (tabName === selectedTab) {
      setSelectedTab(null);
    } else {
      setSelectedTab(tabName);
    }
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#00170C' }}>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Image source={require('../../assets/images/Logo.png')} style={styles.logo} />
              <Text style={styles.logoText}>BookKar</Text>
            </View>
            <TouchableOpacity onPress={() => {
              // handleTabPress('Notifications');
              navigation.navigate('Notifications', {
                email: emailProp,
              });
            }}>
              <Image source={require('../../assets/images/notification_bell.png')} style={styles.notificationBell} />
            </TouchableOpacity>
          </View>
          <Text style={styles.greetingText}>Hello, {user.Name}!</Text>
          <>
          <TouchableOpacity 
            onPress={() => {
              handleTabPress('search');
              navigation.navigate('Search', {
                emailPassed: emailProp,
                currentUser: user
              });
            }}
          >
            <View style={styles.searchContainer} onPress={() => {
              handleTabPress('search');
              navigation.navigate('Search', {
                emailPassed: emailProp,
              });
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../../assets/images/search.png')} style={styles.searchIcon} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search fields near you !"
                  placeholderTextColor="#FFFFFF"
                  editable={false} // Disable editing to prevent keyboard from showing on press
                />
              </View>
            </View>
          </TouchableOpacity>

          </>
          <ScrollView horizontal contentContainerStyle={styles.pillContainer}>
            <PillButton
              text="Recommended"
              size={{ width: 129, height: 31 }}
              isSelected={selectedPill === 'Recommended'}
              onPress={() => handlePillPress('Recommended')}
            />
            <PillButton
              text="Popular"
              size={{ width: 77, height: 31 }}
              isSelected={selectedPill === 'Popular'}
              onPress={() => handlePillPress('Popular')}
            />
            <PillButton
              text="Trending"
              size={{ width: 87, height: 31 }}
              isSelected={selectedPill === 'Trending'}
              onPress={() => handlePillPress('Trending')}
            />
            <PillButton
              text="Book Again"
              size={{ width: 107, height: 31 }}
              isSelected={selectedPill === 'Book Again'}
              onPress={() => handlePillPress('Book Again')}
            />
          </ScrollView>
          <ScrollView horizontal contentContainerStyle={[styles.imageContainer, { width: containerWidth * 1.02  } ]}>
          {companies.map(company => {
            if (company.Image && company.Image.data) {
            // Convert Buffer object to base64-encoded string
            const base64Image = Buffer.from(company.Image.data).toString('base64');
            
            // Use base64-encoded string as the URI for Image component
            let tempComp = { ...company, Image: '' }
            {/* console.log('Company:', company); */}
            console.log('Temp Company:', tempComp);
            return (
              <ImageBox
                key={company._id}
                imageSource={base64Image ? { uri: `data:image/png;base64,${base64Image}` } : require('../../assets/images/image_2.png')}
                title={company.Company_Name}
                location={company.Location}
                price={company.Email}
                rating={company.avgRating}
                navigation={navigation} 
                onPress={() => {
                  navigation.navigate('FieldProfile', {
                    currcompany: { ...company, Image: '' }, // Create a new object without the Image attribute
                    user_email: emailProp,    
                    currentUser: user                  
                  });
                }}
              />
            );
          } else {
            return null; // Return null or a placeholder if company.Image is not defined
          }
        })}

          </ScrollView>
          <View style={styles.recentlyBookedContainer}>
            <Text style={styles.recentlyBookedText}>Recently Booked</Text>
            <TouchableOpacity style={styles.seeAllButton} onPress={() => navigation.navigate('RecentlyBooked', {email: emailProp,})}>
              <Text style={styles.seeAllButtonText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal contentContainerStyle={[styles.imageContainer, { width: containerWidth * 1.02}]}>
  {companies
    .filter(company => bookings.some(booking => booking.Company_Email === company.Email))
    .map(company => {
      // Check if company.Image and company.Image.data exist
      const base64Image = company?.Image?.data
        ? Buffer.from(company.Image.data).toString('base64')
        : null;
      
      return (
        <ImageBox
          key={company._id}
          imageSource={base64Image 
            ? { uri: `data:image/png;base64,${base64Image}` } 
            : require('../../assets/images/image_2.png')} // Fallback image
          title={company.Company_Name}
          location={company.Location}
          price={company.Email}
          rating={company.avgRating}
          navigation={navigation}
          onPress={() => {
            navigation.navigate('FieldProfile', {
              currcompany: { ...company, Image: '' }, // Exclude Image from the object passed to the next screen
              user_email: emailProp,
              currentUser: user
            });
          }}
        />
      );
    })}
</ScrollView>

        </ScrollView>
        <View style={{ height: 40 }} />
      </View>
      <View style={styles.navbar}>
        <TouchableOpacity
          style={styles.navbarTab}
          onPress={() => handleTabPress('home')}
        >
          <Ionicons
            name={'home'}
            size={24}
            color={'#D45A01'}
          />
          <Text style={styles.navbarText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={ styles.navbarTab}
          onPress={() => {
            handleTabPress('search');
            navigation.navigate('Search');
            navigation.navigate('Search', {
              emailPassed: emailProp,
              currentUser: user
            }); // Navigate to the Search page
          }}
        >
          <Ionicons
            name={'search'}
            size={24}
            color={'#7D7D7D'}
          />
          <Text style={styles.navbarText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navbarTab}
          onPress={() => {
            handleTabPress('list');
            // navigation.navigate('UserProfile');
            navigation.navigate('MyBookings', {
              email: emailProp,    
              currentUser: user         
            })}} // Navigate to the Search page
        >
          <Ionicons
            name={'list'}
            size={24}
            color={'#7D7D7D'}
          />
          <Text style={styles.navbarText}>Bookings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navbarTab}
          onPress={() => {
            handleTabPress('person');
            // navigation.navigate('UserProfile');
            navigation.navigate('UserProfile', {
              email: emailProp,
              name: user.Name
            }); // Navigate to the Search page
          }}
        >
          <Ionicons
            name={'person'}
            size={24}
            color={'#7D7D7D'}
          />
          <Text style={styles.navbarText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const PillButton = ({ text, size, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.pill,
        { width: size.width, height: size.height, marginRight: 10 },
        isSelected ? styles.selectedPill : null
      ]}
      onPress={onPress}
    >
      <Text style={[styles.pillText, isSelected ? styles.selectedPillText : null]}>{text}</Text>
    </TouchableOpacity>
  );
};