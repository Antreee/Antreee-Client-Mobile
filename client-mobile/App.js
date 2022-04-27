import { StyleSheet, View } from 'react-native'
import React from 'react'
import * as eva from '@eva-design/eva'
import { ApplicationProvider, IconRegistry, Text } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { Provider as PaperProvider } from 'react-native-paper'
// Navigator:
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
const { Navigator, Screen } = createNativeStackNavigator()

// Screens:
import Tabs from './src/components/Tabs'
import QrScanScreen from './src/screens/tabs/QrScanScreen'
import BookingScreen from './src/screens/tabs/BookingScreen'
import CartScreen from './src/screens/tabs/CartScreen'
import { ApolloProvider } from '@apollo/client'
import client from './config/apollo'
import { CartContext, RestaurantContext } from './src/components/Context'
import { useState } from 'react'

export default function App() {
  const [cart, setCart] = useState({})
  const [restaurantState, setRestaurantState] = useState({})

  return (
    <>
      <ApolloProvider client={client}>
        <RestaurantContext.Provider
          value={{ restaurantState, setRestaurantState }}
        >
          <CartContext.Provider value={{ cart, setCart }}>
            <NavigationContainer>
              <SafeAreaProvider>
                <IconRegistry icons={EvaIconsPack} />
                <ApplicationProvider {...eva} theme={eva.light}>
                  <PaperProvider>
                    <Navigator>
                      <Screen
                        name='Tabs'
                        component={Tabs}
                        options={{ headerShown: false }}
                      />
                      <Screen
                        name='QrScanScreen'
                        component={QrScanScreen}
                        options={{ headerShown: false }}
                      />
                      <Screen
                        name='BookingScreen'
                        component={BookingScreen}
                        options={{ headerShown: false }}
                      />
                      <Screen
                        name='CartScreen'
                        component={CartScreen}
                        options={{ headerShown: false }}
                      />
                    </Navigator>
                  </PaperProvider>
                </ApplicationProvider>
              </SafeAreaProvider>
            </NavigationContainer>
          </CartContext.Provider>
        </RestaurantContext.Provider>
      </ApolloProvider>
    </>
  )
}
