import React, { useState, useCallback } from 'react'
import { StyleSheet, View, Text  } from 'react-native'
import Loading from '../../components/Loading'
import { useFocusEffect } from '@react-navigation/native'
import { Input, Button, Icon } from 'react-native-elements'
import firebase from 'firebase/app'

import { getDocumentById, getPromotions } from '../../utils/actions'
import UserGuest from './UserGuest'
import UserLogged from './UserLogged'

export default function Promotions({ navigation }) {
    const [Login, setLogin] = useState(null)
    const [infoUser, setInfoUser] = useState(null)
    const [userData, setUser] = useState(null)    
    const [ReloadUser, setReloadUser] = useState(false)
    const [Promotions, setPromotions] = useState([])
    const [startPromotions, setStartPromotions] = useState(null)
    
    const limitIronmongers = 7 

    useFocusEffect(
        useCallback(() => {            
            async function GetInfo(){
                firebase.auth().onAuthStateChanged((user) => {
                    user ? setUser(user) : setUser(null)
                    user ? setLogin(true) : setLogin(false)
                })
                
                const response = await getDocumentById("TypeUsers", userData.uid)
                setInfoUser(response.document) 

                const responsePromotions = await getPromotions(limitIronmongers)
                if(responsePromotions.statusResponse){
                    setStartPromotions(responsePromotions.startPromotion)
                    setPromotions(responsePromotions.promotions)
                }
            }            
            GetInfo()
            setReloadUser(true)  
        }, [userData])
    )

    if(Login==null){
        return <Loading
            isVisible={true} text="Cargando..."
        />
    }
    
    return Login ? <UserLogged 
                        navigation={navigation} 
                        userData={userData} 
                        infoUser={infoUser} 
                        Promotions={Promotions}
                        startPromotions={startPromotions}
                        setStartPromotions= {setStartPromotions}
                        setPromotions={setPromotions}
                        limitIronmongers={limitIronmongers}
                    /> : <UserGuest navigation={navigation}/>
           
}

const styles = StyleSheet.create({
    viewBody:{
        flex: 1
    },
    btnContainer:{
        position: "absolute",
        bottom: 10,
        alignSelf: "center",
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2},
        shadowOpacity: 0.5
    }
})
