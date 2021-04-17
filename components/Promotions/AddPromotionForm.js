import React, { useState, useEffect, useRef } from 'react'
import { ActivityIndicator, StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList, Alert } from 'react-native'
import { Avatar, Button, Icon, Input, Image, Divider } from 'react-native-elements'
import { map, size, filter, isEmpty } from 'lodash' 
import CountryPicker from 'react-native-country-picker-modal'
import MapView from 'react-native-maps'
import uuid from 'random-uuid-v4'
import Modal from '../Modal'

import { addDocumentWithoutId, getIronMongersByUser, uploadImage } from '../../utils/actions'
import { formatPhone, LoadImageFromGallery } from '../../utils/helpers'

export default function AddPromotionForm({toastRef, setLoading, navigation, infoUser, userData}) {
    const modelizeRef = useRef(null)
    const [PromotionName, setPromotionName] = useState(null)
    const [ErroNameP, setErroNameP] = useState(null)
    const [Description, setDescription] = useState(null)
    const [ErrorDescription, setErrorDescription] = useState(null)
    const [ironMongerByUser, setironMongerByUser] = useState({})
    const [isVisibleSelect, setisVisibleSelect] = useState(false)
    const [selectedIronM, setSelectedIronM] = useState(null)
    const [imagesSelected, setImagesSelected] = useState([])

    const onOpen = async() =>{

        const response = await getIronMongersByUser(userData.uid)
        if(!response.statusResponse){
            toasRef.current.show("Error al obtener informacion de las ferreterias", 3000)
            return
        }
        setironMongerByUser(response.ironMongers)
        setisVisibleSelect(true)
    }

    const AddNewPromotion = async() =>{
        if(!ValidForm()){
            return
        }
        setLoading(true)
        const responseUploadImages = await uploadImages()
        const promotions = {
            name: PromotionName,
            description: Description,
            createBy: userData.uid,
            idIronMonger: selectedIronM.item.id,
            images: responseUploadImages,
            createAt: new Date()
        }
        const responseAddDocument = await addDocumentWithoutId("promotions", promotions)
        setLoading(false)
        
        if (!responseAddDocument.statusResponse) {
            toastRef.current.show("Error al guardar la promoción, por favor intenta más tarde.", 3000)
            return
        }

        navigation.navigate("promotions")
    }

    const uploadImages = async() => {
        const imagesUrl = []
        await Promise.all(
            map(imagesSelected, async(image) => {
                const response = await uploadImage(image, "promotions", uuid())
                if (response.statusResponse) {
                   imagesUrl.push(response.url)
                }
            })
        )
        return imagesUrl
    }

    const ValidForm = () =>{
        setErroNameP(null)
        setErrorDescription(null)
        let isValid = true

        if (isEmpty(PromotionName)) {
            setErroNameP("Debes ingresar el nombre de la Promoción.")
            isValid = false
        }

        if (isEmpty(Description)) {
            setErrorDescription("Debes ingresar la descripción.")
            isValid = false
        }

        if(!selectedIronM){
            toasRef.current.show("Debes elegir la ferreteria.", 3000)
            isValid = false
        }

        if(size(imagesSelected) === 0){
            toastRef.current.show("Debes de agregar al menos una imagen de la promoción.", 3000)
            isValid = false
        }

        return isValid
    }

    return (
        <View style={styles.viewForm}>
            <Button
                title="A que ferreteria pertenece la promoción? Por favor elige!"
                onPress={()=>onOpen()}
                buttonStyle={styles.ChoiseIronM}
            />
            <Input
                placeholder="Nombre de la Promoción..."
                defaultValue={PromotionName}
                onChange={(e) => setPromotionName(e.nativeEvent.text)}
                errorMessage={ErroNameP}
            />
            <Input
                placeholder="Descripción de la promoción..."
                multiline
                containerStyle={styles.textArea}
                onChange={(e) => setDescription(e.nativeEvent.text)}
                errorMessage={ErrorDescription}
            />
            {  
                selectedIronM ? (

                    <View>
                        <View style={styles.viewinfoIronM}>
                            <View>
                                <Image
                                    resizeMode ="cover"
                                    PlaceholderContent={<ActivityIndicator color="#fff"/>}
                                    source = {{ uri: selectedIronM.item.images[0]}}
                                    style = {styles.ImageIronmonger2}
                                />
                            </View>
                            <View>
                                <Text style={styles.Iron}> Ferreteria: {selectedIronM.item.name} </Text>
                                <Text style={styles.Iron}> Telefono: {formatPhone(selectedIronM.item.callingCode, selectedIronM.item.phone)} </Text> 
                            </View>
                        </View>
                        <View>
                            <UploadImage
                                toastRef={toastRef}
                                imagesSelected={imagesSelected}
                                setImagesSelected={setImagesSelected}
                            />
                            <Button
                                title="Crear Promoción"
                                onPress={AddNewPromotion}
                                buttonStyle={styles.btnAddNewPromotion}
                            />
                        </View>
                    </View>
                    
                  
                ): (
                    <Text style={styles.textchoise}> Por favor elije la ferreteria </Text>
                )
                            
            }
            <SelectironMonger
                isVisibleSelect={isVisibleSelect}
                setisVisibleSelect={setisVisibleSelect}
                toastRef={toastRef}
                ironMongerByUser={ironMongerByUser}
                setSelectedIronM={setSelectedIronM}
            />
        </View>
    )


}

