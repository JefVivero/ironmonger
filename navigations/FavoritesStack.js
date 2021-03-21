import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { StyleSheet, Text, View } from 'react-native'

import Favorites from '../screens/Favorites'

const Stack = createStackNavigator()

export default function FavoritesStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
             name ="favorites"
             component= {Favorites}
            options={{title:"Favoritos"}}
            />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})
