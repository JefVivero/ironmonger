import { isEmpty } from 'lodash'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

import { updateDocument } from '../../utils/actions'

export default function ChangeAddressForm({Address, IdDoc, setShowModal, toastRef, setReloadUser}) {
    const [newAddres, setNewAddress] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()

    const onSubmit = async() =>{
        if(!ValidateForm()){
            return
        }

        setLoading(true)
        const result = await updateDocument("TypeUsers", IdDoc, {Address:newAddres})
        setLoading(false)
        
        if(!result.statusResponse){
            setError("Error al actualizar la dirección, por favor intentar mas tarde.")
            return
        }
        
        setReloadUser(true)
        toastRef.current.show("Se ha actualizado la dirección.", 2000)
        setShowModal(false) 
                       
        setTimeout(() => {
            navigation.navigate("account")
        }, 3000)
               
    }

    const ValidateForm=()=>{
        setError(null)

        if(isEmpty(newAddres)){
            setError("Debes ingresar la dirección")
            return false
        }

        if(newAddres === Address){
            setError("Debes ingresar una dirección diferente a la actual")
            return false
        }

        return true
    }

    return (
        <View style={styles.view}>
           <Input
            placeholder="Ingresa Dirección"
            containerStyle={styles.input}
            defaultValue={Address}
            onChange={(e) => setNewAddress(e.nativeEvent.text)}
            errorMessage= {error}
            rightIcon={{
                type: "material-community",
                name: "home-circle",
                color: "#c2c2c2"
            }}
           />
           <Button
            title= "Cambiar Dirección"
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
