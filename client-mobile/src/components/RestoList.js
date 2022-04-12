export default function RestoList() {
   return (
      <TouchableOpacity onPress={() => doDetail()}>
         <View style={homeStyles.mainCard}>
            <View style={homeStyles.cardImg}>
               <Image style={homeStyles.imgStyle} source={{ uri: "https://storage.googleapis.com/assets.paprika.co.id/120x120/592804c99a279.jpg" }} />
            </View>
            <View style={homeStyles.cardDsc}>
               <Text
                  style={fontStyles.cardRestoTitle}>D'Raja Coffee
               </Text>
               <Text
                  style={fontStyles.cardRestoAddress}>Perumahan Cemara Asri, Jl. Boulevard No. 85 asdasasd sfsdfs sdfsdf ssdfsd ssdf dsfs sdfs
               </Text>
               <Text
                  style={fontStyles.cardRestoNation}>Indonesian
               </Text>
            </View>
         </View>
      </TouchableOpacity>
   )
}