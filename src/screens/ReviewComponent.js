import React, { useState } from 'react';
import { TouchableOpacity, Text, Modal, TouchableWithoutFeedback, View, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles2 } from '../../assets/styles/fieldprofileStyles'; // Assuming styles2 is imported from this file
import {ipAddr} from './ipconfig.js';



const ReviewComp = ({ company_name, company_email, current_user }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [textInputValue, setTextInputValue] = useState('');
    const [selectedStar, setSelectedStar] = useState(0);
    const [errorVisible, setErrorVisible] = useState(false);

    const postReview = async () => 
    {
      try {
        const response = await fetch(`http://${ipAddr}:3000/addreview`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Rating: selectedStar, // Example rating value
            UserName: current_user.Name, // Example user name
            CompanyEmailGiven: company_email, // Example company email
            Comments: textInputValue, // Example comments
          }),
        });
    
        if (response.ok) 
        {
          console.log('Review added successfully');
          setTextInputValue('')
          setSelectedStar(0)
          // Handle success, navigate to a different screen, etc.
        } 
        else {
          throw new Error('Failed to add review');
        }
      } 
      catch (error) {
        console.error('Error while posting review:', error.message);
        // Handle error, display an error message, etc.
      }
    };

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setTextInputValue('')
        setSelectedStar(0)
        setModalVisible(false);
    };

    const handleBackgroundPress = () => {
        // Close keyboard or any other actions on background press
    };

    const handleStarPress = (index) => {
        setSelectedStar(index);
    };

    return (
        <>
            <TouchableOpacity style={styles2.button2} onPress={openModal}>
                <Text style={styles2.buttonText}>Review</Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <TouchableWithoutFeedback onPress={handleBackgroundPress}>
                    <View style={styles2.centeredView}>
                        <View style={styles2.modalView}>
                            <TouchableOpacity onPress={closeModal} style={styles2.closeButton}>
                                <Image source={require('../../assets/images/close.png')} style={styles2.backArrow} />
                            </TouchableOpacity>
                            <Text style={styles2.modalText}>How was your experience at {company_name}?</Text>
                            <View style={styles2.textInputContainer}>
                                <TextInput
                                    style={styles2.textInput}
                                    placeholder="Add Comment (Optional)"
                                    onChangeText={setTextInputValue}
                                    value={textInputValue}
                                    multiline={true}
                                    numberOfLines={4}
                                    maxLength={1100}
                                />
                            </View>
                            <View style={styles2.starContainer}>
                                {[1, 2, 3, 4, 5].map((index) => (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => handleStarPress(index)}
                                    >
                                        <Ionicons
                                            name={selectedStar >= index ? 'star' : 'star-outline'}
                                            size={36}
                                            color={selectedStar >= index ? '#D45A01' : '#7D7D7D'}
                                            style={styles2.starIcon}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>
                            {errorVisible && (
                                <View style={styles2.errorContainer}>
                                    <Text style={styles2.errorText}>Please choose a rating before submitting the review.</Text>
                                </View>
                            )}
                            <View style={styles2.submitButtonContainer}>
                                <TouchableOpacity
                                    style={styles2.submitButton}
                                    onPress={() => {
                                        if (selectedStar > 0) {
                                            postReview(); // Call the postReview function when the button is pressed
                                            closeModal(); // Close the modal after posting the review
                                        } else {
                                            setErrorVisible(true);
                                        }
                                    }}
                                >
                                    <Text style={styles2.submitButtonText}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    );
};

export default ReviewComp;
