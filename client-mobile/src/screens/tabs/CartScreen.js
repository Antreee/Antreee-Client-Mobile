import { useContext, useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, Dimensions, FlatList, ActivityIndicator } from 'react-native'
import { CartContext } from '../../components/Context'
import styles from '../../../assets/styles/styles'
import { useMutation, useQuery } from '@apollo/client'
import { GET_RESTAURANT_BY_ID } from '../../../config/queries'
import { CREATE_ORDER } from '../../../config/queries'
import { WebView } from 'react-native-webview'
import Color from '../../assets/Color'


import { TextInput, Snackbar, Button } from 'react-native-paper';
import CartListItems from '../../components/CartListItems'

function CartScreen({ navigation, route }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState({ visible: false });
  // const [myPrice, setMyPrice] = useState(0)
  const [mutationCreateOrder, { data: mutationData, loading: mutationLoading, error: mutationError }] = useMutation(CREATE_ORDER)
  const { cart, setCart } = useContext(CartContext)
  const { id, tableNumber } = route.params ? route.params : { id: null, tableNumber: null }

  const { loading, error, data } = useQuery(GET_RESTAURANT_BY_ID, {
    variables: { id, itemsByRestaurantIdId2: id },
  })
  // const [itemDetail, setItemDetail] = useState([])

  // useEffect(() => {
  //   if (data) {
  //     let tmp = []
  //     let tmpPrice = 0
  //     Object.keys(cart).forEach(key => {
  //       let menuItem = data.itemsByRestaurantId
  //       menuItem.forEach(elx => {
  //         if (elx._id === key) {
  //           tmpPrice += elx.price * cart[key]
  //           tmp.push(
  //             {
  //               id: key,
  //               name: elx.name,
  //               price: elx.price,
  //               quantity: cart[key],
  //               description: elx.description,
  //               image: elx.imageUrl,
  //             }
  //           )
  //         }
  //       })
  //     })
  //     setItemDetail(tmp)
  //     setMyPrice(tmpPrice)
  //   }
  // }, [data])

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

  let itemDetail = []
  let myPrice = 0
  Object.keys(cart).forEach(key => {

    let menuItem = data.itemsByRestaurantId
    menuItem.forEach((elx) => {
      if (elx._id === key) {
        myPrice += elx.price * cart[key]
        itemDetail.push(
          {
            id: key,
            name: elx.name,
            price: elx.price,
            quantity: cart[key],
            description: elx.description,
            image: elx.imageUrl,
          }
        )
      }
    })
  })

  // ? CREATE ORDER
  function createOrder() {
    if (name === '' || email === '') {
      setMessage({ visible: true })
      setTimeout(() => { setMessage({ visible: false }) }, 2000)
    } else {
      // const cartContext = useContext(cart)
      mutationCreateOrder({
        //1. nama, email, belum dinamis <==
        variables: {
          customerName: name,
          customerEmail: email,
          tableNumber: tableNumber,
          totalPrice: 55000,
          bookingDate: null,
          numberOfPeople: null,
          orderDetails: {
            data: [
              {
                itemId: '625932ad9cca7a6a8c90133a',
                quantity: 2,
              },
              {
                itemId: '6259334fe01676bc8c826d93',
                quantity: 3,
              },
            ],
          },
        },
      })
      // setCart({})
    }
  }

  const goToHome = () => navigation.navigate('HomeScreen')
  if (error) {
    return (
      <>
        <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
          <View style={styles.emptyBook}>
            <View style={styles.calendar}>
              <Image
                source={require('../../assets/imgTemplate/cart.png')}
                style={styles.calendarImg}
              />
            </View>
            <View style={styles.emptyBookText}>
              <Text style={styles.textEmptyBooked}>Oops! your cart is empty</Text>
              <Text style={styles.textEmptyBookedSub}>Please fill your cart to continue.</Text>
            </View>
            <TouchableOpacity onPress={goToHome} style={styles.btnBackHome}>
              <Text style={styles.btnBackHomeText}>Buy Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    )
  }
  // ======

  // -================
  const width = Dimensions.get("window").width
  if (mutationData) {
    // return (
    // <WebView
    //   source={{
    //     uri: mutationData.createOrder.message,
    //   }}
    //   style={{ marginTop: 20, height: 500, width: width }}
    // />
    // )
  }
  if (mutationLoading) return <Text>'Submitting...'</Text>
  if (mutationError) return <Text>`Submission error! ${error.message}`</Text>
  // =================


  // ================
  // let itemDetail = []
  // Object.keys(cart).forEach(key => {
  //   let menuItem = data.itemsByRestaurantId
  //   menuItem.forEach(elx => {
  //     if (elx._id === key) {
  //       itemDetail.push(
  //         {
  //           id: elx._id,
  //           name: elx.name,
  //           price: elx.price,
  //           quantity: cart[key],
  //           description: elx.description,
  //           image: elx.imageUrl,
  //         }
  //       )
  //     }
  //   })
  // })



  function currencyFormat(num) {
    return 'Rp.' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
  return (
    <>
      <View style={styles.container}>
        <View style={styles.cartTitle}>
          <Text style={styles.cartTitleText}>My Cart</Text>
        </View>
        <View style={styles.checkOut}>
          <View style={styles.formInputCart}>
            <TextInput
              label="Name"
              value={email}
              mode={'outlined'}
              style={{ backgroundColor: Color.white, height: 30, fontSize: 13, marginBottom: 3 }}
              theme={{ colors: { text: Color.dark, primary: Color.red } }}
              onChangeText={email => setEmail(email)}
            />
            <TextInput
              label="Email"
              value={name}
              mode={'outlined'}
              style={{ backgroundColor: Color.white, height: 30, fontSize: 13, marginTop: 3 }}
              theme={{ colors: { text: Color.dark, primary: Color.red } }}
              onChangeText={name => setName(name)}
            />
          </View>
          <View style={styles.headCheckout}>
            <Text style={styles.headCheckoutText}>Total Price</Text>
            <Text style={styles.headPriceText}>{currencyFormat(myPrice)},-</Text>
          </View>
        </View>
        <View>
          <View style={{ height: 380, marginBottom: 15 }}>
            <FlatList
              data={itemDetail}
              renderItem={({ item }) => (
                <CartListItems
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  description={item.description}
                  image={item.image}
                  itemId={id}
                />
              )}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
        <View>
          <Snackbar
            visible={message.visible}
            onDismiss={() => setMessage({ visible: false })}
            action={{
              label: 'X',
            }}
          >
            Name/Email is required.
          </Snackbar>
        </View>
        <TouchableOpacity
          style={styles.btnCheckOut}
          onPress={createOrder}
        >
          <Text style={styles.btnCheckOutText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

export default CartScreen
