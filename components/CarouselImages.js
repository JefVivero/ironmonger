import React from 'react'
import { Image } from 'react-native-elements'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { size } from 'lodash'

export default function CarouselImages({images, height, width, activeSlide, setActiveSlide}) {

    const renderItem =({item}) =>{
        return (
            <Image
                style={{ width, height  }}
                PlaceholderContent={<ActivityIndicator color="#fff"/>}
                source = {{ uri: item }}
            />
        )
    }

    return (
        <View>
            <Carousel
                layout ={"stack"}
                layoutCardOffset={'18'}
                data= {images}
                sliderWidth= {width}
                itemWidth = {width}
                itemHeight= {height}
                renderItem={renderItem}
                onSnapToItem={(index) => setActiveSlide(index)}
            />
            <MyPagination data= {images} activeSlide={activeSlide}/>
        </View>
    )
}

function MyPagination({data, activeSlide}){
    return(
        <Pagination
            dotsLength= {size(data)}
            activeDotIndex = {activeSlide}
            containerStyle = {styles.containerpagination }
            dotStyle = {styles.dotactive}
            inactiveDotStyle = {styles.dotinactive}
            inactiveDotOpacity = {0.6}
            inactiveDotScale = {0.6}
        />
    )
}

const styles = StyleSheet.create({
    containerpagination:{
        backgroundColor: "transparent",
        zIndex : 1,
        position: "absolute",
        bottom: 0,
        alignSelf: "center"
    },
    dotactive:{
        width: 20,
        height: 20,
        borderRadius: 10,
        marginHorizontal: 2,
        backgroundColor: "#ad2c33"
    },
    dotinactive:{
        width: 14,
        height: 14,
        borderRadius: 7,
        marginHorizontal: 2,
        backgroundColor: "#fff"
    }
})
