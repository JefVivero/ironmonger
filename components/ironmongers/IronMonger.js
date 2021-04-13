import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Alert, ScrollView, Dimensions, StyleSheet, Text, View, ActivityIndicator,TouchableOpacity } from 'react-native'
import { getDocumentById } from '../../utils/actions'
import { ListItem, Rating, Icon,Button, Avatar } from 'react-native-elements'
import { useFocusEffect } from '@react-navigation/native'
import { Modalize } from 'react-native-modalize'
import { getIronMReviews } from '../../utils/actions'
import firebase from 'firebase/app'
import { size } from 'lodash'
import moment from 'moment/min/moment-with-locales'

import CarouselImages from '../CarouselImages'
import Loading from '../Loading'
import { formatPhone } from '../../utils/helpers'
import MapIronmonger from './MapIronmonger'
import { map } from 'lodash'
import ListReviews from './ListReviews'

const widthScreen = Dimensions.get("window").width

export default function IronMonger({ navigation , route }) {
    const modelizeRef = useRef(null)
    const { id, name }  = route.params   
    const [ironmonger, setIronmonger] = useState(null)
    const [activeSlide, setActiveSlide] = useState(0)
    const [userLogged, setuserLogged] = useState(false)
    const [reviews, setReviews] = useState([])  

    navigation.setOptions({title: name})    

    firebase.auth().onAuthStateChanged((user) => {
        user ? setuserLogged(true) : setuserLogged(false)
    })


    useFocusEffect(
        useCallback(() => {
            async function getDoc(){
                const response = await getDocumentById("ironmongers", id)
                    if(response.statusResponse){
                        setIronmonger(response.document)
                    }else{
                        setIronmonger({})
                        Alert.alert("Ocurrió un problema cargando la ferreteria. Por favor intente mas tarde.")
                    }
            }           
            getDoc()
        }, [])
    )

    useEffect(() => {
       (async()=>{
            const response2 = await getIronMReviews(ironmonger.id)
            if(response2.statusResponse){
                setReviews(response2.reviews) 
            } 
       })()
    }, [ironmonger])

    if(!ironmonger){
        return(
            <Loading isVisible={true} text="Cargando"/>
        )
    }

    const onOpen = () =>{
        modelizeRef.current?.open()
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
            {
                userLogged ? (
                    <Button
                        title="Ver comentarios"
                        onPress={onOpen}
                        buttonStyle={styles.btnAddReview}
                        titleStyle = {styles.btntitle}
                        icon= {{
                            type: "material-community",
                            name: "android-messages",
                            color: "#7eb0b7"
                        }}
                    >
                    </Button>
                     ):(
                        <Text style={styles.infologintext}
                            onPress= {() => navigation.navigate("login")}
                        >
                            para escribir una opinión o ver los comentarios debes estar logueado. {" "}
                            <Text style={styles.logintext}>
                                pulsa AQUÍ para iniciar sesion
                            </Text>
                        </Text>
                    )
            } 
            <Modalize ref={modelizeRef} modalTopOffset={100}>
                <Button
                        title="Escribe una opinión"
                        onPress={
                            () => navigation.navigate(
                                "add-review",
                                { idironM:ironmonger.id }
                            )
                        }
                        buttonStyle={styles.btnAddReview}
                        titleStyle = {styles.btntitle}
                        icon= {{
                            type: "material-community",
                            name: "text-box-plus",
                            color: "#7eb0b7"
                        }}
                />
                {                 
                    size(reviews) > 0 && (
                        map(reviews, (review, index) =>(
                            <Review key={index} reviewIronM={review}/>
                        ))
                    )
                }                
            </Modalize>
        </ScrollView>
    )
}

function Review({key, reviewIronM}){   
    const { title, review, createAt, avataruser, rating } = reviewIronM
    const createReview = new Date(createAt.seconds * 1000)

    return (
        <View style={styles.viewReview}>
            <View style={styles.imageAvatar}>
                <Avatar
                    renderPlaceholderContent ={<ActivityIndicator color="#fff"/>}
                    size ="large"
                    rounded
                    containerStyle ={styles.imageavataruser}
                    source = {
                        avataruser ? { uri: avataruser} 
                        : require("../../assets/avatar-default.jpg")
                    }
                />
            </View>
            <View style={styles.viewInfoReview}>
                    <Text style={styles.reviewTitle}> {title} </Text>
                    <Text style={styles.reviewText}> {review} </Text>
                    <Rating
                        imageSize= {15}
                        startingValue= {rating}
                        readonly
                    />
                    <Text style={styles.reviewDate}> {moment(createReview).format("LLL")} </Text>
            </View>
        </View>
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
