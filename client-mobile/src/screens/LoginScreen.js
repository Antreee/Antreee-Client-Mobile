import React, { Component, useState, useDispatch, useNavigate } from 'react'
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'

function TabScreenTwo({ navigation }) {
  const [input, setInput] = React.useState({
    email: '',
    password: '',
  })

  function handleChange(event) {
    const { name, value } = event.target

    setInput(() => {
      return {
        ...input,
        [name]: value,
      }
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    let data = await axios.post(
      'http://localhost:4000/customers/login',
      loginData
    )

    //Set local storage with accessToken
    //Navigate to homepage/cart
  }

  return (
    <View style={styles.container}>
      <form className='form' onSubmit={handleSubmit}>
        <input
          value={input.email}
          onChange={handleChange}
          type='email'
          className='email form-control'
          placeholder='Email Address'
          name='email'
          required
        />
        <input
          value={input.password}
          onChange={handleChange}
          type='password'
          className='password form-control'
          placeholder='Password'
          name='password'
          required
        />
        <button
          type='submit'
          className='btn btn-lg col-12'
          style={{ color: '#f5ebdc' }}
        >
          Log in
        </button>
      </form>
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
