import { isEmpty, size } from 'lodash'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Button, Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

import { reauthenticate, updateEmail, updatePassword, updateProfile } from '../../utils/actions'
import { validateEmail } from '../../utils/helpers'

export default function ChangePasswordForm({setShowModal, toastRef}) {
    const [newpassword, setNewPassword] = useState(null)
    const [currentpassword, setCurrentPassword] = useState(null)
    const [confimPassword, setConfimPassword] = useState(null)
    const [errornewPassword, setErrorNewPassword] = useState(null)
    const [errorCurrentPassword, setErrorCurrentPassword] = useState(null)
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(null)
    const [showPassword, setshowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()

    const onSubmit = async() =>{
        if(!ValidateForm()){
            return
        }
        
        setLoading(true)
        const resultAuth = await reauthenticate(currentpassword)
                
        if(!resultAuth.status){
            setLoading(false)
            setErrorCurrentPassword("Contraseña incorrecta.")
            return
        }
        const result = await updatePassword(newpassword)
        setLoading(false)

        if(!result.status){
            setErrorNewPassword("Hubo un problema cambiando la contraseña, por favor intente mas tarde.")
            return
        }
        
        toastRef.current.show("Se ha actualizado la contraseña.", 3000)
        setShowModal(false) 
                       
       /* setTimeout(() => {
            navigation.navigate("account")
        }, 3000)*/        
               
    }

    const ValidateForm=()=>{
        setErrorNewPassword(null)
        setErrorCurrentPassword(null)
        setErrorConfirmPassword(null)
        
        let isValid = true

        if((isEmpty(currentpassword))){
            setErrorCurrentPassword("Debes ingresar tu contraseña actual.")
            isValid= false
        }

        if(size(newpassword)< 6){
            setErrorNewPassword("Debes ingresar una nueva contraseña de al menos 6 caracteres.")
            isValid= false
        }

        if(size(confimPassword)< 6){
            setErrorConfirmPassword("Debes ingresar una confirmacion de contraseña de al menos 6 caracteres.")
            isValid= false
        }

       if(confimPassword !== newpassword){
            setErrorNewPassword("La nueva contraseña y la confirmacion no son iguales.")
            setErrorConfirmPassword("La nueva contraseña y la confirmacion no son iguales.")
            isValid= false
       }

       if(newpassword === currentpassword){
        setErrorCurrentPassword("La nueva contraseña debe ser diferente a la actual.")
        setErrorNewPassword("La nueva contraseña debe ser diferente a la actual.")
        setErrorConfirmPassword("La nueva contraseña debe ser diferente a la actual.")
        isValid= false
       }

        return isValid
    }

    return (
        <View style={styles.view}>         
            <Input
            placeholder="Ingresa tu contraseña actual."
            containerStyle={styles.input}
            defaultValue={currentpassword}
            onChange={(e) => setCurrentPassword(e.nativeEvent.text)}
            errorMessage= {errorCurrentPassword}
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
            <Input
            placeholder="Ingresa tu nueva contraseña."
            containerStyle={styles.input}
            defaultValue={newpassword}
            onChange={(e) => setNewPassword(e.nativeEvent.text)}
            errorMessage= {errornewPassword}
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
            <Input
            placeholder="Ingresa tu confirmacion de nueva contraseña."
            containerStyle={styles.input}
            defaultValue={confimPassword}
            onChange={(e) => setConfimPassword(e.nativeEvent.text)}
            errorMessage= {errorConfirmPassword}
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
            title= "Cambiar Contraseña"
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
