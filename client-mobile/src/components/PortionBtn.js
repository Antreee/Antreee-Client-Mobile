import { useState } from "react"
import { Button } from "react-native-paper"
import styles from "../../assets/styles/styles"
import Color from "../assets/Color"

export default function PortionBtn({ data }) {
   const [portion, setPortion] = useState(1)
   console.log(portion)
   // console.log(data)
   return (
      <>
         <Button
            style={styles.btnPortion}
            mode="contained"
            labelStyle={{ fontSize: 20, color: Color.red }}
            onPress={() => setPortion(data.key)}>
            {data.key}
         </Button>
      </>
   )
}