import styles from '../../../assets/styles/styles'
import * as LocalAuthentication from 'expo-local-authentication'
import { StyleSheet, Text,Image, TouchableOpacity, View, Button } from 'react-native'
import * as React from 'react'

function BookingScreen({ navigation }) {

//   function goBackHome() {
//     navigation.navigate('HomeScreen')
//   }
//   return (
//     if(data gk ada)
//     <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
//       <View style={styles.emptyBook}>
//         <View style={styles.calendar}>
//           <Image
//             source={require('../../assets/imgTemplate/calendar.png')}
//             style={styles.calendarImg}
//           />
//         </View>
//         <View style={styles.emptyBookText}>
//           <Text style={styles.textEmptyBooked}>No Apointment Booked</Text>
//           <Text style={styles.textEmptyBookedSub}>You have not booked any apointment yet.</Text>
//         </View>
//         <TouchableOpacity onPress={goBackHome} style={styles.btnBackHome}>
//           <Text style={styles.btnBackHomeText}>Book Now</Text>
//         </TouchableOpacity>
//       </View>
//   )
  

  return (
    <View style={{marginTop: 250}}>
      <Text>Booking</Text>
    </View>
  )
}

export default BookingScreen
