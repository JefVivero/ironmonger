import { firebaseApp } from './firebase'
import * as firebase from 'firebase'
import 'firebase/firestore'
import { fileToBlob } from './helpers'

const db= firebase.firestore(firebaseApp)

export const isUserLogged = ()=>{
    let isLogged =false
    firebase.auth().onAuthStateChanged((user) => {
        user !== null && (isLogged=true)
    })

    return isLogged
}

export const getCurrentUser = () =>{
    return firebase.auth().currentUser
}

export const registerUser = async(email, password)=>{
    const result = { StatusResponse: true, error: null}

    try {
        await firebase.auth().createUserWithEmailAndPassword(email,password)
        
    } catch (error) {
        result.error =  "Este correo ya ha sido registrado"
        result.StatusResponse = false
    }

    return result
}

export const CloseSession = () =>{
    return firebase.auth().signOut()
}

export const LoginWithEmailAndPassword = async(email, password)=>{
    const result = { StatusResponse: true, error: null}

    try {
        await firebase.auth().signInWithEmailAndPassword(email,password)
        
    } catch (error) {
        result.error =  "Usuario o contraseña invalidos."
        result.StatusResponse = false
    }

    return result
}

export const uploadImage = async(image, path, name) =>{
    const result = { statusResponse: false , error: null, url: null}
    const ref = firebase.storage().ref(path).child(name)
    const blob = await fileToBlob(image)

    try {
        await ref.put(blob)
        const url = await firebase.storage().ref(`${path}/${name}`).getDownloadURL()
        result.statusResponse= true
        result.url = url
    } catch (error) {
        return result.error = error 
    }
    
    return result
}

export const updateProfile = async(data) =>{
    const result = { status: true, error: null }

    try {
        await firebase.auth().currentUser.updateProfile(data)
    } catch (error) {
        result.status= false;
        result.error= error
    }

    return result
}

export const reauthenticate = async(password) =>{
    const result = { status: true, error: null }
    const user = getCurrentUser()
    const credentials = firebase.auth.EmailAuthProvider.credential(user.email, password)
    try {
        await user.reauthenticateWithCredential(credentials)
    } catch (error) {
        result.status= false;
        result.error= error
    }

    return result
}

export const updateEmail = async(email) =>{
    const result = { status: true, error: null }

    try {
        await firebase.auth().currentUser.updateEmail(email)
    } catch (error) {
        result.status= false;
        result.error= error
    }

    return result
}