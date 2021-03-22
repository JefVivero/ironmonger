import { map } from 'lodash'
import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'
import Toast  from 'react-native-easy-toast'
import { useNavigation } from '@react-navigation/native'

import { getCurrentUser } from '../../utils/actions'
import Modal from '../Modal'

export default function AccountOptions() {
    const toastRef = useRef()
    const navigation = useNavigation()
    const menuOptions = generateOptions()

    const [user, setUser] = useState(null)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        setUser(getCurrentUser())
    }, [])


    return (
        <View>
            {
                map(menuOptions, (menu, index)=>(
                    <ListItem
                        key = {index}
                        style= {styles.menuItem}
                        onPress={menu.onPress}
                    >
                    <Icon
                        type="material-community"
                        name= {menu.iconNameLeft}
                        color = {menu.iconColorLeft}
                    />
                    <ListItem.Content>
                        <ListItem.Title>{menu.title}</ListItem.Title>
                    </ListItem.Content>
                     <Icon
                        type="material-community"
                        name= {menu.iconNameRight}
                        color = {menu.iconColorRight}
                    />
                    </ListItem>
                ))
            }
            <Modal isVisible={showModal}  setVisible={setShowModal}>
                <Text>Hola Muncdo modal</Text>
            </Modal>
            <Toast ref={toastRef} position="center" opacity={0.9}/>
        </View>
    )
}

const generateOptions= ()=>{
    return [
        {
            title : "Cambiar Nombres y Apellidos",
            iconNameLeft: "account-circle",
            iconColorLeft: "#ad2c33",
            iconNameRight: "chevron-right",
            iconColorRight: "#ad2c33",
            onPress: ()=> seletedComponent("displayName")
        },{
            title : "Cambiar Dirección",
            iconNameLeft: "at",
            iconColorLeft: "#ad2c33",
            iconNameRight: "chevron-right",
            iconColorRight: "#ad2c33",
            onPress: ()=> seletedComponent("displayAddres")
        },
        {
            title : "Cambiar Teléfono",
            iconNameLeft: "at",
            iconColorLeft: "#ad2c33",
            iconNameRight: "chevron-right",
            iconColorRight: "#ad2c33",
            onPress: ()=> seletedComponent("phone")
        },
        {
            title : "Cambiar Celular",
            iconNameLeft: "at",
            iconColorLeft: "#ad2c33",
            iconNameRight: "chevron-right",
            iconColorRight: "#ad2c33",
            onPress: ()=> seletedComponent("celular")
        },
        {
            title : "Cambiar Email",
            iconNameLeft: "at",
            iconColorLeft: "#ad2c33",
            iconNameRight: "chevron-right",
            iconColorRight: "#ad2c33",
            onPress: ()=> seletedComponent("email")
        },
        {
            title : "Cambiar Contraseña",
            iconNameLeft: "lock-reset",
            iconColorLeft: "#ad2c33",
            iconNameRight: "chevron-right",
            iconColorRight: "#ad2c33",
            onPress: ()=> seletedComponent("password")
        }
    ]
} 

const seletedComponent = (key) =>{

}

const styles = StyleSheet.create({
    menuItem:{
        borderBottomWidth:1,
        borderBottomColor:"#a7bfd3"
    }
})
