import { View, Text, StyleSheet } from "react-native"

export default function SignIn() {
   return (
      <View style={stylesSignIn.container}>
         <Text>SignIn</Text>
      </View>
   )
}

const stylesSignIn = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
   }
})