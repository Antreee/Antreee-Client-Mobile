import { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native"
import { TextInput, Snackbar, Button } from 'react-native-paper';
import styles from "../../assets/styles/styles"
import Color from "../assets/Color";
const width = Dimensions.get("window").width;

export default function SignIn() {
   const [password, setPassword] = useState("");
   const [name, setName] = useState("");
   return (
      <View style={stylesSignIn.container}>
         <View style={stylesSignIn.wrapperInput}>
            <View style={stylesSignIn.formInputCart}>
               <TextInput
                  label="Email"
                  value={name}
                  mode={'outlined'}
                  style={{ backgroundColor: Color.white, height: 30, fontSize: 13, marginTop: 3 }}
                  theme={{ colors: { text: Color.dark, primary: Color.red } }}
                  onChangeText={name => setName(name)}
               />
               <TextInput
                  label="Password"
                  secureTextEntry={true}
                  value={password}
                  mode={'outlined'}
                  style={{ backgroundColor: Color.white, height: 30, fontSize: 13, marginBottom: 3 }}
                  theme={{ colors: { text: Color.dark, primary: Color.red } }}
                  onChangeText={pwd => setPassword(pwd)}
               />
            </View>
         </View>
      </View>
   )
}

const stylesSignIn = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
   },
   formInputCart: {
      width: width / 1.5,
      marginBottom: 10,
   },
   wrapperInput: {
      backgroundColor: Color.white,
      width: width / 1.3,
      height: 150,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 15,
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 7,
      },
      shadowOpacity: 0.41,
      shadowRadius: 9.11,
      borderColor: Color.gray,
      elevation: 14,
   },
})