import { useContext } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import styles from '../../assets/styles/styles'
import { CartContext } from './Tabs'
import Color from '../assets/Color';

export default function CardListMenu({ myMenus }) {
   const { cart, setCart } = useContext(CartContext)

   function currencyFormat(num) {
      return 'Rp.' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
   }

   // == CART FUNCTION ==
   function increment(menuName) {
      if (!cart[menuName]) {
         setCart({ ...cart, [menuName]: 1 })
      } else {
         setCart({ ...cart, [menuName]: (cart[menuName] += 1) })
      }
      console.log(cart)
   }

   function decrement(menuName) {
      if (cart[menuName] > 0) {
         setCart({ ...cart, [menuName]: (cart[menuName] -= 1) })
         console.log(cart)
      }
   }
   function addToCart() {
      const cartContext = useContext(cart)
      console.log(cart)
      //Kirim data cart ke database, untuk diquery di halaman keranjang

      //Redirect ke halaman keranjang untuk payment
      //navigation.navigate('cartScreen')
   }
   //  == CART FUNCTION END ==

   return (
      <>
         {
            myMenus.map((menu, index) => {
               return (
                  <>
                     <View key={index} style={styles.menuListItem}>
                        <Text style={styles.menuCategoryName}>{Object.keys(menu)}</Text>
                     </View>
                     <View style={styles.listWrapper}>
                        {
                           menu[Object.keys(menu)].map((item, index) => {
                              return (
                                 <View key={index} style={styles.itemListItem}>
                                    <Image source={{ uri: item.imagesUrl }} style={styles.imgCardMenu} />
                                    <View style={styles.itemListItemLeft}>
                                       <Text style={styles.itemListItemName}>{item.name}</Text>
                                       <Text style={styles.itemListItemPrice}>{
                                          currencyFormat(item.price)
                                       }</Text>
                                    </View>
                                    <View style={styles.itemListItemRight}>
                                       <Text style={styles.itemListItemDesc}>{item.description}</Text>
                                    </View>
                                    <View style={styles.orderList}>
                                       <View style={styles.groupOrderView}>
                                          <TouchableOpacity
                                             style={styles.btnOrder}
                                             onPress={() => decrement(item.name)}
                                          >
                                             <Entypo name="squared-minus" size={20} color={Color.red} />
                                          </TouchableOpacity>

                                          <Text style={styles.itemCounter}>{cart[item.name] ? cart[item.name] : 0}</Text>

                                          <TouchableOpacity
                                             style={styles.button}
                                             onPress={() => {
                                                increment(item.name)
                                             }}
                                          >
                                             <Entypo name="squared-plus" size={20} color={Color.red} />
                                          </TouchableOpacity>
                                       </View>
                                       <View style={styles.addChart}>
                                          <TouchableOpacity style={styles.btnAddChart} onPress={() => addToCart}>
                                             <Entypo name="shopping-cart" size={15} color={Color.white} />
                                             <Text style={styles.textAddChart}>Add</Text>
                                          </TouchableOpacity>
                                       </View>
                                    </View>
                                 </View>
                              )
                           }
                           )
                        }
                     </View>
                  </>
               )
            }
            )
         }
      </>
   )

}