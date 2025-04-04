import React from 'react';
import { ScrollView,Button,Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Make sure to install this package=
import  { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
// import Geolocation from '@react-native-community/geolocation';
// import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const serviceIcons = {
    Hockey: require('../../assets/images/Hockey.png'),
    TennisBall: require('../../assets/images/Tennis Ball.png'),
    TennisRacquet: require('../../assets/images/Tennis Racquet.png'),
    Vector: require('../../assets/images/Vector.png'),
    Swimming: require('../../assets/images/Swimming (1).png'),
    BasketballAlt: require('../../assets/images/Basketball Alt.png'),
  };
  
  const CreateListingScreen = ({route}) => {
    const {email} = route.params;
    const [startModalVisible, setStartModalVisible] = useState(false);
    const [endModalVisible, setEndModalVisible] = useState(false);
    const [selectedServices, setSelectedServices] = useState({});
    const [selectedFacilities, setSelectedFacilities] = useState({});
    const navigation = useNavigation();
    const [startTime, setStartTime] = useState('00:00');
    const [endTime, setEndTime] = useState('00:00');
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState({
      type: "Point",
      coordinates: [-122.4324, 37.78825] // San Francisco coordinates as default
    });

    const prepareDataAndNavigate = () => {
      const servicesArray = Object.keys(selectedServices)
        .filter(service => selectedServices[service]) // Filter selected services
        .map(service => ({ service, hourlyRate: 0, fieldCount: 0 })); // Map to required format
  
      const facilitiesArray = Object.keys(selectedFacilities)
        .filter(facility => selectedFacilities[facility]); // Filter selected facilities
  
      const openHours = `${startTime} - ${endTime}`;
  
      navigation.navigate('UpdatePricingOwner', {
        email, name, address, description,
        servicesArray: servicesArray,
        facilities: facilitiesArray,
        location,
        openHours
      });
    };

    // useEffect(() => {
    //   const requestLocationPermission = async () => {
    //     if (Platform.OS === 'ios') {
    //       const status = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    //       if (status === RESULTS.GRANTED) fetchLocation();
    //     } else {
    //       const status = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    //       if (status === RESULTS.GRANTED) fetchLocation();
    //     }
    //   };
  
    //   const fetchLocation = () => {
    //     Geolocation.getCurrentPosition(
    //       (position) => {
    //         const { latitude, longitude } = position.coords;
    //         setLocation({
    //           type: "Point",
    //           coordinates: [longitude, latitude]
    //         });
    //       },
    //       (error) => console.error(error),
    //       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    //     );
    //   };
  
    //   requestLocationPermission();
    // }, []);
  
    const toggleService = (service) => {
      setSelectedServices(prev => ({
        ...prev,
        [service]: !prev[service]
      }));
    };

    const toggleFacility = (facility) => {
      setSelectedFacilities(prev => ({
        ...prev,
        [facility]: !prev[facility]
      }));
    };
  
    const timeSlots = Array.from({length: 24}, (v, i) => (`${i.toString().padStart(2, '0')}:00`));
    const getServiceStyle = (service) => {
        return selectedServices[service] ? styles.selectedService : {};
      };
      const TimePickerModal = ({ isVisible, onClose, onValueChange, selectedValue, timeSlots }) => {
        return (
          <Modal visible={isVisible} transparent={true} animationType="slide">
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Picker
                  selectedValue={selectedValue}
                  onValueChange={onValueChange}
                  style={{ width: '100%', color: '#D45A01' }}
                >
                  {timeSlots.map((time, index) => (
                    <Picker.Item key={index} label={time} value={time} />
                  ))}
                </Picker>
                <TouchableOpacity onPress={onClose} style={styles.modalButton}>
                  <Text style={styles.textStyle}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        );
      };
      
    const renderServiceButtons = () => {
        return Object.keys(serviceIcons).map(service => (
          <TouchableOpacity
            key={service}
            onPress={() => toggleService(service)}
            style={styles.serviceButton}
          >
            <Image
              source={serviceIcons[service]}
              style={[
                styles.serviceIcon,
                selectedServices[service] ? { tintColor: '#D45A01' } : { tintColor: '#FFFFFF' },
              ]}
            />
            <Text style={[
              styles.serviceText,
              selectedServices[service] ? { color: '#D45A01' } : { color: '#FFFFFF' },
            ]}>
              {service}
            </Text>
          </TouchableOpacity>
        ));
      };
    return (
        <ScrollView style={styles.container}>
          <View style={styles.header}>
          <TouchableOpacity 
  onPress={() => navigation.navigate('OwnerHomepage', { email: email })}
  style={{ marginTop: 23 }}  // Add this line
>
  <Icon name="arrow-left" size={24} color="#C4C4C4"  />
</TouchableOpacity>
            <Text style={styles.headerTitle}>Create A New Listing</Text>
          </View>
    
          <TextInput style={styles.input} placeholder="Name" placeholderTextColor="#C4C4C4" value={name} onChangeText={setName} />
          <TextInput style={styles.input} placeholder="Address" placeholderTextColor="#C4C4C4" value={address} onChangeText={setAddress}/>
          <TextInput style={styles.input} placeholder="Description" placeholderTextColor="#C4C4C4" value={description} onChangeText={setDescription}  />
    
          <Text style={styles.sectionTitle}>Select Services</Text>
      <View style={styles.servicesGrid}>
      <TouchableOpacity 
          style={[styles.serviceButton, selectedServices['Tennis'] ? styles.selectedService : {}]}
          onPress={() => toggleService('Tennis')}>
          <Image 
            source={serviceIcons.TennisRacquet} 
            style={[styles.serviceIcon, selectedServices['Tennis'] ? { tintColor: '#D45A01' } : {}]} />
          <Text 
            style={[styles.serviceText, selectedServices['Tennis'] ? { color: '#D45A01' } : {}]}>
            Tennis
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.serviceButton, selectedServices['Swimming'] ? styles.selectedService : {}]}
          onPress={() => toggleService('Swimming')}>
          <Image 
            source={serviceIcons.Swimming} 
            style={[styles.serviceIcon, selectedServices['Swimming'] ? { tintColor: '#D45A01' } : {}]} />
          <Text 
            style={[styles.serviceText, selectedServices['Swimming'] ? { color: '#D45A01' } : {}]}>
            Swimming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.serviceButton, selectedServices['Cricket'] ? styles.selectedService : {}]}
          onPress={() => toggleService('Cricket')}>
          <Image 
            source={serviceIcons.TennisBall} 
            style={[styles.serviceIcon, selectedServices['Cricket'] ? { tintColor: '#D45A01' } : {}]} />
          <Text 
            style={[styles.serviceText, selectedServices['Cricket'] ? { color: '#D45A01' } : {}]}>
            Cricket
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.serviceButton, selectedServices['Basketball'] ? styles.selectedService : {}]}
          onPress={() => toggleService('Basketball')}>
          <Image 
            source={serviceIcons.BasketballAlt} 
            style={[styles.serviceIcon, selectedServices['Basketball'] ? { tintColor: '#D45A01' } : {}]} />
          <Text 
            style={[styles.serviceText, selectedServices['Basketball'] ? { color: '#D45A01' } : {}]}>
            Basketball
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.serviceButton, selectedServices['Gaming'] ? styles.selectedService : {}]}
          onPress={() => toggleService('Gaming')}>
          <Image 
            source={require('../../assets/images/game-new.png')} 
            style={[styles.serviceIcon, selectedServices['Gaming'] ? { tintColor: '#D45A01' } : {}]} />
          <Text 
            style={[styles.serviceText, selectedServices['Gaming'] ? { color: '#D45A01' } : {}]}>
            Gaming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.serviceButton, selectedServices['Football'] ? styles.selectedService : {}]}
          onPress={() => toggleService('Football')}>
          <Image 
            source={serviceIcons.Vector} 
            style={[styles.serviceIcon, selectedServices['Football'] ? { tintColor: '#D45A01' } : {}]} />
          <Text 
            style={[styles.serviceText, selectedServices['Football'] ? { color: '#D45A01' } : {}]}>
            Football
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.serviceButton, selectedServices['Badminton'] ? styles.selectedService : {}]}
          onPress={() => toggleService('Badminton')}>
          <Image 
            source={require('../../assets/images/Shuttlecock.png')} 
            style={[styles.serviceIcon, selectedServices['Badminton'] ? { tintColor: '#D45A01' } : {}]} />
          <Text 
            style={[styles.serviceText, selectedServices['Badminton'] ? { color: '#D45A01' } : {}]}>
            Badminton
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.serviceButton, selectedServices['Volleyball'] ? styles.selectedService : {}]}
          onPress={() => toggleService('Volleyball')}>
          <Image 
            source={require('../../assets/images/Volleyball.png')} 
            style={[styles.serviceIcon, selectedServices['Volleyball'] ? { tintColor: '#D45A01' } : {}]} />
          <Text 
            style={[styles.serviceText, selectedServices['Volleyball'] ? { color: '#D45A01' } : {}]}>
            Volleyball
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
  style={[styles.serviceButton, selectedServices['Snooker'] ? styles.selectedService : {}]}
  onPress={() => toggleService('Snooker')}>
  <Image 
    source={require('../../assets/images/Circled 8.png')} 
    style={[
      styles.serviceIcon, 
      selectedServices['Snooker'] ? { tintColor: '#D45A01' } : {},
      { width: 32, height: 30 }  // Adjust the width and height here
    ]} 
  />
  <Text 
    style={[styles.serviceText, selectedServices['Snooker'] ? { color: '#D45A01' } : {}]}>
    Snooker
  </Text>
