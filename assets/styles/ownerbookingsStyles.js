import { StyleSheet } from "react-native";
const deviceWidth = Dimensions.get('window').width;
import { Dimensions } from 'react-native';

export const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: '10%',
    backgroundColor: '#000000',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 12, 
    borderTopRightRadius: 12,
  },
      navbarTab: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      navbarTabSelected: {
        justifyContent: 'center',
        alignItems: 'center',
        color: 'orange',
      },
      navbarText: {
        fontSize: 10,
        marginTop: 4,
        color: '#C4C4C4',
      },
      container: {
        flex: 1,
        backgroundColor: 'black', // Change background color to black
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#000000', // Adjust the background color as needed
      },
      logo: {
        width: 50, // Adjust the size as needed
        height: 50, // Adjust the size as needed
        resizeMode: 'contain',
      },
      headerTitle: {
        fontFamily: 'MontserratMedium',
        fontSize: 24,
        color: '#C4C4C4',
        marginLeft: 8,
      },
    logo: {
      width: 50, // Adjust the size as needed
      height: 50, // Adjust the size as needed
      resizeMode: 'contain',
    },
    headerTitle: {
      fontFamily: 'MontserratMedium',
      fontSize: 24,
      color: '#C4C4C4',
      marginLeft: 8,},
  
    pillContainer: {
      height: 60,
      flexDirection: 'row',
      justifyContent: 'center',
      paddingVertical: 8,
      marginBottom: 16,
    },
    pill: {
      // General pill styles
      minWidth: 110,
      height: 40,
      paddingVertical: 8,
      paddingHorizontal: 20,
      marginHorizontal: 5,
      borderRadius: 20,
    },
    selectedPill: {
      // Selected pill styles
      backgroundColor: '#D45A01',
    },
    unselectedPill: {
      // Unselected pill styles
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: '#D45A01',
    },
    pillText: {
      // General text styles
      textAlign: 'center',
    },
    selectedPillText: {
      // Selected text styles
      color: '#C4C4C4',
    },
    unselectedPillText: {
      // Unselected text styles
      color: '#D45A01',
    },
    // ...other styles
    card: {
      backgroundColor: 'rgba(133, 57, 2, 0.5)',
      borderRadius: 12,
      marginBottom: 16,
      width: deviceWidth * 0.9,
      alignSelf: 'center',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
    },
    cardImage: {
      width: 80,
      height: 80,
      borderRadius: 10,
      marginRight: 12,
    },
    cardTextContent: {
      flex: 1,
    },
    venueName: {
      fontFamily: 'UrbanistBold',
      fontSize: 18,
      color: '#C4C4C4',
    },
    bookingTime: {
      fontFamily: 'UrbanistRegular',
      fontSize: 12,
      color: '#C4C4C4',
      marginBottom: 4,
      marginTop: 4,
    },
    paidContainer: {
      backgroundColor: '#35383F',
      borderRadius: 6,
      paddingVertical: 4,
      paddingHorizontal: 8,
      marginTop: 4,
      alignSelf: 'flex-start',
    },
    paidText: {
      fontFamily: 'UrbanistRegular',
      fontSize: 12,
      color: '#C4C4C4',
    },
    line: {
      borderBottomColor: '#D45A01',
      borderBottomWidth: 1,
      opacity: 0.5,
      // marginVertical: 8,
      marginBottom: 15,
      marginHorizontal: 20,
      alignSelf: 'stretch',
    },
    cancelButton: {
      backgroundColor: 'rgba(133, 57, 2, 0.45)',
      borderRadius: 20,
      borderWidth: 0.75,
      borderColor: '#D45A01',
      paddingVertical: 8,
      paddingHorizontal: 16,
      alignSelf: 'center',
      marginBottom: 16,
    },
    cancelButtonText: {
      fontFamily: 'UrbanistSemiBold',
      fontSize: 14,
      color: '#D45A01',
      textAlign: 'center',
    },
    bookingsListContainer: {
      paddingVertical: 8,  // Add some vertical padding for breathing room
      paddingHorizontal: 10,  // Add horizontal padding to align the cards nicely on the screen
      alignItems: 'center',  // Center the items in the list (cards)
    },
    refundedTag: {
      backgroundColor: '#35383F',
      borderRadius: 6,
      paddingVertical: 4,
      paddingHorizontal: 8,
      marginTop: 4,
      alignSelf: 'center',
      width:'100%'
  
    },
    tagText: {
      fontFamily: 'UrbanistRegular',
      fontSize: 12,
      color: '#FF7878',
      width:'100%',
      alignSelf: 'center',
      paddingHorizontal:20,
      textAlign:'center',
      marginBottom: 5
    },
    bottomTagContainer: {
      backgroundColor: '#35383F',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 4,
      borderRadius: 6,
      marginBottom:12,
      marginHorizontal: 40,
    },
    bottomTagText: {
      fontFamily: 'UrbanistRegular',
      fontSize: 13,
      color: '#FF7878',
      marginLeft: 4,  // space between icon and text
    },
    completedTag: {
      backgroundColor: '#1AB65C', // Green background for the 'Completed' tag
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 6,
      alignSelf: 'flex-start',
      marginVertical: 6,
    },
    completedTagText: {
      fontFamily: 'UrbanistRegular',
      fontSize: 12,
      color: '#C4C4C4',
    },
    centeredModalView: {
      flex: 1,
      justifyContent: 'flex-end', // This will push the modalView to the bottom
      alignItems: 'center', // This will center the modalView horizontally
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalView: {
      width: '100%',
      backgroundColor: '#00170C', // Replace with the gradient as needed
      borderTopRightRadius: 35,
      borderTopLeftRadius: 35,
      padding: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalTitle: {
      fontFamily: 'UrbanistBold',
      fontSize: 25,
      color: '#F75555',
      marginBottom: 10,
    },
    modalTitleLine: {
      height: 1,
      backgroundColor: 'rgba(255, 255, 255, 0.25)',
      width: '90%',
      marginBottom: 16,
    },
    modalText: {
      fontFamily: 'UrbanistSemiBold',
      fontSize: 18,
      color: '#C4C4C4',
      textAlign: 'center',
      marginBottom: 10,
    },
    venueNameInModal: {
      color: '#D45A01',
    },
    modalSubText: {
      fontFamily: 'UrbanistRegular',
      fontSize: 12,
      color: '#C4C4C4',
      textAlign: 'center',
    },
    button: {
      width: 152,
      height: 54,
      backgroundColor: '#7D7D7D',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 25,
    },
    modalButtonGroup: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: 16,
      marginBottom: 16,
    },
    modalCancelButton: {
      backgroundColor: '#433434',
      borderRadius: 25,
      paddingVertical: 16,
      paddingHorizontal: 20,
      flexGrow: 1,
      marginRight: 8,
    },
    modalConfirmButton: {
      backgroundColor: '#1AB65C',
      borderRadius: 25,
      paddingVertical: 16,
      paddingHorizontal: 20,
      flexGrow: 1,
      marginLeft: 8,
      shadowColor: '#1AB65C',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 5,
    },
    modalButtonText: {
      fontFamily: 'UrbanistSemiBold',
      fontSize: 16,
      color: '#FFFFFF',
      textAlign: 'center',
    },
    canceledText: {
      fontFamily: 'UrbanistRegular',
      fontSize: 12,
      color: '#000000',
    },
    cancelContainer: {
      backgroundColor: '#FF7878',
      borderRadius: 6,
      paddingVertical: 4,
      paddingHorizontal: 8,
      marginTop: 4,
      alignSelf: 'flex-start',
    },
    tagContainer1:{
      alignSelf: 'flex-start',
      marginTop: 20,
      marginLeft: -18 
    }
    
  });