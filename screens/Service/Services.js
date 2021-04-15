import React, { useRef, useState, useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { Icon } from 'react-native-elements'

import Loading from '../../components/Loading'
import Toast  from 'react-native-easy-toast'

import * as firebase from 'firebase'

import { getDocumentById } from '../../utils/actions'

export default function Services({ navigation }) {

    const toastRef = useRef()  
    const [user, setUser] = useState(null)
    const [Datauser, setDataUser] = useState(null)
    const [typeUser, setTypeUser] = useState(null)   
    const [loading, setloading] = useState(false)    

    const validateTypeUser = async() =>{  
        setloading(true)  
        const response = await getDocumentById("TypeUsers", Datauser.uid)  
        setloading(false)
        setTypeUser(response.document.TypeUser)
        
        if( typeUser == "IronMonger"){
            navigation.navigate("add-service")
        }else if(typeUser == "Iron"){
            toastRef.current.show("Debes ser usuario IronMonger para agregar Servicios.", 3000)
        }else{
            toastRef.current.show("Algo ha salido mal, por favor intenta mas tarde.", 3000)
        } 
    }

    useFocusEffect(
        useCallback(() => { 
            firebase.auth().onAuthStateChanged((userInfo) =>{            
                userInfo ? setUser(true) : setUser(false)
                userInfo && setDataUser(userInfo)
            })
        }, [])
    )

    return (
        <View style={styles.viewBody}>
            
            {  
                user && (
                    <Icon
                        type="material-community"
                        name="plus"
                        color="#0e5f6a"
                        reverse                        
                        containerStyle={styles.btnContainer}
                        onPress = {validateTypeUser}
                    /> 

                )                    
            }
            <Toast ref={toastRef} position="center" opacity={0.9}/>
            <Loading isVisible={loading} text={"Cargando..."}/>
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody:{
        flex: 1
    },
    btnContainer:{
        position: "absolute",
        bottom: 10,
        right: 10,
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2},
        shadowOpacity: 0.5
    }
})

