import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import  { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'react-native-elements'

import AccountStack from './AccountStack'
import FavoritesStack from './FavoritesStack'
import PromotionStack from './PromotionStack'
import IronMongerStack from './IronMongersStack'
import ServicesStack from './ServicesStack' 

const Tab = createBottomTabNavigator()

export default function Navigation() {

const screenOptions =(route, color)=>{
    let iconName
    switch (route.name) {
      case "ironmongers":
        iconName ="tools"
        break;
      case "services":
        iconName ="account-hard-hat"
        break;
      case "favorites":
        iconName ="heart"
          break;   
      case "promotion":
        iconName ="briefcase-check"
        //finance
          break;      
      case "account":
        iconName ="account-tie"
          break;            
    }
    return (
        <Icon
          type="material-community"
          name={iconName}
          size={22}
          color={color}
        />
      )
}

    return (
        <NavigationContainer>
            <Tab.Navigator
              initialRouteName="ironmongers"
              tabBarOptions={{
                inactiveTintColor:"#d17673",
                activeTintColor:"#ad2c33"            
               }}

               screenOptions={ ({route}) => ({
                tabBarIcon : ({color}) => screenOptions(route,color)
              })}
            >
            <Tab.Screen
               name="ironmongers"
               component={IronMongerStack}
               options={{title:"Ferreterias"}}
            />
            <Tab.Screen
               name="services"
               component={ServicesStack}
               options={{title:"Servicios"}}
            />
            <Tab.Screen
               name="favorites"
               component={FavoritesStack}
               options={{title:"Favoritos"}}
            />
            <Tab.Screen
               name="promotion"
               component={PromotionStack}
               options={{title:"Promociones"}}
            />
            <Tab.Screen
               name="account"
               component={AccountStack}
               options={{title:"Perfil"}}
            />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({})
