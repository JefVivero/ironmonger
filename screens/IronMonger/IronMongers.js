import React, { useEffect, useRef, useState, useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { Input, Button, Icon } from 'react-native-elements'
import Loading from '../../components/Loading'
import Toast  from 'react-native-easy-toast'

import * as firebase from 'firebase'

import { getCurrentUser, getDocumentById, GetTypeUser } from '../../utils/actions'

export default function IronMongers({ navigation }) {  
    const toastRef = useRef()  
    const [user, setUser] = useState(null)
    const [IstypeUser, setIsTypeUser] = useState(false)
    const [typeUser, setTypeUser] = useState(null)   
    const [loading, setloading] = useState(false)
         
   /* useFocusEffect(
        useCallback(() => { 
            async function GetData(){   
                console.log("Entró!!!")             
                const response = await getDocumentById("TypeUsers", user.uid)  
                setTypeUser(response.document.TypeUser)
                if( typeUser === "IronMonger"){
                    setIsTypeUser(true)
                }else{
                    setIsTypeUser(false)
                }
                //console.log(typeUser)  
                //console.log(user)  

            }
            firebase.auth().onAuthStateChanged((userInfo) =>{
                //userInfo ? setIsTypeUser(true) : setIsTypeUser(false)
                setUser(userInfo)
                GetData()
            })
        }, [])
    )*/

    const validateTypeUser = async() =>{  
        setloading(true)  
        const response = await getDocumentById("TypeUsers", user.uid)  
        setloading(false)
        setTypeUser(response.document.TypeUser)
        
        if( typeUser === "IronMonger"){
            console.log("Funca!!!")
        }else if(typeUser === "Iron"){
            toastRef.current.show("Debes ser usuario IronMonger para agregar Ferreteros.", 3000)
        }else{
            toastRef.current.show("Algo ha salido mal, por favor intenta mas tarde.", 3000)
        } 
        
    }
    

    useFocusEffect(
        useCallback(() => { 
            setUser(getCurrentUser())
            setTypeUser(null)
            firebase.auth().onAuthStateChanged((userInfo) =>{            
            userInfo ? setIsTypeUser(true) : setIsTypeUser(false)
            })
        }, [])
    )

    return (
        <View style={styles.viewBody}>
            <Text>IronMongers</Text>
            {  
                IstypeUser && (
                    <Icon
                        type="material-community"
                        name="plus"
                        color="#0e5f6a"
                        reverse
                        raised
                        containerStyle={styles.btnContainer}
                        onPress = { ()=> validateTypeUser() }
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
        alignSelf: "center",
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2},
        shadowOpacity: 0.5
    }
})
