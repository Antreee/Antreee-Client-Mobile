import { View, Text, Image } from "react-native";
import styles from '../../assets/styles/styles'

function StackDetail({ route, navigation }) {
   const { resto } = route.params
   const myCuisine = resto.cuisine.join(', ')
   const able = () => {
      if (resto.available) {
         return <Text style={styles.available}> <Text style={styles.available}>OPEN</Text> {resto.openingHours}</Text>
      }
   }

   const menuListItems = () => {
      return (
         <>
            {
               resto.menus.map((menu, index) => {
                  return (
                     <>
                        <View key={index} style={styles.menuListItem}>
                           <Text style={styles.menuCategoryName}>{Object.keys(menu)}</Text>
                        </View>
                        <View style={styles.itemsList}>
                           {
                              menu[Object.keys(menu)].map((item, index) => {
                                 return (
                                    <View key={index} style={styles.itemListItem}>
                                       <View style={styles.itemListItemLeft}>
                                          <Text style={styles.itemListItemName}>{item.name}</Text>
                                          <Text style={styles.itemListItemPrice}>{item.price}</Text>
                                       </View>
                                       <View style={styles.itemListItemRight}>
                                          <Text style={styles.itemListItemDesc}>{item.description}</Text>
                                       </View>
                                    </View>
                                 )
                              }
                              )
                           }
                        </View>
                     </>
                  )
               }
               )
            }
         </>
      )

   }

   return (
      <View style={styles.container}>
         <View style={styles.backImg}>
            <Image
               source={{ uri: resto.mainImageUrl }}
               style={styles.mainImageUrl} />
         </View>
         <View style={styles.doubleBtn}>
            <View style={styles.btnMap} />
            <View style={styles.btnLove} />
         </View>
         <View style={styles.headTitleWrap}>
            <Text style={styles.headTitle}>{resto.name}</Text>
            <Text style={styles.cuisine}>{myCuisine}</Text>
         </View>
         <View style={styles.restoAddress}>
            <View style={styles.restoAddressIcon} />
            <Text style={styles.restoAddressText}>{resto.address}</Text>
         </View>
         <View style={styles.restoAvailable}>
            <View style={styles.restoAvailableIcon} />
            {
               able()
            }
         </View>
         <View style={styles.menuListWrap}>
            <View style={styles.menuCategory}>
               {
                  menuListItems()
               }
            </View>
         </View>
      </View>
   );
}

export default StackDetail