// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, ScrollView , TouchableOpacity, SafeAreaView  } from 'react-native';
// import { Svg, Rect, Text as SvgText } from 'react-native-svg';
// import { useFonts } from 'expo-font';
// import { Ionicons } from '@expo/vector-icons';
// import {ipAddr} from './ipconfig';
// import MonthlyChart from './MonthlyRevenueLine';
// import WeeklyChart from './WeeklyRevenueLine'
// import BestField from './BestField';

// const Stats = ({ navigation, route }) => {

//   const { emailProp, currentUser } = route.params;
//   const [selectedTab, setSelectedTab] = useState('home');
//   const [reviews, setReviews] = useState(null);
//   const [avgRating, setAvgRating] = useState(0);
//   const [star1Count, setStar1Count] = useState(0);
//   const [star2Count, setStar2Count] = useState(0);
//   const [star3Count, setStar3Count] = useState(0);
//   const [star4Count, setStar4Count] = useState(0);
//   const [star5Count, setStar5Count] = useState(0);

//   useEffect(() => {
//     getReviews();
//   }, []); // Fetch reviews when the component mounts

//   const getReviews = async () => {
//     try {
//       const response = await fetch(`http://${ipAddr}:3000/get-reviews?companyEmail=${emailProp}`);
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data = await response.json();
//       // Process the fetched reviews data as needed
//       setReviews(data)
//       // Reset star counts
//       setStar1Count(0);
//       setStar2Count(0);
//       setStar3Count(0);
//       setStar4Count(0);
//       setStar5Count(0);

//       data.forEach(review => {
//         // Increment star count based on rating
//         switch (review.Rating) {
//           case 1:
//             setStar1Count(prevCount => prevCount + 1);
//             break;
//           case 2:
//             setStar2Count(prevCount => prevCount + 1);
//             break;
//           case 3:
//             setStar3Count(prevCount => prevCount + 1);
//             break;
//           case 4:
//             setStar4Count(prevCount => prevCount + 1);
//             break;
//           case 5:
//             setStar5Count(prevCount => prevCount + 1);
//             break;
//           default:
//             break;
//         }
//       });
//       if (data.length === 0) {
//         setAvgRating(0);
//       } else {
//         const totalRating = data.reduce((sum, review) => sum + review.Rating, 0);
//         const average = totalRating / data.length;
//         let temp = parseFloat(average.toFixed(2))
//         if (temp > 5)
//         {
//           temp -= 1
//           setAvgRating(temp);
//         }
//         else
//         {
//           setAvgRating(temp);
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching reviews:', error);
//     }
//   };
  
//   const [loaded] = useFonts({
//     UrbanistRegular: require('../../assets/fonts/Urbanist/static/Urbanist-Regular.ttf'),
//     UrbanistBold: require('../../assets/fonts/Urbanist/static/Urbanist-SemiBold.ttf'),
//     UrbanistMedium: require('../../assets/fonts/Urbanist/static/Urbanist-Medium.ttf'),
//     UrbanistSemiBold: require('../../assets/fonts/Urbanist/static/Urbanist-SemiBold.ttf'),
//     UrbanistLight: require('../../assets/fonts/Urbanist/static/Urbanist-Light.ttf'), // Added UrbanistLight font
//     MontserratBold: require('../../assets/fonts/Montserrat/static/Montserrat-Bold.ttf'),
//     MontserratExtraLight: require('../../assets/fonts/Montserrat/static/Montserrat-ExtraLight.ttf'),
//     MontserratSemiBold: require('../../assets/fonts/Montserrat/static/Montserrat-SemiBold.ttf'),
//   });

//   if (!loaded) {
//     return null;
//   }

//   const handleTabPress = (tabName) => {

//       setSelectedTab(tabName);
  
//       switch (tabName) {
//         case 'home':
//             navigation.navigate('OwnerHomepage', { email: emailProp });
//             setSelectedTab('home');
//           break;
//           case 'list':
//             navigation.navigate('OwnerBookings', {
//               emailProp: emailProp,
//               currentUser: currentUser
//             })
//             break;
//         case 'cart':
//           // Navigate to 'OwnerInventory' screen when cart tab is pressed
//           navigation.navigate('OwnerInventory', { emailProp: emailProp, currentUser: currentUser });
//           break;
//         case 'person':
//           // Navigate to earnings or other related screen for 'person' tab
//           break;
//         default:
//           // Handle default case or no tab selected
//           break;
//       }
//   };

//   const chartHeight = 240;
//   const barWidth = 40;
//   const barSpacing = 15;
//   const maxCount = Math.max(star1Count, star2Count, star3Count, star4Count, star5Count);

