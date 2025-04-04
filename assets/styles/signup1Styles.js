import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    innerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    backButton: {
      position: 'absolute',
      top: 10,
      left: 10,
    },
    termsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: -50, // Adjust this value as needed
      marginLeft:70,  // Adjust this value as needed
      marginTop: 5, // Adjust this value as needed
      paddingTop: 20, // Adjust this value as needed
    },
    checkbox: {
      width: 21,
      height: 21,
      borderWidth: 2, // Add this line
      borderColor: '#D45A01', // Add this line
      backgroundColor: 'transparent', // Change this line
      marginRight: 10, // Adjust this value as needed
    },
    tickMark: {
      color: '#C4C4C4', // Change this to your desired color
      fontSize: 13, // Increase the size of the tick mark
      // Add other styles as needed
    },
    acceptText: {
      color: '#fff',
      fontSize: 16,
      fontFamily: 'Urbanist', // Make sure this font is linked in your project
    },
    termsText: {
      color: '#D45A01',
      fontSize: 16,
      fontFamily: 'Urbanist',
      paddingLeft: 5, // Make sure this font is linked in your project
    },
    settingYou: {
      marginTop: -108,
      top: 58,
      left: 7,
      width: 286,
      height: 190, // Half of 258
      fontSize: 44.5,
      fontFamily: 'Montserrat-Regular',
      color: '#D45A01',
    },
    // up: {
    //   top: 123, // 58 + 129
    //   left: 7,
    //   width: 286,
    //   height: 129, // Half of 258
    //   fontSize: 45,
    //   marginTop: -120, // Adjust this value as needed
    //   fontFamily: 'Montserrat-Regular',
    //   color: '#D45A01',
    // },
    container: {
      flex: 2,
      justifyContent: 'center',
      padding: 10,
      backgroundColor: '#00170C', // Changed background color
      height: 333, // Adjusted height to fit the content
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
    inputIcon: {
      flexDirection: 'row',
      // alignItems: 'center',
      marginBottom: 1,
    },
    icon: {
      width: 20, // Adjust icon width as needed
      height: 20, // Adjust icon height as needed
      position: 'absolute',
      left: 7, // Adjust left position to place the icon inside the TextInput
      marginTop: 21,
      marginLeft: 10, // Adjust marginLeft to create space between the icon and the text
      marginRight: 25, // Adjust marginRight to create space between the icon and the border
    },
    input: {
      fontSize: 16,
      height: 59,
      borderColor: '#853902',
      borderWidth: 1,
      marginBottom: 15,
      paddingLeft: 50, // Adjust paddingLeft to create space for the icon
      color: '#C4C4C4',
      backgroundColor: '#853902',
      borderRadius: 13,
      fontFamily: 'Urbanist',
      width: '95%', 
      marginBottom : 18 ,
    },
    button: {
      backgroundColor: '#853902',
      borderRadius: 56.5,
      padding: 13,
      marginTop: 60,
      borderRadius: 25,
      borderWidth: 2,
      borderColor: '#FF6347', // Orange color from Screen1
      width: '99%', // Adjusted width to fit the screen
    },
    buttonBackground: {
      backgroundColor: '#D45A01', // Orange color from Screen1
    },
    buttonText: {
      color: '#C4C4C4',
      textAlign: 'center',
      fontFamily: 'Urbanist',
      fontSize: 17, // Urbanist font
    },
  });