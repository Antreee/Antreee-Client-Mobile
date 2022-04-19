import styles from "../../../assets/styles/styles";
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
} from "react-native";
import * as React from "react";
import { useState, useRef, useEffect } from "react";
import Color from "../../assets/Color";

import { TextInput } from "react-native-paper";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import { Modal, Portal, Provider } from "react-native-paper";
import { CREATE_ORDER } from "../../../config/queries";
import * as ExpoCalendar from "expo-calendar";

import DateTimePicker from "@react-native-community/datetimepicker";

import { Button } from "react-native-paper";
import { useQuery, useMutation } from "@apollo/client";
import { GET_RESTAURANT_BY_ID } from "../../../config/queries";
import MyPagination from "../../components/MyPagination";
import Carousel from "react-native-anchor-carousel";
const INITIAL_INDEX = 0;
const { width: windowWidth } = Dimensions.get("window");

function BookingScreen({ navigation, route }) {
  const [selectedDate, setSelectedDate] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(INITIAL_INDEX);
  const [portion, setPortion] = useState("");
  const { id } = route.params ? route.params : { id: null };
  const { loading, error, data } = useQuery(GET_RESTAURANT_BY_ID, {
    variables: { id, itemsByRestaurantIdId2: id },
  });
  const [visible, setVisible] = useState(false);
  const [
    mutationCreateOrder,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(CREATE_ORDER);
  const [expoCalendarId, setExpoCalendarId] = useState("");

  const [dateNow, setDateNow] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [textDate, setTextDate] = useState("empty");
  const [textTime, setTextTime] = useState("empty");
  const [selectedTimestamp, setSelectedTimeStamp] = useState("");
  const [selectedHours, setSelectedHours] = useState("");
  const [selectedMinutes, setSelectedMinutes] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await ExpoCalendar.requestCalendarPermissionsAsync();
      if (status === "granted") {
        const calendars = await ExpoCalendar.getCalendarsAsync(ExpoCalendar.EntityTypes.EVENT);
        let calendarId;
        const nuerpayCalendar = calendars.find((cal) => cal.source.name === "NuerPay");
        if (!nuerpayCalendar) {
          const localCalendar = calendars.find((cal) => cal.accessLevel === "owner");
          if (!localCalendar) {
            const newCalendarID = await createCalendar();
            calendarId = newCalendarID;
          } else {
            calendarId = localCalendar.id;
          }
        } else {
          calendarId = nuerpayCalendar.id;
        }
        console.log(`Here is your Available calendar id: ${calendarId}`);
        setExpoCalendarId(calendarId);
      }
    })();
  }, []);

  async function createCalendar() {
    const defaultCalendarSource = { isLocalAccount: true, name: "NuerPay" };
    const newCalendarID = await ExpoCalendar.createCalendarAsync({
      title: "Booking Events",
      color: "#00FFFF",
      entityType: ExpoCalendar.EntityTypes.EVENT,
      sourceId: defaultCalendarSource.id,
      source: defaultCalendarSource,
      name: "internalCalendarName",
      ownerAccount: "personal",
      accessLevel: ExpoCalendar.CalendarAccessLevel.OWNER,
    });
    console.log(`Your new calendar ID is: ${newCalendarID}`);
    return newCalendarID;
  }

  async function addEvent() {
    try {
      const startDate = new Date(+selectedTimestamp);
      startDate.setHours(+selectedHours);
      startDate.setMinutes(+selectedMinutes);
      const endDate = new Date(+selectedTimestamp);
      endDate.setHours(+selectedHours + 1);
      endDate.setMinutes(+selectedMinutes);
      const eventId = await ExpoCalendar.createEventAsync(expoCalendarId, {
        title: "NuerPay Dine-in Appointment",
        notes: `Booked using NuerPay for ${portion} people`,
        location: `${data.restaurant.name}`,
        startDate,
        endDate,
        timeZone: "Asia/Jakarta",
        alarms: [{ relativeOffset: -180 }],
      });
      console.log(`Event with ID: ${eventId} is created`);
    } catch (error) {
      console.log(error.message);
    }
  }

  if (loading || mutationLoading) {
    return (
      <>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-around",
            padding: 10,
          }}
        >
          <ActivityIndicator size="small" color={Color.red} />
        </View>
      </>
    );
  }
  const goBackHome = () => navigation.navigate("HomeScreen");
  if (mutationData) {
    console.log(mutationData);

    return (
      <>
        <View style={[styles.container, { alignItems: "center", justifyContent: "center" }]}>
          <View style={styles.emptyBook}>
            <View style={styles.calendar}>
              <Image
                source={require("../../assets/imgTemplate/cart.png")}
                style={styles.calendarImg}
              />
            </View>
            <View style={styles.emptyBookText}>
              <Text style={styles.textEmptyBooked}>Your booking has been confirmed!</Text>
              <Text style={styles.textEmptyBookedSub}>Thank you for using our services!</Text>
            </View>
          </View>
        </View>
      </>
    );
  }

  if (error || mutationError) {
    return (
      <View style={[styles.container, { alignItems: "center", justifyContent: "center" }]}>
        <View style={styles.emptyBook}>
          <View style={styles.calendar}>
            <Image
              source={require("../../assets/imgTemplate/calendar.png")}
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
    );
  }

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: Color.white,
    padding: 20,
    height: 400,
    width: windowWidth / 1.1,
    alignSelf: "center",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  };
  if (visible) {
    return (
      <Provider>
        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <View
              style={{
                width: windowWidth / 1.1,
                height: 50,
                backgroundColor: Color.red,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: Color.white, fontSize: 15, fontWeight: "bold" }}>
                Input Your Details
              </Text>
            </View>
            <View style={styles.wrapIdentity}>
              <TextInput
                label="Name"
                value={name}
                mode={"outlined"}
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
                label="PhoneNumber"
                value={phoneNumber}
                mode={"outlined"}
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
                label="Email"
                value={email}
                mode={"outlined"}
                style={{
                  backgroundColor: Color.white,
                  height: 40,
                  fontSize: 13,
                  marginTop: 3,
                }}
                theme={{ colors: { text: Color.dark, primary: Color.red } }}
                onChangeText={(email) => {
                  setEmail(email);
                }}
              />
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: Color.red,
                width: 150,
                height: 50,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={async () => {
                try {
                  mutationCreateOrder({
                    variables: {
                      customerName: name,
                      customerEmail: email,
                      customerPhoneNumber: phoneNumber,
                      bookingDate: `${textDate} ${textTime}`,
                      numberOfPeople: +portion,
                      restaurantId: id,
                    },
                  });
                  await addEvent();
                } catch (error) {
                  console.log(error);
                }
                navigation.navigate("RestaurantScreen");
              }}
            >
              <Text style={{ color: Color.white, fontWeight: "bold" }}>Book Now!</Text>
            </TouchableOpacity>
          </Modal>
        </Portal>
      </Provider>
    );
  }

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || dateNow;
    setShow(Platform.OS === "ios");
    setDateNow(currentDate);
    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate() + "/" + (tempDate.getMonth() + 1) + "/" + tempDate.getFullYear();
    console.log(fDate);
    setSelectedTimeStamp(tempDate.getTime());
    setTextDate(fDate);
  };

  const onChangeTime = (event, selectedDate) => {
    const currentDate = selectedDate || dateNow;
    setShow(Platform.OS === "ios");
    setDateNow(currentDate);
    let tempDate = new Date(currentDate);
    let hours = tempDate.getHours() < 10 ? `0${tempDate.getHours()}` : tempDate.getHours();
    let minutes = tempDate.getMinutes() < 10 ? `0${tempDate.getMinutes()}` : tempDate.getMinutes();
    let fTime = hours + ":" + minutes;
    console.log(fTime);
    setSelectedHours(tempDate.getHours());
    setSelectedMinutes(tempDate.getMinutes());
    setTextTime(fTime);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  function portionBtn(item) {
    if (portion === item) {
      return (
        <TouchableOpacity
          style={[styles.btnPortion, { backgroundColor: Color.red }]}
          mode="contained"
          onPress={() => setPortion(item)}
        >
          <Text style={{ fontWeight: "bold", fontSize: 20, color: Color.white }}>{item}</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity style={styles.btnPortion} onPress={() => setPortion(item)}>
          <Text style={{ fontSize: 20, color: Color.red }}>{item}</Text>
        </TouchableOpacity>
      );
    }
  }
  const restaurant = data.restaurant;
  const myCuisine = restaurant.cuisine.join(", ");
  const able = () => {
    if (restaurant.available) {
      return (
        <Text style={styles.available}>
          {" "}
          <Text style={styles.availableOpen}>OPEN</Text> {restaurant.openingHours}
        </Text>
      );
    }
  };

  const date = new Date();
  date.setDate(date.getDate() + 1);
  let todayDate = date.toISOString().slice(0, 10);

  const carouselImage = restaurant.mainImagesUrl.map((el) => {
    return {
      uri: el,
    };
  });
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
        }}
      >
        <ImageBackground source={{ uri: uri }} style={stylex.imageBackground}></ImageBackground>
      </TouchableOpacity>
    );
  }

  const theDate = {
    [todayDate]: { selected: true, selectedColor: Color.red },
  };
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
            <MyPagination currentIndex={currentIndex} length={carouselImage.length} />
          </View>
        </View>
        <View style={styles.doubleBtn}>
          <View style={styles.loveAndMap}>
            <TouchableOpacity style={styles.btnMap}>
              <FontAwesome5 name="map-marked-alt" size={20} color={"white"} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnLove}>
              <MaterialCommunityIcons name="heart-outline" size={25} color={Color.red} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.headTitleWrap}>
          <Text style={styles.headTitle}>{restaurant.name}</Text>
          <Text style={styles.cuisine}>{myCuisine}</Text>
        </View>
        <View style={styles.restaurantAddress}>
          <View style={styles.restaurantAddressIcon}>
            <Entypo name="shop" size={20} color={Color.red} />
          </View>
          <Text style={styles.restaurantAddressText}>{restaurant.address}</Text>
        </View>
        <View style={styles.restaurantAvailable}>
          <View style={styles.restaurantAddressIcon}>
            <MaterialCommunityIcons name="calendar-clock" size={20} color={Color.red} />
          </View>
          {able()}
        </View>

        <View style={styles.dateTimeWrapper}>
          <Text style={styles.textDetailBookingHeader}>BOOKING DETAILS</Text>
        </View>
        <View style={styles.detailInSideWrapper}>
          <Text style={styles.headTitleDetailOrder}>Order Date and Time :</Text>
          <View style={styles.btnWrapperOrder}>
            <TouchableOpacity onPress={(_) => showMode("date")} style={styles.btnOrderDateTime}>
              {textDate === "empty" ? (
                <Text style={{ color: Color.white, fontWeight: "bold" }}>SET DATE</Text>
              ) : (
                <Text style={{ color: Color.white, fontWeight: "bold" }}>{textDate}</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={(_) => showMode("time")} style={styles.btnOrderDateTime}>
              {textTime === "empty" ? (
                <Text style={{ color: Color.white, fontWeight: "bold" }}>SET TIME</Text>
              ) : (
                <Text style={{ color: Color.white, fontWeight: "bold" }}>{textTime}</Text>
              )}
            </TouchableOpacity>
          </View>
          <Text style={styles.headTitleDetailOrder}>Number of Person :</Text>
          <Text style={{ fontSize: 10, color: Color.red, top: -10 }}>*Slide the box</Text>
          <View style={styles.portionWrapper}>
            <FlatList
              data={[
                { key: "1" },
                { key: "2" },
                { key: "3" },
                { key: "4" },
                { key: "5" },
                { key: "6" },
                { key: "7" },
                { key: "8" },
                { key: "9" },
                { key: "10" },
                { key: "11" },
                { key: "12" },
                { key: "13" },
                { key: "14" },
                { key: "15" },
                { key: "16" },
                { key: "17" },
                { key: "18" },
                { key: "19" },
                { key: "20" },
              ]}
              horizontal={true}
              renderItem={({ item }) => portionBtn(item.key)}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
        {show && mode === "date" && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChangeDate}
          />
        )}
        {show && mode === "time" && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChangeTime}
          />
        )}
        <TouchableOpacity style={styles.headerIdentity} onPress={showModal}>
          <Text style={styles.textHeaderCalendar}>Enter your details here!</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default BookingScreen;

const stylex = StyleSheet.create({
  container: {
    backgroundColor: "#141518",
    paddingVertical: 20,
  },
  carousel: {
    backgroundColor: "white",
    aspectRatio: 1.5,
    flexGrow: 0,
  },
  item: {
    borderWidth: 2,
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    borderColor: "white",
    elevation: 3,
  },
  imageBackground: {
    flex: 2,
    backgroundColor: "#EBEBEB",
    borderWidth: 5,
    borderColor: "white",
  },
});