</TouchableOpacity>
        <TouchableOpacity 
          style={[styles.serviceButton, selectedServices['Golf'] ? styles.selectedService : {}]}
          onPress={() => toggleService('Golf')}>
          <Image 
    source={require('../../assets/images/Golf.png')} 
    style={[styles.serviceIcon, selectedServices['Golf'] ? { tintColor: '#D45A01' } : {}]} />
          <Text 
            style={[styles.serviceText, selectedServices['Golf'] ? { color: '#D45A01' } : {}]}>
            Golf
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.serviceButton, selectedServices['Squash'] ? styles.selectedService : {}]}
          onPress={() => toggleService('Squash')}>
          <Image 
    source={require('../../assets/images/Racquetball.png')} 
    style={[styles.serviceIcon, selectedServices['Squash'] ? { tintColor: '#D45A01' } : {}]} />
          <Text 
            style={[styles.serviceText, selectedServices['Squash'] ? { color: '#D45A01' } : {}]}>
            Squash
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.serviceButton, selectedServices['Horse Riding'] ? styles.selectedService : {}]}
          onPress={() => toggleService('Horse Riding ')}>
          <Image 
    source={require('../../assets/images/Trotting Horse.png')} 
    style={[styles.serviceIcon, selectedServices['Horse Riding'] ? { tintColor: '#D45A01' } : {}]} />
          <Text 
            style={[styles.serviceText, selectedServices['Horse Riding'] ? { color: '#D45A01' } : {}]}>
            Horse Riding
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.serviceButton, selectedServices['Bowling'] ? styles.selectedService : {}]}
          onPress={() => toggleService('Bowling')}>
          <Image 
    source={require('../../assets/images/Bowling Pins.png')} 
    style={[styles.serviceIcon, selectedServices['Bowling'] ? { tintColor: '#D45A01' } : {}]} />
          <Text 
            style={[styles.serviceText, selectedServices['Bowling '] ? { color: '#D45A01' } : {}]}>
            Bowling
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.serviceButton, selectedServices['Gun Range'] ? styles.selectedService : {}]}
          onPress={() => toggleService('Gun Range')}>
          <Image 
    source={require('../../assets/images/Target.png')} 
    style={[styles.serviceIcon, selectedServices['Gun Range'] ? { tintColor: '#D45A01' } : {}]} />
          <Text 
            style={[styles.serviceText, selectedServices['Gun Range'] ? { color: '#D45A01' } : {}]}>
            Gun Range
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.serviceButton, selectedServices['Gym'] ? styles.selectedService : {}]}
          onPress={() => toggleService('Gym')}>
          <Image 
    source={require('../../assets/images/Gym.png')} 
    style={[styles.serviceIcon, selectedServices['Gym'] ? { tintColor: '#D45A01' } : {}]} />
          <Text 
            style={[styles.serviceText, selectedServices['Gym'] ? { color: '#D45A01' } : {}]}>
            Gym
          </Text>
        </TouchableOpacity>
        
      </View>
          <Text style={styles.sectionTitle}>Select Facilities</Text>
          <View style={styles.servicesGrid}>
          {/* Repeat the above mapping for facilities, adjust the object and state handling accordingly. */}
          <TouchableOpacity 
          style={[styles.serviceButton, selectedFacilities['WiFi'] ? styles.selectedService : {}]}
          onPress={() => toggleFacility('WiFi')}>
          <Image 
    source={require('../../assets/images/WIFI_white.png')} 
    style={[styles.serviceIcon, selectedServices['WiFi'] ? { tintColor: '#D45A01' } : {}]} />
          <Text 
            style={[styles.serviceText, selectedFacilities['WiFi'] ? { color: '#D45A01' } : {}]}>
            WiFi
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.serviceButton, selectedFacilities['Pool'] ? styles.selectedService : {}]}
          onPress={() => toggleFacility('Pool')}>
          <Image 
            source={serviceIcons.Swimming} 
            style={[styles.serviceIcon, selectedFacilities['Pool'] ? { tintColor: '#D45A01' } : {}]} />
          <Text 
            style={[styles.serviceText, selectedFacilities['Pool'] ? { color: '#D45A01' } : {}]}>
            Pool
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.serviceButton, selectedFacilities['Fitness Center'] ? styles.selectedService : {}]}
          onPress={() => toggleFacility('Fitness Center')}>
          <Image 
    source={require('../../assets/images/dumbell_white.png')} 
    style={[styles.serviceIcon, selectedFacilities['Fitness Center'] ? { tintColor: '#D45A01' } : {}]} />
          <Text 
            style={[styles.serviceText, selectedFacilities['Fitness Center'] ? { color: '#D45A01' } : {}]}>
            Fitness Center
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.serviceButton, selectedFacilities['24 Hour Service'] ? styles.selectedService : {}]}
          onPress={() => toggleFacility('24 Hour Service')}>
          <Image 
    source={require('../../assets/images/24-Hours.png')} 
    style={[styles.serviceIcon, selectedFacilities['24 Hour Service'] ? { tintColor: '#D45A01' } : {}]} />
          <Text 
            style={[styles.serviceText, selectedFacilities['24 Hour Service'] ? { color: '#D45A01' } : {}]}>
            24 Hour Service
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.serviceButton, selectedFacilities['Elevator'] ? styles.selectedService : {}]}
          onPress={() => toggleFacility('Elevator')}>
          <Image 
    source={require('../../assets/images/elevator_white.png')} 
    style={[styles.serviceIcon, selectedFacilities['Elevator'] ? { tintColor: '#D45A01' } : {}]} />
          <Text 
            style={[styles.serviceText, selectedFacilities['Elevator'] ? { color: '#D45A01' } : {}]}>
            Elevator
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.serviceButton, selectedFacilities['Sauna'] ? styles.selectedService : {}]}
          onPress={() => toggleFacility('Sauna')}>
          <Image 
    source={require('../../assets/images/Sauna.png')} 
    style={[styles.serviceIcon, selectedFacilities['Sauna'] ? { tintColor: '#D45A01' } : {}]} />
          <Text 
            style={[styles.serviceText, selectedFacilities['Sauna'] ? { color: '#D45A01' } : {}]}>
            Sauna
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.serviceButton, selectedFacilities['Restaurant'] ? styles.selectedService : {}]}
          onPress={() => toggleFacility('Restaurant')}>
          <Image 
    source={require('../../assets/images/Menu.png')} 
    style={[styles.serviceIcon, selectedFacilities['Restaurant'] ? { tintColor: '#D45A01' } : {}]} />
          <Text 
            style={[styles.serviceText, selectedFacilities['Restaurant'] ? { color: '#D45A01' } : {}]}>
            Restaurant
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
  style={[styles.serviceButton, selectedFacilities['Parking'] ? styles.selectedService : {}]}
  onPress={() => toggleFacility('Parking')}>
  <Image 
    source={require('../../assets/images/parking_white.png')} 
    style={[
      styles.serviceIcon, 
      selectedFacilities['Parking'] ? { tintColor: '#D45A01' } : {},
      { width: 41, height: 30 }  // Adjust the width and height here
    ]} 
  />
  <Text 
    style={[styles.serviceText, selectedFacilities['Parking'] ? { color: '#D45A01' } : {}]}>
    Parking
  </Text>
