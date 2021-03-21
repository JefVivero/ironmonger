import React, { useState } from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'
import { Avatar } from 'react-native-elements'
import { updateProfile, uploadImage } from '../../utils/actions'
import { LoadImageFromGallery } from '../../utils/helpers'
                           
export default function InfoUser({user, setloading, setloadingText}) {

    const [PhotoUrl, setPhotoUrl] = useState(user.photoURL)

    const changePhoto = async()=>{
        const result = await LoadImageFromGallery([1,1])
        if(!result.status){
            return
        }
        setloadingText("Actualizando imagen...")
        setloading(true)
        const resultUploadImage = await uploadImage(result.image, "avatars", user.uid)
        if(!resultUploadImage.statusResponse){
            setloading(false)
            Alert.alert("Ha ocurrido un error al almacenar la foto de perfil.")
            return
        }
        const resultUpdatePerfil = await updateProfile({photoURL: resultUploadImage.url})
        setloading(false)
        if(resultUpdatePerfil.status){
            setPhotoUrl(resultUploadImage.url)
        }else{
            Alert.alert("Ha ocurrido un error al actualizar la foto de perfil.")
            return
        }
    }

    return (
        <View style={styles.container}> 
            <Avatar
                rounded ={ true }
                size="large"
                onPress={changePhoto}
                source ={
                    PhotoUrl ? {uri: PhotoUrl}
                    : require("../../assets/avatar-default.jpg")
                }
            />
            <View style={styles.infouser}>
                <Text style={styles.diplayName}>
                    {
                        user.displayName ? user.displayName : "Anónymo"
                    }
                </Text>
                <Text>{user.email}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#f9f9f9",
        paddingVertical: 30
    },
    infouser:{
        marginLeft: 20
    },
    diplayName:{
        fontWeight :"bold",
        paddingBottom: 5
    }
})
