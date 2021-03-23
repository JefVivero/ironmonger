import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Input, Button, Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { CloseSession, getCurrentUser } from '../../utils/actions'
import Loading from '../../components/Loading'
import InfoUser from '../../components/account/InfoUser'
import Toast  from 'react-native-easy-toast'


export default function UserLogged() {
    const toastRef = useRef()
    const navigation = useNavigation()

    const [loading, setloading] = useState(false)
    const [loadingText, setloadingText] = useState("")
    const [user, setUser] = useState(null)
    const [reloadUser, setReloadUser] = useState(false)

    useEffect(() => {
        setUser(getCurrentUser())
        setReloadUser(false)
    }, [reloadUser])

    return (
        <View style={styles.container}>
            { 
                user && (
                    <View>
                        <InfoUser 
                            user={user} 
                            setloading={setloading} 
                            setloadingText={setloadingText}
                            toastRef ={toastRef}
                            setReloadUser ={setReloadUser}
                        />
                    </View>
                )
            }
            
            <Button
                buttonStyle= {styles.btnCloseSession}
                titleStyle= {styles.btnCloseTitle}
                title="Cerrar Session"
                onPress={()=> {
                    CloseSession()
                    navigation.navigate("ironmongers")
                }}
            />
            <Toast ref={toastRef} position="center" opacity={0.9}/>
            <Loading isVisible={loading} text={loadingText}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        minHeight: "100%",
        backgroundColor: "#f9f9f9"
    },
    btnCloseSession:{
        marginTop:30,
        borderRadius: 5,
        backgroundColor: "#ad2c33",
        borderBottomWidth: 1,
        borderBottomColor: "#ad2c33",
        paddingVertical: 10,
        paddingHorizontal: 4
    },
    btnCloseTitle:{
        color: "#ffff"
    },
    toaste:{
        backgroundColor:'red'
    }
})
