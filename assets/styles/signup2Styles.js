import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  dropdownPicker: {
    marginLeft: 10,
    fontSize: 16,
    height: 59,
    borderColor: '#853902',
    borderWidth: 1,
    marginBottom: 1,
    paddingLeft: 50, // Adjust paddingLeft to create space for the icon
    color: '#C4C4C4',
    backgroundColor: '#853902',
    borderRadius: 13,
    fontFamily: 'Urbanist',
    width: '95%'
    // Add any other styling to match your input fields
  },
  dropdownPickerContainer: {
    backgroundColor: '#853902', borderColor: '#C4C4C4' 
    // Add any styling to position your dropdown
  },
  dropdownPickerText: {
    color: '#C4C4C4',
    fontSize: 16,
    fontFamily: 'Urbanist-Medium',

    // Add any other text styling
  },
  dropdownPickerPlaceholder: {
    color: 'rgba(255, 255, 255, 0.75)',
    // Add any other placeholder text styling
  },
    backButton: {
      position: 'absolute',
      top: 27,
      left: 10,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#00170C', // Black background
      paddingTop: 40,
    },
    subheading: {
      fontSize: 16,
      marginBottom: 25,
      fontFamily: 'Urbanist-Medium', // Montserrat font
      color: '#C4C4C4', // Orange color from Screen1
      opacity: 0.75,
    },
    errorContainer: {
      alignItems: 'center',
      marginBottom: 10,
    },
    errorText: {
      color: '#C4C4C4',
    },
    inputContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconButton: {
      position: 'absolute',
      right: 10,
      height: '100%', // Adjust if needed
      justifyContent: 'center', // This will vertically center the icon
      zIndex: 3001, // Make sure this zIndex is higher than dropdown zIndex
    },
    inputIcon: {
      flexDirection: 'row',
      alignItems: 'center',
      // alignItems: 'center',
      marginBottom: 14,
    },
    icon: {
      width: 20,
      height: 20,
      marginRight: 15,
      position: 'absolute',
      left: 7, // Adjust left position to place the icon inside the TextInput
      marginTop: 21,
    },
    image: {
      width: 113, // Adjust this value
      height: 113, // Adjust this value
      marginTop: 10,
      marginBottom: 50, 
    },
    input: {
      fontSize: 16,
      height: 59,
      borderColor: '#853902',
      borderWidth: 1,
      marginBottom: 1,
      paddingLeft: 50, // Adjust paddingLeft to create space for the icon
      color: '#C4C4C4',
      backgroundColor: '#853902',
      borderRadius: 13,
      fontFamily: 'Urbanist-Medium',
      width: '95%' // Adjust paddingLeft to create space for the icon
    },
    ageText: {
      color: '#C4C4C4',
      fontSize: 16,
      fontFamily: 'Urbanist-Medium',
      marginTop: 20,
    },
    button: {
      backgroundColor: '#853902',
      borderRadius: 56.5,
      padding: 13,
      bottom: -105,
      borderRadius: 25,
      width: '90%', // Adjusted width to fit the screen
    },
    buttonBackground: {
      backgroundColor: '#D45A01', // Orange color from Screen1
    },
    buttonText: {
      color: '#C4C4C4',
      textAlign: 'center',
      fontFamily: 'Urbanist-Medium',
      fontSize: 17, // Urbanist font
    },
  
  });