import React from 'react'
import { StyleSheet, Text, View, ScrollView, Image} from 'react-native'
import { Button } from 'react-native-elements'

export default function UserGuest({ navigation }) {
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
            <Text style={styles.title}>Administra tus ferreterias favoritas</Text>
            <Text style={styles.description}> 
                Para ver la informacion de tus ferreteros favoritos debes iniciar sesion en tu cuenta.
            </Text>
            { 
                <Button
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
        backgroundColor: "#0e5f6a"
    } 
})
