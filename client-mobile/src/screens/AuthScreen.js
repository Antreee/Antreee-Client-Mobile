import { useState } from "react";
import { View, Text, ImageBackground, StyleSheet, Dimensions, StatusBar, TouchableOpacity } from "react-native";

import SignIn from "../components/SignIn";
import SignUp from '../components/SignUp';

import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function AuthScreen({ navigation }) {
   const [isAble, setIsAble] = useState(false);


   const tab = (value) => {
      if (value === "SignIn") {
         setIsAble(false);
      } else {
         setIsAble(true);
      }
      console.log(value)
   }

   return (
      <View style={stylesAuth.container}>
         <StatusBar hidden={true} />
         <View style={stylesAuth.header}>
            <View style={stylesAuth.logo}>
               <ImageBackground
                  source={require('../assets/imgTemplate/logo.png')}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode='stretch'
               />
            </View>
            <View style={stylesAuth.tabbar}>
               <View style={stylesAuth.box}>
                  <TouchableOpacity
                     onPress={() => tab('SignIn')}
                     style={[stylesAuth.item,
                     {
                        backgroundColor: isAble ? '#EC6848' : 'white',
                        borderTopLeftRadius: width / 2 / 2,
                        borderBottomLeftRadius: width / 2 / 2,
                     }
                     ]}>
                     <FontAwesome name="sign-in"
                        size={30}
                        color={isAble ? 'white' : 'black'} />
                  </TouchableOpacity>

                  <TouchableOpacity
                     onPress={() => tab('SignUp')}
                     style={[stylesAuth.item,
                     {
                        backgroundColor: isAble ? 'white' : '#EC6848',
                        borderTopRightRadius: width / 2 / 2,
                        borderBottomRightRadius: width / 2 / 2,
                     }
                     ]}>
                     <FontAwesome name="registered"
                        size={30}
                        color={isAble ? 'black' : 'white'} />
                  </TouchableOpacity>
               </View>
            </View>
         </View>
         {
            isAble ?
               <SignUp />
               :
               <SignIn />
         }
      </View>
   );
}



const width = Dimensions.get("window").width;

const stylesAuth = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#EC6848",
   },
   header: {
      flex: 1.5,
      paddingHorizontal: 20,
   },
   logo: {
      flex: 1,
      width: "100%",
      height: "100%",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 20
      },
      shadowOpacity: 1,
      shadowRadius: 2.62,
      elevation: 4,
      borderBottomLeftRadius: 200,
      borderBottomRightRadius: 200,
   },
   tabbar: {
      position: 'absolute',
      bottom: 0,
      width: width,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center'
   },
   box: {
      width: width / 2,
      height: 70,
      borderRadius: width / 2 / 2,
      elevation: 10,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      borderEndColor: '#f2f2f2',
      shadowColor: '#000',
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.7,
      shadowRadius: 2.62,
      flexDirection: 'row'
   },
   item: {
      width: width / 2 / 2,
      height: 70,
      justifyContent: 'center',
      alignItems: 'center'
   }
})