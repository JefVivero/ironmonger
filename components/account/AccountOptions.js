import { map } from 'lodash'
import React, { useState, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'
import Toast  from 'react-native-easy-toast'

import Modal from '../Modal'
import ChangeDisplayNameForm from './ChangeDisplayNameForm'
import ChangeEmailForm from './ChangeEmailForm'
import ChangePasswordForm from './ChangePasswordForm'

export default function AccountOptions({ route }) {
    const toastRef = useRef()

    const {userInfo, setReloadUser} = route.params
    
    const [showModal, setShowModal] = useState(false)   
    const [renderComponent, setRenderComponent] = useState(null) 

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
                iconNameLeft: "home-circle",
                iconColorLeft: "#ad2c33",
                iconNameRight: "chevron-right",
                iconColorRight: "#ad2c33",
                onPress: ()=> seletedComponent("Addres")
            },
            {
                title : "Cambiar Teléfono",
                iconNameLeft: "phone",
                iconColorLeft: "#ad2c33",
                iconNameRight: "chevron-right",
                iconColorRight: "#ad2c33",
                onPress: ()=> seletedComponent("phone")
            },
            {
                title : "Cambiar Celular",
                iconNameLeft: "cellphone",
                iconColorLeft: "#ad2c33",
                iconNameRight: "chevron-right",
                iconColorRight: "#ad2c33",
                onPress: ()=> seletedComponent("cellphone")
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
        switch (key) {
            case "displayName":
                setRenderComponent(
                    <ChangeDisplayNameForm
                        displayName= {userInfo.displayName}
                        setShowModal={setShowModal}
                        toastRef= {toastRef}
                        setReloadUser={setReloadUser}
                    />
                )
                break;
            case "email":
                setRenderComponent(
                    <ChangeEmailForm
                        email= {userInfo.email}
                        setShowModal={setShowModal}
                        toastRef= {toastRef}
                        setReloadUser={setReloadUser}
                    />
                )
                break;
            case "password":
                setRenderComponent(
                    <ChangePasswordForm
                        setShowModal={setShowModal}
                        toastRef= {toastRef}
                    /> 
                )
                break;   
            case "Addres":
                setRenderComponent(
                    <Text>Addres</Text>
                 )
                 break;   
            case "phone":
                 setRenderComponent(
                    <Text>phone</Text>
                    //phoneNumber
                )
                 break;   
            case "cellphone":
                setRenderComponent(
                    <Text>cellphone</Text>
                )
                 break;                          
        }
    
       setShowModal(true)
    }

    const menuOptions = generateOptions()

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
                {
                    renderComponent
                }
            </Modal>             
            <Toast ref={toastRef} position="center" opacity={0.9}/>
        </View>
    )
}

const styles = StyleSheet.create({
    menuItem:{
        borderBottomWidth:1,
        borderBottomColor:"#a7bfd3"
    }
})
