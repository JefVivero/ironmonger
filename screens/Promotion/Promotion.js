import React, { useEffect, useState, useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import Loading from '../../components/Loading'

import { getCurrentUser, getDocumentById } from '../../utils/actions'
import UserGuest from './UserGuest'
import UserLogged from './UserLogged'

export default function Promotion({ navigation }) {

    const [Login, setLogin] = useState(null)
    const [typeUser, setTypeUser] = useState(null)
    const [reloadUser, setReloadUser] = useState(false)  

    useFocusEffect(
        useCallback(() => {
            
            const user = getCurrentUser()
            user ? setLogin(true) : setLogin(false)   
            async function GetType(){
                const response = await getDocumentById("TypeUsers", user.uid)
                setTypeUser(response.document.TypeUser)
            }
            GetType()
        }, [])        
    )      

    if(Login==null){
        return <Loading
            isVisible={true} text="Cargando..."
        />
    }
    
    return Login ? <UserLogged navigation={navigation} typeUser={typeUser}/> : <UserGuest navigation={navigation}/>
}

const styles = StyleSheet.create({})
