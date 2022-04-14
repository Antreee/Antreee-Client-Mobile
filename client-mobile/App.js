import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Text } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import { Provider as PaperProvider } from 'react-native-paper';
// Navigator:
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const { Navigator, Screen } = createNativeStackNavigator();

// Screens:
import Splash from './src/screens/Splash';
import { TabNav } from './src/components/TabNav';
import Tabs from './src/components/Tabs'
import TabScreenThree from './src/screens/TabScreenThree'
import AuthScreen from './src/screens/AuthScreen';
// import RestaurantScreen from './src/screens/RestaurantScreen';

export default function App() {

  return (
    <>
      <NavigationContainer>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <PaperProvider>
            <Navigator>
              <Screen name="Splash" component={Splash} options={{ headerShown: false }} />
              <Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
              <Screen name="TabNav" component={TabNav} options={{ headerShown: false }} />
              <Screen name="TabScreenThree" component={TabScreenThree} options={{ headerShown: false }} />
              <Screen name="AuthScreen" component={AuthScreen} options={{ headerShown: false }} />
            </Navigator>
          </PaperProvider>
        </ApplicationProvider>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
