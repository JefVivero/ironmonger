import React, { useState, useRef } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import Toast from 'react-native-easy-toast'
import { Button, Icon, Image } from 'react-native-elements'
import Loading from '../../components/Loading'
import { DeleteFavorite } from '../../utils/actions'

export default function UserLogged({navigation, userData, favorites, setFavorites, setloadeer}) {
    const toasRef = useRef()
    const [loading, setLoading] = useState(false)
    return (
        <View style={styles.viewBody}>
         {
             
            favorites && (
                favorites.length === 0 ? (
                    <View style={styles.viewNot}>
                        <Icon
                            type="material-community"
                            name="heart-off-outline"
                            color= "#0e5f6a"
                            size={105}
                            underlayColor = "transparent"
                        />
                        <Text style={styles.textchoise}> No has agregado ninguna ferreteria a tus favoritos. </Text>
                    </View>
                ): (
                    <FlatList
                        data={favorites}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={(ironMonger) => (
                            <IronMonger
                                ironMonger= {ironMonger}
                                setLoading= {setLoading}
                                toasRef = {toasRef}
                                navigation ={navigation}
                                setloadeer={setloadeer}
                            />
                        )}
                        />
                )
            )
        }
        <Loading isVisible={loading} text="Cargando..."/>
        <Toast ref={toasRef} position="center" opacity={0.9}/>
    </View>
    )
}

function IronMonger({ironMonger, setLoading, toasRef, navigation, setloadeer}){
    const {id, name, images} = ironMonger.item

    const ConfirmRemoveFavorite=()=>{
        Alert.alert(
            "Quitar de favoritos",
            "¿Estas seguros de eliminar la ferreteria de favoritos?",
            [
                {
                    text:"No",
                    style:"cancel"
                },
                {
                    text:"Si",
                    onPress: removeFavorite
                }
            ],
            {
                cancelable:false
            }
        )
    }

    const removeFavorite = async()=>{
        setLoading(true)
        const response = await DeleteFavorite(id)
        setLoading(false)
        if(response.statusResponse){
            toasRef.current.show("La ferreteria ha sido eliminada de tus favoritos.", 3000)
            setloadeer(true)
        }else{
            toasRef.current.show("Se ha presentado un error al eliminar la ferreteria de tus favoritos.", 3000)
        }
    }

    return (
        <View style={styles.ironmonger}>
            <TouchableOpacity
                onPress = {() => navigation.navigate("ironmongers", { 
                    screen: "ironmonger",
                    params: {id, name}
                })}
            >
                <Image
                    resizeMode= "cover"
                    style = {styles.image}
                    PlaceholderContent={<ActivityIndicator color="#fff"/>}
                    source={{ uri: images[0] }}
                />
                <View style={styles.info}> 
                    <Text style={styles.name}>{name}</Text>
                    <Icon
                        type="material-community"
                        name ="heart"
                        color="#0e5f6a"
                        containerStyle={styles.icon}
                        underlayColor="transparent"
                        onPress={ConfirmRemoveFavorite}
                    />
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody:{
        flex: 1,
        backgroundColor: "#f2f2f2"
    },
    viewNot:{
        marginTop: 200,
    },
    textchoise:{
        textAlign: "center",
        color: "#0e5f6a"
    },
    ironmonger:{
        margin: 10
    },
    image:{
        width: "100%",
        height: 180
    },
    info:{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: -30,
        backgroundColor: "#fff"
    },
    name:{
        fontWeight: "bold",
        fontSize: 20
    },
    icon:{
        marginTop: -35,
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 100
    }
})
