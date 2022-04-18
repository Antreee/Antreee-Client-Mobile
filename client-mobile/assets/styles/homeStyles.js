import { StyleSheet, Dimensions } from "react-native";
import Color from "../../src/assets/Color";

const { width: windowWidth } = Dimensions.get('window')
const homeStyles = StyleSheet.create({
   mainCard: {
      backgroundColor: 'white',
      width: windowWidth / 1.1,
      borderRadius: 8,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      padding: 10,
      margin: 10,
      flexWrap: 'wrap',
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
   },
   imgStyle: {
      height: 80,
      width: 80,
   },
   cardImg: {
      // borderRadius: 8,
      alignSelf: 'center',
      marginRight: 10,
      // borderWidth: 1,
   },
   cardDsc: {
      flexDirection: 'column',
      // flexWrap: 'wrap'
      width: windowWidth / 1.7,
      // borderWidth: 1,
   },
})

export default homeStyles;