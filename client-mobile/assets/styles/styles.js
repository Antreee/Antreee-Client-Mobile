import { StyleSheet, Platform, StatusBar, Dimensions } from "react-native";
import Color from "../../src/assets/Color";
const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingBottom: 50,
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
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 50,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  fabRestaurant: {
    width: width * 0.92,
    height: 50,
    position: "absolute",
    bottom: 80,
    alignSelf: "center",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.red,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  headerApp: {
    height: 50,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.0)",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  appImg: {
    backgroundColor: "#EEEBDD",
    height: 40,
    width: 40,
    borderRadius: 100,
    marginRight: 10,
  },
  searchWrap: {
    height: 60,
    width: width,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  search: {
    backgroundColor: "#F4F4F4",
    height: 30,
    borderColor: "#797A7E",
    width: "80%",
    borderRadius: 10,
    marginRight: 10,
    paddingLeft: 10,
    paddingRight: 10,
    fontWeight: "bold",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  contentWrap: {
    flex: 1,
    width: width,
    height: 260,
    alignItems: "center",
  },
  contentMenuWrap: {
    width: width,
    alignItems: "center",
    marginBottom: 20,
  },
  titleWrap: {
    height: 50,
    width: "90%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  redBox: {
    backgroundColor: "red",
    height: 15,
    width: 5,
    borderRadius: 100,
    marginRight: 5,
  },
  contentTitle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  carouselWrap: {
    //<=====
    height: 200,
    width: width,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    // marginBottom: 35,
    // borderWidth: 1
  },

  carouselImg: {
    height: 200,
    width: width,
  },

  //? == Style Detail Resto == //
  doubleBtn: {
    // alignSelf: 'center',
    height: 35,
    width: width / 3.5,
    alignSelf: "flex-end",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -20,
    // marginRight: 30,
  },
  btnBookNow: {
    borderWidth: 1,
    width: 150,
    backgroundColor: Color.red,
    alignSelf: "center",
    top: 15,
  },
  loveAndMap: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 80,
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
    justifyContent: "center",
    alignItems: "center",
  },
  restaurantAddress: {
    width: width / 1.1,
    // borderWidth: 1,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  restaurantAddressIcon: {},
  restaurantAddressText: {
    width: 300,
    color: Color.dark,
  },
  restaurantAvailable: {
    width: width / 1.1,
    height: 35,
    // borderWidth: 1,
    alignSelf: "center",
    flexDirection: "row",
    marginTop: 5,
    // justifyContent: 'space-between',
  },
  restaurantAddressIcon: {
    marginRight: 10,
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
    justifyContent: "center",
    alignItems: "center",
  },
  headTitleWrap: {
    width: width / 1.1,
    alignSelf: "center",
    marginBottom: 10,
    marginTop: 20,
  },
  headTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Color.dark,
    marginBottom: 2,
  },
  cuisine: {
    color: Color.darkGray,
  },
  restoAddress: {
    width: width / 1.1,
    alignSelf: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
  restoAddressIcon: {
    marginRight: 3,
  },
  restoAddressText: {
    color: Color.dark,
  },
  restoAvailable: {
    width: width / 1.1,
    alignSelf: "center",
    flexDirection: "row",
    marginBottom: 25,
  },
  available: {
    color: Color.dark,
    marginLeft: -5,
  },
  availableOpen: {
    color: Color.red,
    fontWeight: "bold",
  },
  menuListWrap: {
    width: width / 1.1,
    // height: 500,
    alignSelf: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    marginBottom: 100,
  },
  btnGoToCart: {
    backgroundColor: Color.red,
    height: 28,
    width: 40,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    // zIndex: 10,
    flexDirection: "row",
    // borderWidth: 1,
  },
  button: {
    // backgroundColor: Color.red,
    height: 28,
    width: 40,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    // zIndex: 10,
    flexDirection: "row",
    // borderWidth: 1,
  },
  menuListItem: {
    height: 30,
    width: width / 1.1,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
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
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  menuCategoryName: {
    color: Color.white,
    fontWeight: "bold",
    fontSize: 18,
  },
  listWrapper: {
    width: width / 1.1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    // padding: 10,
    marginBottom: 20,
  },
  lestOfWrap: {
    flex: 1,
    alignItems: "center",
    // justifyContent: 'center',
    width: width / 1.1,
    // alignContent: 'center',
    alignSelf: "center",
    // marginBottom: 230,
  },
  itemListItemLong: {
    width: width / 2.3,
    padding: 10,
    alignItems: "center",
    backgroundColor: Color.white,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    flexDirection: "column",
    justifyContent: "space-between",
    elevation: 4,
    marginTop: 10,
    marginBottom: 10,
    height: 320,
  },
  itemListItem: {
    width: width / 2.3,
    padding: 10,
    alignItems: "center",
    backgroundColor: Color.white,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    flexDirection: "column",
    justifyContent: "space-between",
    elevation: 4,
    marginTop: 10,
    marginBottom: 10,
    height: 300,
  },
  imgCardMenu: {
    width: 150,
    height: 100,
    resizeMode: "contain",
    // marginBottom: 10,
  },
  itemListItemLeft: {
    alignItems: "center",
    // borderWidth: 1,
  },
  itemListItemName: {
    fontSize: 14,
    fontWeight: "bold",
    color: Color.dark,
    paddingLeft: 3,
    paddingRight: 3,
  },
  itemListItemPrice: {
    fontSize: 12.5,
    color: Color.dark,
  },
  itemListItemRight: {
    alignItems: "center",
    padding: 3,
    // borderWidth: 1
  },
  itemListItemDesc: {
    fontSize: 12,
    color: Color.darkGray,
  },
  orderList: {
    paddingBottom: 3,
    marginTop: 5,
    justifyContent: "center",
    flexDirection: "row",
    // height: 50,
    // borderWidth: 1,
  },
  itemCounter: {
    color: Color.white,
    marginRight: 5,
    marginLeft: 5,
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  textAddChart: {
    color: Color.white,
    fontWeight: "bold",
    fontSize: 18,
  },

  //? == Style Profil User == //
  profilHead: {
    width: width,
    height: 250,
    borderBottomLeftRadius: 150,
    borderBottomRightRadius: 150,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Color.red,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    // zIndex: 5,
    // marginTop: -300,
  },
  welcomeHome: {
    marginTop: -150,
    color: Color.white,
    fontSize: 30,
  },
  profilPic: {
    width: 150,
    height: 150,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: Color.white,
    zIndex: 100,
    marginTop: -200,
  },
  profilInfo: {
    width: width / 1.1,
    alignSelf: "center",
    height: "100%",
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    marginTop: -80,
    paddingTop: 120,
    backgroundColor: Color.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    // zIndex: 3
  },
  profilInfoLabel: {
    color: Color.darkGray,
    fontSize: 13,
  },
  infoWrap: {
    width: "80%",
    // borderWidth: 1,
    alignSelf: "center",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 30,
  },
  profilInfoInputWrap: {
    width: width / 1.1,
    flexDirection: "row",
    alignItems: "center",
  },
  iconInput: {
    marginRight: 10,
  },
  profilInfoInput: {
    color: Color.dark,
    fontWeight: "bold",
  },
  btnButtomWrap: {
    width: width / 1.1,
    marginTop: -15,
    flexDirection: "row",
    justifyContent: "center",
  },
  btnLogout: {
    width: 60,
    height: 60,
    backgroundColor: Color.red,
    borderRadius: 100,
    shadowColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 10,
  },
  btnFavo: {
    margin: 10,
    width: 60,
    height: 60,
    backgroundColor: Color.white,
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  cardFavHis: {
    height: 100,
    alignSelf: "center",
    justifyContent: "space-between",
    width: width / 1.2,
    marginBottom: 15,
    backgroundColor: Color.white,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "row",
  },
  cardWrapAll: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 10,
  },
  badgeTitle: {
    alignSelf: "center",
    height: 10,
    width: width / 4,
    backgroundColor: Color.gray,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  badgeTitle2: {
    alignSelf: "center",
    justifyContent: "center",
    height: 10,
    width: width / 4,
    backgroundColor: Color.gray,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputMoney: {
    width: 94,
    height: 40,
    backgroundColor: Color.white,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    alignSelf: "flex-end",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputWrapAll: {
    width: width / 1.3,
    paddingBottom: 20,
    paddingTop: 20,
    backgroundColor: Color.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 150,
    borderRadius: 5,
    paddingLeft: 10,
    justifyContent: "space-between",
    flexDirection: "column",
  },
  profileCardWrap: {
    flexDirection: "column",
    alignSelf: "center",
    borderRadius: 5,
    width: width / 2.4,
    height: 70,
    backgroundColor: Color.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardMoney: {
    height: 50,
    width: 130,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Color.red,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  // ? MY CART

  cartTitle: {
    backgroundColor: Color.red,
    width: width,
    height: 50,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  cartTitleText: {
    color: Color.white,
    fontSize: 20,
    fontWeight: "bold",
  },
  cartWrap: {
    width: width / 1.1,
    justifyContent: "space-between",
    alignSelf: "center",
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: Color.white,
    flexDirection: "row",
    paddingVertical: 10,
  },
  cartEmpty: {
    width: width / 1.1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.redAlpha,
    borderRadius: 5,
  },
  cartEmptyText: {
    color: Color.red,
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 12,
  },
  checkOut: {
    width: width / 1.1,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 15,
    borderBottomWidth: 2,
    marginBottom: 15,
    borderBottomColor: Color.red,
    height: "auto",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Color.white,
  },
  checkOutBtn: {
    // marginTop: 100,
  },
  headCheckout: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderBottomColor: Color.red,
    margin: 20,
    marginTop: 0,
  },
  headCheckoutText: {
    color: Color.dark,
    fontWeight: "bold",
    fontSize: 18,
  },
  headPriceText: {
    color: Color.dark,
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  formInputCart: {
    width: width / 1.5,
    marginBottom: 10,
  },
  btnCheckOut: {
    width: width / 2,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    height: 40,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: Color.red,
  },
  cartMenuText: {
    height: 70,
    width: 70,
    borderRadius: 100,
  },
  btnCheckOutText: {
    color: Color.white,
    fontWeight: "bold",
    fontSize: 18,
  },
  imgCartMenu: {
    width: 80,
    height: 80,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  detailCartMenu: {
    width: 150,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  cartMenuName: {
    color: Color.dark,
    fontWeight: "bold",
    fontSize: 13,
    marginBottom: 5,
  },
  cartMenuNameSub: {
    color: Color.darkGray,
    fontSize: 11,
    marginBottom: 5,
  },
  cartMenuNamePrice: {
    fontWeight: "bold",
    fontSize: 13,
  },
  detailCartPrice: {
    width: 80,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  priceUpDown: {
    flexDirection: "row",
    alignItems: "center",
    width: 60,
    height: 30,
    alignSelf: "center",
  },
  priceMinus: {
    width: 30,
    height: 25,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: Color.red,
    alignItems: "center",
    justifyContent: "center",
  },
  priceMax: {
    width: 30,
    height: 25,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: Color.red,
    alignItems: "center",
    justifyContent: "center",
  },
  cartMenuQty: {
    fontSize: 13,
    color: Color.dark,
    alignSelf: "center",
  },

  // ? Booking Screen =======

  emptyBook: {
    justifyContent: "center",
    alignItems: "center",
    height: 300,
  },
  calendarImg: {
    height: 300,
    width: 300,
  },
  btnBackHome: {
    height: 50,
    width: 150,
    backgroundColor: Color.red,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btnBackHomeText: {
    color: Color.white,
    fontSize: 20,
    fontWeight: "bold",
  },
  emptyBookText: {
    height: 100,
    width: width / 1.1,
    justifyContent: "center",
    alignItems: "center",
  },
  textEmptyBooked: {
    color: Color.red,
    fontSize: 20,
    fontWeight: "bold",
  },
  textEmptyBookedSub: {
    color: Color.darkGray,
  },
  calendarWrapper: {
    width: width,
    alignItems: "center",
    justifyContent: "center",
    // marginBottom: 10,
  },
  calendarItems: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.white,
    width: width,
    height: 380,
    flexDirection: "column",
  },
  headerCalendar: {
    width: width,
    height: 40,
    paddingLeft: 10,
    backgroundColor: Color.red,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  headerIdentity: {
    width: width / 1.1,
    height: 40,
    paddingLeft: 10,
    backgroundColor: Color.red,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 40,
  },
  textHeaderCalendar: {
    color: Color.white,
    fontSize: 15,
    fontWeight: "bold",
  },
  headerBooking: {
    width: width,
    height: 40,
    paddingLeft: 10,
    backgroundColor: Color.red,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  dateWrapper: {
    width: width / 1.1,
    height: 100,
    borderRadius: 10,
    alignSelf: "center",
    flexDirection: "column",
    marginTop: 30,
    marginBottom: 10,
  },
  dateItemsHead: {
    height: 30,
    justifyContent: "center",
    paddingLeft: 10,
    borderBottomColor: Color.darkGray,
    borderBottomWidth: 1,
  },
  textDateHead: {
    color: Color.darkGray,
  },
  portionWrapper: {
    width: width / 1.1,
    height: 100,
    flexDirection: "row",
    marginTop: 20,
    alignSelf: "center",
  },
  btnPortion: {
    backgroundColor: Color.white,
    alignItems: "center",
    width: 60,
    borderRadius: 10,
    height: 70,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginLeft: 30,
    marginRight: 30,
  },
  wrapIdentity: {
    width: width / 1.2,
    // height: 200,
    padding: 15,
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 70,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: Color.white,
  },
});

export default styles;
