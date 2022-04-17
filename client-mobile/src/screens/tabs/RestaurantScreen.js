import { View, Text, ScrollView, ActivityIndicator, ImageBackground, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'
import styles from '../../../assets/styles/styles'
import Color from '../../assets/Color'
import Carousel from 'react-native-anchor-carousel';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import { useEffect, useRef, useState } from 'react'

import CardListMenu from '../../components/CardListMenu'
import { useQuery } from '@apollo/client'
import { GET_RESTAURANT_BY_ID } from '../../../config/queries'

import MyPagination from '../../components/MyPagination'
const INITIAL_INDEX = 0;

function RestaurantScreen({ route, navigation }) {
  const { id, tableNumber } = route.params

  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(INITIAL_INDEX);

  const { loading, error, data } = useQuery(GET_RESTAURANT_BY_ID, {
    variables: { id, itemsByRestaurantIdId2: id },
  })
  const { width: windowWidth } = Dimensions.get('window');

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
  if (error) {
    return <Text>error...</Text>
  }

  const restaurant = data.restaurant
  const carouselImage = restaurant.mainImagesUrl.map(el => {
    return {
      uri: el,
    }
  })

  const items = data.itemsByRestaurantId

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

  const foods = items.filter((item) => item.categoryItem === 'food')
  const drinks = items.filter((item) => item.categoryItem === 'drink')
  const snacks = items.filter((item) => item.categoryItem === 'snack')
  const myMenus = [
    {
      Foods: foods,
    },
    {
      Drinks: drinks,
    },
    {
      Snacks: snacks,
    },
  ]


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
  // ======================================================

  return (
    <>
      {data && (
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
            <View style={styles.doubleBtn}>
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
            <View style={styles.headTitleWrap}>
              <Text style={styles.headTitle}>{restaurant.name}</Text>
              <Text style={styles.cuisine}>{myCuisine}</Text>
            </View>
            <View style={styles.restaurantAddress}>
              <View style={styles.restaurantAddressIcon}>
                <Entypo name='shop' size={20} color={Color.red} />
              </View>
              <Text style={styles.restaurantAddressText}>
                {restaurant.address}
              </Text>
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

              {tableNumber && (
                <View>
                  <Text>Table Number: {tableNumber}</Text>
                </View>
              )}
            </View>
            <View style={styles.menuListWrap}>
              <View style={styles.lestOfWrap}>
                <CardListMenu key={restaurant._id} myMenus={myMenus} navigation={navigation} tableNumber={tableNumber} id={restaurant._id} />
              </View>
            </View>
          </ScrollView>
        </View>
      )}
    </>
  )
}

export default RestaurantScreen;

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