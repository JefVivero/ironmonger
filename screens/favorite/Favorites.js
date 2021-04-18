import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet, View, Text  } from 'react-native'
import Loading from '../../components/Loading'
import { useFocusEffect } from '@react-navigation/native'
import firebase from 'firebase/app'

import UserGuest from './UserGuest'
import UserLogged from './UserLogged'
import { getFavorites } from '../../utils/actions'

export default function Favorites({ navigation }) {
    const [Login, setLogin] = useState(null)
    const [userData, setUserData] = useState(null)    
    const [favorites, setFavorites] = useState(null)  
    const [loadeer, setloadeer] = useState(false)
    const [loading, setLoading] = useState(false)

    useFocusEffect(
        useCallback(() => {  
            async function GetInfo(){
                firebase.auth().onAuthStateChanged((user) => {
                    user ? setUserData(user) : setUserData(null)
                    user ? setLogin(true) : setLogin(false)
                }) 
                setLoading(true)
                const response = await getFavorites()                
                response.statusResponse && setFavorites(response.favorites)   
                setLoading(false)              
            }            
            GetInfo()
            setloadeer(false)
        }, [userData, loadeer])
    )

    if(Login==null){
        return <Loading
            isVisible={true} text="Cargando..."
        />
    }         

    return (
        <View style={styles.viewBody}>
           { 
            Login ? (
                     <UserLogged 
                        navigation={navigation} 
                        userData={userData} 
                        favorites={favorites}
                        setFavorites={setFavorites}
                        setloadeer={setloadeer}
                    /> 
                    ):(
                        <UserGuest navigation={navigation} />    
                    )
            }
            <Loading isVisible={loading} text="Cargando..."/>
        </View>
    )
}


const styles = StyleSheet.create({
    viewBody:{
        flex: 1,
        marginTop: 5,
    },
})
