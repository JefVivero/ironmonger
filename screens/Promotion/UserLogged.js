import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Input, Button, Icon } from 'react-native-elements'
import { size } from 'lodash'

import { getCurrentUser, getMorePromotions } from '../../utils/actions'
import Loading from '../../components/Loading'
import InfoUser from '../../components/account/InfoUser'
import Toast  from 'react-native-easy-toast'
import ListPromotions from '../../components/Promotions/ListPromotions'



export default function UserLogged({ navigation, userData, infoUser, Promotions, startPromotions, setStartPromotions, setPromotions, limitIronmongers }) {
    const toastRef = useRef()

    const [loading, setloading] = useState(false)
    const [loadingText, setloadingText] = useState("")
    const [user, setUser] = useState(null)
    const [reloadUser, setReloadUser] = useState(false)
   

    useEffect(() => {
        setReloadUser(false)                

    }, [reloadUser])

    const handleLoadMore = async() =>{
        if(!startPromotions){
            return
        }
        setloading(true)
        const response = await getMorePromotions(limitIronmongers, startPromotions)
        if(response.statusResponse){
            setStartPromotions(response.startPromotions)
            setPromotions([...Promotions, ...response.Promotions])
        }
        setloading(false)
    }

    //console.log(infoUser)

    return (        
        <View style={styles.viewBody}>    
            {
                size(Promotions) > 0 ? (
                    <ListPromotions
                        Promotions={Promotions}
                        navigation={navigation}
                        handleLoadMore= {handleLoadMore}
                   />
                ) : (
                    <View style={styles.nofoundwiew}>
                        <Text style={styles.notfoundtext}>No hay promociones registradas.</Text>
                    </View>
                )
            }        
            {
                infoUser && (
                    infoUser.TypeUser ==="IronMonger" && (
                        <Icon
                            type="material-community"
                            name="plus"
                            color="#0e5f6a"
                            reverse
                            containerStyle={styles.btnContainer}
                            onPress ={()=> navigation.navigate("add-promotion", {infoUser, userData})}
                        /> 
                        ) 
                )         
            }
             
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody:{
        flex: 1,
        marginTop: 5,
    },
    btnContainer:{
        position: "absolute",
        bottom: 10,
        right: 10,
        alignSelf: "center",
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2},
        shadowOpacity: 0.5
    },
    nofoundwiew:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    notfoundtext:{
        fontSize: 18,
        fontWeight: "bold"
    },
})
