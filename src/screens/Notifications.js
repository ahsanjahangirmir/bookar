import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../../assets/styles/notificationsStyles';
import {ipAddr} from './ipconfig.js';



const NotificationScreen = ({ navigation, route }) => {
  const { email } = route.params;
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const response = await fetch(`http://${ipAddr}:3000/getnotifications?userEmail=${email}`);
  
      if (response.ok) {
        const data = await response.json();
        console.log('Notifications:', data);
        setNotifications(data);
      } else {
        throw new Error('Failed to fetch notifications');
      }
    } catch (error) {
      console.error('Error while fetching notifications:', error.message);
      // Handle error, display an error message, etc.
    }
  };

  

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleBack = () => {
    // Implement navigation logic to go back
    navigation.navigate('HomePage', {
      emailProp: email,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <Icon name="chevron-left" size={24} color="#c4c4c4" />
        </TouchableOpacity>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Notifications</Text>
        </View>
      </View>
      <ScrollView style={styles.container}>
        {notifications.map((notification, index) => (
          <View key={index} style={styles.notificationCard}>
            <Icon name="bell-outline" size={28} color="#D45A01" />
            <View style={styles.notificationTextContainer}>
              <Text style={styles.notificationDescription}>{notification.Msg}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationScreen;
