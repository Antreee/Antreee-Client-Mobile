import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { RestaurantContext } from "../../components/Context";


function QrScanScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const { restaurantState, setRestaurantState } = useContext(RestaurantContext);

  useEffect(() => {

    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);


  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);

    const qrData = JSON.parse(data);
    console.log("qrData", qrData);

    navigation.navigate("RestaurantScreen", {
      id: qrData.restaurantId,
      tableNumber: qrData.tableNumber,

    });
    setRestaurantState(qrData);
    setScanned(false)
  };


  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Image
        style={{ height: 400, width: 400, zIndex: 1 }}
        source={require('../../assets/imgTemplate/scan.png')}
      />
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});

export default QrScanScreen;
