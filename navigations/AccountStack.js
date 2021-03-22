import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Account from '../screens/account/Account'
import Login from '../screens/account/Login'
import Register from '../screens/account/Register'
import AccountOptions from '../components/account/AccountOptions'

const Stack = createStackNavigator()

export default function AccountStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
              name ="account"
              component= {Account}
              options={{title:"Perfil"}}
            />
             <Stack.Screen
              name ="login"
              component= {Login}
              options={{title:"Iniciar sesión"}}
            />
            <Stack.Screen
              name ="register"
              component= {Register}
              options={{title:"Registrar Usuario"}}
            />
            <Stack.Screen
              name ="accountoptions"
              component= {AccountOptions}
              options={{title:"Actualizar Información"}}
            />
        </Stack.Navigator>
    )
}
