import React, { useEffect, useState, useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import Loading from '../../components/Loading'

import { getCurrentUser, isUserLogged } from '../../utils/actions'
import UserGuest from './UserGuest'
import UserLogged from './UserLogged'

export default function Promotion() {

    const [Login, setLogin] = useState(null)

    useFocusEffect(
        useCallback(() => {
            const user = getCurrentUser()

            user ? setLogin(true) : setLogin(false)
           // setLogin(isUserLogged())
        }, [])
    )

    if(Login==null){
        return <Loading
            isVisible={true} text="Cargando..."
        />
    }
    

    return Login ? <UserLogged/> : <UserGuest/>
}

const styles = StyleSheet.create({})
