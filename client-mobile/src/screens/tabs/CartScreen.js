import { useContext } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { CartContext } from '../../components/Context'
import styles from '../../../assets/styles/styles'
import { useQuery } from '@apollo/client'
import { GET_RESTAURANT_BY_ID } from '../../../config/queries'

function CartScreen({ navigation, route }) {
  const { cart } = useContext(CartContext)

  const { id, tableNumber } = route.params
  const { loading, error, data } = useQuery(GET_RESTAURANT_BY_ID, {
    variables: { id, itemsByRestaurantIdId2: id },
  })

  let itemDetail = []
  Object.keys(cart).forEach((key) => {
    let menuItem = data.itemsByRestaurantId
    menuItem.forEach((elx) => {
      if (elx._id === key) {
        itemDetail.push({
          name: elx.name,
          price: elx.price,
          quantity: cart[key],
          image: elx.imageUrl,
        })
      }
    })
  })

  console.log('🚀 ~ file: CartScreen.js ~ line 29 ~ carts ~ carts', itemDetail)

  return (
    <>
      <View style={styles.container}>
        <View style={styles.cartTitle}>
          <Text style={styles.cartTitleText}>My Cart</Text>
        </View>
        <View style={styles.cartWrap}>
          <View style={styles.imgCartMenu}>
            <Text style={styles.cartMenuText}>Menu</Text>
          </View>
          {itemDetail &&
            itemDetail.map(item, (idx) => {
              return (
                <>
                  <View style={styles.detailCartMenu}>
                    <Text style={styles.cartMenuName}>Menu Name</Text>
                    <Text style={styles.cartMenuNameSub}>Menu Name</Text>
                    <Text style={styles.cartMenuNamePrice}>Rp. 10.000</Text>
                  </View>
                  <View styles={styles.priceCartMenu}>
                    <Text style={styles.priceCartMenuText}>Price</Text>
                  </View>
                </>
              )
            })}
        </View>
        <Text>NewTab 4</Text>
        <View style={styles.cartCard}></View>
        <View style={styles.checkOut}>
          <View style={styles.headCheckout}>
            <Text style={styles.headCheckoutText}>Total Price</Text>
            <Text style={styles.headPriceText}>Rp.10.000</Text>
          </View>
          <TouchableOpacity style={styles.btnCheckOut}>
            <Text style={styles.btnCheckOutText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

export default CartScreen
