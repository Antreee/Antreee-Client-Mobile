import { useState } from "react"
import { Button } from "react-native-paper"
import styles from "../../assets/styles/styles"
import Color from "../assets/Color"

export default function PortionBtn({ data }) {
   const [portion, setPortion] = useState('')
   // console.log(data)
   console.log(portion, "==")
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