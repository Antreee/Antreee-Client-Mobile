import React, { useContext, useEffect, useState } from 'react'
import * as LocalAuthentication from 'expo-local-authentication'

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ActivityIndicator,
} from 'react-native'
import { CartContext } from '../../components/Context'
import styles from '../../../assets/styles/styles'
import { useMutation, useQuery } from '@apollo/client'
import { GET_RESTAURANT_BY_ID } from '../../../config/queries'
import { CREATE_ORDER } from '../../../config/queries'
import { WebView } from 'react-native-webview'
import Color from '../../assets/Color'

import { TextInput, Snackbar, Button } from 'react-native-paper'
import CartListItems from '../../components/CartListItems'
import { RestaurantContext } from '../../components/Context'

function CartScreen({ navigation, route }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [message, setMessage] = useState({ visible: false })
  // const [myPrice, setMyPrice] = useState(0)
  const [
    mutationCreateOrder,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(CREATE_ORDER)
  const { cart, setCart } = useContext(CartContext)
  const { restaurantState, setRestaurantState } = useContext(RestaurantContext)

  const { loading, error, data } = useQuery(GET_RESTAURANT_BY_ID, {
    variables: {
      id: restaurantState.restaurantId,
      itemsByRestaurantIdId2: restaurantState.restaurantId,
    },
  })

  const [facialRecognitionAvailable, setFacialRecognitionAvailable] =
    React.useState(false)
  const [fingerprintAvailable, setFingerprintAvailable] = React.useState(false)
  const [irisAvailable, setIrisAvailable] = React.useState(false)
  const [authLoading, setAuthLoading] = React.useState(false)
  const [result, setResult] = React.useState()

  const checkSupportedAuthentication = async () => {
    const types = await LocalAuthentication.supportedAuthenticationTypesAsync()
    if (types && types.length) {
      setFacialRecognitionAvailable(
        types.includes(
          LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
        )
      )
      setFingerprintAvailable(
        types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)
      )
      setIrisAvailable(
        types.includes(LocalAuthentication.AuthenticationType.IRIS)
      )
    }
  }
  const authenticate = async () => {
    if (authLoading) {
      setAuthLoading(true)
    }
    try {
      const results = await LocalAuthentication.authenticateAsync()

      if (results.success) {
        createOrder()
        setResult('success')
      } else if (results.error === 'unknown') {
        setResult('disabled')
      } else if (
        results.error === 'user_cancel' ||
        results.error === 'system_cancel' ||
        results.error === 'app_cancel'
      ) {
        setResult('cancelled')
      }
    } catch (error) {
      setResult('error')
    }

    setAuthLoading(false)
  }

  React.useEffect(() => {
    checkSupportedAuthentication()
  }, [])

  let resultMessage
  switch (result) {
    case 'cancelled':
      resultMessage = 'Authentication process has been cancelled'
      break
    case 'disabled':
      resultMessage = 'Biometric authentication has been disabled'
      break
    case 'error':
      resultMessage = 'There was an error in authentication'
      break
    case 'success':
      resultMessage = 'Successfully authenticated'
      break
    default:
      resultMessage = ''
      break
  }

  let description
  if (facialRecognitionAvailable && fingerprintAvailable && irisAvailable) {
    description = 'Authenticate with Face ID, touch ID or iris ID'
  } else if (facialRecognitionAvailable && fingerprintAvailable) {
    description = 'Authenticate with Face ID or touch ID'
  } else if (facialRecognitionAvailable && irisAvailable) {
    description = 'Authenticate with Face ID or iris ID'
  } else if (fingerprintAvailable && irisAvailable) {
    description = 'Authenticate with touch ID or iris ID'
  } else if (facialRecognitionAvailable) {
    description = 'Authenticate with Face ID'
  } else if (fingerprintAvailable) {
    description = 'Authenticate with touch ID '
  } else if (irisAvailable) {
    description = 'Authenticate with iris ID'
  } else {
    description = 'No biometric authentication methods available'
  }

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
                source={require('../../assets/imgTemplate/cart.png')}
                style={styles.calendarImg}
              />
            </View>
            <View style={styles.emptyBookText}>
              <Text style={styles.textEmptyBooked}>
                Oops! your cart is empty
              </Text>
              <Text style={styles.textEmptyBookedSub}>
                Please fill your cart to continue.
              </Text>
            </View>
            <TouchableOpacity onPress={goToHome} style={styles.btnBackHome}>
              <Text style={styles.btnBackHomeText}>Buy Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    )
  }

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

  let itemDetail = []
  let myPrice = 0
  Object.keys(cart).forEach((key) => {
    let menuItem = data.itemsByRestaurantId
    menuItem.forEach((elx) => {
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

  function checkInput() {
    if (name === '' || email === '') {
      setMessage({ visible: true })
      setTimeout(() => {
        setMessage({ visible: false })
      }, 2000)
    } else {
      authenticate()
    }
  }

  // ? CREATE ORDER
  function createOrder() {
    mutationCreateOrder({
      variables: {
        customerName: name,
        customerEmail: email,
        customerPhoneNumber: phoneNumber,
        tableNumber: restaurantState.tableNumber,
        totalPrice: myPrice,
        bookingDate: null,
        numberOfPeople: null,
        orderDetails: {
          data: itemDetail.map((item) => {
            return {
              itemId: item.id,
              quantity: item.quantity,
            }
          }),
        },
      },
    })
    setCart({})
  }

  const goToHome = () => navigation.navigate('HomeScreen')
  const width = Dimensions.get('window').width
  if (mutationData) {
    return (
      <WebView
        source={{
          uri: mutationData.createOrder.message,
        }}
        style={{ marginTop: 20, height: 500, width: width }}
      />
    )
  }
  if (mutationLoading) return <Text>'Submitting...'</Text>
  if (mutationError) return <Text>`Submission error! ${error.message}`</Text>

  function currencyFormat(num) {
    return 'Rp.' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  function validate(text) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/
    if (reg.test(text) === false) {
      console.log('Email is Not Correct')
      setEmail(text)
      return false
    } else {
      setEmail(text)
      console.log('Email is Correct')
    }
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
              label='Name'
              value={name}
              mode={'outlined'}
              style={{
                backgroundColor: Color.white,
                height: 30,
                fontSize: 13,
                marginBottom: 3,
              }}
              theme={{ colors: { text: Color.dark, primary: Color.red } }}
              onChangeText={(name) => setName(name)}
            />
            <TextInput
              label='PhoneNumber'
              value={phoneNumber}
              mode={'outlined'}
              style={{
                backgroundColor: Color.white,
                height: 30,
                fontSize: 13,
                marginBottom: 3,
              }}
              theme={{ colors: { text: Color.dark, primary: Color.red } }}
              onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
            />
            <TextInput
              label='Email'
              value={email}
              mode={'outlined'}
              style={{
                backgroundColor: Color.white,
                height: 30,
                fontSize: 13,
                marginTop: 3,
              }}
              theme={{ colors: { text: Color.dark, primary: Color.red } }}
              onChangeText={(email) => {
                setEmail(email)
                validate(email)
              }}
            />
          </View>
          <View style={styles.headCheckout}>
            <Text style={styles.headCheckoutText}>Total Price</Text>
            <Text style={styles.headPriceText}>
              {currencyFormat(myPrice)},-
            </Text>
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
                  itemId={item.id}
                />
              )}
              keyExtractor={(item) => item.id}
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
        <TouchableOpacity style={styles.btnCheckOut} onPress={checkInput}>
          <Text style={styles.btnCheckOutText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

export default CartScreen
