import { useContext } from 'react'
import { View, Text } from 'react-native'
import { CartContext } from '../components/Tabs'

function TabScreenFour({ navigation }) {
  const { cart } = useContext(CartContext)
  const carts = Object.keys(cart).map((menu) => {
    return [menu, cart[menu]]
  })


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>NewTab 4</Text>
      {carts.map((menu) => {
        return (
          <Text>
            Menu: {menu[0]}, Quantity: {menu[1]}
          </Text>
        )
      })}
    </View>
  )
}

export default TabScreenFour
