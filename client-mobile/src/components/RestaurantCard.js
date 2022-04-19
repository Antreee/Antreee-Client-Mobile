import { TouchableOpacity, View, Text, Image } from 'react-native'
import homeStyles from '../../assets/styles/homeStyles'
import fontStyles from '../../assets/styles/fontStyles'
import { Badge } from 'react-native-paper';
export default function RestaurantCard({ resto, navigation }) {
  function doDetail(id) {
    navigation.navigate('RestaurantScreen', { id })
  }
  console.log(resto.name)

  return (
    <>
      <TouchableOpacity
        style={homeStyles.mainCard}
        onPress={() => doDetail(resto._id)}
      >
        <View style={homeStyles.cardImg}>
          <Image style={homeStyles.imgStyle} source={{ uri: resto.logoUrl }} />
        </View>
        <View style={homeStyles.cardDsc}>
          <Text style={fontStyles.cardRestoTitle}>{resto.name}</Text>
          <Badge style={resto.name === 'J.CO Donuts & Coffee Ringroad City Walk' ?
            fontStyles.cardDistance2 : fontStyles.cardDistance}>
            {(resto.restaurantDistance / 1000).toFixed(1) + ' km'}
          </Badge>
          <Text style={fontStyles.cardRestoAddress}>{resto.address}</Text>
          <Text style={fontStyles.cardRestoNation}>
            {resto.cuisine.join(', ')}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  )
}
