import axios from 'axios';
import {AUTH_SIGN_UP,
        AUTH_SIGN_OUT,
        AUTH_SIGN_IN,
        AUTH_ERROR,
        DASHBOARD_GET_DATA } from './types';

/*
    ActionCreators -> create/return Actions ({}) -> dispatched -> middlewares -> reducers
*/

export const oauthGoogle = data => {
    return async dispatch => {
        const res = await axios.post('http://localhost:5000/users/oauth/google', {
            access_token: data
        });

        dispatch({
            type: AUTH_SIGN_UP,
            payload: res.data.token
        });

        localStorage.setItem('JWT_TOKEN', res.data.token);
        axios.defaults.headers.common['Authorization'] = res.data.token;
    }
}

export const oauthFacebook = data => {
    return async dispatch => {
        const res = await axios.post('http://localhost:5000/users/oauth/facebook', {
            access_token: data
        });

        dispatch({
            type: AUTH_SIGN_UP,
            payload: res.data.token
        });

        localStorage.setItem('JWT_TOKEN', res.data.token);
        axios.defaults.headers.common['Authorization'] = res.data.token;
    }
}

export const signUp = data => {
        /*
            Step 1) Use the data and to make HTTP request to our BE and send it along [X]
            Step 2) Take the BE's response (jwtToken is here now!)[X]
            Step 3) Dispatch user just signed up (with jwtToken)[X]
            Step 4) Save the jwtToken into our localStorage[X]
        */
    return async dispatch => {
        try {
            console.log('[ActionCreator] signUpo called!');
            const res = await axios.post('http://localhost:5000/users/signup', data);
            console.log('[ActionCreator] signUp dispatched!');

            dispatch({
                type: AUTH_SIGN_UP,
                payload: res.data.token
            });

            localStorage.setItem('JWT_TOKEN', res.data.token);
            axios.defaults.headers.common['Authorization'] = res.data.token;
        } catch (error) {
            dispatch({
                type: AUTH_ERROR,
                payload: 'Email is already in use'
            });
            console.log('error', error);
        }
    };
}

export const getSecret = () => {
    return async dispatch => {
        try {
            console.log('[ActionCreator] trying to get BE\'s secret');
            const res = await axios.get('http://localhost:5000/users/secret');

            dispatch({
                type: DASHBOARD_GET_DATA,
                payload: res.data.secret
            })
        } catch (error) {
            console.error('error', error);
        }
        
    }
}

export const signIn = data => {
    /*
        Step 1) Use the data and to make HTTP request to our BE and send it along [X]
        Step 2) Take the BE's response (jwtToken is here now!)[X]
        Step 3) Dispatch user just signed up (with jwtToken)[X]
        Step 4) Save the jwtToken into our localStorage[X]
    */
return async dispatch => {
    try {
        console.log('[ActionCreator] signIn called!');
        const res = await axios.post('http://localhost:5000/users/signin', data);
        console.log('[ActionCreator] signIn dispatched!');

        dispatch({
            type: AUTH_SIGN_IN,
            payload: res.data.token
        });

        localStorage.setItem('JWT_TOKEN', res.data.token);
        axios.defaults.headers.common['Authorization'] = res.data.token;
    } catch (error) {
        dispatch({
            type: AUTH_ERROR,
            payload: 'Email or password is wrong'
        });
        console.log('error', error);
    }
};
}

export const signOut = () => {
    return dispatch => {
        localStorage.removeItem('JWT_TOKEN');
        axios.defaults.headers.common['Authorization'] = '';

        dispatch({
            type: AUTH_SIGN_OUT,
            payload: ''
        });
    };
}