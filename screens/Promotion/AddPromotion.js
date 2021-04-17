import React, { useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Toast from 'react-native-easy-toast'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Loading from '../../components/Loading'
import AddPromotionForm from '../../components/Promotions/AddPromotionForm'

export default function AddPromotion({navigation, route}) {
    const { infoUser, userData } = route.params
    const [loading, setLoading] = useState(false)
    const toastRef = useRef()

    return (
        <KeyboardAwareScrollView>
            <AddPromotionForm 
                toastRef={toastRef} 
                setLoading={setLoading} 
                navigation={navigation}
                infoUser={infoUser}
                userData={userData}
            />
            <Loading isVisible={loading} text="Creando promoción..."/>
            <Toast ref={toastRef} position="top" opacity={0.9}/>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({})