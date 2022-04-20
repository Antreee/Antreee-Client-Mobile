import { StyleSheet } from "react-native"
import Color from "../../src/assets/Color";
const fontStyles = StyleSheet.create({

   darkFontBold: {
      fontWeight: 'bold',
      color: Color.dark
   },
   lightFontBold: {
      color: '#DDDDDD',
      fontWeight: 'bold',
      fontSize: 25,
   },
   smallDarkFont: {
      color: '#191919',
   },
   smallLightFont: {
      color: Color.dark,
      fontSize: 13,
   },
   cardRestoTitle: {
      fontSize: 15,
      fontWeight: 'bold',
      marginTop: 5,
      marginBottom: -15,
      color: Color.dark,
      borderWidth: 1,
   },
   cardRestoTitle: {
      fontSize: 15,
      fontWeight: 'bold',
      marginTop: 5,
      marginBottom: -15,
      color: Color.dark,
      width: 150
   },
   cardRestoTitle2: {
      fontSize: 15,
      fontWeight: 'bold',
      marginTop: 5,
      marginBottom: -15,
      color: Color.dark
      // textAlign: 'left',
   },
   cardRestoDistance: {
      fontSize: 8,
   },
   cardRestoAddress: {
      fontSize: 12,
      marginTop: 5,
      textAlign: 'left',
      flexWrap: 'wrap',
      color: Color.dark
   },
   cardRestoNation: {
      fontSize: 8,
      marginTop: 5,
      textAlign: 'left',
      color: 'gray',
   },
   cardDistance: {
      color: Color.white,
      backgroundColor: Color.red,
      borderRadius: 10,
      fontSize: 8,
      alignItems: 'center',
      justifyContent: 'center',
      top: -15,
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
   },
   cardDistance2: {
      color: Color.white,
      backgroundColor: Color.red,
      borderRadius: 10,
      fontSize: 8,
      alignItems: 'center',
      justifyContent: 'center',
      top: -30,
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
   },
})

export default fontStyles;