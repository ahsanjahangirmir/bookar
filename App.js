// import React, { useState } from 'react';
import React, { useEffect, useState } from 'react';
import { Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import Toast from 'react-native-toast-message';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

import LoadingScreen from './src/screens/LoadingScreen';
import Login from './src/screens/Login';

import UserType from './src/screens/UserType';
import SignUp1 from './src/screens/SignUp1';
import SignUp2 from './src/screens/SignUp2';

import Search from './src/screens/Search';

import EditProfile from './src/screens/EditProfile';
import FieldProfile from './src/screens/FieldProfile';

import Verification from './src/screens/Verification';
import HomePage from './src/screens/Homepage';

import RecentlyBooked from './src/screens/RecentlyBooked';
import UserProfile from './src/screens/UserProfile';

import Booking from './src/screens/BookSlot'
import SelectField from './src/screens/SelectField'
import Payment from './src/screens/Payment'

import MyBookings from './src/screens/MyBookings';
import Notifications from './src/screens/Notifications';

import OwnerHomepage from './src/screens/Owner_Landing';
import OwnerBookings from './src/screens/OwnerBookings';
import UpdateListingsOwner from './src/screens/Update_Listing';
import UpdatePricingOwner from './src/screens/Update_Pricing_Capacity';
import UploadImages from './src/screens/Upload_Images';
import CreateListingOwner from './src/screens/Create_Listing';
import CreateSuccess from './src/screens/CreateSuccess';
import OwnerInventory from './src/screens/OwnerInventory';
import StatScreen from './src/screens/Stats';
import OwnerReview from './src/screens/OwnerReview';
import OwnerListingProfile from './src/screens/OwnerListingProfile';


import ManageListingsOwner from './src/screens/Manage_Listings';
import UpdateListing from './src/screens/Update_Listing';
import UpdatePricing from './src/screens/update_pricing_capacity_manage'
import UploadImage from './src/screens/upload_images_manage'
import UploadPayment from './src/screens/payment_screen'

const Stack = createNativeStackNavigator();

const fetchFonts = () => {
  return Font.loadAsync({
    'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
    'Urbanist-Medium': require('./assets/fonts/Urbanist-Medium.ttf'),
    'Urbanist-Bold': require('./assets/fonts/Urbanist-Bold.ttf'),
    'UrbanistRegular': require('./assets/fonts/Urbanist/static/Urbanist-Regular.ttf'),
    'UrbanistLight': require('./assets/fonts/Urbanist/static/Urbanist-Light.ttf'),
    'UrbanistBold': require('./assets/fonts/Urbanist/static/Urbanist-Bold.ttf'),
    'UrbanistSemiBold': require('./assets/fonts/Urbanist/static/Urbanist-SemiBold.ttf'),
    'UrbanistMedium': require('./assets/fonts/Urbanist/static/Urbanist-Medium.ttf'),
    'MontserratBold': require('./assets/fonts/Montserrat/static/Montserrat-Bold.ttf'),
    'MontserratExtraLight': require('./assets/fonts/Montserrat/static/Montserrat-ExtraLight.ttf'),
    'MontserratRegular': require('./assets/fonts/Montserrat/static/Montserrat-Regular.ttf'),
    'MontserratSemiBold': require('./assets/fonts/Montserrat/static/Montserrat-SemiBold.ttf'),
    'MontserratMedium': require('./assets/fonts/Montserrat/static/Montserrat-Medium.ttf'),
  }).then(() => console.log('Fonts loaded!'))
  .catch(e => console.error('Error loading fonts', e));
};

export default function App() {

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Promise.all([
          fetchFonts(),
        ]);
      } catch (e) {
        console.warn(e);
      } finally {
        // setAppIsReady(true);
        setTimeout(() => setAppIsReady(true), 5000);
      }
    }
  
    prepare();
  }, []);
  
  const onAnimationComplete = () => {
    setAppIsReady(true);
  };
  
  if (!appIsReady) {
    return <LoadingScreen onAnimationComplete={onAnimationComplete} />;
  }
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="UserType" 
          component={UserType} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="SignUp1" 
          component={SignUp1}  
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="SignUp2" 
          component={SignUp2} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Verification" 
          component={Verification} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="HomePage" 
          component={HomePage} 
          options={{ headerShown: false, animation: 'none'}}
        />
        <Stack.Screen 
          name="Search" 
          component={Search} 
          options={{ headerShown: false ,animation: 'none'}}
        />
        <Stack.Screen
          name="RecentlyBooked"
          component={RecentlyBooked}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Booking"
          component={Booking}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserProfile"
          component={UserProfile}
          options={{ headerShown: false ,animation: 'none'}}
          />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{ headerShown: false }}
          />
        <Stack.Screen
          name="FieldProfile"
          component={FieldProfile}
          options={{ headerShown: false }}
          />
        <Stack.Screen
          name="SelectField"
          component={SelectField}
          options={{ headerShown: false }}
          />
        <Stack.Screen
          name="Payment"
          component={Payment}
          options={{ headerShown: false }}
          />
        <Stack.Screen
          name="MyBookings"
          component={MyBookings}
          options={{ headerShown: false ,animation: 'none'}}
        />
        <Stack.Screen
          name="Notifications"
          component={Notifications}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OwnerHomepage"
          component={OwnerHomepage}
          options={{ headerShown: false ,animation: 'none'}}
        />
        <Stack.Screen
          name="ManageListingsOwner"
          component={ManageListingsOwner}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UpdateListing"
          component={UpdateListing}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UpdatePricing"
          component={UpdatePricing}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UploadImage"
          component={UploadImage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UploadPayment"
          component={UploadPayment}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateListingOwner"
          component={CreateListingOwner}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateSuccess"
          component={CreateSuccess}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OwnerInventory"
          component={OwnerInventory}
          options={{ headerShown: false ,animation: 'none'}}
        />
        <Stack.Screen
          name="OwnerBookings"
          component={OwnerBookings}
          options={{ headerShown: false ,animation: 'none'}}
        />
        <Stack.Screen
          name="StatScreen"
          component={StatScreen}
          options={{ headerShown: false ,animation: 'none'}}
        />
        <Stack.Screen
          name="OwnerReview"
          component={OwnerReview}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OwnerListingProfile"
          component={OwnerListingProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UpdateListingsOwner"
          component={UpdateListingsOwner}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UpdatePricingOwner"
          component={UpdatePricingOwner}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UploadImages"
          component={UploadImages}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <Toast/>
    </NavigationContainer>
  );
}
