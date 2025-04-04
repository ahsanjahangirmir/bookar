import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default function EditProfileScreen({ route }) {
    const {email} = route.params;
    const [phoneNumber, setPhoneNumber] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [errors, setErrors] = useState({ phoneNumber: '', oldPassword: '', newPassword: '' });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const validateForm = () => {
        let isValid = true;
        let errors = {};

        if (!phoneNumber) {
            errors.phoneNumber = 'Phone number is required';
            isValid = false;
        }

        if (!oldPassword) {
            errors.oldPassword = 'Old password is required';
            isValid = false;
        }

        if (!newPassword) {
            errors.newPassword = 'New password is required';
            isValid = false;
        } else if (newPassword.length < 6) {
            errors.newPassword = 'New password must be at least 6 characters';
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const handleSaveChanges = async () => {
        // Client-side validation
        if (validateForm()) {
            // Proceed with submitting the form
            console.log('Form is valid, proceed with saving changes');
        }

        try {
            const response = await fetch('http://172.31.224.1:3000/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    phoneNumber,
                    oldPassword,
                    newPassword,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setSuccessMessage('Password changed successfully');
            } else {
                setErrorMessage(data.message || 'Something went wrong');
            }
        } catch (error) {
            console.error('Error changing password:', error);
            setErrorMessage('An error occurred, please try again later');
        }
    };


    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => {
            navigation.navigate('UserProfile', {
              email : email
            }); // Navigate to the Profile page
          }} style={styles.backButton}>
                    <Icon name="arrow-left" size={45} color="#D45A01" />
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <View style={styles.formContainer}>
                    {/* Edit Profile Title Positioned Here */}
                    <Text style={styles.editProfileTitle}>Edit Profile</Text>

                    <View style={styles.inputContainer}>
                        <Icon name="phone" size={20} color="#C4C4C4" />
                        <TextInput
                            style={styles.input}
                            placeholder="Phone Number"
                            placeholderTextColor="#C4C4C4"
                            keyboardType="phone-pad"
                            value={phoneNumber}
                            onChangeText={text => {
                                setPhoneNumber(text);
                                setErrors(prev => ({ ...prev, phoneNumber: '' }));
                            }}
                        />
                        {errors.phoneNumber ? <Text style={styles.errorText}>{errors.phoneNumber}</Text> : null}
                    </View>
                    <View style={styles.inputContainer}>
                        <Icon name="lock" size={20} color="#C4C4C4" />
                        <TextInput
                            style={styles.input}
                            placeholder="Old Password"
                            placeholderTextColor="#C4C4C4"
                            secureTextEntry={true}
                            value={oldPassword}
                            onChangeText={text => {
                                setOldPassword(text);
                                setErrors(prev => ({ ...prev, oldPassword: '' }));
                            }}
                        />
                        {errors.oldPassword ? <Text style={styles.errorText}>{errors.oldPassword}</Text> : null}
                    </View>
                    <View style={styles.container}>
                        <TextInput
                            // Add your text inputs here
                        />
                        {/* Display success message */}
                        {successMessage ? <Text style={styles.successMessage}>{successMessage}</Text> : null}
                        {/* Display error message */}
                        {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
                        {/* <Button title="Save Changes" onPress={handleSaveChanges} /> */}
                    </View>
                    <View style={styles.inputContainer}>
                        <Icon name="lock-reset" size={20} color="#C4C4C4" />
                        <TextInput
                            style={styles.input}
                            placeholder="New Password"
                            placeholderTextColor="#C4C4C4"
                            secureTextEntry={true}
                            value={newPassword}
                            onChangeText={text => {
                                setNewPassword(text);
                                setErrors(prev => ({ ...prev, newPassword: '' }));
                            }}
                        />
                        {errors.newPassword ? <Text style={styles.errorText}>{errors.newPassword}</Text> : null}
                    </View>
                    <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
                        <Text style={styles.saveButtonText}>Save Changes</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#00170C',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    backButton: {
        marginRight: 20,
    },
    editProfileTitle: {
        color: '#D45A01', // Edit Profile title color
        fontFamily: 'Montserrat',
        fontSize: 40, // Adjust size as needed
        marginBottom: 120, // Spacing before the input field
        alignSelf: 'center', // Center title
    },
    scrollViewContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    scrollView: {
        backgroundColor: '#00170C',
    },
    formContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        alignSelf: 'flex-start', // Align to the left
        color: '#D45A01', // Same color as the Edit Profile title
        fontFamily: 'Montserrat', // Consistent font
        fontSize: 12, // Slightly smaller than title for differentiation
        marginTop: 5, // Spacing between input and error text
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#303030',
        marginBottom: 36,
        width: '100%',
    },
    input: {
        flex: 1,
        color: '#C4C4C4',
        paddingLeft: 10,
    },
    saveButton: {
        backgroundColor: '#D45A01',
        padding: 20,
        alignItems: 'center',
        borderRadius: 10,
        width: '100%',
    },
    saveButtonText: {
        color: '#FFF',
        fontFamily: 'Urbanist-Bold',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    successMessage: {
        color: 'green',
        marginBottom: 10,
    },
    errorMessage: {
        color: 'red',
        marginBottom: 10,
    },
});

// export default EditProfileScreen;
