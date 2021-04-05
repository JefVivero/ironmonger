import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Input, Button, Icon } from 'react-native-elements'


import { getCurrentUser } from '../../utils/actions'
import Loading from '../../components/Loading'
import InfoUser from '../../components/account/InfoUser'
import Toast  from 'react-native-easy-toast'


export default function UserLogged({ navigation, typeUser }) {
    const toastRef = useRef()

    const [loading, setloading] = useState(false)
    const [loadingText, setloadingText] = useState("")
    const [user, setUser] = useState(null)
    const [reloadUser, setReloadUser] = useState(false)
   

    

    useEffect(() => {
        setUser(getCurrentUser())
        setReloadUser(false)                

    }, [reloadUser])

    

    return (        
        <View style={styles.viewBody}>
            <Text>UserLogged</Text>
            {
              typeUser ==="IronMonger" && (
                <Icon
                    type="material-community"
                    name="plus"
                    color="#0e5f6a"
                    reverse
                    containerStyle={styles.btnContainer}
                /> 
                )             
            }
             
        </View>
    )
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
