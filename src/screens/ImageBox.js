import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from '../../assets/styles/homepageStyles'; // Import your styles here

const ImageBox = ({ imageSource, title, location, price, rating, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.imageBox, styles.imageBoxWithSpacing]}>
        <Image source={imageSource} style={styles.image} />
        <View style={styles.imageDetailsContainer}>
          <Text style={styles.textBox1}>{title}</Text>
          <Text style={styles.textBox2}>{location}</Text>
          <Text style={styles.textBox3}>{price}</Text>
        </View>
        <View style={styles.starPill}>
          <Image source={require('../../assets/images/star.png')} style={styles.starIcon} />
          <Text style={styles.starText}>{rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ImageBox;
