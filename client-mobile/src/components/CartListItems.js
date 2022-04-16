import { View, Text, TouchableOpacity, Image } from "react-native"
import Color from "../assets/Color"
import styles from "../../assets/styles/styles"
import Entypo from 'react-native-vector-icons/Entypo'
import { useContext, useState } from "react"
import { CartContext } from "./Context"


export default function CartListItems({ name, price, quantity, description, image, itemId }) {

   const [qty, setQty] = useState(quantity)


   // const { cart, setCart } = useContext(CartContext)

   function currencyFormat(num) {
      return 'Rp.' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
   }

   function increment(itemId) {
      // if (!cart[itemId]) {
      //    setCart({ ...cart, [itemId]: 1 })
      // } else {
      //    setCart({ ...cart, [itemId]: (cart[itemId] += 1) })
      // }

   }


   function decrement(itemId) {
      // if (cart[itemId] > 0) {
      //    setCart({ ...cart, [itemId]: (cart[itemId] -= 1) })
      //    // console.log(cart)
      // }
   }


   return (
      <View style={styles.cartWrap}>
         <View style={styles.imgCartMenu}>
            <Image
               source={{ uri: image }}
               style={styles.cartMenuText}
            />
         </View>
         <View style={styles.detailCartMenu}>
            <Text style={styles.cartMenuName}>{name}</Text>
            <Text style={styles.cartMenuNameSub}>{description}</Text>
            <Text style={styles.cartMenuNamePrice}>{currencyFormat(price)}</Text>
         </View>
         <View style={styles.detailCartPrice}>
            <Text style={styles.cartMenuQty}>{quantity}</Text>
            <View style={styles.priceUpDown}>
               <TouchableOpacity style={styles.priceMinus}
                  onPress={(id) => decrement(itemId)}
               >
                  <Entypo
                     name='minus'
                     size={20}
                     color={Color.white}
                  />
               </TouchableOpacity>
               <TouchableOpacity style={styles.priceMax}
                  onPress={(id) => increment(itemId)}
               >
                  <Entypo
                     name='plus'
                     size={20}
                     color={Color.white}
                  />
               </TouchableOpacity>
            </View>
         </View>
      </View>
   )
}