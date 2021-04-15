import React,{ useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Loading from '../../components/Loading'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import firebase from 'firebase/app'

import { getCurrentUser, getDocumentById, isUserLogged } from '../../utils/actions'
import UserGuest from './UserGuest'
import UserLogged from './UserLogged'

export default function Account() {
    const [Login, setLogin] = useState(null)
    const [infoUser, setInfoUser] = useState(null)
    const [userData, setUser] = useState(null)    

    useFocusEffect(
        useCallback(() => {            
            async function GetInfo(){
                //const user = getCurrentUser()
                firebase.auth().onAuthStateChanged((user) => {
                    user ? setUser(user) : setUser(null)
                    user ? setLogin(true) : setLogin(false)
                })
                
                const response = await getDocumentById("TypeUsers", userData.uid)
                setInfoUser(response.document) 
            }            
            GetInfo()  
           // setLogin(isUserLogged())
        }, [Login])
    )    

    if(Login==null){
        return <Loading
            isVisible={true} text="Cargando..."
        />
    }

    return Login ? <UserLogged infoUser={infoUser} userData={userData}/> : <UserGuest/>
}

const styles = StyleSheet.create({})
