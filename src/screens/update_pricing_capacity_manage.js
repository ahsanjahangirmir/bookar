import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';

const PricingAndCapacitiesScreen = () => {
  const [services, setServices] = useState([]);
  const [newRate, setNewRate] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const { listingData: initialListingData , ogname, user } = route.params;
  const [listingData, setListingData] = useState(initialListingData);

  useEffect(() => {
    if (listingData && listingData.services) {
      setServices(listingData.services.map((service, index) => ({
        id: index + 1,
        service: service.service || '',
        hourlyRate: service.hourlyRate || '',
        numberOfFields: service.fieldCount || 3,
        boxValue: service.boxValue || '',
      })));
      setIsDataLoaded(true);
    }
  }, [listingData]);

  const updateServiceField = (id, field, value) => {
    setServices(services.map(service => {
      if (service.id === id) {
        return { ...service, [field]: value };
      }
      return service;
    }));
  };

  const handleInputChange = (field, text, serviceId) => {
    if (!isNaN(text)) {
      setServices(prevServices =>
        prevServices.map(service =>
          service.id === serviceId ? { ...service, [field]: text } : service
        )
      );

      const updatedServices = listingData.services.map(service => {
        if (service.service === serviceId) {
          service.hourlyRate = text;
        }
        return service;
      });
      
      setListingData(prevListingData => ({
        ...prevListingData,
        services: updatedServices
      }));
    }
  };
  
  const renderServiceSection = (service) => {
    return (
      <View key={service.id} style={styles.serviceSection}>
        <Text style={styles.label2}>Set Hourly Rate For {service.service}:</Text>
        <View style={styles.pkrContainer}>
          <Text style={styles.pkrText}>PKR</Text>
          <TextInput
            style={[styles.line, { fontSize: 18, color: 'white' }]}
            keyboardType="numeric"
            defaultValue={service.hourlyRate}
            onChangeText={text => handleInputChange('hourlyRate', text, service.service)}
          />
        </View>

        <View style={styles.boxContainer}>
          <Text style={styles.boxLabel}>Box</Text>
          <TextInput
            style={styles.boxInput}
            keyboardType="numeric"
            onChangeText={text => updateServiceField(service.id, 'boxValue', text)}
            value={service.boxValue}
            placeholder="Box"
          />
        </View>
        
        <Text style={styles.label}>Set number of fields for selected service {service.service}:</Text>
        <View style={styles.counterContainer}>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={() => updateServiceField(service.id, 'numberOfFields', Math.max(0, service.numberOfFields + 1))}
          >
            <Icon name="plus" size={8} color="#C4C4C4" />
          </TouchableOpacity>
          <Text style={styles.counterText}>{service.numberOfFields}</Text>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={() => updateServiceField(service.id, 'numberOfFields', Math.max(0, service.numberOfFields - 1))}
          >
            <Icon name="minus" size={8} color="#C4C4C4" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack(listingData , ogname)}>
          <Icon name="arrow-left" size={25} color="#C4C4C4" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pricing & Capacities</Text>
      </View>
      {services.map(renderServiceSection)}
      <Image source={require('../../assets/images/bar2.png')} style={styles.barImage} />
      {isDataLoaded && listingData &&
        <TouchableOpacity style={styles.continueButton} onPress={() => navigation.navigate('UploadImage', { listingData: listingData, ogname: ogname})}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    button: {
      backgroundColor: '#85390275', // 75% opacity of #853902
      width: 27.82,
      height: 27.82,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 13.91, // Half of width and height to make it circular
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
container: {
  
  flex: 1,
  backgroundColor: '#000000',
},
header: {
  flexDirection: 'row',
  alignItems: 'center',
  padding: 20,
  marginTop: 40,
},
pkrContainer: {
  marginTop: -10,
  marginLeft  : 50,
  // marginTop: 10,
  flexDirection: 'row', // This will arrange the children in a row
  alignItems: 'center', // This will center the children vertically
},
pkrText: {
  marginTop: 28,
  color: '#C4C4C4',
  fontSize: 12,
  fontFamily: 'Montserrat-Regular',
  borderWidth: 0, // This will remove the border
  marginRight: 10,
  marginLeft: 50,
},
inputLine: {
  padding: 10,
  height: 40,
  backgroundColor: '#D45A01',
  marginVertical: 10,
},
line: {
  height: 20,
  marginTop: 30,
  flex: 0.45, // This will make the line shorter
  borderBottomWidth: 0.7, // This will create a thin line
  borderColor: '#D45A01', // This will set the color of the line
  color: '#C4C4C4',
  // borderWidth: 1,
},
headerTitle: {
  color: '#D45A01',
  fontSize: 16,
  marginLeft: 10,
  fontFamily: 'Montserrat-Regular',
},
serviceSection: {
  marginVertical: 10,
  paddingHorizontal: 20,
},
label: {
  color: '#C4C4C4',
  fontSize: 12,
  marginBottom: 10,
  fontFamily: 'Montserrat-Regular',
  marginTop: 30,
  marginLeft: 10,
},
input: {
  backgroundColor: 'transparent',
  borderColor: '#C4C4C4',
  borderWidth: 1,
  borderRadius: 4,
  color: '#C4C4C4',
  paddingHorizontal: 10,
  marginBottom: 20,
},
counterContainer: {
  marginLeft  : 110,
  flexDirection: 'row',
  alignItems: 'center',
},

counterButton: {
  backgroundColor: '#85390275', // 75% opacity of #853902
  width: 27.82,
  height: 27.82,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 7.59,
    // Half of width and height to make it circular
},
counterText: {
  color: '#C4C4C4',
  marginHorizontal: 20,
  fontSize: 16,
},
continueButton: {
  backgroundColor: 'rgba(212, 90, 1, 0.5)',
  paddingVertical: 15, // Adjust this to control the button's height
  paddingHorizontal: 20, // Adjust this to control the button's width
  margin: 20,
  marginHorizontal: 60,   
  borderRadius: 26.5,
  alignItems: 'center',
  marginTop: 18,
  width: 238,
    // Keep this if you want a fixed width
    marginLeft : 90,
},
continueButtonText: {
  color: '#C4C4C4',
  fontFamily: 'Urbanist-Bold',
  fontSize: 17,
    // Make sure you have loaded the font in your project
},
// Add the slider style if you're using a package like `@react-native-community/slider`
slider: {
  width: '100%', // Adjust the width as needed
  height: 40, // Adjust the height as needed
  marginVertical: 20, // Provide some vertical space
},
label2: {
  color: '#C4C4C4',
  fontSize: 12,
  fontFamily: 'Montserrat-Regular',
  marginTop: 30,
  marginLeft: 10,
},
// Style for the slider thumb (the circular control you drag)
thumb: {
  width: 20, // Adjust the thumb size as needed
  height: 20, // Adjust the thumb size as needed
  backgroundColor: '#D45A01', // Thumb color to match the theme
},
// Style for the slider track (the line the thumb slides along)
track: {
  height: 4, // Adjust the track height as needed
  borderRadius: 2, // Round the corners slightly
  backgroundColor: '#C4C4C4', // Track color to match the theme
},
barImage: {
  marginLeft: 65,
  marginTop: 102,
},
});
export default PricingAndCapacitiesScreen;

