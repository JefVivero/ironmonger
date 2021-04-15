import React, { useState, useRef, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Input, Button, Icon } from 'react-native-elements'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { CloseSession, getCurrentUser, getDocumentById, GetTypeUser } from '../../utils/actions'
import Loading from '../../components/Loading'
import InfoUser from '../../components/account/InfoUser'
import Toast  from 'react-native-easy-toast'
import firebase from 'firebase/app'

export default function UserLogged({infoUser, userData}) {
    const toastRef = useRef()
    const navigation = useNavigation()

    const [loading, setloading] = useState(false)
    const [loadingText, setloadingText] = useState("")
    const [users, setUser] = useState(userData)
    const [reloadUser, setReloadUser] = useState(false)
    const [typeUser, setTypeUser] = useState(null)

    
    const getTypeUsers= async() =>{
        setTypeUser( await GetTypeUser())        
    }

    /*useFocusEffect(
        useCallback(() => {    
            //console.log(user)
            firebase.auth().onAuthStateChanged((user) => {
                user ? setUser(user) : setUser(null)
            })
           
            setReloadUser(false)  
        }, [reloadUser])
    )*/


    useEffect(() => {
        //setUser(getCurrentUser())  
        setReloadUser(false) 
        //getTypeUsers()
    }, [reloadUser])

    return (
        <View style={styles.container}>
            { 
                users && (
                    <View>
                        <InfoUser 
                            user={users} 
                            setloading={setloading} 
                            setloadingText={setloadingText}
                            toastRef ={toastRef}
                            setReloadUser ={setReloadUser}
                            typeUsers = {infoUser}
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
        backgroundColor: "#0e5f6a",
        borderBottomWidth: 1,
        borderBottomColor: "#0e5f6a",
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
