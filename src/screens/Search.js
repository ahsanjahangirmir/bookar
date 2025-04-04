import React, { useState } from 'react';
import { View, StyleSheet, TextInput, FlatList, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { styles } from '../../assets/styles/searchStyles';
import {ipAddr} from './ipconfig';
import { Platform } from 'react-native';

const SearchScreen = ({ route, navigation }) => {
  const {emailPassed, currentUser} = route.params
  const [selectedPill, setSelectedPill] = useState('Recommended');
  const [selectedTab, setSelectedTab] = useState('search');
  const [loaded] = useFonts({
    UrbanistRegular: require('../../assets/fonts/Urbanist/static/Urbanist-Regular.ttf'),
    UrbanistBold: require('../../assets/fonts/Urbanist/static/Urbanist-SemiBold.ttf'),
    UrbanistMedium: require('../../assets/fonts/Urbanist/static/Urbanist-Medium.ttf'),
    UrbanistSemiBold: require('../../assets/fonts/Urbanist/static/Urbanist-SemiBold.ttf'),
    UrbanistLight : require('../../assets/fonts/Urbanist/static/Urbanist-Light.ttf'),
    MontserratBold: require('../../assets/fonts/Montserrat/static/Montserrat-Bold.ttf'),
    MontserratExtraLight: require('../../assets/fonts/Montserrat/static/Montserrat-ExtraLight.ttf'),
    MontserratSemiBold: require('../../assets/fonts/Montserrat/static/Montserrat-SemiBold.ttf'),
  });

  const handlePillPress = (pill) => {
    setSelectedPill(pill);
  };

  const handleTabPress = (tabName) => {
    if (tabName === selectedTab) {
      setSelectedTab(null);
    } else {
      setSelectedTab(tabName);
    }
  };

  const [query, setQuery] = useState('');
  const [fields, setFields] = useState([]);

  // const searchFields = async (searchQuery) => {
  //   try {
  //     if (!searchQuery) { // Check if searchQuery is empty
  //       setFields([]); // Clear fields if searchQuery is empty
  //       return;
  //     }
  //     const response = await fetch(`http://${ipAddr}:3000/search-fields?field=${searchQuery}`);
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     const data = await response.json();
  //     setFields(data);
  //   } catch (error) {
  //     console.error('Error fetching fields:', error);
  //   }
  // };
  const searchFields = async (searchQuery) => {
    try {
        if (!searchQuery) { // Check if searchQuery is empty
            setFields([]); // Clear fields if searchQuery is empty
            return;
        }
        
        const response = await fetch(`http://${ipAddr}:3000/search-fields?field=${searchQuery}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Fetch additional data for each field
        const fieldsWithAdditionalData = await Promise.all(data.map(async (field) => {
            try {
                // Fetch additional data for the field here
                // Modify the URL and handle the response as needed
                const additionalResponse = await fetch(`http://${ipAddr}:3000/reviewRating?email=${encodeURIComponent(field.Email)}`);
                if (!additionalResponse.ok) {
                    throw new Error('Network response was not ok');
                }
                const additionalData = await additionalResponse.json();
                return {
                    ...field,
                    avgRating: isNaN(additionalData.averageRating) ? 0 : additionalData.averageRating // Add avgRating field
                };
            } catch (error) {
                console.error('Error fetching additional data for field:', error);
                return {
                    ...field,
                    avgRating: 0 // Return default value in case of error
                };
            }
        }));

        setFields(fieldsWithAdditionalData);
    } catch (error) {
        console.error('Error fetching fields:', error);
    }
};


  const renderItem = ({ item }) => {
    let ratingColor = '#C4C4C4'; // Default color
    const ratingValue = parseFloat(item.avgRating);
    if (ratingValue >= 3.5 && ratingValue <= 5) {
      ratingColor = 'green';
    } else if (ratingValue > 2.1 && ratingValue < 3.5) {
      ratingColor = 'yellow';
    } else if (ratingValue >= 0 && ratingValue <= 2) {
      ratingColor = 'red';
    }
    const base64Image = Buffer.from(item.Image.data).toString('base64');
  
    const handleArenaCardPress = () => {
        navigation.navigate('FieldProfile', {
          currcompany: { ...item, Image: '' },
          user_email: emailPassed,    
          currentUser: currentUser                
      })
      
    };
    const findLowestHourlyRate = (array) => {
      // If the array is empty, return 2000
      if (array.length === 0) {
          return 2000;
      }
  
      // Initialize lowestRate with the maximum possible value
      let lowestRate = Number.MAX_VALUE;
  
      // Iterate through each object in the array
      array.forEach((element) => {
          // Check if the current element's hourlyRate is lower than the current lowestRate
          if (element.hourlyRate && element.hourlyRate < lowestRate) {
              lowestRate = element.hourlyRate;
          }
      });
  
      return lowestRate;
  };
  
    return (
      <TouchableOpacity onPress={handleArenaCardPress}>
        <View style={styles.arenaCard}>
          <Image
            source={base64Image ? { uri: `data:image/png;base64,${base64Image}` } : require('../../assets/images/image_2.png')}
            style={styles.arenaImage}
          />
          <View style={styles.detailsContainer}>
            <Text style={styles.name}>{item.Company_Name}</Text>
            <Text style={styles.distance}>{item.Location}</Text>
          </View>
          
          <View style={styles.bottomRow}>
            <Text>
              <Text style={styles.price}>From </Text>{'\n'}
              <Text style={styles.price}>PKR {findLowestHourlyRate(item.services)}</Text>
            </Text>
            <View style={styles.leftSection}>
              <Image source={require('../../assets/images/gold_star.png')} />
              <Text style={[styles.rating, { color: ratingColor }]}>{item.avgRating}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  

  return (
    <View style={styles.container}>
      {/* Search bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="black" />
        <TextInput 
          placeholder="Search" 
          placeholderTextColor="#C4C4C4" 
          style={styles.searchInput} 
          onChangeText={(text) => {
            setQuery(text);
            searchFields(text);
          }}
          value={query}
        />
      </View>


      {/* Arena cards */}
      <View style={styles.arenaContainer}>
        <View style={{ flex: 1, overflowY: 'scroll' }}>
          <FlatList
            data={fields}
            numColumns={2}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            style={{ marginTop: 10 }}
          />
        </View>
      </View>
      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity
          style={styles.navbarTab}
          onPress= {() => {
            handleTabPress('home');
            navigation.navigate('HomePage', {
              emailProp: emailPassed,
            });
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
          onPress={() => handleTabPress('search')}
        >
          <Ionicons
            name={'search'}
            size={24}
            color={'#D45A01'}
          />
          <Text style={styles.navbarText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navbarTab}
          onPress={() => {
            handleTabPress('list');
            // navigation.navigate('UserProfile');
            navigation.navigate('MyBookings', {
              email: emailPassed,   
              currentUser: currentUser        
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
              email: emailPassed,
              name: currentUser.Name
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
    </View>
  );
};

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

SearchScreen.navigationOptions = {
  transitionSpec: {
    open: { animation: 'timing', config: { duration: 0 } }, // Disable animation when screen opens
    close: { animation: 'timing', config: { duration: 0 } }, // Disable animation when screen closes
  },
};


export default SearchScreen;