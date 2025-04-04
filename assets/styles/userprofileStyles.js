import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      backgroundColor: '#00170C',
    },
    safeArea: {
      flex: 1, // The SafeAreaView should expand to fill the entire screen
      backgroundColor: '#00170C',
    },
    header: {
      paddingLeft: 20, // Aligns title to the left
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
      borderRadius: 40,
    },
    userName: {
      color: '#FFF',
      fontSize: 24,
      fontFamily: 'Urbanist-Bold',
      marginTop: -10,
    },
    userEmail: {
      color: '#D45A01',
      fontSize: 14,
      fontFamily: 'Urbanist', // Or 'Urbanist-Regular' if available
      marginTop: 4,
      marginBottom: 86,
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      paddingBottom: 16,
      
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
      
    },
    buttonContent: {
      alignItems: 'center', // Align items in the center
    },
    
    tabTitle: {
      color: '#7D7D7D',
      fontSize: 12,
      fontFamily: 'Urbanist', // Make sure to load the font
      marginTop: 4,
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
    // ...other styles
  });
  
