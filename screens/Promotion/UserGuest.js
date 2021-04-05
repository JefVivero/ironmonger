import React from 'react'
import { StyleSheet, Text, View, ScrollView, Image} from 'react-native'
import { Button } from 'react-native-elements'
//import { useNavigation } from '@react-navigation/native'

export default function UserGuest({navigation}) {
    //const navigation = useNavigation()
    
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
        <Text style={styles.title}>Conoce las promociones del momento</Text>
        <Text style={styles.description}> 
            Para ver la informacion que tienen los ferreteros para tí debes iniciar session en tu cuenta.
        </Text>
      { <Button
            buttonStyle={styles.button}
            title="Ingresar a la cuenta"
            onPress={() => navigation.navigate("login")}
        />
      }
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
        marginTop: 20,
        marginBottom:20,
        color: "#000000"
    },
    button:{
        backgroundColor: "#ad2c33"
    } 
})
