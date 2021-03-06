import { map } from 'lodash'
import React, { useState, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'
import Toast  from 'react-native-easy-toast'

import Modal from '../Modal'
import ChangeDisplayNameForm from './ChangeDisplayNameForm'
import ChangeEmailForm from './ChangeEmailForm'
import ChangePasswordForm from './ChangePasswordForm'
import ChangeAddressForm from './ChangeAddressForm'
import ChangePhoneNumberForm from './ChangePhoneNumberForm'
import ChangeTypeUserForm from './ChangeTypeUserForm'

export default function AccountOptions({ route }) {
    const toastRef = useRef()

    const {userInfo, setReloadUser, typeUsers} = route.params
    
    const [showModal, setShowModal] = useState(false)   
    const [renderComponent, setRenderComponent] = useState(null)  

    const generateOptions= ()=>{
        return [
            {
                title : "Cambiar Nombres y Apellidos",
                iconNameLeft: "account-circle",
                iconColorLeft: "#0e5f6a",
                iconNameRight: "chevron-right",
                iconColorRight: "#0e5f6a",
                onPress: ()=> seletedComponent("displayName")
            },{
                title : "Cambiar Dirección",
                iconNameLeft: "home-circle",
                iconColorLeft: "#0e5f6a",
                iconNameRight: "chevron-right",
                iconColorRight: "#0e5f6a",
                onPress: ()=> seletedComponent("Address")
            },
            {
                title : "Cambiar Numero de Celular",
                iconNameLeft: "cellphone",
                iconColorLeft: "#0e5f6a",
                iconNameRight: "chevron-right",
                iconColorRight: "#0e5f6a",
                onPress: ()=> seletedComponent("Phone")
            },
            {
                title : "Cambiar Email",
                iconNameLeft: "at",
                iconColorLeft: "#0e5f6a",
                iconNameRight: "chevron-right",
                iconColorRight: "#0e5f6a",
                onPress: ()=> seletedComponent("email")
            },
            {
                title : "Cambiar Contraseña",
                iconNameLeft: "lock-reset",
                iconColorLeft: "#0e5f6a",
                iconNameRight: "chevron-right",
                iconColorRight: "#0e5f6a",
                onPress: ()=> seletedComponent("password")
            },
            typeUsers.TypeUser === "IronMonger" ? (
                {
                    title : "Cambiar a IRON",
                    iconNameLeft: "account-switch",
                    iconColorLeft: "#0e5f6a",
                    iconNameRight: "chevron-right",
                    iconColorRight: "#0e5f6a",
                    onPress: ()=> seletedComponent("typeUser")
                }
            ) : (
                {
                    title : "Cambiar a IRONMONGER",
                    iconNameLeft: "account-switch",
                    iconColorLeft: "#0e5f6a",
                    iconNameRight: "chevron-right",
                    iconColorRight: "#0e5f6a",
                    onPress: ()=> seletedComponent("typeUser")
                }
            )
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
            case "Address":
                setRenderComponent(
                    <ChangeAddressForm
                        Address={typeUsers.Address}
                        IdDoc={typeUsers.id}
                        setShowModal={setShowModal}
                        toastRef= {toastRef}
                        setReloadUser={setReloadUser}
                    />
                 )
                 break;
            case "Phone":
                setRenderComponent(
                    <ChangePhoneNumberForm
                        Phone={typeUsers.Phone}
                        IdDoc={typeUsers.id}
                        setShowModal={setShowModal}
                        toastRef= {toastRef}
                        setReloadUser={setReloadUser}
                    />
                )
                 break;
            case "typeUser":
                setRenderComponent(
                    <ChangeTypeUserForm
                        TypeUser={typeUsers.TypeUser}
                        IdDoc={typeUsers.id}
                        setShowModal={setShowModal}
                        toastRef= {toastRef}
                        setReloadUser={setReloadUser}
                    />
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
        borderBottomColor:"#0e5f6a"
    }
})
