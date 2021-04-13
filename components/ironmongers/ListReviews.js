import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View , ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native'
import { Button, BottomSheet, ListItem, Avatar, Rating } from 'react-native-elements'
import moment from 'moment/min/moment-with-locales'
import firebase from 'firebase/app'
import { getIronMReviews } from '../../utils/actions'
import { map, size } from 'lodash'
import { Modalize } from 'react-native-modalize'

moment.locale("es")

export default function ListReviews({navigation, idironM}) {
    const modelizeRef = useRef(null)
    const [userLogged, setuserLogged] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [reviews, setReviews] = useState([])
    
    firebase.auth().onAuthStateChanged((user) => {
        user ? setuserLogged(true) : setuserLogged(false)
    })

    useEffect(() => {
        (
            async() =>{
                const response = await getIronMReviews(idironM)
                if(response.statusResponse){
                    setReviews(response.reviews) 
                }
            }
        )()
    }, [])

    const list = [
        {
            title: 'Escribe una opinión',
            containerStyle: { backgroundColor: "#0e5f6a" },
            titleStyle: { color: '#7eb0b7' },
            icon: {
                type: "material-community",
                name: "square-edit-outline",
                color: "#7eb0b7"
            },
            onPress: () => navigation.navigate("add-review", { setIsVisible: setIsVisible, idironM:idironM }),
        },
        {
          title: 'Cerrar',
          containerStyle: { backgroundColor: '#ad2c33' },
          titleStyle: { color: 'white' },
          onPress: () => setIsVisible(false),
        },
    ]

    const onOpen = () =>{
        modelizeRef.current?.open('top')
    }
 
    return (
        <View>
            {
            userLogged ? (
                <Button
                    title="Ver comentarios"
                    onPress={onOpen}
                    buttonStyle={styles.btnAddReview}
                    titleStyle = {styles.btntitle}
                >
                </Button>
                 ):(
                    <Text style={styles.infologintext}
                        onPress= {() => navigation.navigate("login")}
                    >
                        para escribir una opinión debes estar logueado. {" "}
                        <Text style={styles.logintext}>
                            pulsa AQUÍ para iniciar sesion
                        </Text>
                    </Text>
                )
            }
            {
            <Modalize ref={modelizeRef}>
                {                    
                    size(reviews) > 0 && (
                        map(reviews, (review, index) =>(
                            <Review key={index} reviewIronM={review}/>
                        ))
                    )
                }
            </Modalize>
            }
        </View>
    )
   
}

function Review({key, reviewIronM}){   
    const { title, review, createAt, avataruser, rating } = reviewIronM
    const createReview = new Date(createAt.seconds * 1000)

    return (
        <ScrollView >
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
            <View style={styles.viewInfo}>
                    <Text style={styles.reviewTitle}> {title} </Text>
                    <Text style={styles.reviewText}> {review} </Text>
                    <Rating
                        imageSize= {15}
                        startingValue= {rating}
                        readonly
                    />
                    <Text style={styles.reviewDate}> {moment(createReview).format("LLL")} </Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
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
    viewInfo:{
        flex: 1,
        alignItems: "center"
    },
    reviewTitle:{
        fontWeight: "bold"
    },
    reviewText:{
        paddingTop: 2,
        color: "gray",
        marginBottom: 5
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