</TouchableOpacity>

        <TouchableOpacity 
          style={[styles.serviceButton, selectedFacilities['A/C'] ? styles.selectedService : {}]}
          onPress={() => toggleFacility('A/C')}>
          <Image 
    source={require('../../assets/images/AC.png')} 
    style={[styles.serviceIcon, selectedFacilities['A/C'] ? { tintColor: '#D45A01' } : {}]} />
          <Text 
            style={[styles.serviceText, selectedFacilities['A/C'] ? { color: '#D45A01' } : {}]}>
            A/C
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.serviceButton, selectedFacilities['Equipment/Gear'] ? styles.selectedService : {}]}
          onPress={() => toggleFacility('Equipment/Gear')}>
          <Image 
            source={serviceIcons.TennisBall} 
            style={[styles.serviceIcon, selectedFacilities['Equipment/Gear'] ? { tintColor: '#D45A01' } : {}]} />
          <Text 
            style={[styles.serviceText, selectedFacilities['Equipment/Gear'] ? { color: '#D45A01' } : {}]}>
            Equipment/Gear
          </Text>
        </TouchableOpacity>


        </View>
          
          <Text style={styles.sectionTitle}>Select Location</Text>

<TouchableOpacity 
  onPress={() => setStartModalVisible(true)}
  style={styles.timeButton}