function SelectironMonger({isVisibleSelect,setisVisibleSelect,toastRef, ironMongerByUser, setSelectedIronM }) {
    const [newIronM, setNewIron] = useState(null)

    const Selected = (ironmonger) => {
        console.log(ironmonger)
        setSelectedIronM(ironmonger)
        setisVisibleSelect(false)
    }

    return (
        <Modal isVisible={isVisibleSelect} setVisible={setisVisibleSelect}>
            <ScrollView>
                <FlatList
                    data ={ironMongerByUser}
                    keyExtractor = {(item, index) =>index.toString()}
                    renderItem = {(ironmonger) =>(
                        <View style={styles.viewironmonger}>
                            <TouchableOpacity onPress={() =>Selected(ironmonger)}>
                                <View style={styles.IronMtitle}>
                                    <Image
                                        resizeMode ="cover"
                                        PlaceholderContent={<ActivityIndicator color="#fff"/>}
                                        source = {{ uri: ironmonger.item.images[0]}}
                                        style = {styles.ImageIronmonger}
                                    />
                                    <Text style={styles.ironName}>{ironmonger.item.name}</Text>
                                </View>
                                <Divider styles={styles.divider}/>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </ScrollView>
        </Modal>
    )
}

function UploadImage({ toastRef, imagesSelected, setImagesSelected }) {
    const imageSelect = async() => {
        const response = await LoadImageFromGallery([4, 3])
        if (!response.status) {
            toastRef.current.show("No has seleccionado ninguna imagen.", 3000)
            return
        }
        setImagesSelected([...imagesSelected, response.image])
    }

    const removeImage = (image) => {
        Alert.alert(
            "Eliminar Imagen",
            "¿Estas seguro que quieres eliminar la imagen?",
            [
                {
                    text: "No",
                    style: "cancel"                    
                },
                {
                    text: "Sí",
                    onPress: () => {
                        setImagesSelected(
                            filter(imagesSelected, (imageUrl) => imageUrl !== image)
                        )
                    }
                }
            ],
            { cancelable: true }
        )
    }

    return (
        <ScrollView
            horizontal
            style={styles.viewImages}
        >
            {
                size(imagesSelected) < 10 && (
                    <Icon
                        type="material-community"
                        name="camera"
                        color="#7a7a7a"
                        containerStyle={styles.containerIcon}
                        onPress={imageSelect}
                    />
                )
            }
            {
                map(imagesSelected, (imagePromotion, index) => (
                    <Avatar
                        key={index}
                        style={styles.miniatureStyle}
                        source={{ uri: imagePromotion }}
                        onPress={() => removeImage(imagePromotion)}
                    />
                ))
            }

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    divider:{
        backgroundColor: "#ad2c33",
    },
    viewironmonger:{
        margin: 5
    },
    ironName:{
        fontWeight: "bold",
        paddingTop: 2,
        marginLeft: 10,
        margin: 2,
        color: "#000",
        fontSize: 15,
        alignSelf: "flex-start"
    },
    IronMtitle:{
        flexDirection: "row"
    },
    ImageIronmonger:{
        width: 45,
        height: 45
    },
    textchoise:{
        textAlign: "center",
        marginTop: 50,
        color: "red"
    },
    viewForm:{
        paddingTop: 20
    },
    ChoiseIronM:{
        marginHorizontal: 20,
        marginBottom: 20,
        backgroundColor: "#0e5f6a"
    },
    textArea: {
        height: 90,
        width: "100%"
    },
    viewinfoIronM:{
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 20
    },
    ImageIronmonger2:{
        width: 90,
        height: 90
    },
    viewImages: {
        flexDirection: "row",
        marginHorizontal: 20,
        marginTop: 70
    },
    containerIcon: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        height: 70,
        width: 79,
        backgroundColor: "#e3e3e3"
    },
    miniatureStyle: {
        width: 70,
        height: 70,
        marginRight: 10
    },
    btnAddNewPromotion:{
        marginHorizontal: 20,
        marginTop: 30,
        backgroundColor: "#0e5f6a"
    }
})
