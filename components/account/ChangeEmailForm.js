import { isEmpty } from 'lodash'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Button, Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

import { reauthenticate, updateEmail, updateProfile } from '../../utils/actions'
import { validateEmail } from '../../utils/helpers'

export default function ChangeEmailForm({email, setShowModal, toastRef, setReloadUser}) {
    const [newEmail, setNewEmail] = useState(email)
    const [password, setPassword] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorPassword, setErrorPassword] = useState(null)
    const [showPassword, setshowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()

    const onSubmit = async() =>{
        if(!ValidateForm()){
            return
        }

        setLoading(true)
        const resultAuth = await reauthenticate(password)
                
        if(!resultAuth.status){
            setLoading(false)
            setErrorPassword("Contraseña incorrecta.")
            return
        }
        const result = await updateEmail(newEmail)
        setLoading(false)

        if(!result.status){
            setErrorEmail("No se puede cambiar por este correo, ya esta en uso por otro usuario.")
            return
        }
        
        setReloadUser(true)
        toastRef.current.show("Se ha actualizado el email.", 2000)
        setShowModal(false) 
                       
        setTimeout(() => {
            navigation.navigate("account")
        }, 3000)
               
    }

    const ValidateForm=()=>{
        setErrorEmail(null)
        setErrorPassword(null)
        let isValid = true

        if(!validateEmail(newEmail)){
            setErrorEmail("Debes ingresar un Email Valido.")
            isValid= false
        }

        if(newEmail === email){
            setErrorEmail("Debes ingresar un Email diferente al actual.")
            isValid= false
        }

        if(isEmpty(password)){
            setErrorPassword("Debes ingresar tu contraseña.")
            isValid= false
        }

        return isValid
    }

    return (
        <View style={styles.view}>
           <Input
            placeholder="Ingresa el nuevo correo"
            containerStyle={styles.input}
            keyboardType="email-address"
            defaultValue={email}
            onChange={(e) => setNewEmail(e.nativeEvent.text)}
            errorMessage= {errorEmail}
            rightIcon={{
                type: "material-community",
                name: "at",
                color: "#c2c2c2"
            }}
           />
            <Input
            placeholder="Ingresa tu contraseña"
            containerStyle={styles.input}
            defaultValue={password}
            onChange={(e) => setPassword(e.nativeEvent.text)}
            errorMessage= {errorPassword}
            password={true}
            secureTextEntry = {!showPassword}
            rightIcon={
                <Icon
                    type= "material-community"
                    name= {showPassword ? "eye-off-outline" : "eye-outline"}
                    iconStyle ={{color: "c2c2c2"}}
                    onPress= {()=> setshowPassword(!showPassword)}
                />
            }
            />
            <Button
            title= "Cambiar Email"
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
        backgroundColor: "#ad2c33"
    }

})
