import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import React from 'react'
import * as eva from '@eva-design/eva'
import { ApplicationProvider, IconRegistry, Text } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'

import { Provider as PaperProvider } from 'react-native-paper'
// Navigator:
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
const { Navigator, Screen } = createNativeStackNavigator()

// Screens:
import Splash from './src/screens/Splash'
import Tabs from './src/components/Tabs'
import QrScanScreen from './src/screens/tabs/QrScanScreen'
import AuthScreen from './src/screens/AuthScreen'
// import RestaurantScreen from './src/screens/RestaurantScreen';
import { ApolloProvider } from '@apollo/client'
import client from './config/apollo'

export default function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider {...eva} theme={eva.light}>
            <PaperProvider>
              <Navigator>
                <Screen
                  name='Splash'
                  component={Splash}
                  options={{ headerShown: false }}
                />
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
                  name='AuthScreen'
                  component={AuthScreen}
                  options={{ headerShown: false }}
                />
              </Navigator>
            </PaperProvider>
          </ApplicationProvider>
        </NavigationContainer>
      </ApolloProvider>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
