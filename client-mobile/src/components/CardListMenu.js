import { useContext } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import styles from '../../assets/styles/styles'
import { CartContext } from './Context'
import Color from '../assets/Color'
import { useMutation } from '@apollo/client'
import { CREATE_ORDER } from '../../config/queries'
import { WebView } from 'react-native-webview'


export default function CardListMenu({ myMenus, navigation, id }) {
   // const [mutationAddToCart, { data, loading, error }] = useMutation(ADD_TO_CART)
   const { cart, setCart } = useContext(CartContext)

// export default function CardListMenu({ myMenus }) {
  // const [mutationCreateOrder, { data, loading, error }] = useMutation(CREATE_ORDER)
  // const { cart, setCart } = useContext(CartContext)


  function currencyFormat(num) {
    return 'Rp.' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  // == CART FUNCTION ==
  function increment(itemId) {
    if (!cart[itemId]) {
      setCart({ ...cart, [itemId]: 1 })
    } else {
      setCart({ ...cart, [itemId]: (cart[itemId] += 1) })
    }
  }


   function decrement(itemId) {
      if (cart[itemId] > 0) {
         setCart({ ...cart, [itemId]: (cart[itemId] -= 1) })
         // console.log(cart)
      }
   }
   function goToCartScreen() {
      // const cartContext = useContext(cart)
      // console.log(cart)
      navigation.navigate('CartScreen', { id })

      // mutationgoToCartScreen({ variables: cart });

      // setCart({})

   }
      //Kirim data cart ke database, untuk diquery di halaman keranjang

//   function decrement(itemId) {
//     if (cart[itemId] > 0) {
//       setCart({ ...cart, [itemId]: (cart[itemId] -= 1) })
//     }
//   }
//   function createOrder() {
//     // const cartContext = useContext(cart)
//     mutationCreateOrder({
//       variables: {
//         customerName: 'Tom',
//         customerPhoneNumber: '012345',
//         tableNumber: 'A-11',
//         totalPrice: 55000,
//         bookingDate: new Date().toString(),
//         numberOfPeople: 10,
//         orderDetails: {
//           data: [
//             {
//               itemId: '625932ad9cca7a6a8c90133a',
//               quantity: 2,
//             },
//             {
//               itemId: '6259334fe01676bc8c826d93',
//               quantity: 3,
//             },
//           ],
//         },
//       },
//     })
//     setCart({})
//     //Kirim data cart ke database, untuk diquery di halaman keranjang

//     //Redirect ke halaman keranjang untuk payment
//     //navigation.navigate('cartScreen')
//   }
//   //  == CART FUNCTION END ==
//   if (data) {
//     return (
//       <WebView
//         source={{
//           uri: data.createOrder.message,
//         }}
//         style={{ marginTop: 20, height: 500, width: 500 }}
//       />
//     )
//   }
//   if (loading) return <Text>'Submitting...'</Text>
//   if (error) return <Text>`Submission error! ${error.message}`</Text>


  return (
    <>
      {myMenus.map((menu, index) => {
        return (
          <>
            <View key={index} style={styles.menuListItem}>
              <Text style={styles.menuCategoryName}>{Object.keys(menu)}</Text>
            </View>
            <View style={styles.listWrapper}>
              {menu[Object.keys(menu)].map((item, index) => {
                return (
                  <View key={index} style={styles.itemListItem}>
                    <Image
                      source={{ uri: item.imageUrl }}
                      style={styles.imgCardMenu}
                    />
                    <View style={styles.itemListItemLeft}>
                      <Text style={styles.itemListItemName}>{item.name}</Text>
                      <Text style={styles.itemListItemPrice}>
                        {currencyFormat(item.price)}
                      </Text>
                    </View>
                    <View style={styles.itemListItemRight}>
                      <Text style={styles.itemListItemDesc}>
                        {item.description}
                      </Text>
                    </View>
                    <View style={styles.orderList}>
                      <View style={styles.groupOrderView}>
                        <TouchableOpacity
                          style={styles.btnOrder}
                          onPress={() => decrement(item._id)}
                        >
                          <Entypo
                            name='squared-minus'
                            size={20}
                            color={Color.red}
                          />
                        </TouchableOpacity>

                        <Text style={styles.itemCounter}>
                          {cart[item._id] ? cart[item._id] : 0}
                        </Text>


                                          <Text style={styles.itemCounter}>{cart[item._id] ? cart[item._id] : 0}</Text>

                                          <TouchableOpacity
                                             style={styles.button}
                                             onPress={() => {
                                                increment(item._id)
                                             }}
                                          >
                                             <Entypo name="squared-plus" size={20} color={Color.red} />
                                          </TouchableOpacity>
                                       </View>
                                       <View style={styles.addChart}>
                                          <TouchableOpacity style={styles.btnAddChart} onPress={() => goToCartScreen(item._id)}>
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