>
  <Text style={styles.buttonText}>
    {startTime ? `Start Time: ${startTime}` : 'Select Start Time'}
  </Text>
</TouchableOpacity>

<TouchableOpacity 
  onPress={() => setEndModalVisible(true)}
  style={styles.timeButton}
>
  <Text style={styles.buttonText}>
    {endTime ? `End Time: ${endTime}` : 'Select End Time'}
  </Text>
</TouchableOpacity>

<TimePickerModal
  isVisible={startModalVisible}
  onClose={() => setStartModalVisible(false)}
  onValueChange={(itemValue) => setStartTime(itemValue)}
  selectedValue={startTime}
  timeSlots={timeSlots}
/>

<TimePickerModal
  isVisible={endModalVisible}
  onClose={() => setEndModalVisible(false)}
  onValueChange={(itemValue) => setEndTime(itemValue)}
  selectedValue={endTime}
  timeSlots={timeSlots}
/>


          <Image source={require('../../assets/images/bar.png')} style={styles.barImage} />

          <TouchableOpacity style={styles.continueButton} onPress={prepareDataAndNavigate}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </ScrollView>
      );
    };

const styles = StyleSheet.create({
  timeButton: {
    backgroundColor: '#D45A01',
    padding: 10,
    borderRadius: 26.5,
    margin: 10,
  },
  buttonText: {
    color: '#C4C4C4',
    fontSize: 16,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  modalButton: {
    backgroundColor: '#D45A01',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginTop: 15,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  timeSelectors: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
    
    backgroundColor: '#D45A01',
    borderRadius: 10, // Add border radius
    padding: 10,
    marginHorizontal: 20, // Decrease the distance between the buttons
  },
  buttonText: {
    color: '#C4C4C4',
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
  },
    barImage: {
        marginLeft: 35,

      },
  container: {
    flex: 1,
    backgroundColor: '#000', // Assuming your theme is black
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    color: '#D45A01',
    marginLeft: 12,
    marginTop: 25,
  },
  input: {
    margin: 12,
    marginRight: 38,
    fontSize: 12,
    borderBottomWidth: 0.3,
    marginBottom: 20,
    borderBottomColor: '#D45A01',
    marginHorizontal: 30, // Add this line

    fontFamily: 'Montserrat-SeimBold',
    color: '#C4C4C4',
    padding: 10, // Add this line

  },
  timeSelectors: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    
    // ... other styles
  },
  sectionTitle: {
    color: '#C4C4C4',
    marginLeft  : 19,
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 10,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
  },
  map: {
    height: 148, // Set this to the height you want
    marginHorizontal: 20,
    width: 293, // Adjust this to your desired width
    marginBottom: 20,
    marginLeft: 55, // Add this line
    borderRadius: 20, // Add this line    
},
  continueButton: {
    backgroundColor: 'rgba(212, 90, 1, 0.5)',
    paddingVertical: 15, // Adjust this to control the button's height
    paddingHorizontal: 20, // Adjust this to control the button's width
    margin: 20,
    marginLeft: 90, // Add this line
    marginHorizontal: 60,   
    borderRadius: 26.5,
    alignItems: 'center',
    marginTop: 18,
    width: 238, // Keep this if you want a fixed width
    marginBottom: 20, // Add this line
  },
  continueButtonText: {
    color: '#C4C4C4',
    fontFamily: 'Urbanist-Bold',
    fontSize: 17,
    
    
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20, // Add padding here to align items with the rest of your content
    marginBottom: 20,

  },
  serviceButton: {
    width: '19%', // Each service will take up 30% of the container width
    alignItems: 'center',
    marginBottom: 20,

  },
  serviceIcon: {
    width: 30, // Adjust your size accordingly
    height: 30, // Adjust your size accordingly
    marginBottom: 8,
  },
  serviceText: {
    fontSize: 8, // Adjust your size accordingly
    fontFamily: 'Urbanist', // Adjust your font accordingly
    textAlign: 'center',
    color: '#C4C4C4',
  },
  selectedService: {
    tintColor: '#D45A01', // for images
    color: '#D45A01', // for text
  },
});

export default CreateListingScreen;

