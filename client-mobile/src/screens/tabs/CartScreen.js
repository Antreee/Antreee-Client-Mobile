import React, { useContext, useEffect, useState } from "react";
import * as LocalAuthentication from "expo-local-authentication";
const width = Dimensions.get("window").width;
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from "react-native";
import styles from "../../../assets/styles/styles";
import { useMutation, useQuery } from "@apollo/client";
import { GET_RESTAURANT_BY_ID, GET_ORDER_BY_ID } from "../../../config/queries";
import { CREATE_ORDER } from "../../../config/queries";
import { WebView } from "react-native-webview";
import Color from "../../assets/Color";
import { TextInput, Snackbar, Button, Modal, Portal, Provider } from "react-native-paper";
import CartListItems from "../../components/CartListItems";
import { RestaurantContext, CartContext } from "../../components/Context";

function CartScreen({ navigation, route }) {
  const { id: restoId, tableNumber } = route.params
    ? route.params
    : { id: null, tableNumber: null };
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState({ visible: false });
  // const [myPrice, setMyPrice] = useState(0)
  const [
    mutationCreateOrder,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(CREATE_ORDER);
  const { cart, setCart } = useContext(CartContext);
  const { restaurantState, setRestaurantState } = useContext(RestaurantContext);

  const { loading, error, data } = useQuery(GET_RESTAURANT_BY_ID, {
    variables: {
      id: restaurantState.restaurantId,
      itemsByRestaurantIdId2: restaurantState.restaurantId,
    },
  });

  const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
  const [visible, setVisible] = React.useState(false);
  const [visibleDetail, setVisibleDetail] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const showModalDetail = () => setVisibleDetail(true);
  const hideModalDetail = () => setVisibleDetail(false);
  const containerStyle2 = {
    backgroundColor: Color.white,
    padding: 20,
    height: 400,
    width: windowWidth / 1.1,
    alignSelf: "center",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  };

  const containerStyle = {
    alignSelf: "center",
    borderRadius: 10,
    top: -windowHeight * 0.05,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingBottom: 20,
    height: windowHeight * 0.85,
    width: windowWidth * 0.9,
  };

  const [facialRecognitionAvailable, setFacialRecognitionAvailable] = React.useState(false);
  const [fingerprintAvailable, setFingerprintAvailable] = React.useState(false);
  const [irisAvailable, setIrisAvailable] = React.useState(false);
  const [authLoading, setAuthLoading] = React.useState(false);
  const [result, setResult] = React.useState();

  const checkSupportedAuthentication = async () => {
    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    if (types && types.length) {
      setFacialRecognitionAvailable(
        types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)
      );
      setFingerprintAvailable(types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT));
      setIrisAvailable(types.includes(LocalAuthentication.AuthenticationType.IRIS));
    }
  };
  const authenticate = async () => {
    if (authLoading) {
      setAuthLoading(true);
    }
    try {
      const results = await LocalAuthentication.authenticateAsync();
      if (results.success) {
        createOrder();
        setResult("success");
        // hideModalDetail()
      } else if (results.error === "unknown") {
        setResult("disabled");
      } else if (
        results.error === "user_cancel" ||
        results.error === "system_cancel" ||
        results.error === "app_cancel"
      ) {
        setResult("cancelled");
      }
    } catch (error) {
      setResult("error");
    }
    setAuthLoading(false);
  };

  React.useEffect(() => {
    checkSupportedAuthentication();
  }, []);

  if (error) {
    return (
      <>
        <View style={[styles.container, { alignItems: "center", justifyContent: "center" }]}>
          <View style={styles.emptyBook}>
            <View style={styles.calendar}>
              <Image
                source={require("../../assets/imgTemplate/cart.png")}
                style={styles.calendarImg}
              />
            </View>
            <View style={styles.emptyBookText}>
              <Text style={styles.textEmptyBooked}>Oops! your cart is empty</Text>
              <Text style={styles.textEmptyBookedSub}>Please fill your cart to continue.</Text>
            </View>
            <TouchableOpacity onPress={goToHome} style={styles.btnBackHome}>
              <Text style={styles.btnBackHomeText}>Buy Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-around",
            padding: 10,
          }}
        >
          <ActivityIndicator size="small" color={Color.red} />
        </View>
      </>
    );
  }

  if (visibleDetail) {
    return (
      <Provider>
        <Portal>
          <Modal
            visible={visibleDetail}
            onDismiss={hideModalDetail}
            contentContainerStyle={containerStyle2}
          >
            <View
              style={{
                width: windowWidth / 1.1,
                height: 50,
                backgroundColor: Color.red,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: Color.white, fontSize: 15, fontWeight: "bold" }}>
                Input Your Details
              </Text>
            </View>
            <View style={styles.wrapIdentity}>
              <TextInput
                label="Name"
                value={name}
                mode={"outlined"}
                style={{
                  backgroundColor: Color.white,
                  height: 40,
                  fontSize: 13,
                  marginBottom: 3,
                }}
                theme={{ colors: { text: Color.dark, primary: Color.red } }}
                onChangeText={(name) => setName(name)}
              />
              <TextInput
                label="PhoneNumber"
                value={phoneNumber}
                mode={"outlined"}
                style={{
                  backgroundColor: Color.white,
                  height: 40,
                  fontSize: 13,
                  marginBottom: 3,
                }}
                theme={{ colors: { text: Color.dark, primary: Color.red } }}
                onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
              />
              <TextInput
                label="Email"
                value={email}
                mode={"outlined"}
                style={{
                  backgroundColor: Color.white,
                  height: 40,
                  fontSize: 13,
                  marginTop: 3,
                }}
                theme={{ colors: { text: Color.dark, primary: Color.red } }}
                onChangeText={(email) => {
                  setEmail(email);
                }}
              />
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: Color.red,
                width: 150,
                height: 50,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={checkInput}
            >
              <Text style={{ color: Color.white, fontWeight: "bold" }}>Book Now!</Text>
            </TouchableOpacity>
          </Modal>
        </Portal>
      </Provider>
    );
  }

  let itemDetail = [];
  let myPrice = 0;
  Object.keys(cart).forEach((key) => {
    let menuItem = data.itemsByRestaurantId;
    menuItem.forEach((elx) => {
      if (elx._id === key) {
        myPrice += elx.price * cart[key];
        itemDetail.push({
          id: key,
          name: elx.name,
          price: elx.price,
          quantity: cart[key],
          description: elx.description,
          image: elx.imageUrl,
        });
      }
    });
  });
  // console.log(itemDetail)
  for (var i = 0; i < itemDetail.length; i++) {
    for (var j = 0; j < itemDetail.length - i - 1; j++) {
      if (itemDetail[j].id > itemDetail[j + 1].id) {
        var temp = itemDetail[j];
        itemDetail[j] = itemDetail[j + 1];
        itemDetail[j + 1] = temp;
      }
    }
  }

  function checkInput() {
    if (name === "" || email === "") {
      setMessage({ visible: true });
      setTimeout(() => {
        setMessage({ visible: false });
      }, 2000);
    } else {
      authenticate();
    }
  }

  const goToHome = () => navigation.navigate("HomeScreen");
  const width = Dimensions.get("window").width;

  if (mutationData) {
    setTimeout(() => {
      hideModal();
    }, 20000);
    return (
      <Provider>
        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <WebView
              source={{
                uri: mutationData.createOrder.url,
              }}
              style={{
                marginTop: 20,
                height: windowHeight * 0.8,
                width: windowWidth * 0.8,
              }}
            />
          </Modal>
          {!visible && (
            <>
              <View style={[styles.container, { alignItems: "center", justifyContent: "center" }]}>
                <View style={styles.emptyBook}>
                  <View style={styles.calendar}>
                    <Image
                      source={require("../../assets/imgTemplate/cart.png")}
                      style={styles.calendarImg}
                    />
                  </View>
                  <View style={styles.emptyBookText}>
                    <Text style={styles.textEmptyBooked}>Thank you for your patronage.</Text>
                    <Text style={styles.textEmptyBookedSub}>Please enjoy your meal!</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setVisible(true);
                    }}
                    style={styles.btnBackHome}
                  >
                    <Text style={styles.btnBackHomeText}>Open Modal</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        </Portal>
      </Provider>
    );
  }
  if (mutationLoading) {
    return (
      <>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
            padding: 10,
          }}
        >
          <ActivityIndicator size="small" color={Color.red} />
          <Text style={{ marginLeft: 10 }}>Submiting...</Text>
        </View>
      </>
    );
  }
  if (mutationError) return <Text>Submission error!</Text>;

  function currencyFormat(num) {
    return "Rp." + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  function validate(text) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      console.log("Email is Not Correct");
      setEmail(text);
      return false;
    } else {
      setEmail(text);
      console.log("Email is Correct");
    }
  }

  // ? CREATE ORDER
  function createOrder() {
    mutationCreateOrder({
      variables: {
        customerName: name,
        customerEmail: email,
        customerPhoneNumber: phoneNumber,
        tableNumber: restaurantState.tableNumber,
        totalPrice: myPrice,
        bookingDate: null,
        numberOfPeople: null,
        restaurantId: restaurantState.restaurantId,
        orderDetails: {
          data: itemDetail.map((item) => {
            return {
              itemId: item.id,
              quantity: item.quantity,
            };
          }),
        },
      },
    });
    showModal();
    setCart({});
  }

  return (
    <>
      <View style={styles.containerx}>
        <View style={styles.cartTitle}>
          <Text style={styles.cartTitleText}>{data.restaurant.name}</Text>
        </View>
        <ScrollView>
          <View>
            {itemDetail.map((item) => {
              return (
                <CartListItems
                  key={item.id}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  description={item.description}
                  image={item.image}
                  itemId={item.id}
                  navigation={navigation}
                  table={tableNumber}
                />
              );
            })}
          </View>
          <View style={styles.headCheckout}>
            <Text style={styles.headCheckoutText}>Total Price</Text>
            <Text style={styles.headPriceText}>{currencyFormat(myPrice)},-</Text>
          </View>
          <View>
            <Snackbar
              visible={message.visible}
              onDismiss={() => setMessage({ visible: false })}
              action={{
                label: "X",
              }}
            >
              Name & Email is required.
            </Snackbar>
          </View>
          <View style={stylesSignIn.container}>
            <View style={stylesSignIn.wrapperInput}>
              <View style={stylesSignIn.formInputCart}>
                <TextInput
                  label="Name"
                  value={name}
                  mode={"outlined"}
                  style={{
                    backgroundColor: Color.white,
                    height: 45,
                    fontSize: 13,
                    marginBottom: 3,
                  }}
                  theme={{ colors: { text: Color.dark, primary: Color.red } }}
                  onChangeText={(name) => setName(name)}
                />
                <TextInput
                  label="Phone Number"
                  value={phoneNumber}
                  mode={"outlined"}
                  style={{
                    backgroundColor: Color.white,
                    height: 45,
                    fontSize: 13,
                    marginBottom: 3,
                  }}
                  theme={{ colors: { text: Color.dark, primary: Color.red } }}
                  onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
                />
                <TextInput
                  label="Email"
                  value={email}
                  mode={"outlined"}
                  style={{
                    backgroundColor: Color.white,
                    height: 45,
                    fontSize: 13,
                    marginTop: 3,
                  }}
                  theme={{ colors: { text: Color.dark, primary: Color.red } }}
                  onChangeText={(email) => setEmail(email)}
                />
              </View>
            </View>
          </View>
        </ScrollView>
        {Object.keys(cart).length > 0 && (
          <TouchableOpacity style={styles.fabRestaurant2} onPress={checkInput}>
            <View style={styles.btnAddChart}>
              <Text style={styles.textAddChart}>Checkout</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
}

export default CartScreen;

const stylesSignIn = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 70,
  },
  formInputCart: {
    width: width / 1.5,
    marginBottom: 10,
  },
  wrapperInput: {
    backgroundColor: Color.white,
    width: width / 1.3,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
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
});
