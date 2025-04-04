import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { styles } from '../../assets/styles/selectfieldStyles';
import {ipAddr} from './ipconfig.js';

const NewPage = ({route, navigation}) => {
  const {passedCompanyName, passedCompanyEmail, passedLocation, passedEmail, passedContactName, passedUserEmail, passedCurrentUser, passedCurrentCompany} = route.params
  console.log('Route selectField:', route); // Log the entire route object


  const [modalVisibleField, setModalVisibleField] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const [fields, setFields] = useState([]);
  

  // const getFields = async () => {
  //   try {
  //     const response = await fetch(`http://${ipAddr}:3000/company-fields?companyEmail=${passedCompanyEmail}`);
  //     const data = await response.json(); // Parse the JSON response
  //     if (data) {
  //       setFields(data); // Set the parsed data to bookedTimeSlots
  //     } else {
  //       setFields([]);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching booked time slots:', error.message);
  //   }
  // };

  const getFields = async () => {
    try {
      const response = await fetch(`http://${ipAddr}:3000/company-fields-fetch?companyEmail=${passedCompanyEmail}&companyName=${passedCompanyName}`);
      const data = await response.json(); // Parse the JSON response
      if (data) {
        setFields(data); // Set the parsed data to bookedTimeSlots
      } else {
        setFields([]);
      }
    } catch (error) {
      console.error('Error fetching booked time slots:', error.message);
    }
  };

  
  useEffect(() => {
    getFields();
  }, []);

  const handleBackPress = () => {
    navigation.navigate('FieldProfile', {
          currcompany: passedCurrentCompany,
          user_email : passedUserEmail, 
          currentUser : passedCurrentUser,                
      })
    // Add functionality for back press here
  };

  const handleFieldButtonClick = () => {
    setModalVisibleField(true);
    
  };

  const handleFieldSelect = (field) => {
    setSelectedField(field);
    setModalVisibleField(false);
  };

  console.log("field: ", selectedField)

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
        <Text style={styles.headerText}>Select Field</Text>
      </View>
      
      <View style={styles.row}>
        <Text style={styles.selectFieldText}>Select Field</Text>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={[styles.button]} onPress={handleFieldButtonClick}>
          <Text style={styles.buttonText}>{selectedField ? selectedField.Field_Name : 'Field'}</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleField}
        onRequestClose={() => setModalVisibleField(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisibleField(false)}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity onPress={() => setModalVisibleField(false)} style={styles.closeButton}>
                <Image source={require('../../assets/images/white_back_arrow.png')} style={styles.backArrow} />
              </TouchableOpacity>
              {fields.map((field, index) => (
                <TouchableOpacity key={index} style={styles.fieldOption} onPress={() => handleFieldSelect(field)}>
                  <Text style={styles.fieldOptionText}>{field.Field_Name}</Text>
                  </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
        {selectedField && 
          <View style={styles.bottomButtonContainer}>
            <TouchableOpacity style={styles.continueButton}
            onPress={() => {
              navigation.navigate('Booking', {
                // {passedCompanyName, passedCompanyEmail, passedLocation, passedEmail, passedContactName, passedUserEmail, passedCurrentUser}
                fieldChosen: selectedField,
                companyEmail: passedCompanyEmail,
                companyName: passedCompanyName,
                bookingUser: passedCurrentUser,
                emailProp: passedEmail,
                locationProp: passedLocation,
                contactNameProp: passedContactName,
                userEmailProp: passedUserEmail,
                passedCurrentCompany: passedCurrentCompany,
              });
            }}>
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>}
      </View>
  );
};
export default NewPage;

