import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#00170C',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingVertical: 16,
    backgroundColor: '#00170C',
    borderBottomWidth: 1,
    borderBottomColor: '#00170C',
  },
  backButton: {
    marginRight: 20,
  },
  headerTitle: {
    color: '#c4c4c4',
    fontSize: 26,
    fontFamily: 'UrbanistBold',
  },
  container: {
    flex: 1,
  },
  notificationCard: {
    flexDirection: 'row',
    padding: 20,
    margin: 10,
    backgroundColor: '#33D45A01',
    
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 4,
    borderColor: '#D45A01',
  },
  
  notificationTextContainer: {
    marginLeft: 16,
    flex: 1,
    fontFamily: 'UrbanistBold',
  },
  notificationTitle: {
    color: '#C4C4C4',
    fontSize: 22,
    
  },
  notificationDescription: {
    color: '#C4C4C4',
    fontSize: 15,
    paddingRight:33,
    // fontFamily: 'Montserrat-Regular',
    fontFamily: 'UrbanistBold',
  },
  crossButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
