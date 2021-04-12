import React from 'react'
import { StyleSheet, Text, View, ScrollView, Image} from 'react-native'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

export default function UserGuest() {
    const navigation = useNavigation()
    return (
        <ScrollView
         centerContent={true}
         style ={styles.viewBody}
        >
         <Image
             source= {require("../../assets/Logo.png")}
             resizeMode= "contain"
             style={styles.image}
         />
         <Text style={styles.title}>Consulta y conoce lo mejor de las Ferreterias</Text>
         <Text style={styles.description}> 
             Ingresa y conoce el mejor servicio para mantenerte atento de tus marcas, fabricantes y Ferreterias
             favoritas. Aquí podrás encontrar toda la información actualizada, precios reales y recibir todas
             promociones en vivo.
         </Text>
         <Button
             buttonStyle={styles.button}
             title="Ver tu perfil"
             onPress={()=> navigation.navigate("login")}
         />
        </ScrollView>
     )
}

const styles = StyleSheet.create({
    viewBody:{
        marginHorizontal:30
    },
    image:{
        height:300,
        width: "100%",
        marginBottom: 10
    },
    title:{
        fontWeight:"bold",
        fontSize:19,
        marginVertical: 10,
        textAlign: "center"
    },
    description:{
        textAlign:"justify",
        marginBottom:20,
        color: "#000000"
    },
    button:{
        backgroundColor: "#ad2c33"
    } 
})
