import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useFonts } from 'expo-font';
import { ipAddr } from './ipconfig';

const RevenueLineChartWeekly = (props) => {
  const { ownerEmail } = props;

const [loaded] = useFonts({
  UrbanistRegular: require('../../assets/fonts/Urbanist/static/Urbanist-Regular.ttf'),
  UrbanistBold: require('../../assets/fonts/Urbanist/static/Urbanist-SemiBold.ttf'),
  UrbanistMedium: require('../../assets/fonts/Urbanist/static/Urbanist-Medium.ttf'),
  UrbanistSemiBold: require('../../assets/fonts/Urbanist/static/Urbanist-SemiBold.ttf'),
  UrbanistLight: require('../../assets/fonts/Urbanist/static/Urbanist-Light.ttf'), // Added UrbanistLight font
  MontserratBold: require('../../assets/fonts/Montserrat/static/Montserrat-Bold.ttf'),
  MontserratExtraLight: require('../../assets/fonts/Montserrat/static/Montserrat-ExtraLight.ttf'),
  MontserratSemiBold: require('../../assets/fonts/Montserrat/static/Montserrat-SemiBold.ttf'),
});

const [bookings, setBookings] = useState([]);
const [totalRevenue, setTotalRevenue] = useState(0);
const [weeklyRevenue, setWeeklyRevenue] = useState({});
const [chartData, setChartData] = useState(null);

function checkEventStatus(eventString) {
  const [timeRange, eventDate] = eventString.split(' ');
  const [startTime, endTime] = timeRange.split('-');
  const eventStartTime = new Date(`${eventDate}T${startTime}:00`);
  const eventEndTime = new Date(`${eventDate}T${endTime}:00`);
  const currentTime = new Date();

  if (currentTime >= eventStartTime && currentTime < eventEndTime) {
      return 'Ongoing';
  } else if (currentTime >= eventEndTime && currentTime > eventStartTime) {
      return 'Completed';
  } else {
      return 'Not Started';
  }
}

const fetchOwnerBookings = async () => {
    try {
        const response = await fetch(`http://${ipAddr}:3000/owner-bookings?ownerEmail=${ownerEmail}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const filteredBookings = data.filter(booking => !booking.Canceled && checkEventStatus(booking.Booking_Time) === 'Completed');
        setBookings(filteredBookings);
        calculateRevenueLastSevenDays(filteredBookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
    }
};

const parseBookingTime = (bookingTime) => {
  const [timeRange, dateString] = bookingTime.split(' ');
  const [startTime, endTime] = timeRange.split('-');
  const [year, month, day] = dateString.split('-');
  const [startHour, startMinute] = startTime.split(':');
  const bookingDate = new Date(year, month - 1, day, startHour, startMinute);
  return bookingDate;
};

const calculateRevenueLastSevenDays = (bookingsData) => {
  const today = new Date();
  const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000); // Calculate seven days ago
  const revenueByDay = {};

  // Generate dates for the past seven days
  const dateRange = [];
  for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      dateRange.push(date.getDate()); // Push only the day number
  }

  dateRange.forEach(day => {
      revenueByDay[day] = 0;
  });

  bookingsData.forEach(booking => {
      const bookingDate = parseBookingTime(booking.Booking_Time);
      const day = bookingDate.getDate();

      if (day >= dateRange[0] && day <= dateRange[dateRange.length - 1]) {
          revenueByDay[day] += booking.Total;
      }
  });

  setTotalRevenue(Object.values(revenueByDay).reduce((acc, val) => acc + val, 0));

  const newData = {
      labels: dateRange.map(day => `${day}`), // Convert day number to string
      datasets: [{
          data: dateRange.map(day => revenueByDay[day] || 0), // Ensure revenue value exists
      }],
  };

  setChartData(newData); // Update chartData state
};


useEffect(() => {
    fetchOwnerBookings();
}, []);

return (
    <View style={styles.container}>
      <Text style={styles.title}>Revenue for the Past 7 Days</Text>
      <Text style={styles.totalRevenue}>PKR {totalRevenue}</Text>
      <View style={styles.chartContainer}>
        {chartData && (<LineChart
          data={chartData}
          width={300}
          height={280}
          withHorizontalLines={false}
          withVerticalLines={false}
          withInnerLines={false}
          fromZero={true}
          chartConfig={{
            backgroundGradientFrom: '#1E2923',
            backgroundGradientTo: '#08130D',
            propsForBackgroundLines: 'false',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
              paddingTop: 20,
            },
          }}
          bezier
          style={styles.chart}
        />)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    alignItems: 'flex-start',
    marginTop: 20,
    paddingHorizontal: 20,
    width: '90%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
  },
  title: {
    fontFamily: 'MontserratSemiBold',
    fontSize: 22,
    color: '#FFFFFF',
    marginTop: 40,
  },
  totalRevenue: {
    fontFamily: 'MontserratBold',
    fontSize: 32,
    color: '#D45A01',
    textAlign: 'center',
    marginTop: 10,
  },
  chartContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  chart: {
    marginVertical: 20,
    borderRadius: 16,
  },
});

export default RevenueLineChartWeekly;
