import React, { useState, useEffect } from 'react'
import { Alert, ScrollView, Dimensions, StyleSheet, Text, View } from 'react-native'
import { getDocumentById } from '../../utils/actions'
import { Rating } from 'react-native-elements'

import CarouselImages from '../CarouselImages'
import Loading from '../Loading'

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
    }
})
