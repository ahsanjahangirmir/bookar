import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#00170C',
      padding: 20,
      justifyContent: 'space-between',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 30,
    },
    backButton: {
      width: 28,
      height: 28,
    },
    backButtonText: {
      fontSize: 24,
      color: '#fff',
    },
    title: {
      fontSize: 24,
      color: '#D45A01',
      fontWeight: 'bold',
      marginLeft: 10,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    subtitle: {
      fontSize: 18,
      color: '#fff',
      marginTop: 10,
    },
    checkmark: {
      width: 220,
      height: 220,
      marginBottom: 20,
      borderRadius: 110,
      borderWidth: 3,
      borderColor: '#ff6600',
    },
    codeInputContainer: {
      flexDirection: 'row',
      marginTop: 20,
    },
    codeInput: {
      height: 56,
      width: 64,
      backgroundColor: 'rgba(133, 57, 2, 0.75)', 
      color: '#fff',
      textAlign: 'center',
      marginHorizontal: 5,
      fontSize: 24,
      borderRadius: 10,
    },
    error: {
      borderColor: 'red',
      borderWidth: 2,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        marginTop: 10,
    },
    status: {
      fontSize: 16,
      color: '#fff',
      marginTop: 10,
    },
    button: {
      backgroundColor: '#ff6600',
      padding: 10,
      borderRadius: 27.5, 
      width: 330,
      height: 55,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      marginBottom: 25,
    },
    resendButton: {
      backgroundColor: 'transparent',
      marginTop: 10,
    },
    resendButtonText: {
      fontSize: 18,
      color: '#ff6600',
    },
    buttonText: {
      fontSize: 18,
      color: '#fff',
    },
  });