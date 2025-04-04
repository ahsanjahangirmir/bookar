import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ImageCard = ({ data }) => {
  return (
    <View style={styles.imageContainer}>
      {data.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => {/* Handle click for image */}}>
          <View style={[styles.imageBox, index !== data.length - 1 && styles.imageBoxWithSpacing]}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.imageDetailsContainer}>
              <Text style={styles.textBox1}>{item.title}</Text>
              <Text style={styles.textBox2}>{item.location}</Text>
              <Text style={styles.textBox3}>{item.price}</Text>
            </View>
            <View style={styles.starPill}>
              <Image source={require('../../assets/images/star.png')} style={styles.starIcon} />
              <Text style={styles.starText}>{item.rating}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 0,
    marginBottom: 20,
    marginLeft: -18,
  },
  imageBox: {
    width: 266,
    height: 330,
    backgroundColor: '#00170C',
    borderRadius: 43,
    overflow: 'hidden',
  },
  imageBoxWithSpacing: {
    marginRight: 21,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageDetailsContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  textBox1: {
    fontSize: 19,
    color: '#C4C4C4',
    marginBottom: 10,
    fontFamily: 'UrbanistBold',
  },
  textBox2: {
    fontSize: 14,
    color: '#C4C4C4',
    marginBottom: 10,
    fontFamily: 'UrbanistMedium',
  },
  textBox3: {
    fontSize: 16,
    color: '#C4C4C4',
    marginBottom: 10,
    fontFamily: 'UrbanistBold',
  },
  starPill: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 62,
    height: 26,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
    backgroundColor: '#1AB65C',
    marginTop: 10,
    marginRight: 10,
  },
  starIcon: {
    width: 18,
    height: 18,
    marginRight: 5,
  },
  starText: {
    fontSize: 13,
    color: '#000000',
    fontFamily: 'UrbanistBold',
    marginTop: 2,
  },
});

export default ImageCard;
