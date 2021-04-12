import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, BottomSheet, ListItem } from 'react-native-elements'

import firebase from 'firebase/app'

export default function ListReviews({navigation, idironM}) {
    const [userLogged, setuserLogged] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    
    firebase.auth().onAuthStateChanged((user) => {
        user ? setuserLogged(true) : setuserLogged(false)
    })

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

    return (
        <View>
             <Button
                title="Ver comentarios"
                onPress={()=> setIsVisible(true)}
                buttonStyle={styles.btnAddReview}
                titleStyle = {styles.btntitle}
             >
            </Button>
            {
                userLogged ? (
                    isVisible && (                         
                            <BottomSheet
                                isVisible={isVisible}
                                containerStyle={styles.btnSheet}
                            >
                                {list.map((l, i) => (
                                    <ListItem key={i} containerStyle={l.containerStyle} onPress={l.onPress}>
                                        <ListItem.Content>
                                            <ListItem.Title 
                                                style={l.titleStyle}>{l.title}
                                            </ListItem.Title>
                                        </ListItem.Content>
                                    </ListItem>
                                ))}   
                                
                            </BottomSheet>
                    )
                    
                ) : (
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
        </View>
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
    }
})
