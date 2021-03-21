import React,{ useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Loading from '../../components/Loading'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

import { getCurrentUser, isUserLogged } from '../../utils/actions'
import UserGuest from './UserGuest'
import UserLogged from './UserLogged'

export default function Account() {
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
