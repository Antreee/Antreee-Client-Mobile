import React, { Component, useState } from 'react'
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'

function TabScreenTwo({ navigation }) {
  const [cart, setCart] = useState()
  let tempCart = {}

  function increment(menuName) {
    if (!tempCart[menuName]) {
      tempCart[menuName] = 1
    } else {
      tempCart[menuName] += 1
    }
    console.log(tempCart)
  }
  function decrement(menuName) {
    if (tempCart[menuName] > 0) {
      tempCart[menuName] -= 1
      console.log(tempCart)
    }
  }

  function addToCart() {
    setCart(tempCart)
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
        <Text>{tempCart['Nasi Goreng'] ? tempCart['Nasi Goreng'] : 0}</Text>
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
        <Text>{tempCart['Ice tea'] ? tempCart['Ice tea'] : 0}</Text>

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
