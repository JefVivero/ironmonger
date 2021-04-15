import { isEmpty } from 'lodash'
import React, { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

import { updateDocument } from '../../utils/actions'

export default function ChangeTypeUserForm({TypeUser, IdDoc, setShowModal, toastRef, setReloadUser}) {
    const [newPhone, setPhone] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()

    setShowModal(false)

    const onSubmit = async() =>{
        let user
        if(TypeUser === "IronMonger"){
            user= "Iron"
        }else{
            user= "IronMonger"
        }

        setLoading(true)
        const result = await updateDocument("TypeUsers", IdDoc, { TypeUser:user })
        setLoading(false)
        
        if(!result.statusResponse){
            toastRef.current.show("Error al cambiar el tipo de usuario. Por favor intenta mas tarde.", 2000)            
            return
        }
        
        setReloadUser(true)
        toastRef.current.show("Se ha modificado el tipo de usuario.", 2000) 
                       
        setTimeout(() => {
            navigation.navigate("account")
        }, 3000)
               
    }
    

    return (
        <View style={styles.view}>
            {
                Alert.alert(
                    "Cambiar tipo de usuario",
                    "¿Estas seguro que quieres cambiar el tipo de usuario?",
                    [
                        {
                            text: "No",
                            style: "cancel"                    
                        },
                        {
                            text: "Sí",
                            onPress: () => {
                                onSubmit()
                            }
                        }
                    ],
                    { cancelable: true }
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    view:{
        alignItems: "center",
        paddingVertical: 10
    },
    input:{
        marginBottom: 10
    },
    btnContainer:{
        width: "95%"
    },
    btn:{
        backgroundColor: "#0e5f6a"
    }

})
