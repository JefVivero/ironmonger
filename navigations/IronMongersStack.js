import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import IronMongers from '../screens/IronMonger/IronMongers'
import AddOptions from '../screens/IronMonger/AddOptions'
import AddIronMonger from '../screens/IronMonger/AddIronMonger'

const Stack = createStackNavigator()

export default function IronMongersStack() {
    return (
       <Stack.Navigator>
            <Stack.Screen
                name="ironmongers"
                component={IronMongers}
                options= {{title:"Ferreteros"}}
            />
            <Stack.Screen
                name="add-options"
                component={AddOptions}
                options= {{title:"Crear"}}
            />
            <Stack.Screen
                name="add-ironmonger"
                component={AddIronMonger}
                options= {{title:"Crear Ferreteria"}}
            />
       </Stack.Navigator> 
    )
}
