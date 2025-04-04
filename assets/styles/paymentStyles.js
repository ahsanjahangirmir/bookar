import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    image: {
        width: 300, // replace with the width of your image
        height: 300, // replace with the height of your image
        marginBottom: -10, // adjust as needed
      },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        width: 310,
        height: 489,
        backgroundColor: "black",
        borderRadius: 20,
        padding: 5,
        marginTop: 150,
        marginLeft: 50,
        marginBottom: 150,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 12
      },
      modalTextTitle: {
        marginBottom: 1,
        textAlign: 'center',
        fontFamily: 'Urbanist-Bold',
        color: '#1AB65C',
        fontSize: 20,
        marginBottom    : 60,
        marginTop: 20,
        // ... your text styles ...
      },
      modalContent: {
        // ... your modal content styles ...
      },
      errorText: {
        color: 'red',
        fontFamily: 'Montserrat',
        fontSize: 16,
        marginBottom: -19,
        marginLeft: 20,
      },
      modalButton: {
        // ... your existing button styles ...
        width: 266,
        height: 48,
        borderRadius: 26,
        backgroundColor: '#D45A01',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        margin: 7,
        overflow: 'hidden', // add this line


      },
      cancelButton: {
        width: 266,
        height: 48,
        backgroundColor: '#35383F',
        borderRadius: 26,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
      },
      
      modalButtonText: {
        color: 'white',
        fontFamily: 'Urbanist',
        fontSize: 14,
        textAlign: 'center',
      },
  container: {
    flex: 1,
    backgroundColor: '#00170C',
    justifyContent: 'space-between' // Ensures the button stays at the bottom
  },
  
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight    : 50,
    marginTop: -350,
    marginBottom : -400,
    paddingVertical: -20,
    paddingHorizontal: 40, // Adjust this as needed to match Figma
  },

  optionText: {
    color: '#C4C4C4',
    fontFamily: 'Urbanist',
    fontSize: 17,
  },

  addNewCardText: {
    color: '#D45A01',
    fontFamily: 'Urbanist',
    fontSize: 17,
    marginBottom:-100,
    
    // We'll adjust the spacing in layout, not here.
  },
  paymentMethodsButton: {
    paddingVertical: 15,
    paddingHorizontal: 0,
    marginVertical: 20,
    fontFamily: 'Urbanist',
    fontSize: 17,
    paddingRight: 20,
    paddingHorizontal: 20
},
addNewCardButton: {
    backgroundColor: '#D45A01', // Change this to the color of your 'Payment Methods' button
    borderRadius: 0,
    borderWidth: 0,
    paddingVertical: 50,
    paddingHorizontal: 20,
    marginVertical: 10,
    fontFamily: 'Urbanist',
    fontSize: 17,
    paddingRight: 20,
},
  paymentOptionImage: {
    width: 35,
    height: 35,
    marginTop: 5,
},
  // ... (other styles remain unchanged)
  paymentOption: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#853902',
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 10,
    // Adjust this to move the payment options closer to the top
    marginTop: 30, // Try reducing this to bring the options up
    marginLeft: 20, // Add this line
    marginRight: 20, // Add this line
  },
  paymentOptionText: {
    color: '#C4C4C4',
    fontFamily: 'Urbanist', // Updated font
    fontSize: 16,
    paddingRight: 190, 
    // Add some space between the text and the radio button
    paddingLeft : 10,
  },
  paymentOptionTextSelected: {
    
    fontFamily: 'Urbanist',
    color: '#C4C4C4', // Text color changes when selected
  },
  continueButton: {
    backgroundColor: '#D45A01',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 10,
    cornerRadius: 30.5,
    marginBottom: 20, // Ensure it's at the bottom
  },
  continueButtonText: {
    color: '#C4C4C4',
    fontFamily: 'Urbanist', // Updated font
    fontSize: 17,
    textAlign: 'center', // Center the text inside the button
  },
  buttonContainer: {
    paddingHorizontal: 30, // Match the horizontal padding with the rest of the content
  },

header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', // Align items to the start
    padding: 20, // Add some padding
    marginTop: 20, // Adjust as needed
    marginBottom: -20, // Adjust as needed

},
  headerTitle: {
    color: '#C4C4C4',
    fontFamily: 'Urbanist',
    fontSize: 24,
    marginLeft: 40, // Space after the back icon
  },


});