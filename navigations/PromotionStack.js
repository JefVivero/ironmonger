import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Promotions from '../screens/Promotion/Promotions'
import UserLogged from '../screens/Promotion/UserLogged'
import AddPromotion from '../screens/Promotion/AddPromotion'
import Promotion from '../components/Promotions/Promotion'

const Stack = createStackNavigator()

export default function PromotionStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
              name ="promotions"
              component= {Promotions}
              options={{title:"Promociones"}}
            />
            <Stack.Screen
              name ="logged-promotion"
              component= {UserLogged}
              options={{title:"Promociones"}}
            />
            <Stack.Screen
              name ="add-promotion"
              component= {AddPromotion}
              options={{title:"Crear Promoción"}}
            />
            <Stack.Screen
                name="promotion"
                component={Promotion}
            />
        </Stack.Navigator>
    )
}
