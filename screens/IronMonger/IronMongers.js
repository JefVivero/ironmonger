import React, { useRef, useState, useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { Icon } from 'react-native-elements'
import { size } from 'lodash'
import Loading from '../../components/Loading'
import Toast  from 'react-native-easy-toast'

import * as firebase from 'firebase'

import { getDocumentById, getIronmongers, getMoreIronmongers } from '../../utils/actions'
import ListIronmongers from '../../components/ironmongers/ListIronmongers'

export default function IronMongers({ navigation }) {  
    const toastRef = useRef()  
    const [user, setUser] = useState(null)
    const [Datauser, setDataUser] = useState(null)
    const [typeUser, setTypeUser] = useState(null)   
    const [loading, setloading] = useState(false)    
    const [startIronmonger, setStartIronmonger] = useState(null)
    const [ironmongers, setIronmongers] = useState([])

    const limitIronmongers = 7             

    useFocusEffect(
        useCallback(() => { 
            async function getInfo(){
                firebase.auth().onAuthStateChanged((userInfo) =>{   
                    userInfo ? setDataUser(userInfo) : setDataUser(null)
                    userInfo ? setUser(true) : setUser(false)
                })
                setloading(true) 
                const response = await getIronmongers(limitIronmongers)
                if(response.statusResponse){
                    setStartIronmonger(response.startIronmonger)
                    setIronmongers(response.ironmongers)
                }
                if(Datauser){
                    const response2 = await getDocumentById("TypeUsers", Datauser.uid)
                    setTypeUser(response2.document.TypeUser)
                }
                setloading(false)
            }
            getInfo()
        }, [Datauser])
    )

    const validateTypeUser = async() =>{  
        
        if( typeUser === "IronMonger"){
            navigation.navigate("add-ironmonger")
        }else if(typeUser === "Iron"){
            toastRef.current.show("Debes ser usuario IronMonger para agregar Ferreterias.", 3000)
        }else{
            toastRef.current.show("Algo ha salido mal, por favor intenta mas tarde.", 3000)
        } 
    }  

    const handleLoadMore = async() =>{
        if(!startIronmonger){
            return
        }
        setloading(true)
        const response = await getMoreIronmongers(limitIronmongers, startIronmonger)
        if(response.statusResponse){
            setStartIronmonger(response.startIronmonger)
            setIronmongers([...ironmongers, ...response.ironmongers])
        }
        setloading(false)
    }

    return (
        <View style={styles.viewBody}>
            <Text style={styles.title}>Mantente atento a las ferreterias del momento.</Text>            
            {
                size(ironmongers) > 0 ? (
                    <ListIronmongers 
                        ironmongers={ironmongers}
                        navigation={navigation}
                        handleLoadMore= {handleLoadMore}
                    />
                ) : (
                    <View style={styles.nofoundwiew}>
                        <Text style={styles.notfoundtext}>No hay ferreterias registradas.</Text>
                    </View>
                )
            }
            {  
                user && (
                        <Icon
                            type="material-community"
                            name="plus"
                            color="#0e5f6a"
                            reverse                        
                            containerStyle={styles.btnContainer}
                            onPress = {validateTypeUser}
                        /> 
                )                    
            }
            <Toast ref={toastRef} position="center" opacity={0.9}/>
            <Loading isVisible={loading} text={"Cargando..."}/>
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
    title:{
        alignSelf: "center",
        fontWeight :"bold",
        paddingVertical: 5,
        borderWidth: 2,
        textAlign: "center",
        marginTop: 5,
        paddingHorizontal: 30,
        backgroundColor: "#0e5f6a",
        color: "#fff"
    }
})
