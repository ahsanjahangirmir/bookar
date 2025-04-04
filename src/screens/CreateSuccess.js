import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView , Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Ensure you've installed this package
import { useNavigation } from '@react-navigation/native';
const SuccessScreen = ({navigate, route}) => {
    // Replace with your actual navigation logic
  const navigation = useNavigation();
  const {email} = route.params;
    const handlePressDone = () => {
      navigation.navigate('OwnerHomepage', { email: email }); // Replace 'HomePage' with the name of your 
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Image
            source={require('../../assets/images/large_icon.png')} // Replace with your success image in the assets directory
            style={styles.successImage}
          />
          <Text style={styles.successText}>Listing Created Successfully</Text>
      <Image source={require('../../assets/images/baar4.png')} style={styles.barImage} />

        </View>
        <TouchableOpacity style={styles.doneButton} onPress={handlePressDone}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    );
  };
  

const styles = StyleSheet.create({
    barImage: {
        marginLeft: 1,
        marginTop: 275,
      },
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  successImage: {
    marginTop: 350,
    width: 100, // Set the width as needed
    height: 100, // Set the height as needed
  },
  successText: {
    color: '#C4C4C4',
    fontSize: 16,
    marginVertical: 20,
    fontFamily: 'Montserrat-Regular',
  },
  doneButton: {
    backgroundColor: 'rgba(212, 90, 1, 0.5)',
    paddingVertical: 15, // Adjust this to control the button's height
    paddingHorizontal: 20, // Adjust this to control the button's width
    margin: 20,
    marginHorizontal: 60,   
    borderRadius: 26.5,
    alignItems: 'center',
    marginTop: 18,
    width: 238, // Keep this if you want a fixed width
    marginBottom   : 40,
  },
  doneButtonText: {
    color: '#C4C4C4',
    fontFamily: 'Urbanist-Bold',
    fontSize: 17,
  },
});

export default SuccessScreen;
