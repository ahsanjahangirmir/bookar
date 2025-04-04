import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#00170C',
    },
    logo: {
      width: 250,
      height: 250,
      marginBottom: 20,
    },
    loadingLine: {
      height: 1.5,
      backgroundColor: '#D45A01',
      marginTop: 20,
    },
  });
  
  
  
  // import React, { useEffect, useRef } from 'react';
  // import { Animated, View, StyleSheet, Image, Dimensions } from 'react-native';
  
  // const screenWidth = Dimensions.get('window').width;
  // const loadingLineWidth = screenWidth * 0.8;
  
  // const LoadingScreen = ({ navigation }) => {
  //   const opacityAnim = useRef(new Animated.Value(1)).current;
  //   const widthAnim = useRef(new Animated.Value(loadingLineWidth)).current;
  
  //   const backgroundColorAnim = opacityAnim.interpolate({
  //     inputRange: [0, 1],
  //     outputRange: ['#D45A01', '#00170C'], // From orange to dark green
  //   });
  
  //   useEffect(() => {
  //     const animateLoading = () => {
  //       Animated.parallel([
  //         Animated.timing(widthAnim, {
  //           toValue: 0,
  //           duration: 1000,
  //           useNativeDriver: false,
  //         }),
  //         Animated.timing(opacityAnim, {
  //           toValue: 0,
  //           duration: 500,
  //           useNativeDriver: true,
  //         }),
  //       ]).start(() => {
  //         navigation.navigate('Login');
  //         // Reset the animation to its initial value when navigation completes
  //         widthAnim.setValue(loadingLineWidth);
  //         opacityAnim.setValue(1);
  //       });
  //     };
  
  //     // Start the animation on initial render
  //     animateLoading();
  
  //     // Run the animation again when the component re-renders
  //     const unsubscribe = navigation.addListener('focus', () => {
  //       animateLoading();
  //     });
  
  //     // Clean up the listener when the component unmounts
  //     return unsubscribe;
  //   }, [navigation, widthAnim, opacityAnim]);
  
  //   return (
  //     <Animated.View style={[styles.container, { backgroundColor: backgroundColorAnim, opacity: opacityAnim }]}>
  //       <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
  //       <Animated.View
  //         style={[
  //           styles.loadingLine,
  //           {
  //             width: widthAnim,
  //           },
  //         ]}
  //       />
  //     </Animated.View>
  //   );
  // };
  
  // const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //   },
  //   logo: {
  //     width: 250,
  //     height: 250,
  //     marginBottom: 20,
  //   },
  //   loadingLine: {
  //     height: 1.5,
  //     backgroundColor: '#D45A01',
  //     marginTop: 20,
  //   },
  // });
  
  // export default LoadingScreen;
  