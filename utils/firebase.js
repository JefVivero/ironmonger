import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyB8a1VYJR0jX7GrDCzNRMHLpIUd_yMuu4Q",
    authDomain: "ironmongers-7a591.firebaseapp.com",
    projectId: "ironmongers-7a591",
    storageBucket: "ironmongers-7a591.appspot.com",
    messagingSenderId: "509113280633",
    appId: "1:509113280633:web:99b7f5c642360b01f68ca8"
}

export const firebaseApp = firebase.initializeApp(firebaseConfig)