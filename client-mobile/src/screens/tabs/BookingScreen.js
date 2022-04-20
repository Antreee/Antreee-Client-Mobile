import styles from '../../../assets/styles/styles'
import {
  Text,
  Image,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Platform,
} from 'react-native'
import * as React from 'react'
import { useState, useRef, useEffect } from 'react'
import Color from '../../assets/Color'

import { TextInput } from 'react-native-paper'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import { Modal, Portal, Paragraph, Dialog, Button, Provider, Snackbar, } from 'react-native-paper'
import { CREATE_ORDER } from '../../../config/queries'
import * as ExpoCalendar from 'expo-calendar'
import DateTimePicker from '@react-native-community/datetimepicker'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { useQuery, useMutation } from '@apollo/client'
import { GET_RESTAURANT_BY_ID } from '../../../config/queries'
import MyPagination from '../../components/MyPagination'
import Carousel from 'react-native-anchor-carousel'
import * as Notifications from 'expo-notifications'
import Constants from 'expo-constants'
const INITIAL_INDEX = 0
const { width: windowWidth } = Dimensions.get('window')
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
})

function BookingScreen({ navigation, route }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const carouselRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(INITIAL_INDEX)
  const [portion, setPortion] = useState('')
  const { id } = route.params ? route.params : { id: null }
  const { loading, error, data } = useQuery(GET_RESTAURANT_BY_ID, {
    variables: { id, itemsByRestaurantIdId2: id },
  })
  const [visible, setVisible] = useState(false)
  const [visibleAlert, setVisibleAlert] = useState(false)
  const [
    mutationCreateOrder,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(CREATE_ORDER)
  const [expoCalendarId, setExpoCalendarId] = useState('')

  const [dateNow, setDateNow] = useState(new Date())
  const [mode, setMode] = useState('date')
  const [show, setShow] = useState(false)
  const [textDate, setTextDate] = useState('empty')
  const [textTime, setTextTime] = useState('empty')

  const [selectedTimestamp, setSelectedTimeStamp] = useState('')
  const [selectedHours, setSelectedHours] = useState('')
  const [selectedMinutes, setSelectedMinutes] = useState('')
  const [messageAlert, setMessageAlert] = useState(false)
  const [messageAlertBooking, setMessageAlertBooking] = useState(false)
  const [selectedTime, setSelectedTime] = useState('')
  const [inValidEmailPhone, setInValidEmailPhone] = useState(false)

  useEffect(() => {
    ; (async () => {
      await registerForPushNotificationsAsync()
      const { status } = await ExpoCalendar.requestCalendarPermissionsAsync()
      if (status === 'granted') {
        const calendars = await ExpoCalendar.getCalendarsAsync(
          ExpoCalendar.EntityTypes.EVENT
        )
        let calendarId
        const nuerpayCalendar = calendars.find(
          (cal) => cal.source.name === 'NuerPay'
        )
        if (!nuerpayCalendar) {
          const localCalendar = calendars.find(
            (cal) => cal.accessLevel === 'owner'
          )
          if (!localCalendar) {
            const newCalendarID = await createCalendar()
            calendarId = newCalendarID
          } else {
            calendarId = localCalendar.id
          }
        } else {
          calendarId = nuerpayCalendar.id
        }
        setExpoCalendarId(calendarId)
      }
    })()
  }, [])

  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `Booking at ${data.restaurant.name} has been confirmed!`,
        body: 'Your booking has been added to your calendar',
      },
      trigger: {
        seconds: 2,
      },
    })
  }

  async function registerForPushNotificationsAsync() {
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync()
      let finalStatus = existingStatus
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!')
        return
      }
    } else {
      alert('Must use physical device for Push Notifications')
    }
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      })
    }
  }

  async function createCalendar() {
    const defaultCalendarSource = { isLocalAccount: true, name: 'NuerPay' }
    const newCalendarID = await ExpoCalendar.createCalendarAsync({
      title: 'Booking Events',
      color: '#00FFFF',
      entityType: ExpoCalendar.EntityTypes.EVENT,
      sourceId: defaultCalendarSource.id,
      source: defaultCalendarSource,
      name: 'internalCalendarName',
      ownerAccount: 'personal',
      accessLevel: ExpoCalendar.CalendarAccessLevel.OWNER,
    })
    console.log(`Your new calendar ID is: ${newCalendarID}`)
    return newCalendarID
  }

  async function addEvent() {
    try {
      const startDate = new Date(+selectedTimestamp)
      startDate.setHours(+selectedHours)
      startDate.setMinutes(+selectedMinutes)
      const endDate = new Date(+selectedTimestamp)
      endDate.setHours(+selectedHours + 1)
      endDate.setMinutes(+selectedMinutes)
      const eventId = await ExpoCalendar.createEventAsync(expoCalendarId, {
        title: 'NuerPay Dine-in Appointment',
        notes: `Booked using NuerPay for ${portion} people`,
        location: `${data.restaurant.name}`,
        startDate,
        endDate,
        timeZone: 'Asia/Jakarta',
        alarms: [{ relativeOffset: -180 }],
      })
      console.log(`Event with ID: ${eventId} is created`)
    } catch (error) {
      console.log(error.message)
    }
  }

  if (loading || mutationLoading) {
    return (
      <>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-around',
            padding: 10,
          }}
        >
          <ActivityIndicator size='small' color={Color.red} />
        </View>
      </>
    )
  }
  const goBackHome = () => navigation.navigate('HomeScreen')
  if (mutationData) {
    return (
      <>
        <View
          style={[
            styles.container,
            { alignItems: 'center', justifyContent: 'center' },
          ]}
        >
          <View style={styles.emptyBook}>
            <View style={styles.calendar}>
              <Image
                source={require('../../assets/imgTemplate/cart.png')}
                style={styles.calendarImg}
              />
            </View>
            <View style={styles.emptyBookText}>
              <Text style={styles.textEmptyBooked}>
                Your booking has been confirmed!
              </Text>
              <Text style={styles.textEmptyBookedSub}>
                We have added the booking info to your calendar!
                Thank you for using our services!
              </Text>
            </View>
            <TouchableOpacity onPress={goBackHome} style={styles.btnBackHome}>
              <Text style={styles.btnBackHomeText}>Back Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    )
  }

  if (error || mutationError) {
    return (
      <View
        style={[
          styles.container,
          { alignItems: 'center', justifyContent: 'center' },
        ]}
      >
        <View style={styles.emptyBook}>
          <View style={styles.calendar}>
            <Image
              source={require('../../assets/imgTemplate/calendar.png')}
              style={styles.calendarImg}
            />
          </View>
          <View style={styles.emptyBookText}>
            <Text style={styles.textEmptyBooked}>No Apointment Booked</Text>
            <Text style={styles.textEmptyBookedSub}>
              You have not booked any apointment yet.
            </Text>
          </View>
          <TouchableOpacity onPress={goBackHome} style={styles.btnBackHome}>
            <Text style={styles.btnBackHomeText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)
  const containerStyle = {
    backgroundColor: Color.white,
    padding: 20,
    height: 450,
    width: windowWidth / 1.1,
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }
  if (visible) {
    if (textDate === 'empty' || textDate === 'empty' || portion === '') {
      setMessageAlertBooking(true)
      setTimeout(() => {
        setMessageAlertBooking(false)
      }, 2500)
      hideModal()
    }

    let fDate =
      new Date().getDate() +
      '/' +
      (new Date().getMonth() + 1) +
      '/' +
      new Date().getFullYear()

    let hours =
      new Date().getHours() < 10
        ? `0${new Date().getHours()}`
        : new Date().getHours()
    // console.log(hours, "...", textTime.split(':')[0])

    if (fDate === textDate) {
      if (hours > textTime.split(':')[0]) {
        hideModal()
        console.log('Alert hereeeeeeeeeeee')
        setMessageAlert(true)
        setTimeout(() => {
          setMessageAlert(false)
        }, 2500)
        return
      }
    }

    return (
      <Provider>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            <View
              style={{
                width: windowWidth / 1.1,
                height: 50,
                backgroundColor: Color.red,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{ color: Color.white, fontSize: 15, fontWeight: 'bold' }}
              >
                Input Your Details
              </Text>
            </View>
            <View style={styles.wrapIdentity}>
              {
                inValidEmailPhone && (
                  <Text style={{ color: Color.red }}>*Invalid email/phone number</Text>
                )
              }
              <TextInput
                label='Name'
                value={name}
                mode={'outlined'}
                style={{
                  backgroundColor: Color.white,
                  height: 45,
                  fontSize: 13,
                  marginBottom: 3,
                }}
                theme={{ colors: { text: Color.dark, primary: Color.red } }}
                onChangeText={(name) => setName(name)}
              />
              <TextInput
                label='PhoneNumber'
                value={phoneNumber}
                mode={'outlined'}
                style={{
                  backgroundColor: Color.white,
                  height: 45,
                  fontSize: 13,
                  marginBottom: 3,
                }}
                theme={{ colors: { text: Color.dark, primary: Color.red } }}
                onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
              />
              <TextInput
                label='Email'
                value={email}
                mode={'outlined'}
                style={{
                  backgroundColor: Color.white,
                  height: 45,
                  fontSize: 13,
                  marginTop: 3,
                }}
                theme={{ colors: { text: Color.dark, primary: Color.red } }}
                onChangeText={(email) => {
                  setEmail(email)
                }}
              />
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: Color.red,
                width: 150,
                height: 50,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={async () => {
                try {
                  let checkMail = email.toLowerCase()
                    .match(
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    )
                  let checkPhone = phoneNumber.match(
                    /^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/g
                  )
                  console.log(checkMail === null || checkPhone === null)
                  if (checkMail === null || checkPhone === null) {
                    setInValidEmailPhone(true)
                    setTimeout(() => {
                      setInValidEmailPhone(false)
                    }, 2500)
                    return
                  }
                  mutationCreateOrder({
                    variables: {
                      customerName: name,
                      customerEmail: email,
                      customerPhoneNumber: phoneNumber,
                      bookingDate: `${textDate} ${textTime}`,
                      numberOfPeople: +portion,
                      restaurantId: id,
                    },
                  })
                  await addEvent()
                  await schedulePushNotification()

                } catch (error) {
                  console.log(error)
                }
              }}
            >
              <Text style={{ color: Color.white, fontWeight: 'bold' }}>
                Book Now!
              </Text>
            </TouchableOpacity>
          </Modal>
        </Portal>
      </Provider>
    )
  }

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate
    setShow(Platform.OS === 'ios')
    setDateNow(currentDate)
    let tempDate = new Date(currentDate)
    setSelectedTime(tempDate)
    let fDate =
      tempDate.getDate() +
      '/' +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getFullYear()
    setSelectedTimeStamp(tempDate.getTime())
    setTextDate(fDate)
  }

  const onChangeTime = (event, selectedDate) => {
    const currentDate = selectedDate
    setShow(Platform.OS === 'ios')
    setDateNow(currentDate)
    let tempDate = new Date(currentDate)
    let hours =
      tempDate.getHours() < 10 ? `0${tempDate.getHours()}` : tempDate.getHours()
    let minutes =
      tempDate.getMinutes() < 10
        ? `0${tempDate.getMinutes()}`
        : tempDate.getMinutes()

    let fDateChoose =
      (tempDate.getDate() - 1) +
      '/' +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getFullYear()
    let fDateNow =
      (new Date().getDate()) +
      '/' +
      (new Date().getMonth() + 1) +
      '/' +
      new Date().getFullYear()

    if (fDateChoose === fDateNow) {
      let hoursChoose =
        tempDate.getHours() < 10 ? `0${tempDate.getHours()}` : tempDate.getHours()
      let minutesChoose =
        tempDate.getMinutes() < 10
          ? `0${tempDate.getMinutes()}`
          : tempDate.getMinutes()
      let fTimeChoose = hoursChoose + ':' + minutesChoose
      let hoursNow =
        new Date().getHours() < 10 ? `0${new Date().getHours()}` : new Date().getHours()
      let minutesNow =
        new Date().getMinutes() < 10
          ? `0${new Date().getMinutes()}`
          : new Date().getMinutes()
      let fTimeNow = hoursNow + ':' + minutesNow
      if (fTimeNow > fTimeChoose) {
        setMessageAlert(true)
        setTimeout(() => {
          setMessageAlert(false)
        }, 2500)
        console.log('Mau time traveling bang?')
      }

    }
    let fTime = hours + ':' + minutes
    setSelectedHours(tempDate.getHours())
    setSelectedMinutes(tempDate.getMinutes())
    setTextTime(fTime)
  }

  const showMode = (currentMode) => {
    setShow(true)
    setMode(currentMode)
  }

  function portionBtn(item) {
    if (portion === item) {
      return (
        <TouchableOpacity
          style={[styles.btnPortion, { backgroundColor: Color.red }]}
          mode='contained'
          onPress={() => setPortion(item)}
        >
          <Text
            style={{ fontWeight: 'bold', fontSize: 20, color: Color.white }}
          >
            {item}
          </Text>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity
          style={styles.btnPortion}
          onPress={() => setPortion(item)}
        >
          <Text style={{ fontSize: 20, color: Color.red }}>{item}</Text>
        </TouchableOpacity>
      )
    }
  }
  const restaurant = data.restaurant
  const myCuisine = restaurant.cuisine.join(', ')
  const able = () => {
    if (restaurant.available) {
      return (
        <Text style={styles.available}>
          {' '}
          <Text style={styles.availableOpen}>OPEN</Text>{' '}
          {restaurant.openingHours}
        </Text>
      )
    }
  }

  const date = new Date()
  date.setDate(date.getDate() + 1)
  let todayDate = date.toISOString().slice(0, 10)

  const carouselImage = restaurant.mainImagesUrl.map((el) => {
    return {
      uri: el,
    }
  })
  function handleCarouselScrollEnd(item, index) {
    setCurrentIndex(index)
  }
  function renderItem({ item, index }) {
    const { uri } = item
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={stylex.item}
        onPress={() => {
          carouselRef.current.scrollToIndex(index)
        }}
      >
        <ImageBackground
          source={{ uri: uri }}
          style={stylex.imageBackground}
        ></ImageBackground>
      </TouchableOpacity>
    )
  }

  var minTime = new Date()
  minTime.setHours(10)
  minTime.setMinutes(0)
  minTime.setMilliseconds(0)

  var maxTime = new Date()
  maxTime.setHours(22)
  maxTime.setMinutes(0)
  maxTime.setMilliseconds(0)

  return (
    <View style={styles.containerx}>
      <ScrollView>
        <View style={styles.carouselWrap}>
          <View style={styles.contentWrap}>
            <Carousel
              style={stylex.carousel}
              data={carouselImage}
              renderItem={renderItem}
              itemWidth={windowWidth}
              inActiveOpacity={0.3}
              containerWidth={windowWidth}
              onScrollEnd={handleCarouselScrollEnd}
              ref={carouselRef}
            />
            <MyPagination
              currentIndex={currentIndex}
              length={carouselImage.length}
            />
          </View>
        </View>
        <View style={styles.doubleBtn}>
          <View style={styles.loveAndMap}>
            <TouchableOpacity style={styles.btnMap}>
              <FontAwesome5 name='map-marked-alt' size={20} color={'white'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnLove}>
              <MaterialCommunityIcons
                name='heart-outline'
                size={25}
                color={Color.red}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.headTitleWrap}>
          <Text style={styles.headTitle}>{restaurant.name}</Text>
          <Text style={styles.cuisine}>{myCuisine}</Text>
        </View>
        <View style={styles.restaurantAddress}>
          <View style={styles.restaurantAddressIcon}>
            <Entypo name='shop' size={20} color={Color.red} />
          </View>
          <Text style={styles.restaurantAddressText}>{restaurant.address}</Text>
        </View>
        <View style={styles.restaurantAvailable}>
          <View style={styles.restaurantAddressIcon}>
            <MaterialCommunityIcons
              name='calendar-clock'
              size={20}
              color={Color.red}
            />
          </View>
          {able()}
        </View>
        <View style={styles.dateTimeWrapper}>
          <Text style={styles.textDetailBookingHeader}>BOOKING DETAILS</Text>
        </View>
        <View style={styles.detailInSideWrapper}>
          {
            messageAlert && (
              <Text style={styles.headTitleDetailOrder2}>*Invalid booking time</Text>
            )
          }
          <Text style={styles.headTitleDetailOrder}>Booking Date and Time :</Text>
          <View style={styles.btnWrapperOrder}>
            <TouchableOpacity
              onPress={(_) => showMode('date')}
              style={styles.btnOrderDateTime}
            >
              {textDate === 'empty' ? (
                <Text style={{ color: Color.white, fontWeight: 'bold' }}>
                  SET DATE
                </Text>
              ) : (
                <Text style={{ color: Color.white, fontWeight: 'bold' }}>
                  {textDate}
                </Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={(_) => showMode('time')}
              style={styles.btnOrderDateTime}
            >
              {textTime === 'empty' ? (
                <Text style={{ color: Color.white, fontWeight: 'bold' }}>
                  SET TIME
                </Text>
              ) : (
                <Text style={{ color: Color.white, fontWeight: 'bold' }}>
                  {textTime}
                </Text>
              )}
            </TouchableOpacity>
          </View>
          <Text style={styles.headTitleDetailOrder}>Number of Person :</Text>
          <View style={styles.portionWrapper}>
            <FlatList
              data={[
                {
                  key: '1',
                  id: 1,
                },
                {
                  key: '2',
                  id: 2,
                },
                {
                  key: '3',
                  id: 3,
                },
                {
                  key: '4',
                  id: 4,
                },
                {
                  key: '5',
                  id: 5,
                },
                {
                  key: '6',
                  id: 6,
                },
                {
                  key: '7',
                  id: 7,
                },
                {
                  key: '8',
                  id: 8,
                },
                {
                  key: '9',
                  id: 9,
                },
                {
                  key: '10',
                  id: 10,
                },
                {
                  key: '11',
                  id: 11,
                },
                {
                  key: '12',
                  id: 12,
                },
                {
                  key: '13',
                  id: 13,
                },
                {
                  key: '14',
                  id: 14,
                },
                {
                  key: '15',
                  id: 15,
                },
                {
                  key: '16',
                  id: 16,
                },
                {
                  key: '17',
                  id: 17,
                },
                {
                  key: '18',
                  id: 18,
                },
                {
                  key: '19',
                  id: 19,
                },
                {
                  key: '20',
                  id: 20,
                },
              ]}
              horizontal={true}
              renderItem={({ item }) => portionBtn(item.key)}
              keyExtractor={(item) => item.id}
            />
          </View>
          <View
            style={{
              width: windowWidth / 1.1,
              height: 25,
              flexDirection: 'row',
              alignSelf: 'center',
              marginTop: -15,
              marginBottom: -15,
              justifyContent: 'space-between',
            }}
          >
            <Fontisto name='arrow-left-l' size={30} color={Color.red} />
            <Fontisto name='arrow-right-l' size={30} color={Color.red} />
          </View>
        </View>
        {show && mode === 'date' && (
          <DateTimePicker
            testID='dateTimePicker'
            value={date}
            mode={mode}
            is24Hour={true}
            display='default'
            onChange={onChangeDate}
            minimumDate={new Date()}
          />
        )}
        {show && mode === 'time' && (
          <DateTimePicker
            testID='dateTimePicker'
            value={date}
            mode={mode}
            is24Hour={true}
            display='default'
            onChange={onChangeTime}
            minuteInterval={15}
          />
        )}
        {
          messageAlertBooking && (
            <Text style={{ color: Color.red, alignSelf: 'center' }}>*Please select your booking details</Text>
          )
        }
        <TouchableOpacity style={styles.headerIdentity} onPress={showModal}>
          <Text style={styles.textHeaderCalendar}>
            Enter your details here!
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export default BookingScreen

const stylex = StyleSheet.create({
  container: {
    backgroundColor: '#141518',
    paddingVertical: 20,
  },
  carousel: {
    backgroundColor: 'white',
    aspectRatio: 1.5,
    flexGrow: 0,
  },
  item: {
    borderWidth: 2,
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    borderColor: 'white',
    elevation: 3,
  },
  imageBackground: {
    flex: 2,
    backgroundColor: '#EBEBEB',
    borderWidth: 5,
    borderColor: 'white',
  },
})
