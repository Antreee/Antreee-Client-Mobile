import { createNativeStackNavigator } from '@react-navigation/native-stack';
const { Navigator, Screen } = createNativeStackNavigator();
import HomeScreen from '../screens/tabs/HomeScreen';
import RestaurantScreen from '../screens/tabs/RestaurantScreen';

export default HomeNavigator = ({ navigation }) => {
   return (
      <>
         <Navigator>
            <Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
            <Screen name="RestaurantScreen" component={RestaurantScreen} options={{ headerShown: false }} />
         </Navigator>
      </>
   )
}