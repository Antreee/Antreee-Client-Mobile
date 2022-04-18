import styles from '../../../assets/styles/styles'
import { Text, Image, TouchableOpacity, View, ScrollView, FlatList } from 'react-native'
import * as React from 'react'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import Color from '../../assets/Color'
import { TimePicker } from 'react-native-simple-time-picker';
import PortionBtn from '../../components/PortionBtn'

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

function BookingScreen({ navigation }) {
  const [text, setText] = React.useState("");
  const [selectedHours, setSelectedHours] = React.useState({});
  // const [selectedMinutes, setSelectedMinutes] = React.useState(0);
  console.log(selectedHours)
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
