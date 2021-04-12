import { isEmpty } from 'lodash'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

import { updateProfile } from '../../utils/actions'

export default function ChangeDisplayNameForm({displayName, setShowModal, toastRef, setReloadUser}) {
    const [newDisplayName, setNewDisplayName] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()

    const onSubmit = async() =>{
        if(!ValidateForm()){
            return
        }

        setLoading(true)
        const result = await updateProfile({ displayName: newDisplayName})
        setLoading(false)
        
        if(!result.status){
            setError("Error al actualizar nombres y apellidos, intentar mas tarde.")
            return
        }
        
        setReloadUser(true)
        toastRef.current.show("Se han actualizado nombres y apellidos.", 2000)
        setShowModal(false) 
                       
        setTimeout(() => {
            navigation.navigate("account")
        }, 3000)
               
    }

    const ValidateForm=()=>{
        setError(null)

        if(isEmpty(newDisplayName)){
            setError("Debes ingresar Nombres y Apellidos")
            return false
        }

        if(newDisplayName === displayName){
            setError("Debes ingresar Nombres y Apellidos diferentes a los actuales")
            return false
        }

        return true
    }

    return (
        <View style={styles.view}>
           <Input
            placeholder="Ingresa Nombres y Apellidos"
            containerStyle={styles.input}
            defaultValue={displayName}
            onChange={(e) => setNewDisplayName(e.nativeEvent.text)}
            errorMessage= {error}
            rightIcon={{
                type: "material-community",
                name: "account-circle-outline",
                color: "#c2c2c2"
            }}
           />
           <Button
            title= "Cambiar Nombres y Apellidos"
            containerStyle= {styles.btnContainer}
            buttonStyle= {styles.btn}
            onPress= {() => onSubmit()}
            loading={loading}
           />
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
