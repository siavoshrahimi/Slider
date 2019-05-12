import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import createStore from './Redux/Store/Store';
import {firebase} from "./Firebase/firebase";
import {loginAction,logoutAction} from './Redux/Actions/AuthAction';
import {history} from './Route/Route';

import './index.css';

const store = createStore();

const jsx =
    (<Provider store={store}>
        <App/>
    </Provider>)

ReactDOM.render(<div>loading...</div>, document.getElementById('root'));


let isRender = false;


const appRender = () => {
    if(!isRender){
        ReactDOM.render(jsx, document.getElementById('root'));
        isRender = true;
    }
};


firebase.auth().onAuthStateChanged((user)=>{

    if(user){
        store.dispatch(loginAction());
        appRender();
        if(history.location.pathname === '/login'){
            history.push('/dashboard');
        }
    }
    else{
        store.dispatch(logoutAction());
        appRender();
    }
});