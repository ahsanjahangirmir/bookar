import React, { useState, useEffect, useCallback} from 'react';
import { View, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, SafeAreaView, StyleSheet, Animated, Keyboard, Image, FlatList, Modal ,ScrollView} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { useFonts } from 'expo-font';
import { styles } from '../../assets/styles/ownerbookingsStyles.js';
import img from '../../assets/images/Logo.png';
import ReviewComponent from './ReviewComponent';
import {ipAddr} from './ipconfig.js';


const MyBookings = ({ route, navigation }) => {

    const { emailProp, currentUser } = route.params;
    const [selectedCategory, setSelectedCategory] = useState('UpComing');
    const [bookings, setBookings] = useState([]);
    const [selectedTab, setSelectedTab] = useState('list');

    const handleTabPress = (tabName) => {
        setSelectedTab(tabName);
    
        switch (tabName) {
          case 'home':
              navigation.navigate('OwnerHomepage', { email: emailProp });
            break;
          case 'list':
            break;
          case 'cart':
            // Navigate to 'OwnerInventory' screen when cart tab is pressed
            navigation.navigate('OwnerInventory', { emailProp: emailProp, currentUser: currentUser });
            break;
          case 'person':
            navigation.navigate('StatScreen', { emailProp: emailProp, currentUser: currentUser });
            break;
          default:
            break;
        }
    };
    const [loaded] = useFonts({
        UrbanistRegular: require('../../assets/fonts/Urbanist/static/Urbanist-Regular.ttf'),
        UrbanistBold: require('../../assets/fonts/Urbanist/static/Urbanist-Bold.ttf'),
        UrbanistSemiBold: require('../../assets/fonts/Urbanist/static/Urbanist-SemiBold.ttf'),
        UrbanistMedium: require('../../assets/fonts/Urbanist/static/Urbanist-Medium.ttf'),
        MontserratBold: require('../../assets/fonts/Montserrat/static/Montserrat-Bold.ttf'),
        MontserratExtraLight: require('../../assets/fonts/Montserrat/static/Montserrat-ExtraLight.ttf'),
        MontserratSemiBold: require('../../assets/fonts/Montserrat/static/Montserrat-SemiBold.ttf'),
        MontserratMedium: require('../../assets/fonts/Montserrat/static/Montserrat-Medium.ttf'),
    });

    // useEffect(() => {
    //   fetchMyBookings();
    // }, []);
    useFocusEffect(
      useCallback(() => {
          fetchMyBookings();
      }, [])
  );

  // All functions: 
  /////////////////////////////////////////////////////////////////
  const Navbar = () => {
    return (
        <View style={styles.navbar}>
        <TouchableOpacity
          style={styles.navbarTab}
          onPress={() => handleTabPress('home')}
        >
          <Ionicons
            name={'home'}
            size={24}
            color={'#7D7D7D'}
          />
          <Text style={styles.navbarText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navbarTab}
          onPress={() => handleTabPress('list')}
        >
          <Ionicons
            name={'calendar'}
            size={24}
            color={'#D45A01'}
          />
          <Text style={styles.navbarText}>Bookings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navbarTab}
          onPress={() => handleTabPress('cart')}
        >
          <Ionicons
            name={'cart'}
            size={24}
            color={'#7D7D7D'}
          />
          <Text style={styles.navbarText}>Inventory</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navbarTab}
          onPress={() => handleTabPress('person')}
        >
          <Ionicons
            name={'logo-usd'}
            size={24}
            color={'#7D7D7D'}
          />
          <Text style={styles.navbarText}>Earnings</Text>
        </TouchableOpacity>
      </View>
      );
  };
  ////////////////////////ASYNC FUNCTIONS/////////////////////////////////////////
  const fetchMyBookings = async () => {
      try {
        console.log("route param: ", route.params.emailProp)
        const response = await fetch(`http://${ipAddr}:3000/owner-bookings?ownerEmail=${emailProp}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
          }
          const data = await response.json();
          console.log("data: ")
          console.log(data)
          setBookings(data);
      } catch (error) {
          console.error('Error fetching bookings:', error);
      }
  };
  /////////////////////////////////////////////////////////////////////////////////

  const PillButton = ({ text, isSelected, onPress }) => {
      return (
          <TouchableOpacity
              style={[
                  styles.pill,
                  isSelected ? styles.selectedPill : styles.unselectedPill
              ]}
              onPress={onPress}
          >
              <Text style={[styles.pillText, isSelected ? styles.selectedPillText : styles.unselectedPillText]}>
                  {text}
              </Text>
          </TouchableOpacity>
      );
  };
  function checkEventStatus(eventString) {
      // Split the event string into start and end times
      const [timeRange, eventDate] = eventString.split(' ');
      const [startTime, endTime] = timeRange.split('-');
  
      // Parse start and end times
      const eventStartTime = new Date(`${eventDate}T${startTime}:00`);
      const eventEndTime = new Date(`${eventDate}T${endTime}:00`);
      const currentTime = new Date();
  
      if (currentTime >= eventStartTime && currentTime < eventEndTime) 
      {
          return 'Ongoing';
      } 
      else if (currentTime >= eventEndTime && currentTime > eventStartTime) 
      {
          return 'Completed';
      } 
      else 
      {
          return 'Not Started';
      }
  }
  const BookingsCard = ({ venueName, bookingTime, cancelled, useremail, companyemail, fieldname, price, companyname }) => {

    if (selectedCategory === "All")
    {
      return AllBookings({ venueName, bookingTime, cancelled, useremail, companyemail, fieldname, price, companyname })
    }
    else if (selectedCategory === "Ongoing")
    {
      return OngoingBookings({ venueName, bookingTime, cancelled })
    }
    else if (selectedCategory === "Completed")
    {
      return CompletedBookings({ venueName, bookingTime, cancelled, companyname })
    }
    else if (selectedCategory === "UpComing")
    {
      return UpcomingBookings({ venueName, bookingTime, cancelled, useremail, companyemail, fieldname })
    }
    else 
    {
      return CanceledBookings({ venueName, bookingTime, cancelled })
    }
  };
  const OngoingBookings = ({ venueName, bookingTime, cancelled }) =>{
    if (!cancelled && checkEventStatus(bookingTime) === "Ongoing") return (<View style={styles.card}>
      <View style={styles.row}>
          <Image source={img} style={styles.cardImage} />
          <View style={styles.cardTextContent}>
              <Text style={styles.venueName}>{venueName}</Text>
              <Text style={styles.bookingTime}>{bookingTime}</Text>
              <View style={styles.paidContainer}>
                  <Text style={styles.paidText}>Paid</Text>
              </View>
          </View>
      </View>
      </View>
    )
  }
  const AllBookings = ({ venueName, bookingTime, cancelled, useremail, companyemail, fieldname, price, companyname }) => {
    return (
        <View style={styles.card}>
            <View style={styles.row}>
                <Image source={img} style={styles.cardImage} />
                <View style={styles.cardTextContent}>
                    <Text style={styles.venueName}>{venueName}</Text>
                    <Text style={styles.bookingTime}>{bookingTime}</Text>
                    {!cancelled  && <View style={styles.paidContainer}>
                        <Text style={styles.paidText}>Paid</Text>
                    </View>
                    }
                    {cancelled  && <View style={styles.cancelContainer}>
                        <Text style={styles.canceledText}>Canceled</Text>
                    </View>
                    }
                </View>
            </View>
            {cancelled && (
                <View style={[styles.tagContainer, styles.refundedTag]}>
                    <Text style={styles.tagText}>Canceled & Refunded</Text>
                    <View style={styles.line} />
                    <View style={styles.bottomTagContainer}>
                        <Ionicons name="alert-circle-outline" size={24} color="#FF7878" />
                        <Text style={styles.bottomTagText}>Canceled Booking</Text>
                    </View>
                </View>
            )}
            {!cancelled && checkEventStatus(bookingTime) === "Not Started" &&
              (
                <View >
                    <Text style={styles.tagText}>Upcoming</Text>
                </View>
              )
            }
        </View>
    );
  };
  const CanceledBookings = ({ venueName, bookingTime, cancelled }) => {
      if (cancelled) return (
          ( <View style={styles.card}>
              <View style={styles.row}>
                  <Image source={img} style={styles.cardImage} />
                  <View style={styles.cardTextContent}>
                      <Text style={styles.venueName}>{venueName}</Text>
                      <Text style={styles.bookingTime}>{bookingTime}</Text>
                      <View style={styles.paidContainer}>
                          <Text style={styles.paidText}>lora </Text>
                      </View>
                  </View>
              </View>
              <View style={[styles.tagContainer, styles.refundedTag]}>
                  <Text style={styles.tagText}>Canceled & Refunded</Text>
                  <View style={styles.line} />
                  <View style={styles.bottomTagContainer}>
                      <Ionicons name="alert-circle-outline" size={24} color="#FF7878" />
                      <Text style={styles.bottomTagText}>You canceled this booking</Text>
                  </View>
              </View>
              </View>
          )
      );
      else return (<></>)
  };
  const UpcomingBookings = ({ venueName, bookingTime, cancelled, useremail, companyemail, fieldname }) => {
    if (!cancelled && checkEventStatus(bookingTime) === "Not Started") return (
        <View style={styles.card}>
            <View style={styles.row}>
                <Image source={img} style={styles.cardImage} />
                <View style={styles.cardTextContent}>
                    <Text style={styles.venueName}>{venueName}</Text>
                    <Text style={styles.bookingTime}>{bookingTime}</Text>
                    <View style={styles.paidContainer}>
                        <Text style={styles.paidText}>Paid</Text>
                    </View>
                    <View style={styles.tagContainer1}>
                      <Text style={styles.tagText}>Upcoming</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};
  const CompletedBookings = ({ venueName, bookingTime, cancelled, companyname }) => {
    if (! cancelled && checkEventStatus(bookingTime) === "Completed") return (
        <View style={styles.card}>
            <View style={styles.row}>
                <Image source={img} style={styles.cardImage} />
                <View style={styles.cardTextContent}>
                    <Text style={styles.venueName}>{venueName}</Text>
                    <Text style={styles.bookingTime}>{bookingTime}</Text>
                    <View style={styles.paidContainer}>
                        <Text style={styles.paidText}>Paid</Text>
                    </View>         
                </View>
            </View>
        </View>
    );
  };
  /////////////////////////////////////////////////////////////////
  return (
      <SafeAreaView style={styles.container}>
          <View style={styles.header}>
              <Image
                  source={require('../../assets/images/Logo.png')}
                  style={styles.logo}
              />
              <Text style={styles.headerTitle}>My Bookings</Text>
          </View>
          <ScrollView horizontal contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.pillContainer}>
              <PillButton text="Up-coming" isSelected={selectedCategory === 'UpComing'} onPress={() => setSelectedCategory('UpComing')} />
              <PillButton text="All" isSelected={selectedCategory === 'All'} onPress={() => setSelectedCategory('All')} />
              <PillButton text="Ongoing" isSelected={selectedCategory === 'Ongoing'} onPress={() => setSelectedCategory('Ongoing')} />
              <PillButton text="Completed" isSelected={selectedCategory === 'Completed'} onPress={() => setSelectedCategory('Completed')} />
              <PillButton text="Canceled" isSelected={selectedCategory === 'Canceled'} onPress={() => setSelectedCategory('Canceled')} />
          </View>
          </ScrollView>
          <FlatList
              data= {bookings}
              renderItem={({ item }) => {
                  return (
                      <BookingsCard
                          venueName={(item.Field_Name).toString() + " " + (item.Company_Name).toString()}
                          companyname = {item.Company_Name}
                          bookingTime={item.Booking_Time}
                          cancelled={item.Canceled}
                          useremail = {item.User_Email}
                          companyemail = {item.Company_Email}
                          fieldname = {item.Field_Name}
                          price = {item.Total}
                      />
                  );
              }}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.bookingsListContainer}
          />
          <Navbar />
      </SafeAreaView>
  );
};

export default MyBookings;
