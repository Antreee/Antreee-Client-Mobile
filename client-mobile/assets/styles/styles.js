import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: 'white',
      paddingTop: 25,
   },
   iconSmall: {
      width: 15,
      height: 15,
      marginRight: 10,
   },
   navIcon: {
      width: 25,
      height: 25,
   },
   background: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: 50,
      borderBottomLeftRadius: 100,
      borderBottomRightRadius: 100,
   },
   headerApp: {
      height: 50,
      width: '100%',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.0)',
      borderBottomLeftRadius: 100,
      borderBottomRightRadius: 100,
   },
   appImg: {
      backgroundColor: '#EEEBDD',
      height: 40,
      width: 40,
      borderRadius: 100,
      marginRight: 10,
   },
   searchWrap: {
      height: 60,
      width: '100%',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',

   },
   search: {
      backgroundColor: '#F4F4F4',
      height: 30,
      borderWidth: 1,
      borderColor: '#797A7E',
      width: '80%',
      borderRadius: 10,
      marginRight: 10,
      paddingLeft: 10,
      paddingRight: 10,
      fontWeight: 'bold',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
   },
   contentWrap: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
   },
   contentMenuWrap: {
      height: 500,
      width: '100%',
      alignItems: 'center',
   },
   titleWrap: {
      height: 50,
      width: '90%',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'flex-start',
   },
   redBox: {
      backgroundColor: 'red',
      height: 15,
      width: 5,
      borderRadius: 100,
      marginRight: 5,
   },
   contentTitle: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   carouselWrap: {
      height: 200,
      width: '100%',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
   },

   carouselImg: {
      height: 200,
      width: '100%',
   },
})

export default styles;