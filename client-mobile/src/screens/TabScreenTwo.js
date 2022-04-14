import React, { createContext, useContext, useState } from 'react'
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import { CartContext } from '../components/Tabs'

function TabScreenTwo({ navigation }) {
  const {cart, setCart} = useContext(CartContext)

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

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Text>Nasi Goreng</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => decrement('Nasi Goreng')}
        >
          <Text>-</Text>
        </TouchableOpacity>
        <Text>{cart['Nasi Goreng'] ? cart['Nasi Goreng'] : 0}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            increment('Nasi Goreng')
          }}
        >
          <Text>+</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text>Ice tea</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => decrement('Ice tea')}
        >
          <Text>-</Text>
        </TouchableOpacity>
        <Text>{cart['Ice tea'] ? cart['Ice tea'] : 0}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => increment('Ice tea')}
        >
          <Text>+</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity style={styles.button} onPress={() => addToCart}>
          <Text>Add to cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10,
    marginHorizontal: 10,
  },
})

export default TabScreenTwo
