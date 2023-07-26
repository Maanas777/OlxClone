import {initializeApp} from 'firebase/app'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDGVwVhAGGQpTJ1covUqpYzjJOhU8Njad8",
    authDomain: "olx-project-d6996.firebaseapp.com",
    projectId: "olx-project-d6996",
    storageBucket: "olx-project-d6996.appspot.com",
    messagingSenderId: "143036583055",
    appId: "1:143036583055:web:78c3510798b3370820f4fa",
    measurementId: "G-ZTRDDYHBLZ"
  };

const firebase = initializeApp(firebaseConfig)
export default firebase