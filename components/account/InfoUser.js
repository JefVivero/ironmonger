import React, { useState } from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'
import { Avatar, Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

import { updateProfile, uploadImage } from '../../utils/actions'
import { LoadImageFromGallery } from '../../utils/helpers'
import AccountOptions from '../../components/account/AccountOptions'
                           
export default function InfoUser({user, setloading, setloadingText, toastRef, setReloadUser, typeUsers}) {
   
    const navigation = useNavigation()
    
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
        <View style={styles.BigContainer}>
              <Text style={styles.title}>Bienvenido</Text>
              <Text style={styles.typeUser}>
                 {
                     typeUsers ? typeUsers.data.TypeUser : ""
                 }
              </Text>
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
                     <Text style={styles.diplayEmail}>{user.email}</Text>
                </View>
            </View>
            <View style={styles.ContainerinfoContact}>
                    <Text style={styles.infoContact}>Direccion: </Text>
                    <Text style={styles.infoContact}>Teléfono: </Text>                    
            </View>
            <Button
                 buttonStyle= {styles.btnUpdateInfo}
                 titleStyle= {styles.btnUpdate}
                 title="Actualizar Información"
                 onPress={()=>{
                    navigation.navigate("accountoptions", {userInfo: user, setReloadUser:setReloadUser})// <AccountOptions user={user} toastRef={toastRef} />                  
                 }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    BigContainer:{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f9f9f9",
        paddingVertical: 20
    },
    container: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#f9f9f9",
        paddingVertical: 20
    },
    infouser:{
        marginLeft: 50
    },
    diplayName:{
        fontWeight :"bold",
        paddingBottom: 5,
        borderWidth: 2,
        textAlign: "center"
    },
    title:{
        fontWeight: "bold",
        fontSize : 35
    },
    typeUser:{
        fontWeight: "bold",
        fontSize : 25 
    },
    diplayEmail:{
        fontWeight :"bold",
        paddingBottom: 2,
        borderWidth: 2,
        textAlign: "center",
        marginTop: 5,
        paddingHorizontal: 5
    },
    ContainerinfoContact:{
        fontWeight :"bold",
        paddingBottom: 5,
        textAlign: "center",
    },
    infoContact:{
        fontWeight :"bold",        
        paddingVertical: 1,
        paddingHorizontal: 85,
        borderWidth: 2,
        textAlign: "center",
        marginTop: 5,        
    },
    btnUpdateInfo:{
        marginTop: 5,
        borderRadius: 1,
        backgroundColor: "#ad2c33",
        borderTopWidth: 1,
        borderTopColor: "#ad2c33",
        borderBottomWidth: 1,
        borderBottomColor: "#ad2c33",
        paddingVertical: 3
    },
    btnUpdate:{

    }
})
