import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Services from '../screens/Service/Services'
import AddService from '../screens/Service/AddService'

const Stack = createStackNavigator()

export default function ServicesStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
              name ="services"
              component= {Services}
              options={{title:"Servicios"}}
            />
            
            <Stack.Screen
                name="add-service"
                component={AddService}
                options= {{title:"Crear Servicio"}}
            />
        </Stack.Navigator>
    )
}
