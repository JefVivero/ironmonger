import React, {useState} from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Input, Button, Icon } from 'react-native-elements'
import { size } from 'lodash'
import { useNavigation } from '@react-navigation/native'

import { validateEmail } from '../../utils/helpers'
import { registerUser } from '../../utils/actions'
import Loading from '../Loading'

export default function RegisterForm() {

    const navigation = useNavigation()

    const [showPassword, setshowPassword] = useState(false)
    const [formData, setFormData] = useState(defaultFormValues())
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [errorConfirm, setErrorConfirm] = useState("")
    const [loading, setLoading] = useState(false)


    const DoOnChange=(e , type) =>{
        setFormData({...formData, [type]: e.nativeEvent.text})
    }

    const DoregisterUser= async()=>{
        if(!validateData()){
            return
        }

        setLoading(true)
        const result = await registerUser(formData.email, formData.password)
        setLoading(false)
        if(!result.StatusResponse){
            setErrorEmail(result.error)
            return
        }

        navigation.navigate("account")
    }

    const validateData= () =>{
        setErrorConfirm("")
        setErrorEmail("")
        setErrorPassword("")
        let isValid= true

        if(!validateEmail(formData.email)){
            setErrorEmail("Debes ingresar un email valido")
            isValid= false
        }

        if(size(formData.password)<6){
            setErrorPassword("Debes ingresar una contraseña mayor de 5 caracteres")
            isValid = false
        }

        if(size(formData.confirm)<6){
            setErrorConfirm("Debes ingresar una confirmacion de contraseña mayor de 5 caracteres")
            isValid = false
        }

        if(formData.password !== formData.confirm){
            setErrorPassword("La contraseña y la confirmacion no son iguales")
            setErrorConfirm("La contraseña y la confirmacion no son iguales")
            isValid= false
        }

        return isValid

    }

    return (
        <View style={styles.form}>
            <Input
                containerStyle={styles.input}
                placeholder="Ingresa tu email..."
                keyboardType="email-address"
                onChange={(e) => DoOnChange(e, "email")}
                errorMessage={errorEmail}
                defaultValue= {formData.email}
            />
            <Input
                containerStyle={styles.input}
                placeholder="Ingresa tu contraseña..."
                password={true}
                secureTextEntry={!showPassword}
                onChange={(e) => DoOnChange(e, "password")}
                errorMessage={errorPassword}
                defaultValue= {formData.password}
                rightIcon={
                <Icon
                    type="material-community"
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    iconStyle={styles.icon}
                    onPress={()=> setshowPassword(!showPassword)}
                />
                }
            />
            <Input
                containerStyle={styles.input}
                placeholder="Confirma tu contraseña..."
                password={true}
                secureTextEntry={!showPassword}
                onChange={(e) => DoOnChange(e, "confirm")}
                errorMessage={errorConfirm}
                defaultValue= {formData.confirm}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.icon}
                        onPress={()=> setshowPassword(!showPassword)}
                    />
                    }
            />
            <Button
                title="Registrar nuevo usuario"
                containerStyle={styles.btncontainer}
                buttonStyle={styles.btn}
                onPress={() => DoregisterUser()}
            />
            <Loading  isVisible={loading} text="Creando Cuenta"/>
        </View>
    )
}

const defaultFormValues = ()=>{
    return { email: "", password:"", confirm:""}
}


const styles = StyleSheet.create({
    form:{
        marginTop:30
    },
    input:{
        width: "100%"
    },
    btncontainer:{
        marginTop:20,
        width: "95%",
        alignSelf: "center"
    },
    btn:{
        backgroundColor: "#ad2c33"
    },
    icon:{
        color:"#c1c1c1"
    }
})


