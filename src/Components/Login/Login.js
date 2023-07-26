import React from 'react';
import { useState } from 'react';
import { getAuth,signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


import Logo from '../../olx-logo.png';
import './Login.css';
import firebase from '../../firebase/config';

function Login() {

  const [email, setemail] = useState('')
  const [password, setpassword] = useState('') 
  const [error, seterror] = useState('')
  const navigate=useNavigate();

  const handleLogin = (e)=> {
    e.preventDefault();

    const auth = getAuth(firebase)
    signInWithEmailAndPassword(auth, email, password).then(()=> {
      navigate('/')
    }).catch((err)=> {
      console.log(err);
      let error = err.message.split('/')[1].split(")")[0].trim();
      seterror(error)
      setTimeout(()=> {
        seterror('');
      }, 3000);
    })

  }


  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setemail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setpassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link to="/signup">Signup</Link>

      </div>
    </div>
  );
}

export default Login;
