import { isEmpty } from 'lodash'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

import { updateDocument } from '../../utils/actions'

export default function ChangePhoneNumberForm({Phone, IdDoc, setShowModal, toastRef, setReloadUser}) {
    const [newPhone, setPhone] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()

    const onSubmit = async() =>{
        if(!ValidateForm()){
            return
        }

        setLoading(true)
        const result = await updateDocument("TypeUsers", IdDoc, {Phone:newPhone})
        setLoading(false)
        
        if(!result.statusResponse){
            setError("Error al actualizar el WhatsApp, por favor intentar mas tarde.")
            return
        }
        
        setReloadUser(true)
        toastRef.current.show("Se ha actualizado el número de WhatsApp.", 2000)
        setShowModal(false) 
                       
        setTimeout(() => {
            navigation.navigate("account")
        }, 3000)
               
    }

    const ValidateForm=()=>{
        setError(null)

        if(isEmpty(newPhone)){
            setError("Debes ingresar el WhatsApp")
            return false
        }

        if(newPhone === Phone){
            setError("Debes ingresar un whatsApp diferente al actual")
            return false
        }

        return true
    }

    return (
        <View style={styles.view}>
           <Input
            placeholder="Ingresa el número de WhatsApp"            
            keyboardType="phone-pad"
            containerStyle={styles.input}
            defaultValue={Phone}
            onChange={(e) => setPhone(e.nativeEvent.text)}
            errorMessage= {error}
            rightIcon={{
                type: "material-community",
                name: "cellphone",
                color: "#c2c2c2"
            }}
           />
           <Button
            title= "Cambiar WhatsApp"
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
