import { Text, Image, View, TouchableOpacity } from 'react-native'
import styles from '../../../assets/styles/styles'

function BookingScreen({ navigation }) {

  function goBackHome() {
    navigation.navigate('HomeScreen')
  }
  return (
    <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
      <View style={styles.emptyBook}>
        <View style={styles.calendar}>
          <Image
            source={require('../../assets/imgTemplate/calendar.png')}
            style={styles.calendarImg}
          />
        </View>
        <View style={styles.emptyBookText}>
          <Text style={styles.textEmptyBooked}>No Apointment Booked</Text>
          <Text style={styles.textEmptyBookedSub}>You have not booked any apointment yet.</Text>
        </View>
        <TouchableOpacity onPress={goBackHome} style={styles.btnBackHome}>
          <Text style={styles.btnBackHomeText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default BookingScreen
