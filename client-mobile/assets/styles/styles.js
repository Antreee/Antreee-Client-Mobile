import { StyleSheet, Dimensions } from "react-native";
import Color from "../../src/assets/Color";
const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: 'white',
      paddingTop: 25,
      paddingBottom: 50,
   },
   restoListWrap: {
      flex: 1
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
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
   },
   headerApp: {
      height: 50,
      width: '100%',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.0)',
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
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
      width: width,
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
      width: width,
      alignItems: 'center',
   },
   contentMenuWrap: {
      height: 500,
      width: width,
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
      width: width,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      // borderWidth: 1
   },

   carouselImg: {
      height: 200,
      width: width,
   },


   //? == Style Detail Resto == //
   doubleBtn: {
      height: 35,
      width: width / 2 / 2.2,
      alignSelf: 'flex-end',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: -20,
      marginRight: 30
   },
   btnMap: {
      backgroundColor: Color.red,
      height: 35,
      width: 35,
      borderRadius: 4,
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 7,
      },
      shadowOpacity: 0.41,
      shadowRadius: 9.11,
      borderColor: Color.gray,
      elevation: 14,
      justifyContent: 'center',
      alignItems: 'center'
   },
   btnLove: {
      backgroundColor: Color.white,
      height: 35,
      width: 35,
      borderRadius: 100,
      shadowColor: "#000",
      borderColor: Color.gray,
      shadowOffset: {
         width: 0,
         height: 7,
      },
      shadowOpacity: 0.41,
      shadowRadius: 9.11,
      elevation: 14,
      justifyContent: 'center',
      alignItems: 'center'
   },
   headTitleWrap: {
      width: width / 1.1,
      alignSelf: 'center',
      marginBottom: 10,
   },
   headTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: Color.dark,
      marginBottom: 2
   },
   cuisine: {
      color: Color.darkGray
   },
   restoAddress: {
      width: width / 1.1,
      alignSelf: 'center',
      flexDirection: 'row',
      marginBottom: 10,
   },
   restoAddressIcon: {
      marginRight: 3
   },
   restoAddressText: {
      color: Color.dark
   },
   restoAvailable: {
      width: width / 1.1,
      alignSelf: 'center',
      flexDirection: 'row',
      marginBottom: 25,
   },
   available: {
      color: Color.dark
   },
   availableOpen: {
      color: Color.red,
      fontWeight: 'bold'
   },
   menuListWrap: {
      width: width / 1.1,
      alignSelf: 'center',
      flexDirection: 'row',
   },
   menuListItem: {
      height: 30,
      width: width / 1.1,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Color.red,
      borderRadius: 5,
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,

      elevation: 4,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 15
   },
   menuCategoryName: {
      color: Color.white,
      fontWeight: 'bold',
      fontSize: 18
   },
   listWrapper: {
      width: width / 1.1,
      flexDirection: 'row',
   },
   itemListItem: {
      width: width / 2.3,
      paddingBottom: 10,
      paddingTop: 10,
      alignItems: 'center',
      backgroundColor: Color.white,
      borderRadius: 5,
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      flexDirection: 'column',
      justifyContent: 'center',
      elevation: 4,
      marginBottom: 15,
      marginRight: 10
   },
   imgCardMenu: {
      width: '90%',
      height: 100,
      borderRadius: 5,
      borderWidth: 1,
   },
   itemListItemLeft: {
      alignItems: 'center'
   },
   itemListItemName: {
      fontSize: 14,
      fontWeight: 'bold',
      color: Color.dark,
   },
   itemListItemPrice: {
      fontSize: 12.5,
      color: Color.dark,
   },
   itemListItemRight: {
      alignItems: 'center',
      padding: 3
   },
   itemListItemDesc: {
      fontSize: 12,
      color: Color.dark
   },
   orderList: {
      borderTopColor: Color.gray,
      borderTopWidth: 1,
      paddingTop: 3,
      marginTop: 5,
      width: '90%',
      justifyContent: 'space-between',
      flexDirection: 'row',
   },
   itemCounter: {
      color: Color.red,
      marginRight: 5,
      marginLeft: 5,
   },
   groupOrderView: {
      flexDirection: 'row',
   },
   addChart: {
      backgroundColor: Color.red,
      paddingRight: 5,
      width: 60,
      borderRadius: 5,
      paddingLeft: 6,
      paddingRight: 6,
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
   },
   btnAddChart: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',

   },
   textAddChart: {
      color: Color.white,
      fontWeight: 'bold'
   }

   //? == Style Profil User == //
})

export default styles;