//   return (
//     <View style={styles.container}>
//     <ScrollView contentContainerStyle={styles.scrollContainer}>
//       <Text style={styles.title}>My Statistics</Text>
//         <View style={styles.statsContainer}>
//             <Text style={styles.averageRatingText}>Average Rating</Text>
//             <Text style={styles.averageRating}>{avgRating}</Text>
//             <Text style={styles.reviewCount}>{reviews && reviews.length} reviews</Text>
//             <View style={styles.chartContainer}>
//             <Svg width="100%" height={chartHeight}>
//               {[star1Count, star2Count, star3Count, star4Count, star5Count].map((count, index) => {
//                 const labelY = Math.max(
//                   0,
//                   chartHeight - (chartHeight * count) / maxCount - 10,
//                   20 // Minimum y position for label to avoid cutoff
//                 );
//                 return (
//                   <React.Fragment key={index}>
//                     <Rect
//                       x={(barWidth + barSpacing) * index}
//                       y={chartHeight - (chartHeight * count) / maxCount}
//                       width={barWidth}
//                       height={(chartHeight * count) / maxCount}
//                       fill={index % 2 === 0 ? '#D45A01' : '#FFFFFF'} // Alternating colors
//                       rx={10} // Rounded corners
//                     />
//                     <SvgText
//                       x={(barWidth + barSpacing) * index + barWidth / 2}
//                       y={chartHeight - (chartHeight * count) / maxCount + 23} // Adjust the y-coordinate
//                       fill="#000000" // Text color
//                       fontSize="14"
//                       textAnchor="middle"
//                     >
//                       {count}
//                     </SvgText>
//                     <SvgText
//                       x={(barWidth + barSpacing) * index + barWidth / 2}
//                       y={chartHeight + 15}
//                       fill="#FFFFFF"
//                       fontSize="14"
//                       textAnchor="middle"
//                     >
//                       {`${index + 1} star`}
//                     </SvgText>
//                   </React.Fragment>
//                 );
//               })}
//             </Svg>
//             <View style={styles.xAxisLabelsContainer}>
//               <View style={styles.xAxisLabels}>
//                 <Text style={styles.starLabel}>1 star</Text>
//                 <Text style={styles.starLabel}>2 star</Text>
//                 <Text style={styles.starLabel}>3 star</Text>
//                 <Text style={styles.starLabel}>4 star</Text>
//                 <Text style={styles.starLabel}>5 star</Text>
//               </View>

//             </View>
//             </View>
//         </View>
//         <MonthlyChart ownerEmail={emailProp} />
//         <WeeklyChart ownerEmail={emailProp} />
//         <BestField ownerEmail={emailProp} />
//         <View style={{ height: 100 }} />
//       </ScrollView>
//       <View style={styles.navbar}>
//         <TouchableOpacity
//           style={styles.navbarTab}
//           onPress={() => handleTabPress('home')}
//         >
//           <Ionicons
//             name={'home'}
//             size={24}
//             color={'#7D7D7D'}
//           />
//           <Text style={styles.navbarText}>Home</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.navbarTab}
//           onPress={() => handleTabPress('list')}
//         >
//           <Ionicons
//             name={'calendar'}
//             size={24}
//             color={'#7D7D7D'}
//           />
//           <Text style={styles.navbarText}>Bookings</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.navbarTab}
//           onPress={() => handleTabPress('cart')}
//         >
//           <Ionicons
//             name={'cart'}
//             size={24}
//             color={'#7D7D7D'}
//           />
//           <Text style={styles.navbarText}>Inventory</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.navbarTab}
//           onPress={() => handleTabPress('person')}
//         >
//           <Ionicons
//             name={'logo-usd'}
//             size={24}
//             color={'#D45A01'}
//           />
//           <Text style={styles.navbarText}>Earnings</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
  
//   );
// };

