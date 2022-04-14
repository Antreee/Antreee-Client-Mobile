import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TabScreen from '../screens/TabScreen'
import TabScreenTwo from '../screens/TabScreenTwo'
import TabScreenThree from '../screens/TabScreenThree'
import TabScreenFour from '../screens/TabScreenFour'
import TabScreenFive from '../screens/TabScreenFive'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import Color from '../assets/Color'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Home from '../screens/Home'
import { createContext, useState } from 'react'
export const CartContext = createContext()

const Tab = createBottomTabNavigator()
const tabBarButton = ({ props }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Color.red,
        width: 65,
        height: 65,
        marginTop: -35,
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
        style={{ width: 38, height: 38, tintColor: Color.white }}
      />
    </TouchableOpacity>
  )
}

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
          name='Home'
          component={Home}
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
          name='TabScreenTwo'
          component={TabScreenTwo}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name='briefcase' color={color} size={size} />
            ),
            tabBarLabel: 'Booking',
            tabBarBadge: 2,
          }}
        />
        <Tab.Screen
          name='TabScreenThree'
          component={TabScreenThree}
          options={({ navigation }) => ({
            tabBarButton: (props) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('TabScreenThree')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: Color.red,
                  width: 65,
                  height: 65,
                  marginTop: -35,
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
                  style={{ width: 38, height: 38, tintColor: Color.white }}
                />
              </TouchableOpacity>
            ),
            headerShown: false,
          })}
        />
        <Tab.Screen
          name='TabScreenFour'
          component={TabScreenFour}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name='ios-heart' color={color} size={size} />
            ),
            tabBarLabel: 'Favourite',
          }}
        />
        <Tab.Screen
          name='TabScreenFive'
          component={TabScreenFive}
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
