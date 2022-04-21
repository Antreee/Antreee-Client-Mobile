import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Image,
  Linking,
} from 'react-native'
import styles from '../../../assets/styles/styles'
import Color from '../../assets/Color'
import Carousel from 'react-native-anchor-carousel'
import { Button, Modal } from 'react-native-paper'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import { useRef, useState, useContext } from 'react'
import CardListMenu from '../../components/CardListMenu'
import { useQuery } from '@apollo/client'
import { GET_RESTAURANT_BY_ID } from '../../../config/queries'

import MyPagination from '../../components/MyPagination'
const INITIAL_INDEX = 0
const { width: windowWidth } = Dimensions.get('window')
import { CartContext } from '../../components/Context'

function RestaurantScreen({ route, navigation }) {
  const { id, tableNumber } = route.params
    ? route.params
    : { id: null, tableNumber: null }


  const carouselRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(INITIAL_INDEX)
  const { cart, setCart } = useContext(CartContext)

  const { loading, error, data } = useQuery(GET_RESTAURANT_BY_ID, {
    variables: { id, itemsByRestaurantIdId2: id },
  })

  if (loading) {
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
  if (error) {
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
                source={require('../../assets/imgTemplate/404.png')}
                style={styles.calendarImg}
              />
            </View>
            <View style={styles.emptyBookText}>
              <Text style={styles.textEmptyBooked}>Oops! Something wrong</Text>
              <Text style={styles.textEmptyBookedSub}>
                Please reload your app or go back to home screen.
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

  const restaurant = data.restaurant
  const carouselImage = data.restaurant?.mainImagesUrl.map((el) => {
    return {
      uri: el,
    }
  })

  const items = data.itemsByRestaurantId
  const myCuisine = data.restaurant?.cuisine.join(', ')
  const able = () => {
    if (restaurant?.available) {
      return (
        <Text style={styles.available}>
          {' '}
          <Text style={styles.availableOpen}>OPEN</Text>{' '}
          {restaurant?.openingHours}
        </Text>
      )
    }
  }

  const foods = data.itemsByRestaurantId?.filter(
    (item) => item.categoryItem === 'food'
  )
  const drinks = data.itemsByRestaurantId?.filter(
    (item) => item.categoryItem === 'drink'
  )
  const snacks = data.itemsByRestaurantId?.filter(
    (item) => item.categoryItem === 'snack'
  )
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

  function goToCartScreen() {
    navigation.navigate('CartScreen', { id, tableNumber })
  }
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

  let itemDetail = []
  let myPrice = 0
  Object.keys(cart).forEach((key) => {
    data.itemsByRestaurantId?.forEach((elx) => {
      if (elx._id === key) {
        myPrice += elx.price * cart[key]
        itemDetail.push({
          id: key,
          name: elx.name,
          price: elx.price,
          quantity: cart[key],
          description: elx.description,
          image: elx.imageUrl,
        })
      }
    })
  })
  function currencyFormat(num) {
    return 'Rp.' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
  const restaurantLong = data.restaurant.location.coordinates[0]
  const restaurantLat = data.restaurant.location.coordinates[1]

  return (
    <>
      {data && (
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.carouselWrap2}>
              <View style={styles.contentWrap2}>
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
                  length={carouselImage?.length}
                />
              </View>
            </View>
            <View style={styles.doubleBtn}>
              <View style={styles.loveAndMap}>
                <TouchableOpacity
                  style={styles.btnMap}
                  onPress={() => {
                    Linking.openURL(`google.navigation:q=${restaurantLat}+${restaurantLong}`)
                  }}
                >
                  <FontAwesome5
                    name='map-marked-alt'
                    size={20}
                    color={'white'}
                  />
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
              <Text style={styles.headTitle}>{restaurant?.name}</Text>
              <Text style={styles.cuisine}>{myCuisine}</Text>
            </View>
            <View style={styles.restaurantAddress}>
              <View style={styles.restaurantAddressIcon}>
                <Entypo name='shop' size={20} color={Color.red} />
              </View>
              <Text style={styles.restaurantAddressText}>
                {restaurant?.address}
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
            <TouchableOpacity
              style={styles.restaurantAvailable2}
              onPress={() => navigation.navigate('BookingScreen', { id })}
            >
              <View style={styles.restaurantAddressIcon}>
                <MaterialCommunityIcons
                  name='text-box-plus-outline'

                  size={20}
                  color={Color.white}
                />
              </View>
              <Text style={styles.btnBookNow}>BOOK NOW</Text>
            </TouchableOpacity>
            <View style={styles.menuListWrap}>
              <View style={styles.lestOfWrap}>
                <CardListMenu
                  key={restaurant?._id}
                  myMenus={myMenus}
                  navigation={navigation}
                  tableNumber={tableNumber}
                  id={restaurant?._id}
                />
              </View>
            </View>
          </ScrollView>
          {tableNumber && Object.keys(cart).length > 0 && (
            <View style={styles.fabRestaurant}>
              <TouchableOpacity
                style={styles.btnAddChart}
                onPress={() => goToCartScreen(id)}
              >
                <View style={styles.textAddChart}>
                  <Text
                    style={{
                      color: Color.white,
                      fontWeight: 'bold',
                      fontSize: 18,
                      paddingHorizontal: 10,
                      backgroundColor: Color.dark,
                      borderRadius: 10,
                    }}
                  >
                    {Object.keys(cart).length}
                  </Text>
                </View>
                <Entypo
                  name='shopping-cart'
                  size={18}
                  color={Color.white}
                  style={{ marginLeft: windowWidth * 0.15 }}
                />
                <Text style={styles.textAddChart}> View Cart</Text>
                <Text
                  style={{
                    color: Color.white,
                    fontWeight: 'bold',
                    fontSize: 15,
                    marginLeft: windowWidth * 0.1,
                  }}
                >
                  {currencyFormat(myPrice)}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </>
  )
}

export default RestaurantScreen

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
    // width: 100,
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    borderColor: 'white',
    elevation: 3,
    padding: 10,
  },
  imageBackground: {
    flex: 2,
    width: 320,
    backgroundColor: '#EBEBEB',
    borderWidth: 5,
    borderColor: 'white',
  },
})
