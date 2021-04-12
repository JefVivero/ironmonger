import React, { useState, useRef} from 'react'
import { AirbnbRating, Button, Input } from 'react-native-elements'
import { StyleSheet, Text, View } from 'react-native'
import Toast from 'react-native-easy-toast'

export default function AddReviewIronMonger({navigation, route}) {

    const { setIsVisible, idironM } = route.params
    const toasRef = useRef()
    const [rating, setRating] = useState(null)
    const [title, setTitle] = useState("")
    const [errorTitle, setErrorTitle] = useState(null)
    const [review, setReview] = useState("")
    const [errorReview, setErrorReview] = useState(null)
    const [loading, setLoading] = useState(false)

    const addReview = () =>{
        console.log("y")
    }

    setIsVisible(false)

    return (
        <View style={styles.viewbody}>
            <View style={styles.viewrating}>
                <AirbnbRating
                    count={5}
                    reviews={["Malo", "Regular", "Normal", "Muy Bueno", "Excelente"]}
                    defaultRating={0}
                    size= {35}
                />
            </View>
            <View style={styles.formreview}>
                <Input
                    placeholder= "Titulo"
                    containerStyle= {styles.input}
                    onChange = {(e) => setTitle(e.nativeEvent.text)}
                    errorMessage = {errorTitle}
                />
                <Input
                    placeholder= "Comentario"
                    containerStyle= {styles.input}
                    style = {styles.textArea}
                    multiline
                    onChange = {(e) => setTitle(e.nativeEvent.text)}
                    errorMessage = {errorReview}
                />
                <Button
                    title= "Enviar comentario"
                    containerStyle = {styles.btncontainer}
                    buttonStyle = {styles.btn}
                    onPress = {addReview}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    viewbody:{
        flex: 1
    },
    viewrating: {
        height: 110, 
        backgroundColor: "#f2f2f2"
    },
    formreview:{
        flex: 1,
        alignItems: "center",
        margin: 10,
        marginTop: 40
    },
    input:{
        marginBottom: 10
    },
    textArea:{
        height: 150,
        width: "100%",
        padding: 0,
        margin: 0
    },
    btncontainer:{
        flex: 1,
        justifyContent: "flex-end",
        marginTop: 20,
        marginBottom: 10,
        width: "95%"
    },
    btn:{
        backgroundColor: "#0e5f6a"
    }

})
