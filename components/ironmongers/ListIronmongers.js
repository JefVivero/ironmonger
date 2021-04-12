import React from 'react'
import { ActivityIndicator } from 'react-native'
import { TouchableOpacity, FlatList, StyleSheet, Text, View } from 'react-native'
import { Image, Divider } from 'react-native-elements'
import { size } from 'lodash'
import { formatPhone } from '../../utils/helpers'

export default function ListIronmongers({ironmongers, navigation, handleLoadMore}) {
    return (
        <View>
            <FlatList
                data ={ironmongers}
                keyExtractor = {(item, index) =>index.toString()}
                onEndReachedThreshold={0.5}
                onEndReached={handleLoadMore}
                renderItem = {(ironmonger) =>(
                    <Ironmonger 
                        ironmonger ={ironmonger}
                        navigation ={navigation}
                    />
                )}
            />
        </View>
    )
}

function Ironmonger({ironmonger, navigation}){
    const {id, images, name, address, description, phone, email, callingCode}= ironmonger.item
    const imageIronmonger = images[0]

    const goIronmonger = ()=>{
        navigation.navigate("ironmonger", { id, name })
    }

    return(
        <View>
            <TouchableOpacity onPress={goIronmonger}>
                <Text style={styles.ironName}>{name}</Text>
                <View style={styles.viewironmonger}>
                    <View style={styles.viewimage}>
                        <Image
                            resizeMode ="cover"
                            PlaceholderContent={<ActivityIndicator color="#fff"/>}
                            source = {{ uri: imageIronmonger}}
                            style = {styles.ImageIronmonger}
                        />
                    </View>
                    <View>
                        <Text style={styles.ironInfo}>{address}</Text>
                        <Text style={styles.ironInfo}>{formatPhone(callingCode, phone)}</Text>
                        <Text style={styles.irondesc}>
                            {
                                size(description) > 0 ? `${description.substr(0,60)}...`
                                : description
                            }
                        </Text>
                    </View>
                </View>            
            </TouchableOpacity>
            <Divider styles={styles.divider}/>
        </View>
    )
}

const styles = StyleSheet.create({
    viewironmonger:{
        flexDirection: "row",
        margin: 10
    },
    viewimage:{
        marginRight: 15
    },
    ImageIronmonger:{
        width: 90,
        height: 90
    },
    ironName:{
        fontWeight: "bold",
        alignSelf: "center",
        paddingTop: 2,
        margin: 2,
        color: "#000",
        fontSize: 15
    },
    ironInfo:{
        color: "grey"
    },
    irondesc:{
        paddingTop: 2,
        color : "grey",
        width: "75%"
    },
    viewdoc:{
        flexDirection: "column",
        margin: 10
    },
    divider:{
        backgroundColor: "#ad2c33",
        margin: 20
    },

})
