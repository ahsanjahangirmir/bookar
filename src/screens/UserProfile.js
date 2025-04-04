  // import React from 'react';
  import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView,SafeAreaView } from 'react-native';
  import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
  import icon from 'react-native-vector-icons/FontAwesome'; 
  import { Button } from 'react-native';
  import React, { useState, useEffect } from 'react'; // Import useState
  import { useNavigation, StackActions } from '@react-navigation/native';
  import { Ionicons } from '@expo/vector-icons';
  import {ipAddr} from './ipconfig.js';



export default function UserProfileScreen({ route }) {
    const {email, name} = route.params;
    const [selectedTab, setSelectedTab] = useState('search');
    const [user, setUser] = useState({});
  
    const navigation = useNavigation();
  
    const navigateToHome = () => {
      navigation.navigate('HomePage');
    };

    const handleLogout = () => {
      // Reset the navigation stack to the Login screen
      navigation.navigate('Login');
      navigation.dispatch(StackActions.replace('Login'));
    };
    
      
    const userDetails = async () => {
      try {
        const response = await fetch(`http://${ipAddr}:3000/get-user?userEmail=${email}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    useEffect(() => {
      userDetails();
    }, []);
    const handleTabPress = (tabName) => {
      if (tabName === selectedTab) {
        setSelectedTab(null);
      } else {
        setSelectedTab(tabName);
      }
    };
    return (
      <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/ds.png')} // Replace with the path to your logo
            style={styles.logo}
          />
          <Text style={styles.profileTitle}>Profile</Text>
        </View>
      </View>
      <ScrollView style={styles.container}>

        <View style={styles.profileSection}>
          <Image
            style={styles.avatar}
            source={require('../../assets/images/fff.png')}
          />
          <Text style={styles.userName}>{name}</Text>
          <Text style={styles.userEmail}>{email}</Text>
        </View>
    <TouchableOpacity style={styles.button} onPress={() => {
            navigation.navigate('EditProfile', {
              emailRecvd : email,
              namercv: name
            }); // Navigate to the Profile page
          }}>
      <Icon name="account-edit" size={20} color="#C4C4C4" />
      <Text style={styles.buttonText}>Edit Profile</Text>
    </TouchableOpacity>
        
        {/* Additional buttons */}
        <TouchableOpacity style={styles.button} onPress={() => {
              navigation.navigate('Notifications', {
              email : email,
              }); // Navigate to the Profile page
          }}>
          <Icon name="bell-outline" size={20} color="#C4C4C4" />
          <Text style={styles.buttonText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonLogout} onPress={handleLogout}>
          <Icon name="logout" size={20} color="#FF3B30" />
          <Text style={[styles.buttonText, styles.buttonTextLogout]}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={{ height: 50 }} />
      <View style={styles.navbar}>
        <TouchableOpacity
            style={selectedTab === 'home' ? styles.navbarTabSelected : styles.navbarTab}
            onPress={() => {handleTabPress('home');
            navigation.navigate('HomePage');
            navigation.navigate('HomePage', {
                emailProp: email, });
            }}
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
            onPress={() => {
              handleTabPress('search');
              navigation.navigate('Search');
              navigation.navigate('Search', {
                emailPassed: email,
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
              email: email,    
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
          onPress={() => handleTabPress('person')}
        >
          <Ionicons
            name={'person'}
            size={24}
            color={'#D45A01'}
          />
          <Text style={styles.navbarText}>Profile</Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView>
    );
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#00170C',
    },
    safeArea: {
      flex: 1, // The SafeAreaView should expand to fill the entire screen
      backgroundColor: '#00170C',
    },
    header: {
      paddingLeft: 10, // Aligns title to the left
      paddingVertical: 16,
    },
    headerTitle: {
      color: '#FFF',
      fontSize: 24,
      fontFamily: 'Urbanist-Bold', // Make sure the Urbanist font is linked in your project
    },
    profileSection: {
      alignItems: 'center',
      marginTop: 32,
    },
    avatar: {
      width: 130,
      height: 130,
      marginTop:-30,
      borderRadius: 40,
      marginBottom:-40,
    },
    userName: {
      color: '#FFF',
      fontSize: 24,
      fontFamily: 'Urbanist-Bold',
      marginTop: 40,
    },
    userEmail: {
      color: '#D45A01',
      fontSize: 14,
      fontFamily: 'UrbanistRegular', // Or 'Urbanist-Regular' if available
      marginTop: 4,
      marginBottom: 50,
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      paddingBottom: 16,
      marginLeft : 15,
      
      // borderBottomWidth: 1,
      // borderBottomColor: '#303030',
    },
    buttonText: {
      color: '#C4C4C4',
      marginLeft: 16,
      fontFamily: 'Urbanist', // Apply Urbanist font
    },

    buttonLogout: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      marginLeft : 15,
      
    },
    buttonTextLogout: {
      color: '#FF3B30',
      fontFamily: 'Urbanist', // Apply Urbanist font
    },
    tabBar: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 10,
      backgroundColor: '#00170Cx',
      // borderTopColor: '#303030',
      // borderTopWidth: 1,
      
    },
    tabItem: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    tabTitle: {
      color: '#7D7D7D',
      fontSize: 12,
      fontFamily: 'Urbanist', // Make sure to load the font
      marginTop: 4,
    },
    logoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
    logo: {
      width: 50,
      height: 50,
    },
    profileTitle: {
      marginLeft: 4,
      fontSize: 20, // Change font size to 24
      fontWeight: 'bold',
      color: '#C4C4C4', // Change color to #C4C4C4
      fontFamily: 'Urbanist',
    },
    imageButton: {
      width: 22,
      height: 22,
      position: 'absolute', // Add this line
      top: -46, // Adjust as needed
      right: 10
    },
    navbar: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: '100%',
      height: '10%',
      backgroundColor: '#00170C',
      marginTop:30,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      borderColor: 'black',
      borderWidth: 3, 
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

