import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView,TouchableWithoutFeedback} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Assuming we're using Expo
import { Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ToastContainer, toast} from 'react-toastify'
import Modal from 'react-native-modal';
import { set } from 'mongoose';
import { styles } from '../../assets/styles/paymentStyles'
import { useNavigation } from '@react-navigation/native';

const PaymentScreen = ({route}) => {
  const {field, company_email, company_name, user, email_prop, location, contact_name, user_email, booking} = route.params;
  // console.log("Booking: ", booking)
  const navigation = useNavigation();
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const handlePaymentMethodsPress = () => {
    // Logic to handle Payment Methods press
  };

  const notify = () => toast("Time slot booked.")

  const handleAddNewCardPress = () => {
    // Logic to handle Add New Card press
  };
  const handleContinuePress = () => {
    if (!selectedPayment) {
      setErrorMessage('Please select a payment method.');
    } else {
      setErrorMessage(null); // clear any existing error message
      setModalVisible(true); // open the popup
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" size={24} color="#C4C4C4"/>
        </TouchableOpacity>
          <Text style={styles.headerTitle}>Payment</Text>
        </View>
      <View style={styles.optionsContainer}>
        <TouchableOpacity onPress={handlePaymentMethodsPress}>
          <Text style={styles.optionText}>Payment Methods</Text>
        </TouchableOpacity>
        <TouchableOpacity>
</TouchableOpacity>
      </View>
      <View style={styles.paymentOptions}>
        <PaymentOption
          name="JazzCash"
          isSelected={selectedPayment === 'JazzCash'}
          onSelect={() => setSelectedPayment('JazzCash')}
        />
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

        <PaymentOption
          name="EasyPaisa"
          isSelected={selectedPayment === 'EasyPaisa'}
          onSelect={() => setSelectedPayment('EasyPaisa')}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinuePress}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
      <PaymentSuccessModal visible={modalVisible} onClose={() => setModalVisible(false)} navigation={navigation} user_email={user_email} />
    </SafeAreaView>

  );
};
const PaymentSuccessModal = ({ visible, onClose, navigation, user_email }) => {
    return (
        <Modal
            isVisible={visible}
            onBackdropPress={onClose}
            backdropColor="black"
            backdropOpacity={0.6}
            style={styles.modalView}
        >
              <Image
    source={require('../../assets/images/backk.png')} // replace with the path to your image
    style={styles.image}
  />
            <Text style={styles.modalTextTitle}>Payment Successful!</Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => {
              navigation.navigate('HomePage', {
              emailProp: user_email})}}>
                <Text style={styles.modalButtonText}>Return To Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
        </Modal>
    );
};

const PaymentOption = ({ name, isSelected, onSelect }) => {
    const imageSource = name === 'JazzCash' ? require('../../assets/images/JazzCash.png') : require('../../assets/images/Easypaisa.png');

    return (
        <TouchableOpacity style={styles.paymentOption} onPress={onSelect}>
        <Image
          source={imageSource}
          style={styles.paymentOptionImage}
          resizeMode="contain"
        />
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={[styles.paymentOptionText, isSelected && styles.paymentOptionTextSelected]}>
            {name}
          </Text>
          <MaterialIcons
            name={isSelected ? 'radio-button-checked' : 'radio-button-unchecked'}
            size={24}
            color={isSelected ? '#D45A01' : '#D45A01'}
          />
        </View>
      </TouchableOpacity>
    );
};


export default PaymentScreen;
