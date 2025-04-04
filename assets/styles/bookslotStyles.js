import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#00170C',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingHorizontal: 12,
      paddingTop: 5,
      paddingBottom: 30,
    },
    selectDateText: {
      fontSize: 24,
      fontFamily: 'UrbanistBold',
      color: '#D45A01',
      marginLeft: 10,
    },
    arrowIcon: {
      width: 24,
      height: 24,
      marginLeft: 12,
    },
    calendarContainer: {
      flex: 1,
      marginHorizontal: 20,
      marginTop: -20,
    },
    calendar: {
      width: 348,
      height: 268,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      paddingHorizontal: 20,
      marginBottom: 20,
    },
    button: {
      width: 146,
      height: 50,
      backgroundColor: '#D45A01',
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    label: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#FFF',
    },
    checkInButton: {
      backgroundColor: 'rgba(133, 56, 2, 0.75)',
      borderRadius: 12,
      marginLeft: -0,
    },
    checkOutButton: {
      backgroundColor: 'rgba(133, 56, 2, 0.75)',
      borderRadius: 12,
    },
    buttonText: {
      color: '#C4C4C4',
      fontSize: 16,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    pickerContainer: {
      backgroundColor: '#FFF',
      borderRadius: 10,
      padding: 10,
      maxHeight: 200,
      width: '80%',
      marginBottom: 20,
    },
    option: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#E0E0E0',
    },
    optionText: {
      fontSize: 16,
    },
    closeButton: {
      backgroundColor: '#D45A01',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    closeButtonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#FFF',
    },
    timePickerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      paddingHorizontal: 20,
      marginBottom: 20,
      position: 'absolute',
      bottom: 275, 
      left: 0,
      right: 0,
      alignItems: 'center',
    },
    timePicker: {
      alignItems: 'center',
    },
    label: {
      fontSize: 17,
      fontFamily: 'UrbanistBold',
      color: '#FFF',
      marginBottom: 5,
    },
    checkInLabel: {
      color: '#C4C4C4',
      marginRight: 70,
      marginBottom: 10,
    },
    checkOutLabel: {
      color: '#C4C4C4',
      marginRight: 50,
      marginBottom: 10,
    },
    continueButton: {
      width: 328,
      height: 53,
      backgroundColor: '#D45A01',
      borderRadius: 26.5,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 0,
      marginLeft: 33,
    },
    continueButtonText: {
      fontSize: 12,
      fontFamily: 'UrbanistSemiBold',
      color: '#000000',
    },
    backArrowContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 40,
      height: 40,
      marginTop: 30,
      
    },
    backArrowImage: {
      width: 30,
      height: 30,
    },
    guestsContainer: {
      alignItems: 'flex-start',
      paddingLeft: 20,
      marginTop: 0,
      // position: 'absolute',
      // bottom: 230, 
      // left: 0,
      // // right: 310,
      marginBottom: 100,
      alignItems: 'center',
    },
    guestsText: {
      fontSize: 20,
      fontFamily: 'UrbanistBold',
      color: '#C4C4C4',
    },
    
    counterContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 90,
      position: 'absolute',
      bottom: 165, 
      left: 0,
      right: 0,
      alignItems: 'center',
    },
    counterButton: {
      width: 50,
      height: 50,
      borderRadius: 12,
      backgroundColor: '#35383F', // Updated color
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      fontSize: 12,
      color: '#FFF',
    },
    counterText: {
      fontSize: 24,
      color: '#FFF',
    },
    timeDifferenceContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
    timeDifferenceText: {
      fontSize: 18,
      fontFamily: 'UrbanistRegular', // Use the appropriate font family
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
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    errorText: {
      fontSize: 18,
      marginBottom: 15,
      textAlign: 'center',
    },
  });