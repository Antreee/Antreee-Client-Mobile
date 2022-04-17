import { View, StyleSheet, ImageBackground } from 'react-native';
import { Button } from '@ui-kitten/components';


function Splash({ navigation }) {
   function onPressLearnMore() {
      navigation.navigate('Tabs');
   }
   return (
      <>
         <View style={styles.container}>
            <ImageBackground
               source={
                  require('../../assets/img/bg02.png')
               }
               resizeMode="cover"
               style={styles.image}>
               <Button style={styles.btn}
                  onPress={onPressLearnMore}
                  appearance='ghost'
                  status='warning'
               >
                  Geting Started
               </Button>
            </ImageBackground>
         </View>
      </>
   )

}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   indicator: {
      justifyContent: 'center',
      alignItems: 'center',
   },
   image: {
      flex: 1,
      justifyContent: "center",
      alignItems: 'center'
   },
   btn: {
      backgroundColor: '#FFFFFF50',
      borderColor: '#FFFFFF50',
      width: '40%',
      alignItems: 'center'
   }
});


export default Splash


/*
- Login per resto
   - Halaman profile
   - Halaman khusu lihat bookings, realtime kalau ada booking masuk
   - Halaman transaction history (Orders dan OrderDetails)
   - Dashboard earnings, total pendapatan per minggu atau per bulan
   - CRUD items
   - Update column available (true/false)
   - Customer favourite (Berapa customer favorite resto anda)
   - (Notify SMS atau WA customer kalau besok ada booking, atau meja sudah ready)

*/