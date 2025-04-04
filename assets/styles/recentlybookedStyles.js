import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    
    headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#00170C', // Match the screen's background or your theme
    },
    backButton: {
    marginRight: 10, // Add some spacing between the icon and the title
    marginTop:50,
    },
    headerTitle: {
    fontFamily: 'UrbanistBold',
    fontSize: 26,
    color: '#C4C4C4', // Or any color you prefer
    marginTop: 50,
    },
  container: {
    flex: 1,
    backgroundColor: '#00170C', // Background color of the screen
  },
  card: {
    flexDirection: 'row', // Use row for a horizontal layout
    backgroundColor: 'rgba(133, 57, 2, 0.75)', // Card background color with opacity
    borderRadius: 11,
    padding: 12, // Adjust padding to control the height of the card
    marginVertical: 8,
    marginHorizontal: 16,
    justifyContent: 'flex-start', // Align to the start of the card
  },
  venueImage: {
    width: 90, // Adjust width as necessary
    height: 90, // Adjust height as necessary
    borderRadius: 10, // Round the corners of the image
    marginRight: 16, // Space between image and venue info
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column', // Content will be in a column
  },
  venueName: {
    fontFamily: 'UrbanistBold',
    color: '#C4C4C4',
    fontSize: 18,
    flex: 0.25, // Take up available space
    marginTop: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute', // Position absolutely within the card
    top: 12, // Adjust to match your design
    right: 12, // Adjust to match your design
  },
  starIcon: {
    width: 12, // Adjust size as necessary
    height: 12, // Adjust size as necessary
  },
  venueRating: {
    fontFamily: 'UrbanistSemiBold',
    color: '#1AB65C',
    fontSize: 16, // Slightly larger font for the rating
    marginLeft: 4, // Space between the star icon and rating
  },
  bookingTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  bookingTime: {
    fontFamily: 'UrbanistRegular',
    color: '#C4C4C4',
    fontSize: 14,
    marginLeft: 4,
  },
  bookAgainButton: {
    backgroundColor: '#D45A01',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-end', // Align to the end of the flex container
    position: 'absolute', // Position absolutely within the card
    bottom: 0, // Adjust to match your design
  },
  bookAgainText: {
    fontFamily: 'UrbanistSemiBold',
    color: '#c4c4c4', // Changed the text color to white
    fontSize: 14,
  },
  location: {
    fontFamily: 'UrbanistRegular',
    color: '#C4C4C4',
    fontSize: 14,
    marginTop: 4,
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
    color: '#55F779',
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
});