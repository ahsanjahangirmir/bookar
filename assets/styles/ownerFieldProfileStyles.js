import { StyleSheet } from "react-native";

export const styles2 = StyleSheet.create({
  errorContainer: {
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
    alignSelf: 'center',
  },
  errorText: {
    fontFamily: 'UrbanistRegular',
    fontSize: 14,
    color: '#FFF',
  },
  
    scrollView: {
      flexGrow: 1,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingHorizontal: 20,
      width:'100%'
    },
    image: {
      width: '112%',
      height: 335,
    },
    textContainer: {
      alignSelf: 'flex-start',
      flex: 1,
      minHeight: 580,
    },
    companyName: {
      fontFamily: 'UrbanistBold',
      fontSize: 31,
      color: '#C4C4C4',
      marginTop: 25,
      marginLeft: 5,
      marginBottom: 5,
    },
    locationTextContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 5,
    },
    locationIcon: {
      width: 12,
      height: 12,
      marginRight: 5,
      marginLeft: 5,
    },
    locationText: {
      fontFamily: 'UrbanistMedium',
      fontSize: 14,
      color: '#C4C4C4',
    },
    galleryContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 50,
      paddingHorizontal: 5,
      width: '100%',
    },
    galleryText: {
      fontFamily: 'UrbanistBold',
      fontSize: 19,
      color: '#C4C4C4',
      textAlign: 'left',
    },
    seeAllText: {
      fontFamily: 'UrbanistBold',
      fontSize: 19,
      color: '#D45A01',
      textAlign: 'right',
    },
    imageContainer: {
      flexDirection: 'row',
      marginTop: 15,
      marginBottom: 20,
      paddingHorizontal: 5,
      height: 115,
    },
    imageThumbnail: {
      width: 135,
      height: 107,
      borderRadius: 12,
      marginRight: 15,
    },
    detailsContainer: {
      alignSelf: 'flex-start',
      marginTop: 0,
      marginLeft: 5,
      marginBottom: 20, 
      // borderColor: 'red',
      // borderWidth: 1,
    },
    detailsText: {
      fontFamily: 'UrbanistSemiBold',
      fontSize: 20,
      color: '#C4C4C4',
    },
    moreDetailsContainer: {
      flexDirection: 'row',
      // borderColor: 'red',
      // borderWidth: 1,
      width: 360,
    },
    detailItem: {
      marginRight: 30,
      marginLeft:15,
      
      alignItems: 'center',
    },
    detailImage: {
      width: 38,
      height: 38,
    },
    detailText: {
      fontFamily: 'UrbanistLight',
      fontSize: 12,
      color: '#C4C4C4',
      marginTop: 5,
    },
    facilitiesHeaderContainer: {
      alignSelf: 'flex-start',
      marginTop: 20,
      marginRight: 5,
    },
    facilitiesHeaderText: {
      fontFamily: 'UrbanistBold',
      fontSize: 19,
      color: '#C4C4C4',
    },
    descriptionContainer: {
      marginTop: 20,
      width: '100%',
      // marginBottom: 10,
    },
    descriptionTitle: {
      fontFamily: 'UrbanistBold',
      fontSize: 19,
      color: '#C4C4C4',
    },
    descriptionTextBox: {
      width: 349,
      height: 98,
      backgroundColor: '#000000',
      marginTop: 10,
      borderRadius: 8,
      // paddingHorizontal: 10,
      paddingVertical: 8,
      // marginBottom: 10,
      // borderColor: 'red',
      // borderWidth: 1,
    },
    descriptionText: {
      fontFamily: 'UrbanistRegular',
      fontSize: 14,
      color: '#C4C4C4',
    },
    readMoreButton: {
      marginTop: 0,
      alignSelf: 'flex-end',
      // borderColor: 'red',
      // borderWidth: 1,
    },
    readMoreButtonText: {
      fontFamily: 'UrbanistMedium',
      fontSize: 14,
      color: '#D45A01',
    },
    facilitiesHeaderContainer: {
      marginTop: 20,
      width: '100%',
      alignItems: 'flex-end',
    },
    facilitiesHeaderText: {
      fontFamily: 'UrbanistSemiBold',
      fontSize: 19,
      color: '#C4C4C4',
      textAlign: 'right',
    },
    facilityContainer: {
      width: 360,
      height: 180,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      paddingHorizontal: 0,
      marginLeft: 0,
      paddingTop: 20,
      // marginBottom: 40,
    },
    facilityItem: {
      width: '25%', // Adjust as needed to fit 4 items per row
      alignItems: 'center',
      marginBottom: 20,
    },
    facilityIcon: {
      width: 40,
      height: 40,
    },
    facilityText: {
      fontFamily: 'UrbanistLight',
      fontSize: 12,
      color: '#C4C4C4',
      marginTop: 5,
      textAlign: 'center',
    },
    locationPopupContainer: {
      width: 350,
      height: 250,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      marginTop: 20,
      // borderColor: 'red',
      // borderWidth: 1,
    },
    locationPopupText: {
      fontFamily: 'UrbanistSemiBold',
      fontSize: 19,
      color: '#C4C4C4',
      marginBottom: 10,
    },
    mapImage: {
      width: 347,
      height: 177,
    },
    reviewsContainer: {
      width: 350,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      // marginTop: 10,
      marginBottom: 20,
    },
    reviewsText: {
      fontFamily: 'UrbanistSemiBold',
      fontSize: 19,
      color: '#C4C4C4',
      marginRight: -50,
    },
    starImage: {
      width: 18,
      height: 18,
      // marginRight: 5,
    },
    seeAllText: {
      fontFamily: 'UrbanistBold',
      fontSize: 16,
      color: '#D45A01',
    },
    reviewRating: {
      fontFamily: 'UrbanistSemiBold',
      fontSize: 13,
      color: '#C4C4C4',
      marginLeft: -52,
    },
    reviewContainer: {
      marginTop: 10,
      // marginBottom: 100,
    },
    reviewWrapper: {
      width: 348,
      minHeight: 143,
      backgroundColor: 'rgba(133, 57, 2, 0.75)',
      borderRadius: 12,
      marginBottom: 20,
    },
    review: {
      flexDirection: 'row',
      padding: 10,
    },
    reviewPicture: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginTop: 10,
    },
    reviewTextContainer: {
      flex: 1,  
      marginLeft: 10,
      // overflow: 'hidden',
    },
    reviewName: {
      fontFamily: 'UrbanistSemiBold',
      fontSize: 16,
      color: '#C4C4C4',
      marginTop: 15,
    },
    reviewDate: {
      fontFamily: 'UrbanistRegular',
      fontSize: 14,
      color: '#C4C4C4',
      marginBottom:10,
    },
    reviewContent: {
      fontFamily: 'UrbanistRegular',
      fontSize: 14,
      color: '#C4C4C4',
    },
    fixedContainer: {
      position: 'fixed', // Change position to 'fixed'
      bottom: 0,
      left: 0,
      right: 0,
      height: 100,
      backgroundColor: '#000000',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    priceText: {
      fontFamily: 'UrbanistBold',
      fontSize: 24,
      color: '#C4C4C4',
      marginRight: 25, // Add margin for spacing
      marginLeft: 15,
    },
    bookButton: {
      backgroundColor: '#D45A01',
      width: 152, // Set width to 238
      height: 54, // Set height to 53
      borderRadius: 26.5,
      justifyContent: 'center', // Center text vertically
      alignItems: 'center', // Center text horizontally
    },
    bookButtonText: {
      fontFamily: 'UrbanistBold',
      fontSize: 16,
      color: '#FFF',
    },
    topScreen: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 100,
      backgroundColor: '#000000',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      zIndex: 999,
    },
    headerContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Align items vertically in the center
    marginTop:45
  },
  backArrowContainer: {
    marginRight: 10, // Add some space between the image and text
    marginTop:7,
  },
  backArrow: {
    width: 24,
    height: 24,
  },
  companyNameTop: {
    fontSize: 24,
    color: '#FFFFFF',
    fontFamily: 'UrbanistBold',
    
  },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
    },
    closeButton: {
      position: 'absolute',
      top: 20,
      right: 20,
      zIndex: 1,
    },
    closeButtonText: {
      color: '#FFF',
      fontSize: 18,
      marginTop: 30,
    },
    selectedImage: {
      width: '90%',
      height: '90%',
    },
    button: {
      width: 152,
      height: 54,
      backgroundColor: '#7D7D7D',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 25,
    },
    buttonText: {
      fontFamily: 'UrbanistBold',
      fontSize: 16,
      color: '#FFF',
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: '#000000',
      borderRadius: 5,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    closeButton: {
      position: 'absolute',
      top: 10,
      left: 280,
    },
    backArrow: {
      width: 28,
      height: 28,
      marginBottom: 10,
    },
    modalText: {
      marginTop:10,
      marginBottom: 15,
      textAlign: 'center',
      fontFamily: 'UrbanistBold',
      fontSize: 18,
      color: '#C4C4C4',
    },
    textInputContainer: {
      width: 260,
      height: 100,
      borderWidth: 1,
      borderColor: '#D45A01',
      borderRadius: 5,
      paddingHorizontal: 10,
      marginTop: 15,
    },
    textInput: {
      flex: 1,
      color: '#C4C4C4'
    },
    starContainer: {
      flexDirection: 'row',
      marginTop: 20,
    },
    starIcon: {
      paddingHorizontal: 8,
    },
    submitButtonContainer: {
      alignItems: 'center',
      marginTop: 20,
    },
    submitButton: {
      width: 246,
      height: 43,
      backgroundColor: '#D45A01',
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
    },
    submitButtonText: {
      fontFamily: 'UrbanistBold',
      fontSize: 16,
      color: '#FFF',
    },
    
    
  });