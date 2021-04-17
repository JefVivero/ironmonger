import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Alert, ScrollView, Dimensions, StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { getDocumentById } from '../../utils/actions'
import { ListItem, Icon } from 'react-native-elements'
import { useFocusEffect } from '@react-navigation/native'
import firebase from 'firebase/app'
import MapIronmonger from '../ironmongers/MapIronmonger'

import CarouselImages from '../CarouselImages'
import Loading from '../Loading'
import { formatPhone } from '../../utils/helpers'
import { map } from 'lodash'

const widthScreen = Dimensions.get("window").width

export default function Promotion({ navigation , route }) {
    const { id, name }  = route.params   
    const [promotion, setPromotion] = useState(null)
    const [activeSlide, setActiveSlide] = useState(0)
    const [userLogged, setuserLogged] = useState(false)
    const [ironMonger, setIronMonger] = useState(null)  

    navigation.setOptions({title: name})    

    firebase.auth().onAuthStateChanged((user) => {
        user ? setuserLogged(true) : setuserLogged(false)
    })

    useFocusEffect(
        useCallback(() => {
            async function getDoc(){
                const response = await getDocumentById("promotions", id)
                    if(response.statusResponse){
                        setPromotion(response.document)
                    }else{
                        setPromotion({})
                        Alert.alert("Ocurrió un problema cargando la promoción. Por favor intente mas tarde.")
                    }
            }           
            getDoc()
        }, [])
    )
    
    useEffect(() => {
       (async()=>{
            const response2 = await getDocumentById("ironmongers",promotion.idIronMonger)
            if(response2.statusResponse){
                setIronMonger(response2.document) 
            }
       })()
    }, [promotion])

    if(!promotion){
        return(
            <Loading isVisible={true} text="Cargando"/>
        )
    }

    
    return (
        <ScrollView style={styles.viewbody}>
            <CarouselImages 
                images={promotion.images} 
                height={250}
                width ={widthScreen}
                activeSlide={activeSlide}
                setActiveSlide={setActiveSlide}
            />
            <TitlePromotion
                name={promotion.name}
                description = {promotion.description}
            />
            {
                ironMonger && (
                    <IronmongerInfo
                        name={ironMonger.name}
                        location={ironMonger.location}
                        address={ironMonger.address}
                        email= {ironMonger.email}
                        phone={formatPhone(ironMonger.callingCode, ironMonger.phone)}
                    />
                )
            }
        </ScrollView>
    )
}



function TitlePromotion({name, description }){
    return (
        <View style={styles.viewTitle}> 
            <View style={styles.viewironmContainer}>
                <Text style={styles.nameironmonger}>{name}</Text>
            </View>
            <Text style={styles.descriptionironm}>{description}</Text>
        </View>
    )
}

function IronmongerInfo({name, location, address, email, phone}){
    const listInfo = [
        { text: name, iconName: "home-circle"},
        { text: address, iconName: "map-marker"},
        { text: phone, iconName: "phone"},
        { text: email, iconName: "at"}
    ]    

    return(
        <View style={styles.viewinfo}>
            <Text style={styles.infotitle}>
                Información de la Ferreteria:
            </Text>
            <MapIronmonger 
                location={location} 
                name={name} 
                height={150}
           />
            {
                map(listInfo, (item, index) =>(
                    <ListItem
                        key= {index}
                        style={styles.containerlist}
                    >
                        <Icon
                            type="material-community"
                            name={item.iconName}
                            color="#0e5f6a"
                        />   
                        <ListItem.Content>
                            <ListItem.Title>{item.text}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    viewbody:{
        flex: 1,
        backgroundColor:"#fff"
    },
    descriptionironm:{
        marginTop: 5,
        color: "gray",
        textAlign: "justify"
    },
    ratingironmonger:{
        position: "absolute",
        right: 0
    },
    nameironmonger:{
        fontWeight: "bold"
    },
    viewTitle:{
        padding: 15,
    },
    viewironmContainer:{
        flexDirection: "row"
    },
    viewinfo:{
        margin: 15,
        marginTop: 25

    },
    infotitle:{
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15
    },
    containerlist:{
        borderBottomColor: "#a376c7",
        borderBottomWidth: 1
    },
    btnAddReview:{
        backgroundColor: "transparent"
    },
    btntitle:{
        color: "#7eb0b7"
    },
    infologintext:{
        textAlign: "center",
        color: "#7eb0b7",
        padding: 20
    },
    logintext:{
        fontWeight: "bold"
    },
    btnContainer:{        
        bottom: 3,
        width: "95%", 
        position: "absolute",
        alignSelf: "center",
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2},
        shadowOpacity: 0.5
    },
    btn:{
        backgroundColor: "#7eb0b7"
    },
    viewReview:{
        flexDirection: "row",
        padding: 10,
        paddingBottom: 20,
        borderBottomColor: "#7eb0b7",
        borderBottomWidth: 1
    },
    imageAvatar:{
        marginRight: 15
    },
    imageavataruser:{
        width: 50,
        height: 50
    },
    viewInfoReview:{
        flex: 1,
        alignItems: "flex-start"
    },
    reviewTitle:{
        fontWeight: "bold"
    },
    reviewText:{
        paddingTop: 2,
        color: "gray",
        marginBottom: 5,
        textAlign: "justify"
    },
    reviewDate:{
        marginTop: 5,
        color: "gray",
        fontSize: 12,
        position: "absolute",
        right: 0,
        bottom: 0
    }

})
