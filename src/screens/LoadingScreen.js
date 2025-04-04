import React, { useEffect, useRef, useState } from 'react';
import { Animated, View, Image, Dimensions } from 'react-native';
import { styles } from '../../assets/styles/loadingscreenStyles';

const screenWidth = Dimensions.get('window').width;
const loadingLineWidth = screenWidth * 0.8;

const LoadingScreen = ({ onAnimationComplete }) => {
  const widthAnim = useRef(new Animated.Value(loadingLineWidth)).current;
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: false,
    }).start(() => {
      if (imageLoaded) {  // Ensure animation only completes when image is loaded
        onAnimationComplete(); // Ensure this prop is being passed from App.js
      }
    });
  }, [onAnimationComplete, widthAnim, imageLoaded]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  if (!imageLoaded) {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/Logo.png')}
          style={styles.logo}
          onLoad={handleImageLoad}  // Set imageLoaded to true when the image finishes loading
        />
        {/* Optionally, you can render a placeholder or a loader here */}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/Logo.png')}
        style={styles.logo}
        onLoad={handleImageLoad}
      />
      <Animated.View
        style={[
          styles.loadingLine,
          {
            width: widthAnim,
          },
        ]}
      />
    </View>
  );
};

export default LoadingScreen;
