import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, SafeAreaView, Image, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useFonts } from 'expo-font';
import moment from 'moment';
import { styles } from '../../assets/styles/bookslotStyles';
import Toast from 'react-native-toast-message';
import {ipAddr} from './ipconfig.js';

const TimePicker = ({ selectedValue, onValueChange, visible, onClose, availableTimeSlots }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.pickerContainer}>
          <FlatList
            data={availableTimeSlots}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => onValueChange(item)} style={styles.option}>
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const CalendarComponent = ({route, navigation}) => {
  const { fieldChosen, companyEmail, companyName, bookingUser, emailProp, locationProp, contactNameProp, userEmailProp, passedCurrentCompany} = route.params;
  // console.log('Route bookslot:', companyName); // Log the entire route object


const generateHourlySlots = (checkInTime, checkOutTime) => {
    const startTime = moment(checkInTime, 'YYYY-MM-DD HH:mm');
    const endTime = moment(checkOutTime, 'YYYY-MM-DD HH:mm');
    const timeSlots = [];

    // Add the check-in time
    timeSlots.push(startTime.format('YYYY-MM-DD HH:mm'));

    // Generate hourly slots until the check-out time
    let currentHour = startTime.clone().add(1, 'hour');
    while (currentHour.isBefore(endTime)) {
        timeSlots.push(currentHour.format('YYYY-MM-DD HH:mm'));
        currentHour.add(1, 'hour');
    }

    // Add the check-out time
    timeSlots.push(endTime.format('YYYY-MM-DD HH:mm'));

    return timeSlots;
};


  const [loaded] = useFonts({
    UrbanistRegular: require('../../assets/fonts/Urbanist/static/Urbanist-Regular.ttf'),
    UrbanistBold: require('../../assets/fonts/Urbanist/static/Urbanist-SemiBold.ttf'),
    UrbanistMedium: require('../../assets/fonts/Urbanist/static/Urbanist-Medium.ttf'),
    UrbanistSemiBold: require('../../assets/fonts/Urbanist/static/Urbanist-SemiBold.ttf'),
    MontserratBold: require('../../assets/fonts/Montserrat/static/Montserrat-Bold.ttf'),
    MontserratExtraLight: require('../../assets/fonts/Montserrat/static/Montserrat-ExtraLight.ttf'),
    MontserratSemiBold: require('../../assets/fonts/Montserrat/static/Montserrat-SemiBold.ttf'),
  });

  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');
  const [showCheckInPicker, setShowCheckInPicker] = useState(false);
  const [showCheckOutPicker, setShowCheckOutPicker] = useState(false);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [generatedTimeSlots, setgeneratedTimeSlots] = useState([]);
  const [timeDifference, setTimeDifference] = useState(0);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [continueButtonVisible, setContinueButtonVisible] = useState(true);


  // Changed!
  const generateTimeSlots = (openHours, selectedCheckOutTime, alreadyBooked) => {
    const [open, close] = openHours.split('-');
    const openTime = moment(`${selectedDate} ${open}`, 'YYYY-MM-DD HH:mm');
    let closeTime = moment(`${selectedDate} ${close}`, 'YYYY-MM-DD HH:mm');
  
    // Adjust close time based on the selected check-out time
    if (selectedCheckOutTime) {
      const selectedCheckOutMoment = moment(selectedCheckOutTime, 'HH:mm');
      if (selectedCheckOutMoment.isBefore(closeTime)) {
        closeTime = selectedCheckOutMoment;
      }
    }
  
    if (closeTime.isBefore(openTime)) {
      closeTime.add(1, 'day');
    }
  
    const timeSlots = [];
    let currentTimeSlot = openTime.clone();
  
    // Get the current time
    const currentTime = moment();
  
    while (currentTimeSlot.isBefore(closeTime)) {
      // Check if the current time slot is in the future
      if (currentTimeSlot.isAfter(currentTime)) {
        // Limit check-in time to one hour less than the selected check-out time
        if (
          selectedCheckOutTime &&
          moment(currentTimeSlot).add(1, 'hour').isAfter(moment(selectedCheckOutTime, 'HH:mm'))
        ) {
          break;
        }
  
        // If check-in time is 23:00, limit check-out time to 00:00 on the next day
        if (
          currentTimeSlot.hour() === 23 &&
          currentTimeSlot.minutes() === 0 &&
          currentTime.hour() === 23 &&
          (!selectedCheckOutTime || selectedCheckOutTime !== '00:00')
        ) {
          break; // Stop loop after excluding 23:00
        }
  
        const currentTimeSlotStr = currentTimeSlot.format('YYYY-MM-DD HH:mm');
        if (!alreadyBooked.includes(currentTimeSlotStr)) {
          timeSlots.push(currentTimeSlotStr);
        }
      }
  
      currentTimeSlot.add(1, 'hour');
    }
  
    return timeSlots;
  };
  
  const removePastBookings = (momentArray) => {
    const currentDate = moment(); // Current date and time
    return momentArray.filter(momentStr => moment(momentStr, 'YYYY-MM-DD HH:mm').isAfter(currentDate, 'minute'));
};

  
  // Changed!
  useEffect(() => {
    const generatedTimeSlots = generateTimeSlots(fieldChosen.Open_Hours, checkOutTime, removePastBookings(fieldChosen.Already_Booked));
    // const generatedTimeSlots = generateTimeSlots(fieldChosen.Open_Hours, checkOutTime, removePastBookings(fieldChosen.Already_Booked));
    console.log("Generated time slos; ", generatedTimeSlots)
    // setAvailableTimeSlots(generatedTimeSlots.filter(slot => slot > moment().format('HH:mm')));
    setAvailableTimeSlots(generatedTimeSlots.filter(slot => moment(slot, 'YYYY-MM-DD HH:mm').isSameOrAfter(moment(), 'minute')));

  }, [selectedDate]);
  
  useEffect(() => {
    if (checkInTime && checkOutTime) {
      const checkInMoment = moment(checkInTime, 'YYYY-MM-DD HH:mm');
      const checkOutMoment = moment(checkOutTime, 'YYYY-MM-DD HH:mm');
      const differenceHours = checkOutMoment.diff(checkInMoment, 'hours', true);
      setTimeDifference(differenceHours);
  
      // Generate an array of all hours between check-in and check-out times
      const hoursInRange = [];
      let currentHour = checkInMoment.clone();
      while (currentHour.isBefore(checkOutMoment)) {
        hoursInRange.push(currentHour.format('YYYY-MM-DD HH:mm'));
        currentHour.add(1, 'hour');
      }
  
      // Check if any of the hours in range are already booked
      const isAnyHourBooked = hoursInRange.some(hour => fieldChosen.Already_Booked.includes(hour));
  
      if (isAnyHourBooked) {
        setErrorModalVisible(true); // Show the error modal
        setContinueButtonVisible(false); // Hide the continue button
      } else {
        setErrorModalVisible(false); // Hide the error modal
        setContinueButtonVisible(true); // Show the continue button
      }
    }
  }, [checkInTime, checkOutTime, fieldChosen.Already_Booked]);
   // Include bookedTimeSlots in the dependencies array


  if (!loaded) {
    // Return a loading indicator or null if fonts are not loaded yet
    return null; // Or render a loading spinner, etc.
  }
  
  // Changed!
  const onDayPress = (day) => {
    const selected = moment(day.dateString);
    const today = moment();
    const sevenDaysLater = moment().add(7, 'days');
    if (selected.isSameOrAfter(today, 'day') && selected.isSameOrBefore(sevenDaysLater, 'day')) {
      setSelectedDate(selected.format('YYYY-MM-DD'));
    }
  };
  const handleCheckInChange = (time) => {
    setCheckInTime(time);
    setShowCheckInPicker(false);

    // Reset checkout time
    setCheckOutTime('');
  };

  const handleCheckOutChange = (time) => {
    setCheckOutTime(time);
    setShowCheckOutPicker(false);
  };

  const filteredCheckOutTimeSlots = [];
  let i = availableTimeSlots.indexOf(checkInTime) + 1;
  let lastSlot = '';

  while (i < availableTimeSlots.length) {
    const currentSlot = availableTimeSlots[i];
    const previousSlot = availableTimeSlots[i - 1];

    if (checkInTime && currentSlot && previousSlot) {
      const currentSlotHours = parseInt(currentSlot.split(':')[0]);
      const previousSlotHours = parseInt(previousSlot.split(':')[0]);

      if (currentSlotHours - previousSlotHours >= 2) {
        lastSlot = previousSlot;
        break;
      }
    }

    filteredCheckOutTimeSlots.push(currentSlot);
    i++;
  }

  if (lastSlot) {
    const lastHour = parseInt(lastSlot.split(':')[0]) + 1;
    if (lastHour < 24) {
      filteredCheckOutTimeSlots.push(`${lastHour.toString().padStart(2, '0')}:00`);
    }
  }

  

  const convertTimeRange = (startTime, endTime) => {
    // Parse the start and end times
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    // Check if the end time is less than the start time
    // If so, it means the booking spans through midnight
    if (endDate < startDate) {
        // Subtract one day from the end date to attach only the previous date
        endDate.setDate(endDate.getDate() - 1);
    }

    // Get date, hours, and minutes for start and end times
    const startYear = startDate.getFullYear().toString().padStart(4, '0');
    const startMonth = (startDate.getMonth() + 1).toString().padStart(2, '0');
    const startDay = startDate.getDate().toString().padStart(2, '0');
    const startHours = startDate.getHours().toString().padStart(2, '0');
    const startMinutes = startDate.getMinutes().toString().padStart(2, '0');
    const endYear = endDate.getFullYear().toString().padStart(4, '0');
    const endMonth = (endDate.getMonth() + 1).toString().padStart(2, '0');
    const endDay = endDate.getDate().toString().padStart(2, '0');
    const endHours = endDate.getHours().toString().padStart(2, '0');
    const endMinutes = endDate.getMinutes().toString().padStart(2, '0');

    // Format the date and time strings
    const formattedStartDate = `${startYear}-${startMonth}-${startDay}`;
    const formattedEndDate = `${endYear}-${endMonth}-${endDay}`;
    const formattedStartTime = `${startHours}:${startMinutes}`;
    const formattedEndTime = `${endHours}:${endMinutes}`;

    // Check if the time range spans across two dates
    const timeRange = (formattedStartDate === formattedEndDate) 
        ? `${formattedStartTime}-${formattedEndTime} ${formattedStartDate}`
        : `${formattedStartTime}-${formattedEndTime} ${formattedStartDate}-${formattedEndDate}`;

    return `${formattedStartTime}-${formattedEndTime} ${formattedStartDate}`;
};

  
const ContinueButton = () => {
  const bookingData = {
      Company_Name: companyName,
      Field_Name: fieldChosen.Field_Name,
      Booking_Time: convertTimeRange(checkInTime, checkOutTime), // Example booking time (in ISO format)
      Company_Email: companyEmail,
      User_Email: bookingUser.Email,
      Total: (timeDifference.toFixed(2) * fieldChosen.Rate).toFixed(2), // Example total amount
  };

  const postNotification = async (noti) => {
    try {
      const response = await fetch(`http://${ipAddr}:3000/addnotification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          User_Email: bookingData.User_Email, // Example user email
          Msg: noti, // Example notification message
        }),
      });
  
      if (response.ok) {
        console.log('Notification added successfully');
        // Handle success, navigate to a different screen, etc.
      } else {
        throw new Error('Failed to add notification');
      }
    } catch (error) {
      console.error('Error while posting notification:', error.message);
      // Handle error, display an error message, etc.
    }
  };

  const notify = () => 
  {
      let msg = `Booking Reserved! \n 
        ${bookingData.Field_Name} - ${bookingData.Company_Name} booked for ${bookingData.Booking_Time}.\n 
        Payment: ${bookingData.Total}`

      postNotification(msg);
      Toast.show({
        type: 'info',
        text1: msg
      });

      // Set a timeout to navigate to the Payment screen after 2000 milliseconds (2 seconds)
      setTimeout(() => {
          navigation.navigate('Payment', {
              field: fieldChosen,
              company_email: companyEmail,
              company_name: companyName,
              user: bookingUser,
              email_prop: emailProp,
              location: locationProp,
              contact_name: contactNameProp,
              user_email: userEmailProp,
              booking: bookingData,
          });
      }, 5000); // Adjust the timeout duration as needed
  };

  const postBooking = async (bookingData) => {
      try {
          const response = await fetch(`http://${ipAddr}:3000/addbooking`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(bookingData),
          });

          if (response.ok) {
              console.log('Booking added successfully');

              // Update the Already_Booked array in the field document
              const { Company_Email, Field_Name, Company_Name } = bookingData;
              const newArr = generateHourlySlots(checkInTime, checkOutTime);
              
              for (const slot of newArr) {
                  console.log("slot passed: ", slot)
                  const response = await fetch(`http://${ipAddr}:3000/updatefield`, {
                      method: 'PUT',
                      headers: {
                          'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ Company_Email, Company_Name, Field_Name, slot }),
                  });

                  if (!response.ok) {
                      throw new Error('Failed to update field document');
                  }
              }

              // Navigate to the Payment screen after successful booking
              notify();
          } else {
              throw new Error('Failed to add booking');
          }
      } catch (error) {
          console.error('Error while posting booking:', error.message);
          // Handle error, display an error message, etc.
      }
  };

  const handleContinue = () => {
      postBooking(bookingData);
  };

  return (
      <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue} // Call handleContinue onPress
      >
          <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
  );
};


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {
        navigation.navigate('SelectField', {
          passedCompanyName: companyName,
          passedCompanyEmail: companyEmail,
          passedLocation: locationProp,
          passedEmail: emailProp,
          passedContactName: contactNameProp,
          passedUserEmail: userEmailProp,
          passedCurrentUser: bookingUser,
          passedCurrentCompany: passedCurrentCompany,
        });
      }}>
          <Image source={require('../../assets/images/white_back_arrow.png')} style={styles.arrowIcon} />
        </TouchableOpacity>
        <Text style={styles.selectDateText}>Select Date</Text>
      </View>
      <View style={styles.calendarContainer}>
        <View style={styles.calendar}>
          <Calendar
            current={selectedDate}
            minDate={moment().format()} // Changed! 
            maxDate={moment().add(7, 'days').format()} // Changed! 
            onDayPress={onDayPress}
            markingType={'custom'}
            markedDates={{
              [selectedDate]: {
                customStyles: {
                  container: { backgroundColor: '#D45A01', borderRadius: 20 },
                  text: { color: '#C4C4C4', fontFamily: 'UrbanistBold' },
                },
              },
            }}
            theme={{
              backgroundColor: '#00170C',
              calendarBackground: '#00170C',
              textSectionTitleColor: '#C4C4C4',
              textDayHeaderFontWeight: 'bold',
              selectedDayBackgroundColor: '#D45A01',
              selectedDayTextColor: '#C4C4C4',
              todayTextColor: '#D45A01',
              dayTextColor: '#C4C4C4',
              textDisabledColor: '#666666',
              arrowColor: '#C4C4C4',
              monthTextColor: '#C4C4C4',
              textMonthFontFamily: 'UrbanistBold',
            }}
          />
        </View>
      </View>

      <View style={styles.timePickerContainer}>
        <View style={styles.timePicker}>
          <Text style={[styles.label, styles.checkInLabel]}>Start time</Text>
          <TouchableOpacity onPress={() => setShowCheckInPicker(true)} style={[styles.button, styles.checkInButton]}>
            <Text style={styles.buttonText}>{checkInTime || '00:00'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.timePicker}>
          <Text style={[styles.label, styles.checkOutLabel]}>End time</Text>
          <TouchableOpacity onPress={() => setShowCheckOutPicker(true)} style={[styles.button, styles.checkOutButton]}>
            <Text style={styles.buttonText}>{checkOutTime || '00:00'}</Text>
          </TouchableOpacity>
        </View>
      </View>

            
      <TimePicker
        visible={showCheckInPicker}
        selectedValue={checkInTime}
        onValueChange={handleCheckInChange}
        onClose={() => setShowCheckInPicker(false)}
        availableTimeSlots={availableTimeSlots}
      />

      <TimePicker
        visible={showCheckOutPicker}
        selectedValue={checkOutTime}
        onValueChange={handleCheckOutChange}
        onClose={() => setShowCheckOutPicker(false)}
        availableTimeSlots={filteredCheckOutTimeSlots}
      />

      {checkInTime && checkOutTime && continueButtonVisible && (
        <View style={styles.guestsContainer}>
          <Text style={styles.guestsText}>Total amount: {timeDifference.toFixed(2) * fieldChosen.Rate} PKR</Text>
        </View>
      )}

      <Modal visible={errorModalVisible} transparent={true} animationType="fade">
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.errorText}>Error: Next hour is already booked!</Text>
            <TouchableOpacity onPress={() => setErrorModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {continueButtonVisible && checkInTime && checkOutTime && <ContinueButton />}

    </SafeAreaView>
  );
};

export default CalendarComponent;
