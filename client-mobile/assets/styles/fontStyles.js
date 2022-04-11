import { StyleSheet } from "react-native"

const fontStyles = StyleSheet.create({

   darkFontBold: {
      fontWeight: 'bold',
      color: '#191919'
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
      textAlign: 'left',
      flexWrap: "wrap"
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
      color: 'gray'
   }
})

export default fontStyles;