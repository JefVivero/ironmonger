import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Input, Button, Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

import { getCurrentUser, GetTypeUser } from '../../utils/actions'
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
    const [typeUser, setTypeUser] = useState(null)

    const getTypeUsers= async() =>{
        setTypeUser( await GetTypeUser())        
    }

    useEffect(() => {
        setUser(getCurrentUser())
        setReloadUser(false)
        getTypeUsers()
    }, [reloadUser])

    return (
        <View>
            <Text>UserLogged</Text>
        </View>
    )
}

const styles = StyleSheet.create({})
