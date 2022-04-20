import React, { useRef, useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import styles from "../../../assets/styles/styles";
import { Icon } from "@ui-kitten/components";
import { Searchbar } from "react-native-paper";
import fontStyles from "../../../assets/styles/fontStyles";
import Carousel from "react-native-snap-carousel";
import Color from "../../assets/Color";
import RestaurantCard from "../../components/RestaurantCard";
import { useQuery } from "@apollo/client";
import { GET_RESTAURANTS } from "../../../config/queries";
import { animatedStyles, scrollInterpolator } from "../../components/animations";
import * as Location from "expo-location";

export default HomeScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const { loading, error, data, refetch } = useQuery(GET_RESTAURANTS, {
    variables: {
      stringCoordinates: location
        ? `${location.coords.longitude},${location.coords.latitude}`
        : "106.82710988104893,-6.1752963962989424",
      search: "",
    },
  });

  const [state, setState] = useState({
    activeIndex: 2,
    carouselItems: [
      {
        title: "Chicken Wings",
        image: require("../../assets/imgTemplate/img01.png"),
      },
      {
        title: "Chicken & Corn Soup",
        image: require("../../assets/imgTemplate/img02.png"),
      },
      {
        title: "Taro, Peach, Lychee Tea",
        image: require("../../assets/imgTemplate/img03.png"),
      },
      {
        title: "Choco Lava",
        image: require("../../assets/imgTemplate/img04.png"),
      },
      {
        title: "Hamburg Steak with Egg",
        image: require("../../assets/imgTemplate/img05.png"),
      },
      {
        title: "Curry Beef Pepper Rice with Cheese",
        image: require("../../assets/imgTemplate/img06.png"),
      },
      {
        title: "Tira Miss U",
        image: require("../../assets/imgTemplate/img07.png"),
      },
      {
        title: "Donuts Selection",
        image: require("../../assets/imgTemplate/img08.png"),
      },
    ],
  });

  function _renderItem({ item, index }) {
    return (
      <View
        style={{
          backgroundColor: "floralwhite",
          borderRadius: 20,
          height: 200,
          width: Dimensions.get("window").width - 125,
        }}
      >
        <ImageBackground
          source={item.image}
          style={{
            flex: 1,
            resizeMode: "cover",
            justifyContent: "flex-end",
          }}
          imageStyle={{ borderRadius: 20 }}
        >
          <View
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottomRightRadius: 20,
              borderBottomLeftRadius: 20,
              paddingBottom: 10,
            }}
          >
            <Text style={{ fontSize: 30, color: Color.light }}>{item.title}</Text>
            <Text style={{ color: Color.light }}>{item.text}</Text>
          </View>
        </ImageBackground>
      </View>
    );
  }

  let carouselRef = useRef();
  const width = Dimensions.get("window").width;

  return (
    <>
      <View style={styles.container}>
        {/* Header */}
        <ScrollView>
          <View style={styles.headerApp}>
            <View style={styles.headerApp2}>
              <Image source={require("../../assets/logo.png")} />
            </View>
            {/* SEARCH */}
            <View style={styles.searchWrap}>
              <Searchbar
                placeholder="Search in NuerPay"
                onChangeText={(value) =>
                  refetch({
                    stringCoordinates: location
                      ? `${location.coords.longitude},${location.coords.latitude}`
                      : "106.82710988104893,-6.1752963962989424",
                    search: value,
                  })
                }
                style={styles.search}
                inputStyle={fontStyles.smallLightFont}
              />
            </View>
            {/* =========== */}
          </View>

          {/* ======= */}

          {/* Carosel */}
          <View style={styles.contentWrap}>
            <View style={styles.titleWrap}>
              <View style={styles.redBox} />
              <View style={styles.contentTitle}>
                <Text style={fontStyles.darkFontBold}>Featured</Text>
              </View>
            </View>
            <View style={styles.carouselWrap}>
              <Carousel
                layout={"default"}
                ref={carouselRef}
                data={state.carouselItems}
                sliderWidth={width}
                itemWidth={width - 90}
                useScrollView={true}
                scrollInterpolator={scrollInterpolator}
                slideInterpolatedStyle={animatedStyles}
                inactiveSlideShift={0}
                renderItem={_renderItem}
                onSnapToItem={(index) => setState({ ...state, activeIndex: index })}
              />
            </View>
          </View>
          {/* =========== */}
          {/* Restaurant Near You */}
          <View style={styles.contentMenuWrap}>
            <View style={styles.titleWrap}>
              <View style={styles.redBox} />
              <View style={styles.contentTitle}>
                <Text style={fontStyles.darkFontBold}>Restaurants Near You</Text>
              </View>
            </View>
            {loading && (
              <>
                <View
                  style={{
                    height: 40,
                  }}
                >
                  <ActivityIndicator size="small" color={Color.red} />
                </View>
              </>
            )}
            {data &&
              data.restaurants.map((el) => {
                return <RestaurantCard key={el._id} resto={el} navigation={navigation} />;
              })}
          </View>
          {/* ============== */}
        </ScrollView>
      </View>
    </>
  );
};
