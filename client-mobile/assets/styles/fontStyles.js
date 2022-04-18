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
      color: '#797A7E',
      fontSize: 13,
   },
   cardRestoTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 5,
      // textAlign: 'left',

   },
   cardRestoDistance: {
      fontSize: 8,
   },
   cardRestoAddress: {
      fontSize: 12,
      marginTop: 5,
      textAlign: 'left',
      flexWrap: 'wrap'
   },
   cardRestoNation: {
      fontSize: 8,
      marginTop: 5,
      textAlign: 'left',
      color: 'gray',
   },
   cardDistance: {
      color: Color.white,
      borderRadius: 10,
      fontSize: 8,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: -30,
      // top: -30,
   },
})

export default fontStyles;