import React from 'react';
import { useEffect,useContext } from 'react';
import './App.css';
import { Route,Routes, BrowserRouter as Router } from 'react-router-dom';
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Home from './Pages/Home';
import Create from './Pages/Create'
import {AuthContext} from './store/context'
import { getAuth } from 'firebase/auth';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import firebase from './firebase/config';
import Post from './store/postcontext';
import View from './Components/View/View';

function App() {

  const {setuser}= useContext(AuthContext);

  const auth = getAuth(firebase)
  const firestore = getFirestore(firebase)

  useEffect(()=> {
    auth.onAuthStateChanged(async(user)=> {
      console.log(user,"Auth data")
      if (user) {
        const q = query(collection(firestore, 'users'), where('id', '==', user.uid))
        const querySnapshot = await getDocs(q);

        if(querySnapshot.empty){
          console.log('User not found');
        }else{
          const user = querySnapshot.docs[0].data();
          console.log(user,"db data");
          setuser(user)
        }
      }
    })
  
  }, [])

  return (
    <div>
  <Post>
       <Routes>

        <Route path='/' element={<Home />} />
        
        <Route path='/signup' element={<Signup/>}/>

        <Route path='/login' element={ <Login/> } />

        <Route path='/create' element={<Create/>} />
        <Route path='/view' element={<View/>}/>
      
       </Routes>
       </Post>

    </div>
  );
}

export default App;
