import { useContext } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import styles from "../../assets/styles/styles";
import { CartContext, RestaurantContext } from "./Context";
import Color from "../assets/Color";

export default function CardListMenu({ myMenus, navigation, id, tableNumber }) {
  // const [mutationAddToCart, { data, loading, error }] = useMutation(ADD_TO_CART)
  const { cart, setCart } = useContext(CartContext);
  const { restaurantState, setRestaurantState } = useContext(RestaurantContext);

  function currencyFormat(num) {
    return "Rp." + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  // == CART FUNCTION ==
  function increment(itemId) {
    if (!cart[itemId]) {
      setCart({ ...cart, [itemId]: 1 });
    } else {
      setCart({ ...cart, [itemId]: (cart[itemId] += 1) });
    }
  }

  function decrement(itemId) {
    if (cart[itemId] > 0) {
      setCart({ ...cart, [itemId]: (cart[itemId] -= 1) });
    }
    if (cart[itemId] == 0) {
      delete cart[itemId];
      setCart({ ...cart });
    }
  }

  if (myMenus.length > 0) {
    return (
      myMenus && (
        <>
          {myMenus.map((menu, index) => {
            return (
              <View key={index} style={{}}>
                <View style={styles.menuListItem}>
                  <Text style={styles.menuCategoryName}>{Object.keys(menu)}</Text>
                </View>
                <View style={styles.listWrapper}>
                  {menu &&
                    menu[Object.keys(menu)].map((item, index) => {
                      return (
                        <View
                          key={index}
                          style={
                            restaurantState.restaurantId === id
                              ? styles.itemListItemLong
                              : styles.itemListItem
                          }
                        >
                          <View style={{ alignItems: "center" }}>
                            <Image source={{ uri: item.imageUrl }} style={styles.imgCardMenu} />
                            <View style={styles.itemListItemLeft}>
                              <Text style={styles.itemListItemName}>{item.name}</Text>
                              <Text style={styles.itemListItemPrice}>
                                {currencyFormat(item.price)}
                              </Text>
                            </View>
                            <View style={styles.itemListItemRight}>
                              <Text style={styles.itemListItemDesc}>{item.description}</Text>
                            </View>
                          </View>
                          <View style={styles.orderList}>
                            {restaurantState.restaurantId === id && (
                              <>
                                <TouchableOpacity
                                  style={styles.button}
                                  onPress={() => decrement(item._id)}
                                >
                                  <Entypo name="squared-minus" size={30} color={Color.red} />
                                </TouchableOpacity>

                                <View style={styles.btnGoToCart}>
                                  <Text style={styles.itemCounter}>
                                    {cart[item._id] ? cart[item._id] : 0}
                                  </Text>
                                </View>
                                <TouchableOpacity
                                  style={styles.button}
                                  onPress={() => {
                                    increment(item._id);
                                  }}
                                >
                                  <Entypo name="squared-plus" size={30} color={Color.red} />
                                </TouchableOpacity>
                              </>
                            )}
                          </View>
                        </View>
                      );
                    })}
                </View>
              </View>
            );
          })}
        </>
      )
    );
  }
}
