import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import QrScanScreen from '../screens/tabs/QrScanScreen'
import ProfileScreen from '../screens/tabs/ProfileScreen'
import { View, Image, TouchableOpacity } from 'react-native'
import Color from '../assets/Color'
import Ionicons from 'react-native-vector-icons/Ionicons'
import HomeNavigator from './HomeNavigator'

const Tab = createBottomTabNavigator()

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
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
        name='QrScanScreen'
        component={QrScanScreen}
        options={({ navigation }) => ({
          tabBarButton: () => (
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
          unmountOnBlur: true,
          headerShown: false,
        })}
      />
      <Tab.Screen
        name='ProfileScreen'
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name='ios-information-circle' color={color} size={32} />
          ),
          tabBarLabel: 'About Us',
        }}
      />
    </Tab.Navigator>
  )
}

export default Tabs