// const styles = StyleSheet.create({
//     scrollContainer: {
//         flexGrow: 1,
//         backgroundColor: '#000000',
//         justifyContent: 'flex-start',
//         alignItems: 'center',
//         paddingTop: 20,
//         width: '90%'
//         },
//   container: {
//     flex: 1,
//     backgroundColor: '#000000',
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     paddingTop: 20,
//   },
//   title: {
//     fontFamily: 'MontserratSemiBold',
//     fontSize: 24,
//     color: '#FFFFFF',
//     marginBottom: 30,
//     marginTop: 40,
//     marginLeft: -165,
//   },
//   statsContainer: {
//     width: 340,
//     height: 480,
//     borderWidth: 1,
//     borderColor: '#FFFFFF',
//     borderRadius: 12,
//   },
//   averageRatingText: {
//     fontFamily: 'MontserratBold',
//     fontSize: 24,
//     color: '#ffffff',
//     textAlign: 'left',
//     marginLeft: 35,
//     marginTop: 20,
//     marginBottom: 25,
//   },
//   averageRating: {
//     fontFamily: 'MontserratRegular',
//     fontSize: 48,
//     color: '#D45A01',
//     textAlign: 'center',
//   },
//   reviewCount: {
//     fontFamily: 'MontserratRegular',
//     fontSize: 11,
//     color: '#FFFFFF',
//     marginTop: 5,
//     marginBottom: 30,
//     textAlign: 'center',
//   },
//   chartContainer: {
//     width: '100%',
//     marginHorizontal: 41,
//   },
//   xAxisLabelsContainer: {
//     marginTop: 10,
//     alignItems: 'flex-start',
//     marginLeft: -14,
//   },
//   xAxisLabels: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '83%', // Adjust as needed
//     paddingHorizontal: 20, // Adjust as needed
//   },
//   starLabel: {
//     color: '#FFFFFF',
//     fontSize: 10,
//   },
//   navbar: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     width: '100%',
//     height: '10%',
//     backgroundColor: '#000000',
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     borderTopLeftRadius: 12, 
//     borderTopRightRadius: 12,
//   },
//   navbarTab: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   navbarTabSelected: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     color: 'orange',
//   },
//   navbarText: {
//     fontSize: 10,
//     marginTop: 4,
//     color: '#C4C4C4',
//   }
// });

// export default Stats;


import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView , TouchableOpacity, SafeAreaView  } from 'react-native';
import { Svg, Rect, Text as SvgText } from 'react-native-svg';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import {ipAddr} from './ipconfig';
import MonthlyChart from './MonthlyRevenueLine';
import WeeklyChart from './WeeklyRevenueLine'
import BestField from './BestField';

