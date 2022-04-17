import styles from '../../../assets/styles/styles'
import * as LocalAuthentication from 'expo-local-authentication'
import { StyleSheet, Text, Image, TouchableOpacity, View, Button, ScrollView } from 'react-native'
import * as React from 'react'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import Color from '../../assets/Color'

LocaleConfig.locales['en'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'Jun',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  monthNamesShort: ['Jan', 'Feb', 'Marc', 'April', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  today: "Aujourd'hui"
};
LocaleConfig.defaultLocale = 'en';

import { TextInput } from 'react-native-paper';

function BookingScreen({ navigation }) {
  const [text, setText] = React.useState("");

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
  const [facialRecognitionAvailable, setFacialRecognitionAvailable] =
    React.useState(false)
  const [fingerprintAvailable, setFingerprintAvailable] = React.useState(false)
  const [irisAvailable, setIrisAvailable] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [result, setResult] = React.useState()

  const checkSupportedAuthentication = async () => {
    const types = await LocalAuthentication.supportedAuthenticationTypesAsync()
    if (types && types.length) {
      setFacialRecognitionAvailable(
        types.includes(
          LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
        )
      )
      setFingerprintAvailable(
        types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)
      )
      setIrisAvailable(
        types.includes(LocalAuthentication.AuthenticationType.IRIS)
      )
    }
  }
  const authenticate = async () => {
    if (loading) {
      return (
        <>
          <View style={{
            flex: 1,
            justifyContent: "center", alignItems: 'center', flexDirection: "row",
            justifyContent: "space-around",
            padding: 10
          }}>
            <ActivityIndicator size="small" color={Color.red} />
          </View>
        </>
      )
    }

    setLoading(true)

    try {
      const results = await LocalAuthentication.authenticateAsync()

      if (results.success) {
        setResult('success')
      } else if (results.error === 'unknown') {
        setResult('disabled')
      } else if (
        results.error === 'user_cancel' ||
        results.error === 'system_cancel' ||
        results.error === 'app_cancel'
      ) {
        setResult('cancelled')
      }
    } catch (error) {
      setResult('error')
    }

    setLoading(false)
  }

  React.useEffect(() => {
    checkSupportedAuthentication()
  }, [])

  let resultMessage
  switch (result) {
    case 'cancelled':
      resultMessage = 'Authentication process has been cancelled'
      break
    case 'disabled':
      resultMessage = 'Biometric authentication has been disabled'
      break
    case 'error':
      resultMessage = 'There was an error in authentication'
      break
    case 'success':
      resultMessage = 'Successfully authenticated'
      break
    default:
      resultMessage = ''
      break
  }

  let description;
  if (facialRecognitionAvailable && fingerprintAvailable && irisAvailable) {
    description = 'Authenticate with Face ID, touch ID or iris ID'
  } else if (facialRecognitionAvailable && fingerprintAvailable) {
    description = 'Authenticate with Face ID or touch ID'
  } else if (facialRecognitionAvailable && irisAvailable) {
    description = 'Authenticate with Face ID or iris ID'
  } else if (fingerprintAvailable && irisAvailable) {
    description = 'Authenticate with touch ID or iris ID'
  } else if (facialRecognitionAvailable) {
    description = 'Authenticate with Face ID'
  } else if (fingerprintAvailable) {
    description = 'Authenticate with touch ID '
  } else if (irisAvailable) {
    description = 'Authenticate with iris ID'
  } else {
    description = 'No biometric authentication methods available'
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.carouselWrap}>
          <View style={styles.contentWrap}>
            {/* <Carousel
                  style={stylex.carousel}
                  data={carouselImage}
                  renderItem={renderItem}
                  itemWidth={windowWidth}
                  inActiveOpacity={0.3}
                  containerWidth={windowWidth}
                  onScrollEnd={handleCarouselScrollEnd}
                  ref={carouselRef}
                />
                <MyPagination currentIndex={currentIndex} length={carouselImage.length} /> */}
          </View>
        </View>
        <View style={styles.headerCalendar}>
          <Text style={styles.textHeaderCalendar}>Select Date</Text>
        </View>
        <View style={styles.calendarWrapper}>
          <View style={styles.calendarItems}>
            <CalendarList
              // style={[styles.calendar, { height: 300 }]}
              current={'2022-03-01'}
              minDate={'2022-03-01'}
              // Callback which gets executed when visible months change in scroll view. Default = undefined
              onVisibleMonthsChange={(months) => { console.log('now these months are visible', months); }}
              // Max amount of months allowed to scroll to the past. Default = 50
              pastScrollRange={40}
              // Max amount of months allowed to scroll to the future. Default = 50
              futureScrollRange={50}
              // Enable or disable scrolling of calendar list
              scrollEnabled={true}
              firstDay={1}
              horizontal={true}
              hideArrows={false}
              pagingEnabled={true}
              // calendarWidth={320}
              onDayPress={day => {
                console.log('selected day', day);
              }}
              // Enable or disable vertical scroll indicator. Default = false
              showScrollIndicator={true}
              calendarParams
            />
          </View>
        </View>
        <View style={styles.headerCalendar}>
          <Text style={styles.textHeaderCalendar}>Select Time</Text>
        </View>
        <View style={styles.dateWrapper}>
          <View style={styles.dateItemsHead}>
            <Text style={styles.textDateHead}>Enter Time</Text>
          </View>
          <View style={styles.dateItemsTime}>
            <TextInput
              style={styles.timeHour}
              value={text}
              theme={{ colors: { text: Color.dark, primary: Color.red } }}
              onChangeText={text => setText(text)}
            />
            <TextInput
              style={styles.timeSecond}
              value={text}
              theme={{ colors: { text: Color.dark, primary: Color.red } }}
              onChangeText={text => setText(text)}
            />
            <View style={styles.timeAmPm}>
              <View style={styles.timeAm}></View>
              <View style={styles.timePm}></View>
            </View>
          </View>
          <View style={styles.dateItemsFooter}>
            <View style={styles.timeFooterIcon}></View>
            <Text style={styles.timeFooterIcon}>Time</Text>
            <Text style={styles.timeFooterIcon}>Cancle</Text>
            <Text style={styles.timeFooterIcon}>Reset</Text>
            <Text style={styles.timeFooterIcon}>OK</Text>
          </View>
        </View>
        <Text>{description}</Text>
        {facialRecognitionAvailable || fingerprintAvailable || irisAvailable ? (
          <Button onPress={authenticate} title={'Authenticate'}>
            Authenticate
          </Button>
        ) : null}
        {resultMessage ? <Text>{resultMessage}</Text> : null}
      </ScrollView>
    </View>
  )
}

export default BookingScreen
