import React from 'react';
import { Text, Image, View, FlatList, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import styles from '../../assets/styles/styles';
import homeStyles from '../../assets/styles/homeStyles';
import { Button, Icone } from '@ui-kitten/components';
import fontStyles from '../../assets/styles/fontStyles';

export default RestaurantScreen = ({ navigation }) => {
   const Item = ({ name, imagesUrl, price }) => (
      <TouchableOpacity
         onPress={() => navigation.navigate('MenuDetailScreen', { id })}
      >
         <View style={{
            backgroundColor: 'white',
            height: 190,
            width: 160,
            fontWeight: 'bold',
            borderRadius: 8,
            justifyContent: 'flex-start',
            alignContent: 'center',
            textAlign: 'center',
            margin: 8,
            padding: 10,
            elevation: 3,
            shadowColor: '#171717',
         }}>
            <View style={{ backgroundColor: 'orange', borderRadius: 8 }}>
               <Image
                  style={{
                     height: 110,
                     width: 120,
                     borderRadius: 8,
                     textAlign: 'center',
                     alignSelf: 'center',
                  }}
                  source={{ uri: imagesUrl[0] }}
               />
            </View>
            <Text
               style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  marginTop: 5,
                  textAlign: 'left',
               }}
            >
               {name}
            </Text>
            <Text style={{ fontSize: 14, marginTop: 5, textAlign: 'left' }}>
               Rp {price.toLocaleString('id-ID')}
            </Text>
         </View>
      </TouchableOpacity>
   )

   const renderMenu = ({ item }) => (
      <Item
         name={item.name}
         imagesUrl={item.imagesUrl}
         price={item.price}
      />
   )

   return (
      <>
         <View style={styles.container}>
            {/* <SafeAreaView> */}
            {/* ======= */}
            <Image style={homeStyles.imgStyle} source={{ uri: "https://storage.googleapis.com/assets.paprika.co.id/120x120/592804c99a279.jpg" }} />
            <View>
               <Text
                  style={{
                     fontSize: 18,
                     fontWeight: 'bold',
                     marginTop: 5,
                     textAlign: 'left',
                  }}
               >
                  D'Raja Coffee
               </Text>
               <Text
                  style={{
                     fontSize: 8,
                     marginTop: 5,
                     textAlign: 'left',
                     color: 'gray'
                  }}
               >
                  Indonesian
               </Text>

               <Text
                  style={{
                     fontSize: 12,
                     marginTop: 5,
                     textAlign: 'left',
                     flexWrap: 'wrap'
                  }}
               >
                  Perumahan Cemara Asri, Jl. Boulevard No. 85 asdasasd
               </Text >
               <Text
                  style={{
                     fontSize: 8,
                     marginTop: 5,
                     textAlign: 'left',
                     color: 'gray'
                  }}
               >Buka hari ini sampai 22:00</Text>
               <View style={{
                  paddingHorizontal: 16,
                  flex: 8,
                  justifyContent: 'center',
               }}>
                  <FlatList
                     data={[{
                        "name": "Nasi Goreng Cabe Rawit Spesial",
                        "price": 60000,
                        "imagesUrl": ["https://www.primarasa.co.id/images/images/nasi-goreng-cabai-rawit.jpg", "https://d1sag4ddilekf6.azureedge.net/compressed/items/IDITE2022020213384910010/photo/menueditor_item_a906b3cb0c2547c5842f6dc0722f836b_1643808985335753506.jpg"],
                        "description": "Nasi Goreng dengan cabe rawit",
                        "available": true
                     },
                     {
                        "name": "Es Kopi Jelly",
                        "price": 35400,
                        "imagesUrl": ["https://awsimages.detik.net.id/community/media/visual/2020/04/30/76a65ca3-bf8c-4708-9752-3c5cb58fec96.jpeg?w=1368", "https://img-global.cpcdn.com/recipes/81d209f7d55c5cee/1200x630cq70/photo.jpg"],
                        "available": true
                     }]}
                     renderItem={renderMenu}
                     keyExtractor={(item) => item.name}
                     numColumns={2}
                  />
               </View>
            </View>
         </View>
      </>
   )
}