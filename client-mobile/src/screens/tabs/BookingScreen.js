import styles from '../../../assets/styles/styles'
import { Text, Image, TouchableOpacity, View, ScrollView, FlatList, ActivityIndicator, StyleSheet, Dimensions, ImageBackground } from 'react-native'
import * as React from 'react'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import Color from '../../assets/Color'
import { TimePicker } from 'react-native-simple-time-picker';
import PortionBtn from '../../components/PortionBtn'
import { TextInput } from 'react-native-paper'

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

import { Button } from 'react-native-paper';
import { useQuery } from '@apollo/client';
import { GET_RESTAURANT_BY_ID } from '../../../config/queries';
import MyPagination from '../../components/MyPagination';
import Carousel from 'react-native-anchor-carousel';
const INITIAL_INDEX = 0;

function BookingScreen({ navigation, route }) {
  const [text, setText] = React.useState("");
  const [selectedHours, setSelectedHours] = React.useState({});
  const [email, setEmail] = React.useState('')
  const [name, setName] = React.useState('')
  const [phoneNumber, setPhoneNumber] = React.useState('')
  const carouselRef = React.useRef(null);
  const [currentIndex, setCurrentIndex] = React.useState(INITIAL_INDEX);
  const { id } = route.params ? route.params : { id: null }
  const { loading, error, data } = useQuery(GET_RESTAURANT_BY_ID, {
    variables: { id, itemsByRestaurantIdId2: id },
  })

  // const [selectedMinutes, setSelectedMinutes] = React.useState(0);
  //   function goBackHome() {
  //     navigation.navigate('HomeScreen')
  //   }
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
  const goBackHome = () => navigation.navigate('HomeScreen')
  if (error) {
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
  // console.log(data)
  const { width: windowWidth } = Dimensions.get('window');

  const restaurant = data.restaurant
  // console.log("🚀 ~ file: RestaurantScreen.js ~ line 50 ~ RestaurantScreen ~ restaurant", restaurant)
  const carouselImage = restaurant.mainImagesUrl.map(el => {
    return {
      uri: el,
    }
  })
  function handleCarouselScrollEnd(item, index) {
    setCurrentIndex(index);
  }
  function renderItem({ item, index }) {
    const { uri } = item;
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={stylex.item}
        onPress={() => {
          carouselRef.current.scrollToIndex(index);
        }}>
        <ImageBackground source={{ uri: uri }} style={stylex.imageBackground}>
        </ImageBackground>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
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
            <MyPagination currentIndex={currentIndex} length={carouselImage.length} />
          </View>
        </View>
        <View style={styles.headerIdentity}>
          <Text style={styles.textHeaderCalendar}>Your Identity</Text>
        </View>
        <View style={styles.wrapIdentity}>
          <TextInput
            label='Name'
            value={name}
            mode={'outlined'}
            style={{
              backgroundColor: Color.white,
              height: 40,
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
              height: 40,
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
              height: 40,
              fontSize: 13,
              marginTop: 3,
            }}
            theme={{ colors: { text: Color.dark, primary: Color.red } }}
            onChangeText={(email) => {
              setEmail(email)
              validate(email)
            }}
          />
        </View>
        <View style={styles.headerCalendar}>
          <Text style={styles.textHeaderCalendar}>Select Date</Text>
        </View>
        <View style={styles.calendarWrapper}>
          <View style={styles.calendarItems}>
            <CalendarList
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
            <Text style={styles.textDateHead}>Select Time</Text>
          </View>
          <TimePicker
            // selectedHours={selectedHours}
            //initial Hourse value
            // selectedMinutes={selectedMinutes}
            minutesInterval={15}
            isAmpm={true}
            itemStyle={styles.timePicker}
            zeroPadding={true}
            defaultValue={{ hours: 9, minutes: 0, ampm: 'am' }}
            //initial Minutes value
            onChange={(hours, minutes) => {
              // console.log(hours, "-+++++")
              setSelectedHours(hours);
              // setSelectedMinutes(minutes);
            }}
          />
        </View>
        <View style={styles.headerCalendar}>
          <Text style={styles.textHeaderCalendar}>Select Portion</Text>
        </View>
        <View style={styles.portionWrapper}>
          <FlatList
            data={[
              { key: '1' },
              { key: '2' },
              { key: '3' },
              { key: '4' },
              { key: '5' },
              { key: '6' },
              { key: '7' },
              { key: '8' },
              { key: '9' },
              { key: '10' },
              { key: '11' },
              { key: '12' },
              { key: '13' },
              { key: '14' },
              { key: '15' },
              { key: '16' },
              { key: '17' },
              { key: '18' },
              { key: '19' },
              { key: '20' },
            ]}
            horizontal={true}
            renderItem={({ item }) => (
              <PortionBtn
                data={item}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>

        {/* {facialRecognitionAvailable || fingerprintAvailable || irisAvailable ? (
          <Button onPress={authenticate} title={'Authenticate'}>
            Authenticate
          </Button>
        ) : null} */}
      </ScrollView >
    </View >
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
});