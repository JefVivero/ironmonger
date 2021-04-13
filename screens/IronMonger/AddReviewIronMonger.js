import React, { useState, useRef} from 'react'
import { AirbnbRating, Button, Input } from 'react-native-elements'
import { StyleSheet, Text, View } from 'react-native'
import Toast from 'react-native-easy-toast'
import { isEmpty } from 'lodash'
import Loading from '../../components/Loading'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {addDocumentWithoutId, getCurrentUser, getDocumentById, updateDocument} from '../../utils/actions'

export default function AddReviewIronMonger({navigation, route}) {

    const { idironM } = route.params
    const toasRef = useRef()
    const [rating, setRating] = useState(null)
    const [title, setTitle] = useState("")
    const [errorTitle, setErrorTitle] = useState(null)
    const [review, setReview] = useState("")
    const [errorReview, setErrorReview] = useState(null)
    const [loading, setLoading] = useState(false)

    const addReview = async() =>{
        if(!validForm()){
            return
        }
        setLoading(true)
        const user = getCurrentUser()
        const data = {
            iduser: user.uid,
            avataruser: user.photoURL,
            idIronmonger: idironM,
            title: title,
            review: review,
            rating: rating,
            createAt: new Date()
        }
        const responseAddReview = await addDocumentWithoutId("reviews", data)
        if(!responseAddReview.statusResponse){
            setLoading(false)
            toasRef.current.show("Error al enviar el comentario. por favor intenta mas tarde", 3000)
            return
        }

        const responseGetIronm = await getDocumentById("ironmongers", idironM )
        if(!responseGetIronm.statusResponse){
            setLoading(false)
            toasRef.current.show("Error al obtener el restaurante. por favor intena mas tarde", 3000)
            return
        }

        const ironmonger = responseGetIronm.document
        const ratingTotal = ironmonger.ratingTotal + rating
        const quantityVoting = ironmonger.quantityVoting + 1
        const ratingResult = ratingTotal/quantityVoting

        const responseUpdateIronmonger = await updateDocument("ironmongers", idironM, {
            ratingTotal,
            quantityVoting,
            rating: ratingResult
        } )
        setLoading(false)
        if(!responseUpdateIronmonger.statusResponse){
            toasRef.current.show("Error al actualizar el restaurante. Por favor intente mas tarde", 3000)
            return
        }
        navigation.goBack()
    }

    const validForm =() =>{
        setErrorTitle(null)
        setErrorReview(null)
        let isValid = true

        if(!rating){
            toasRef.current.show("Debes darle una puntuacion al restaurante.", 3000)
            isValid= false
        }

        if(isEmpty(title)){
            setErrorTitle("Debes ingresar un titulo a tu comentario.")
            isValid= false
        }

        if(isEmpty(review)){
            setErrorReview("Debes ingresar un comentario.")
            isValid= false
        }

        return isValid

    }

    return (
        <KeyboardAwareScrollView style={styles.viewbody}>
            <View style={styles.viewrating}>
                <AirbnbRating
                    count={5}
                    reviews={["Malo", "Regular", "Normal", "Muy Bueno", "Excelente"]}
                    defaultRating={0}
                    size= {35}
                    onFinishRating={(value) => setRating(value)}
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
                    onChange = {(e) => setReview(e.nativeEvent.text)}
                    errorMessage = {errorReview}
                />
                <Button
                    title= "Enviar comentario"
                    containerStyle = {styles.btncontainer}
                    buttonStyle = {styles.btn}
                    onPress = {addReview}
                />
            </View>
            <Toast ref={toasRef} position="center" opacity={0.9}/>
            <Loading isVisible={loading} text="Enviando comentario."/>
        </KeyboardAwareScrollView>
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
