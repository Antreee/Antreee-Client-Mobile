import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/Home'

import React from 'react'
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components'
import styles from '../../assets/styles/styles'

const HomeIcon = (_) => (
  <Icon style={styles.navIcon} fill='#FC4F4F' name='home' />
)
const PersonIcon = (_) => (
  <Icon style={styles.navIcon} fill='#FC4F4F' name='person' />
)
const FavIcon = (_) => (
  <Icon style={styles.navIcon} fill='#FC4F4F' name='heart' />
)
const ScanIcon = (_) => (
  <Icon style={styles.navIcon} fill='#FC4F4F' name='smartphone-outline' />
)
const BookIcon = (_) => (
  <Icon style={styles.navIcon} fill='#FC4F4F' name='shopping-bag' />
)

const { Navigator, Screen } = createBottomTabNavigator()

export const ButtomTabComponents = ({ navigation, state }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  const change = (index) => {
    setSelectedIndex(index)
    navigation.navigate(state.routeNames[index])
  }
  return (
    <BottomNavigation
      selectedIndex={selectedIndex}
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 90,
        },
        shadowOpacity: 3.0,
        shadowRadius: 90.0,
        elevation: 24,
      }}
      onSelect={(index) => change(index)}
      indicatorStyle={{
        backgroundColor: '#FC4F4F',
        height: 4,
        width: 40,
        borderRadius: 20,
      }}
      tabBarActiveColor='red'
    >
      <BottomNavigationTab icon={HomeIcon} title='Home' />
      <BottomNavigationTab icon={BookIcon} title='Booking' />
      <BottomNavigationTab icon={ScanIcon} title='Scan' />
      <BottomNavigationTab icon={FavIcon} title='Favourite' />
      <BottomNavigationTab icon={PersonIcon} title='Profile' />
    </BottomNavigation>
  )
}

export const TabNav = () => {
  return (
    <Navigator Navigator tabBar={(props) => <ButtomTabComponents {...props} />}>
      <Screen name='Home' component={Home} options={{ headerShown: false }} />
    </Navigator>
  )
}
