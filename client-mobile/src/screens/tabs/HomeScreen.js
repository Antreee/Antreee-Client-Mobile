import React, { useRef, useState } from 'react'
import { Text, View, FlatList, ScrollView, ImageBackground } from 'react-native'
import styles from '../../../assets/styles/styles'
import { Icon } from '@ui-kitten/components'
import { Searchbar } from 'react-native-paper'
import fontStyles from '../../../assets/styles/fontStyles'
import { LinearGradient } from 'expo-linear-gradient'
import Carousel from 'react-native-snap-carousel'
import Color from '../../assets/Color'
import RestaurantCard from '../../components/RestaurantCard'
import { useQuery } from '@apollo/client'
import { GET_RESTAURANTS } from '../../../config/queries'

export default HomeScreen = ({ navigation }) => {
  const { loading, error, data } = useQuery(GET_RESTAURANTS)

  const [searchQuery, setSearchQuery] = useState('')

  let filteredQuery
  if (searchQuery) {
    data.filter()
  }


  const [state, setState] = useState({
    activeIndex: 0,
    carouselItems: [
      {
        title: 'Ayam Bakar',
        text: "D'Raja",
        image: require('../../assets/imgTemplate/img01.jpg'),
      },
      {
        title: 'Sate Kambing',
        text: "D'Raja",
        image: require('../../assets/imgTemplate/img02.jpg'),
      },
      {
        title: 'Sop Kambing',
        text: "D'Raja",
        image: require('../../assets/imgTemplate/img03.jpg'),
      },
      {
        title: 'Coto Makassar',
        text: "D'Raja",
        image: require('../../assets/imgTemplate/img04.jpg'),
      },
      {
        title: 'Ikan Palumara',
        text: "D'Raja",
        image: require('../../assets/imgTemplate/img05.jpg'),
      },
    ],
  })

  function _renderItem({ item, index }) {
    return (
      <View
        style={{
          backgroundColor: 'floralwhite',
          borderRadius: 20,
          height: 200,
        }}
      >
        <ImageBackground
          source={item.image}
          style={{
            flex: 1,
            resizeMode: 'cover',
            justifyContent: 'flex-end',
          }}
          imageStyle={{ borderRadius: 20 }}
        >
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.5)',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottomRightRadius: 20,
              borderBottomLeftRadius: 20,
              paddingBottom: 10,
            }}
          >
            <Text style={{ fontSize: 30, color: Color.light }}>
              {item.title}
            </Text>
            <Text style={{ color: Color.light }}>{item.text}</Text>
          </View>
        </ImageBackground>
      </View>
    )
  }

  let carouselRef = useRef()

  const onChangeSearch = (query) => setSearchQuery(query)

  return (
    <>
      <View style={styles.container}>
        {/* Header */}
        <ScrollView
          contentInsetAdjustmentBehavior='automatic'
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerApp}>
            <LinearGradient
              colors={['#E02401', '#FF8080', 'transparent']}
              style={styles.background}
            />
            <Icon
              name='smiling-face-outline'
              style={styles.appImg}
              fill='#FF8080'
            />
            <Text style={fontStyles.lightFontBold}>ANTRE NGAB</Text>
          </View>
          {/* ======= */}

          {/* SEARCH */}
          <View style={styles.searchWrap}>
            <Searchbar
              placeholder='Search Food'
              onChangeText={onChangeSearch}
              value={searchQuery}
              style={styles.search}
              inputStyle={fontStyles.smallLightFont}
            />
          </View>
          {/* =========== */}
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
                layout={'default'}
                ref={carouselRef}
                data={state.carouselItems}
                sliderWidth={300}
                itemWidth={300}
                renderItem={_renderItem}
                onSnapToItem={(index) =>
                  setState({ ...state, activeIndex: index })
                }
              />
            </View>
          </View>
          {/* =========== */}
          {/* Restaurant Near You */}
          <View style={styles.contentMenuWrap}>
            <View style={styles.titleWrap}>
              <View style={styles.redBox} />
              <View style={styles.contentTitle}>
                <Text style={fontStyles.darkFontBold}>
                  Restaurants Near You
                </Text>
              </View>
            </View>

            {loading && <Text>Loading...</Text>}
            {data && (
              <View style={styles.restoListWrap}>
                <FlatList
                  data={data.restaurants}
                  renderItem={({ item }) => (
                    <RestaurantCard resto={item} key={item._id} navigation={navigation} />
                  )}
                  keyExtractor={(item) => item._id}
                />
              </View>
            )}
          </View>
          {/* ============== */}
        </ScrollView>
      </View>
    </>
  )
}
