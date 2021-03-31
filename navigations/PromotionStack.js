import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Promotion from '../screens/Promotion/Promotion'
import Account from '../screens/account/Account'

const Stack = createStackNavigator()

export default function PromotionStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
              name ="promotion"
              component= {Promotion}
              options={{title:"Promociones"}}
            />
        </Stack.Navigator>
    )
}
