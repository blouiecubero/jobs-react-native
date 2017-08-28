import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';

import {
    FACEBOOK_LOGIN_SUCCESS,
    FACEBOOK_LOGIN_FAIL,
    FACEBOOK_LOGOUT
} from './types';

export const facebookLogin = () => async dispatch => {
    let token = await AsyncStorage.getItem('fb_token');

    console.log('token:', token)
    if (token) {
        dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
    } else {
        doFacebookLogin(dispatch);
    }
}

const doFacebookLogin = async (dispatch) => {
   
    let { type, token } = await Facebook.logInWithReadPermissionsAsync('2179178588975608', {
        permissions: ['public_profile']
    });
    console.log('type:', type)
    if (type === 'cancel') {
        return dispatch({ type: FACEBOOK_LOGIN_FAIL });
    } 

    await AsyncStorage.setItem('fb_token', token);
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
    
}

export const logout = () => async (dispatch) => {
    await AsyncStorage.removeItem('fb_token');
    dispatch({ type: FACEBOOK_LOGOUT});
}
