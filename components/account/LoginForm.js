import React, {useState} from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Button, Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { isEmpty } from 'lodash'

import Loading from '../Loading'
import { validateEmail } from '../../utils/helpers'
import { LoginWithEmailAndPassword } from '../../utils/actions'

export default function LoginForm() {
    
    const navigation = useNavigation()

    const [showPassword, setshowPassword] = useState(false)
    const [formData, setFormData] = useState(defaultFormValues())
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const DoOnChange=(e , type) =>{
        setFormData({...formData, [type]: e.nativeEvent.text})
    }

    const doLogin =async() =>{
        if(!validateData()){
            return
        }

        setLoading(true)
        const result = await LoginWithEmailAndPassword(formData.email, formData.password)
        setLoading(false)
        if(!result.StatusResponse){
            setErrorEmail(result.error)
            setErrorPassword(result.error)
            return
        }
        navigation.navigate("account")

    }

    const validateData= () =>{
        setErrorEmail("")
        setErrorPassword("")
        let isValid= true

        if(!validateEmail(formData.email)){
            setErrorEmail("Debes ingresar un email valido.")
            isValid= false
        }

        if(isEmpty(formData.password)){
            setErrorPassword("Debes ingresar tu contraseña.")
            isValid = false
        }

        return isValid

    }

    return (
        <View style={styles.container}>
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
            <Button
                title="Iniciar Session"
                containerStyle={styles.btncontainer}
                buttonStyle={styles.btn}
                onPress={() => doLogin()}
            />
            <Loading  isVisible={loading} text="Iniciando Session"/>
        </View>
    )
}

const defaultFormValues = ()=>{
    return { email: "", password:""}
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: "center",
        justifyContent:"center",
        marginTop: 30
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
    },
    input:{
        width: "100%"
    }
})
