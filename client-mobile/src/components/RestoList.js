import { TouchableOpacity, View, Text, Image } from "react-native"
// Styles ==================================
import styles from '../../assets/styles/styles';
import homeStyles from '../../assets/styles/homeStyles';
import fontStyles from '../../assets/styles/fontStyles';
import restaurant from '../../data/resto';

export default function RestoList({ resto, navigation }) {

   function doDetail(id) {
      navigation.navigate('StackDetail', { id })
   }

   return (
      <TouchableOpacity onPress={() => doDetail(resto._id)}>
         <View style={homeStyles.mainCard}>
            <View style={homeStyles.cardImg}>
               <Image style={homeStyles.imgStyle} source={{ uri: resto.logoUrl }} />
            </View>
            <View style={homeStyles.cardDsc}>
               <Text
                  style={fontStyles.cardRestoTitle}>{resto.name}
               </Text>
               <Text
                  style={fontStyles.cardRestoAddress}>{resto.address}
               </Text>
               <Text
                  style={fontStyles.cardRestoNation}>Indonesian
               </Text>
            </View>
         </View>
      </TouchableOpacity>
   )
}