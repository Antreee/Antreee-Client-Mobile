import React, { useState, useEffect, useContext } from 'react'
import { Text, View, StyleSheet, Image, ActivityIndicator } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { RestaurantContext } from '../../components/Context'
import Color from '../../assets/Color'

function QrScanScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)
  const { restaurantState, setRestaurantState } = useContext(RestaurantContext)

  useEffect(() => {
    setScanned(false)
      ; (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync()
        setHasPermission(status === 'granted')
      })()
  }, [])

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true)
    const qrData = JSON.parse(data)

    navigation.navigate('RestaurantScreen', {
      id: qrData.restaurantId,
      tableNumber: qrData.tableNumber,
    })
    setRestaurantState(qrData)
  }

  if (hasPermission === null) {
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
          <Text>Requesting for camera permission</Text>
        </View>
      </>
    );
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  return (
    <View style={styles.container}>
      <Image
        style={{ height: 400, width: 400, zIndex: 1 }}
        source={require('../../assets/imgTemplate/scan.png')}
      />
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
})

export default QrScanScreen
