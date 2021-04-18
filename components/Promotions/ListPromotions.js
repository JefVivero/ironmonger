import React from 'react'
import { ActivityIndicator } from 'react-native'
import { TouchableOpacity, FlatList, StyleSheet, Text, View } from 'react-native'
import { Image, Divider, Rating } from 'react-native-elements'
import { size } from 'lodash'
import { formatPhone } from '../../utils/helpers'

export default function ListPromotions({Promotions, navigation, handleLoadMore, infoUser}) {
    return (
        <View>
            <FlatList
                data ={Promotions}
                keyExtractor = {(item, index) =>index.toString()}
                onEndReachedThreshold={0.5}
                onEndReached={handleLoadMore}
                renderItem = {(promotion) =>(
                    <Promotionn
                        promotion ={promotion}
                        navigation ={navigation}
                        infoUser= {infoUser}
                    />
                )}
                />
        </View>
    )
}

function Promotionn({promotion, navigation, infoUser}){
    const {id, name, images, description}= promotion.item
    const imagePromotion= images[0]

    const goPromotion = ()=>{
        navigation.navigate("promotion", { id, name, infoUser })
    }

    return(
        <View style={styles.promotion}>
            <TouchableOpacity onPress={goPromotion}>
                <Text style={styles.ironName}>{name}</Text>
                <Image
                    resizeMode ="cover"
                    PlaceholderContent={<ActivityIndicator color="#fff"/>}
                    source = {{ uri: imagePromotion}}
                    style = {styles.imagePromotion}
                />
                <View style={styles.info}>
                    <Text style={styles.irondesc}>
                        {   
                            size(description) > 0 ? `${description.substr(0,150)}...`
                            : description
                        }
                    </Text> 
                </View>
            </TouchableOpacity>
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
    imagePromotion:{
        width: "100%",
        height: 170
    },
    ironName:{
        fontWeight: "bold",
        paddingVertical: 2,
        textAlign: "center",
        color: "#000",
        fontSize: 20,
        width: "100%",
        backgroundColor: "#fff"
    },
    ironInfo:{
        color: "grey"
    },
    irondesc:{
        color : "grey",
        textAlign: "justify",
        backgroundColor: "#fff"
    },
    viewinfo:{
        width: "70%"
    },
    viewdoc:{
        flexDirection: "column",
        margin: 10
    },
    divider:{
        backgroundColor: "#ad2c33",
        margin: 20
    },
    ratingironmonger:{
    },
    viewtitle:{
        flexDirection: "column",
        alignItems: "center"
    },
    promotion:{
        margin: 10
    },
    info:{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: -20,
        backgroundColor: "#fff"
    },

})
