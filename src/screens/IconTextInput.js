import React from 'react';
import { View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from '../../assets/styles/icontextinputStyles';

const IconTextInput = ({ iconName, ...props }) => (
  <View style={styles.inputWrapper}>
    <Icon name={iconName} size={20} color="#000" style={styles.inputIcon} />
    <TextInput {...props} style={styles.input} />
  </View>
);

export default IconTextInput;