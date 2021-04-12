import { isEmpty } from 'lodash'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

import { updateProfile } from '../../utils/actions'

export default function ChangePhoneNumberForm({phoneNumber, setShowModal, toastRef, setReloadUser}) {

    const [newPhoneNumber, setNewPhoneNumber] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()

   const onSubmit = async() =>{
        if(!ValidateForm()){
            return
        }

        //console.log(newPhoneNumber)
        
       /* setLoading(true)
        const result = await updateProfile({ phoneNumber: newPhoneNumber})
        setLoading(false)
        
        if(!result.status){
            setError("Error al actualizar el telefono, intentar mas tarde.")
            return
        }
        
        setReloadUser(true)
        toastRef.current.show("Se ha actualizado el telefono.", 2000)
        setShowModal(false) 
                       
        setTimeout(() => {
            navigation.navigate("account")
        }, 3000)
            */  
    }

    const ValidateForm=()=>{
        setError("")

        if(isEmpty(newPhoneNumber)){
            setError("Debes ingresar un numero de telefono")
            return false
        }

        if(newPhoneNumber === phoneNumber){
            setError("Debes ingresar un numero de telefono diferente al actual")
            return false
        }

        return true
    }

    return (
        <View style={styles.view}>
           <Input
            placeholder="Ingresa tu numero de Telefono"
            containerStyle={styles.input}
            defaultValue={phoneNumber}
            onChange={(e) => setNewPhoneNumber(e.nativeEvent.text)}
            errorMessage= {error}
            rightIcon={{
                type: "material-community",
                name: "chevron-right",
                color: "#c2c2c2"
            }}
           />
           <Button
            title= "Cambiar Telefono"
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
