import {
  LOGIN_ATTEMPT ,
  LOGIN_SUCCESS ,
  LOGIN_FAILED
} from './types'

import axios from 'axios';
import { AsyncStorage } from 'react-native';





const onLoginSuccess = (dispatch, user, token) => {

  AsyncStorage.setItem('app_token',token)
    .then(() => {
      dispatch({ type: LOGIN_SUCCESS, user })
    });
};

const onLoginFailed = (dispatch, errorMessage) => {
  dispatch({ type: LOGIN_FAILED, error: errorMessage})
};


const handleResponse = (dispatch, data) => {
  if (!data.success) {
    onLoginFailed(dispatch, data.message);
  }else {
    onLoginSuccess(dispatch, data.user, data.token)
  }
}



export const loginUser = ({ username ,password }) => {

  return(dispatch) => {
    dispatch({type: LOGIN_ATTEMPT})

    axios.post('https://mean-app-tutorial.herokuapp.com/users/auth',
      { email :username ,password}
    ).then(resp => handleResponse(dispatch, resp.data))
    .catch(err => console.console.log(err));
  }
}
