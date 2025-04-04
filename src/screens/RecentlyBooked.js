import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Modal } from 'react-native';
import { styles } from '../../assets/styles/recentlybookedStyles';
import { ipAddr } from './ipconfig.js';

export default function RecentlyBooked({ navigation, route }) {
    const { email } = route.params;
    const [bookings, setBookings] = useState(null);
    
    const [loaded] = useFonts({
        UrbanistRegular: require('../../assets/fonts/Urbanist/static/Urbanist-Regular.ttf'),
        UrbanistBold: require('../../assets/fonts/Urbanist/static/Urbanist-Bold.ttf'),
        UrbanistSemiBold: require('../../assets/fonts/Urbanist/static/Urbanist-SemiBold.ttf'),
        UrbanistMedium: require('../../assets/fonts/Urbanist/static/Urbanist-Medium.ttf'),
        MontserratBold: require('../../assets/fonts/Montserrat/static/Montserrat-Bold.ttf'),
        MontserratExtraLight: require('../../assets/fonts/Montserrat/static/Montserrat-ExtraLight.ttf'),
        MontserratSemiBold: require('../../assets/fonts/Montserrat/static/Montserrat-SemiBold.ttf'),
    });
    
    function checkEventStatus(eventString) {
        const [timeRange, eventDate] = eventString.split(' ');
        const [startTime, endTime] = timeRange.split('-');
    
        const eventStartTime = new Date(`${eventDate}T${startTime}:00`);
        const eventEndTime = new Date(`${eventDate}T${endTime}:00`);
        const currentTime = new Date();
    
        if (currentTime >= eventStartTime && currentTime < eventEndTime) {
            return 'Ongoing';
        } else if (currentTime >= eventEndTime) {
            return 'Completed';
        } else {
            return 'Not Started';
        }
    }

    useEffect(() => {
        fetchMyBookings();
    }, []);

    const fetchMyBookings = async () => {
        try {
            const response = await fetch(`http://${ipAddr}:3000/my-bookings?userEmail=${route.params.email}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setBookings(data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };
    
    const goBack = () => { navigation.goBack(); };
    
    const renderItem = ({ item }) => {
        if (!item.Canceled) {
            return (
                <View style={styles.card}>
                    <Image source={require('../../assets/images/Fusion.png')} style={styles.venueImage} />
                    <View style={styles.infoContainer}>
                        <Text style={styles.venueName}>{item.Company_Name}</Text>
                        <Text style={styles.location}>{item.Field_Name}</Text>
                        <Text style={styles.location}>{item.Canceled}</Text>
                        <View style={styles.bookingTimeContainer}>
                            <Ionicons name="time-outline" size={14} color="#C4C4C4" />
                            <Text style={styles.bookingTime}>{item.Booking_Time}</Text>
                        </View>
                    </View>
                </View>
            );
        } else {

            return null;
        }
    };

    if (!bookings) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={goBack} style={styles.backButton}>
                    <Ionicons name="arrow-back-outline" size={24} color="#C4C4C4" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Recently Booked</Text>
            </View>
            {bookings.length > 0 ? (
                <FlatList
                    data={bookings}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                />
            ) : (
                <View style={styles.container}>
                    <Text>No bookings found.</Text>
                </View>
            )}
        </View>
    );
}
