import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { FirebaseContext } from './store/context';
import Context from './store/context'
import firebase from './firebase/config';


ReactDOM.render(
    <Router>

        <FirebaseContext.Provider value={{ firebase }}>
            <Context>
                <App />
            </Context>
        </FirebaseContext.Provider>
    </Router>,
    document.getElementById('root')
);
