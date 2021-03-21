import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import IronMongers from '../screens/IronMongers'

const Stack = createStackNavigator()

export default function IronMongersStack() {
    return (
       <Stack.Navigator>
            <Stack.Screen
                name="ironmongers"
                component={IronMongers}
                options= {{title:"Ferreteros"}}
            />
       </Stack.Navigator> 
    )
}