const Stats = ({ navigation, route }) => {

  const { emailProp, currentUser } = route.params;
  const [selectedTab, setSelectedTab] = useState('home');
  const [reviews, setReviews] = useState(null);
  const [avgRating, setAvgRating] = useState(0);
  const [star1Count, setStar1Count] = useState(0);
  const [star2Count, setStar2Count] = useState(0);
  const [star3Count, setStar3Count] = useState(0);
  const [star4Count, setStar4Count] = useState(0);
  const [star5Count, setStar5Count] = useState(0);

  useEffect(() => {
    getReviews();
  }, []); // Fetch reviews when the component mounts

  const getReviews = async () => {
    try {
      const response = await fetch(`http://${ipAddr}:3000/get-reviews?companyEmail=${emailProp}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // Process the fetched reviews data as needed
      setReviews(data)
      // Reset star counts
      setStar1Count(0);
      setStar2Count(0);
      setStar3Count(0);
      setStar4Count(0);
      setStar5Count(0);

      data.forEach(review => {
        // Increment star count based on rating
        switch (review.Rating) {
          case 1:
            setStar1Count(prevCount => prevCount + 1);
            break;
          case 2:
            setStar2Count(prevCount => prevCount + 1);
            break;
          case 3:
            setStar3Count(prevCount => prevCount + 1);
            break;
          case 4:
            setStar4Count(prevCount => prevCount + 1);
            break;
          case 5:
            setStar5Count(prevCount => prevCount + 1);
            break;
          default:
            break;
        }
      });
      if (data.length === 0) {
        setAvgRating(0);
      } else {
        const totalRating = data.reduce((sum, review) => sum + review.Rating, 0);
        const average = totalRating / data.length;
        let temp = parseFloat(average.toFixed(2))
        if (temp > 5)
        {
          temp -= 1
          setAvgRating(temp);
        }
        else
        {
          setAvgRating(temp);
        }
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };
  
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

  if (!loaded) {
    return null;
  }

  const handleTabPress = (tabName) => {

      setSelectedTab(tabName);
  
      switch (tabName) {
        case 'home':
            navigation.navigate('OwnerHomepage', { email: emailProp });
            setSelectedTab('home');
          break;
          case 'list':
            navigation.navigate('OwnerBookings', {
              emailProp: emailProp,
              currentUser: currentUser
            })
            break;
        case 'cart':
          // Navigate to 'OwnerInventory' screen when cart tab is pressed
          navigation.navigate('OwnerInventory', { emailProp: emailProp, currentUser: currentUser });
          break;
        case 'person':
          // Navigate to earnings or other related screen for 'person' tab
          break;
        default:
          // Handle default case or no tab selected
          break;
      }
  };

  const chartHeight = 240;
  const barWidth = 40;
  const barSpacing = 15;
  const maxCount = Math.max(star1Count, star2Count, star3Count, star4Count, star5Count);

  return (
    <View style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>My Statistics</Text>
        <View style={styles.statsContainer}>
            <Text style={styles.averageRatingText}>Average Rating</Text>
            <Text style={styles.averageRating}>{avgRating}</Text>
            <Text style={styles.reviewCount}>{reviews && reviews.length} reviews</Text>
            <View style={styles.chartContainer}>
            <Svg width="100%" height={chartHeight}>
              {[star1Count, star2Count, star3Count, star4Count, star5Count].map((count, index) => {
                const safeMaxCount = Math.max(maxCount, 1);

                const barHeight = (chartHeight * count) / safeMaxCount;
                const barY = chartHeight - barHeight;

                return (
                  <React.Fragment key={index}>
                    <Rect
                      x={(barWidth + barSpacing) * index}
                      y={barY}
                      width={barWidth}
                      height={barHeight}
                      fill={index % 2 === 0 ? '#D45A01' : '#FFFFFF'} // Alternating colors
                      rx={10} 
                    />
                    <SvgText
                      x={(barWidth + barSpacing) * index + barWidth / 2}
                      y={barY + 23} // Adjust the y-coordinate
                      fill="#000000" // Text color
                      fontSize="14"
                      textAnchor="middle"
                    >
                      {count}
                    </SvgText>
                    <SvgText
                      x={(barWidth + barSpacing) * index + barWidth / 2}
                      y={chartHeight + 15}
                      fill="#FFFFFF"
                      fontSize="14"
                      textAnchor="middle"
                    >
                      {`${index + 1} star`}
                    </SvgText>
                  </React.Fragment>
                );
              })}
            </Svg>
            <View style={styles.xAxisLabelsContainer}>
              <View style={styles.xAxisLabels}>
                <Text style={styles.starLabel}>1 star</Text>
                <Text style={styles.starLabel}>2 star</Text>
                <Text style={styles.starLabel}>3 star</Text>
                <Text style={styles.starLabel}>4 star</Text>
                <Text style={styles.starLabel}>5 star</Text>
              </View>

            </View>
            </View>
        </View>
        <MonthlyChart ownerEmail={emailProp} />
        <WeeklyChart ownerEmail={emailProp} />
        <BestField ownerEmail={emailProp} />
        <View style={{ height: 100 }} />
      </ScrollView>
      <View style={styles.navbar}>
        <TouchableOpacity
          style={styles.navbarTab}
          onPress={() => handleTabPress('home')}
        >
          <Ionicons
            name={'home'}
            size={24}
            color={'#7D7D7D'}
          />
          <Text style={styles.navbarText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navbarTab}
          onPress={() => handleTabPress('list')}
        >
          <Ionicons
            name={'calendar'}
            size={24}
            color={'#7D7D7D'}
          />
          <Text style={styles.navbarText}>Bookings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navbarTab}
          onPress={() => handleTabPress('cart')}
        >
          <Ionicons
            name={'cart'}
            size={24}
            color={'#7D7D7D'}
          />
          <Text style={styles.navbarText}>Inventory</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navbarTab}
          onPress={() => handleTabPress('person')}
        >
          <Ionicons
            name={'logo-usd'}
            size={24}
            color={'#D45A01'}
          />
          <Text style={styles.navbarText}>Earnings</Text>
        </TouchableOpacity>
      </View>
    </View>
  
  );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: '#000000',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 20,
        width: '90%'
        },
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  title: {
    fontFamily: 'MontserratSemiBold',
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 30,
    marginTop: 40,
    marginLeft: -165,
  },
  statsContainer: {
    width: 340,
    height: 480,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 12,
  },
  averageRatingText: {
    fontFamily: 'MontserratBold',
    fontSize: 24,
    color: '#ffffff',
    textAlign: 'left',
    marginLeft: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  averageRating: {
    fontFamily: 'MontserratRegular',
    fontSize: 48,
    color: '#D45A01',
    textAlign: 'center',
  },
  reviewCount: {
    fontFamily: 'MontserratRegular',
    fontSize: 11,
    color: '#FFFFFF',
    marginTop: 5,
    marginBottom: 30,
    textAlign: 'center',
  },
  chartContainer: {
    width: '100%',
    marginHorizontal: 41,
  },
  xAxisLabelsContainer: {
    marginTop: 10,
    alignItems: 'flex-start',
    marginLeft: -14,
  },
  xAxisLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '83%', // Adjust as needed
    paddingHorizontal: 20, // Adjust as needed
  },
  starLabel: {
    color: '#FFFFFF',
    fontSize: 10,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: '10%',
    backgroundColor: '#000000',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 12, 
    borderTopRightRadius: 12,
  },
  navbarTab: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  navbarTabSelected: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'orange',
  },
  navbarText: {
    fontSize: 10,
    marginTop: 4,
    color: '#C4C4C4',
  }
});

export default Stats;