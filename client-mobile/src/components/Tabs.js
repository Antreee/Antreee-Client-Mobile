import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import BookingScreen from '../screens/tabs/BookingScreen'
import QrScanScreen from '../screens/tabs/QrScanScreen'
import CartScreen from '../screens/tabs/CartScreen'
import ProfileScreen from '../screens/tabs/ProfileScreen'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import Color from '../assets/Color'
import Ionicons from 'react-native-vector-icons/Ionicons'
import HomeNavigator from './HomeNavigator'
import { useState } from 'react'

import { CartContext } from './Context'

const Tab = createBottomTabNavigator()

const Tabs = ({ navigation }) => {
  const [cart, setCart] = useState({})

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <Tab.Navigator
        screenOptions={{
          // tabBarShowLabel: false,
          tabBarStyle: {
            height: 50,
            position: 'absolute',
            borderTopLeftRadius: 100,
            borderTopRightRadius: 100,
            backgroundColor: Color.white,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            elevation: 4,
          },
          tabBarActiveTintColor: Color.red,
        }}
      >
        <Tab.Screen
          name='HomeNavigator'
          component={HomeNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name='home' color={color} size={size} />
            ),
            headerTitle: () => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: Color.red,
                  width: '100%',
                  height: 50,
                  borderBottomLeftRadius: 100,
                  borderBottomRightRadius: 100,
                }}
              >
                <Image
                  source={require('../../assets/icons/home.png')}
                  style={{ width: 40, height: 40, marginLeft: 10 }}
                />
              </View>
            ),

            tabBarLabel: 'Home',
          }}
        />
        <Tab.Screen
          name='BookingScreen'
          component={BookingScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name='briefcase' color={color} size={size} />
            ),
            tabBarLabel: 'Booking',
          }}
        />
        <Tab.Screen
          name='QrScanScreen'
          component={QrScanScreen}
          options={({ navigation }) => ({
            tabBarButton: (props) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('QrScanScreen')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: Color.red,
                  width: 55,
                  height: 55,
                  marginTop: -20,
                  borderRadius: 100,
                  borderColor: '#FFFFFF',
                  borderWidth: 2,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.23,
                  shadowRadius: 2.62,
                  elevation: 4,
                }}
              >
                <Image
                  source={require('../../assets/icons/scan.png')}
                  style={{ width: 28, height: 28, tintColor: Color.white }}
                />
              </TouchableOpacity>
            ),
            headerShown: false,
          })}
        />
        <Tab.Screen
          name='CartScreen'
          component={CartScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name='ios-cart' color={color} size={size} />
            ),
            tabBarLabel: 'My Cart',
          }}
        />
        <Tab.Screen
          name='ProfileScreen'
          component={ProfileScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name='person' color={color} size={size} />
            ),
            tabBarLabel: 'Profile',
          }}
        />
      </Tab.Navigator>
    </CartContext.Provider>
  )
}

export default Tabs
