import React, { useState, useEffect } from 'react'
import { Alert, ScrollView, Dimensions, StyleSheet, Text, View } from 'react-native'
import { getDocumentById } from '../../utils/actions'
import { ListItem, Rating, Icon } from 'react-native-elements'

import CarouselImages from '../CarouselImages'
import Loading from '../Loading'
import { formatPhone } from '../../utils/helpers'
import MapIronmonger from './MapIronmonger'
import { map } from 'lodash'
import ListReviews from './ListReviews'

const widthScreen = Dimensions.get("window").width

export default function IronMonger({ navigation , route }) {

    const { id, name }  = route.params   
    const [ironmonger, setIronmonger] = useState(null)
    const [activeSlide, setActiveSlide] = useState(0)

    navigation.setOptions({title: name})

    useEffect(() => {
        (
            async() =>{
                const response = await getDocumentById("ironmongers", id)
                if(response.statusResponse){
                    setIronmonger(response.document)
                }else{
                    setIronmonger({})
                    Alert.alert("Ocurrió un problema cargando la ferreteria. Por favor intente mas tarde.")
                }
            }
        )()
    }, [])

    if(!ironmonger){
        return(
            <Loading isVisible={true} text="Cargando"/>
        )
    }
    
    return (
        <ScrollView style={styles.viewbody}>
            <CarouselImages 
                images={ironmonger.images} 
                height={250}
                width ={widthScreen}
                activeSlide={activeSlide}
                setActiveSlide={setActiveSlide}
            />
            <TitleIronmonger
                name={ironmonger.name}
                description = {ironmonger.description}
                rating = {ironmonger. rating}
            />
            <IronmongerInfo
                name={ironmonger.name}
                location={ironmonger.location}
                address={ironmonger.address}
                email= {ironmonger.email}
                phone={formatPhone(ironmonger.callingCode, ironmonger.phone)}
            />
            <ListReviews 
                navigation= {navigation} 
                idironM={ironmonger.id}
            />
        </ScrollView>
    )
}

function TitleIronmonger({name, description, rating }){
    return (
        <View style={styles.viewTitle}> 
            <View style={styles.viewironmContainer}>
                <Text style={styles.nameironmonger}>{name}</Text>
                <Rating
                    style={styles.ratingironmonger}
                    imageSize={20}
                    readonly
                    startingValue={parseFloat(rating)}
                />
            </View>
            <Text style={styles.descriptionironm}>{description}</Text>
        </View>
    )
}

function IronmongerInfo({name, location, address, email, phone}){

    const listInfo = [
        { text: address, iconName: "map-marker"},
        { text: phone, iconName: "phone"},
        { text: email, iconName: "at"}
    ]    

    return(
        <View style={styles.viewinfo}>
            <Text style={styles.infotitle}>
                Informacion sobre la ferreteria
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
    }

})
