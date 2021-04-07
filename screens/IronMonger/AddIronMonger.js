import React, { useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Toast from 'react-native-easy-toast'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import AddIronMongersForm from '../../components/ironmongers/AddIronMongersForm'
import Loading from '../../components/Loading'


export default function AddIronMonger({navigation, route}) {

    const { setIsVisible } = route.params
    const [loading, setLoading] = useState(false)
    const toastRef = useRef()

    setIsVisible(false)
    return (
        <KeyboardAwareScrollView>
            <AddIronMongersForm 
                toastRef={toastRef} 
                setLoading={setLoading} 
                navigation={navigation}
            />
            <Loading isVisible={loading} text="Creando ferreteria..."/>
            <Toast ref={toastRef} position="center" opacity={0.9}/>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({})
