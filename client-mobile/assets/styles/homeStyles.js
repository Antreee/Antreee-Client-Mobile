import { StyleSheet, Dimensions } from "react-native";


const { width: windowWidth } = Dimensions.get('window')
const homeStyles = StyleSheet.create({
   mainCard: {
      backgroundColor: 'white',
      width: (windowWidth * 95 / 100),
      borderRadius: 8,
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexWrap: 'wrap',
      flexDirection: 'row',
      padding: 12,
      margin: 10,
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
      borderRadius: 8,
      alignSelf: 'center',
      marginRight: 12
   },
   cardDsc: {
      height: '100%',
      width: 225,
   },
})

export default homeStyles;