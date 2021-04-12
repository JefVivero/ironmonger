import React from 'react'
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import { Divider } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import LoginForm from '../../components/account/LoginForm.js'

export default function Login() {
    return (
        <KeyboardAwareScrollView>
        <Image 
            source= {require("../../assets/Logo.png")}
            resizeMode= "contain"
            style={styles.image}
        />
        <View style={styles.container}>
            <LoginForm/>
            <CreateAccount/>
        </View>
        <Divider styles={styles.divider}/>
        </KeyboardAwareScrollView>
    )
}

function CreateAccount(props){

    const navigation = useNavigation()

    return (
        <Text 
            style={styles.register}
            onPress={()=> navigation.navigate("register")}
        >
            <Text style={styles.btnRegister}>
                Registrate!!!
            </Text>
        </Text>
    )
}

const styles = StyleSheet.create({
    image:{
        height:150,
        width: "100%",
        marginBottom: 20,
        marginTop:20
    },
    container:{
        marginHorizontal:40
    },
    divider:{
        backgroundColor: "#0e5f6a",
        margin: 40
    },
    register:{
        marginTop:15,
        marginHorizontal:10,
        alignSelf:"center"
    },
    btnRegister:{
        color:"#ad2c33",
        fontWeight:"bold"
    }
})
