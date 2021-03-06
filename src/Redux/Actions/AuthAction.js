//sign in
import {database} from "../../Firebase/firebase";


export const loginAction = () =>{
    return{
        type: 'Login'
    }
}
// sign out
export const logoutAction = () =>{
    return{
        type: 'Logout'
    }
}
// add user
export const addUserAction = (profile) =>{
    return{
        type:'AddUser',
        profile
    }
}
export const startAddUser = (data) => {
    return (dispatch) => {
        const uid = data.userId;
        database.ref(`users/${uid}/profile`).once('value')
            .then( res => {
                if(res.val()){
                    dispatch(addUserAction(res.val()));
                    console.log('user too data base haaast');
                }
                else{
                    database.ref(`users/${uid}/profile`).set(data)
                        .then(()=>{
                            dispatch(addUserAction({...data}));
                            console.log('user niiiist');
                        })
                }
            })
    }
}
