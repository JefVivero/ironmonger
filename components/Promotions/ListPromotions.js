import React from 'react'
import { ActivityIndicator } from 'react-native'
import { TouchableOpacity, FlatList, StyleSheet, Text, View } from 'react-native'
import { Image, Divider, Rating } from 'react-native-elements'
import { size } from 'lodash'
import { formatPhone } from '../../utils/helpers'

export default function ListPromotions({Promotions, navigation, handleLoadMore}) {
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
                    />
                )}
                />
        </View>
    )
}

function Promotionn({promotion, navigation}){
    const {id, name, images, description}= promotion.item
    const imagePromotion= images[0]

    const goPromotion = ()=>{
        navigation.navigate("promotion", { id, name })
    }

    return(
        <View>
            <TouchableOpacity onPress={goPromotion}>
                <View style={styles.viewtitle}> 
                    <Text style={styles.ironName}>{name}</Text>
                </View>
                <View style={styles.viewironmonger}>
                    <View style={styles.viewimage}>
                        <Image
                            resizeMode ="cover"
                            PlaceholderContent={<ActivityIndicator color="#fff"/>}
                            source = {{ uri: imagePromotion}}
                            style = {styles.imagePromotion}
                        />
                    </View>
                    <View>
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
    imagePromotion:{
        width: 90,
        height: 90
    },
    ironName:{
        fontWeight: "bold",
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
    ratingironmonger:{
    },
    viewtitle:{
        flexDirection: "column",
        alignItems: "center"
    }

})
