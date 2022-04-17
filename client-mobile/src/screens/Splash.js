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