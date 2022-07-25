// This file contains code to manage user session during app

import AsyncStorage from '@react-native-async-storage/async-storage';
import { showLog,Pref } from '@common';
import { CommonActions,StackActions,TabActions } from '@react-navigation/native';

let _userData = undefined;
let _isUserLogin = false;
let _isUserLoginGuest = false;
let _isUserFirstTime = true;
let loaderRef;
let _navigator;

// export function setUserData(userDataResponse) {
//   _userData = userDataResponse;
//   showLog('setted user data ' + JSON.stringify(_userData));
//   return AsyncStorage.setItem(
//     Pref.USER_DATA_PREF,
//     JSON.stringify(userDataResponse),
//   );
// }

export function setTopLevelNavigator(navigationRef){
  _navigator = navigationRef;
};

export function navigate(name,params){
  if (_navigator.isReady()) {
    _navigator.navigate(name, params);
  }
}

export function navigateNewTab(routeName,screenName,params){
  if(_navigator.isReady()){
    _navigator.dispatch(
      TabActions.jumpTo(routeName,params)
    )
  }
}

export function removeAll() {
  _userData = undefined;
  _isUserLogin = false
  _isUserLoginGuest = false

  return AsyncStorage.multiRemove([
    Pref.USER_DATA_PREF,
    Pref.IS_USER_LOGIN_PREF,
    Pref.IS_USER_LOGIN_GUEST_PREF
  ]);
}

export function setUserLogin(isUserLogin, isUserGuest) {
  _isUserLogin = isUserLogin;
  _isUserLoginGuest = isUserGuest;

  return AsyncStorage.multiSet([
    [Pref.IS_USER_LOGIN_PREF, isUserLogin.toString()],
    [Pref.IS_USER_LOGIN_GUEST_PREF, isUserGuest.toString()],
  ]);
}

// export function getUserData() {
//   return _userData;
// }

export function initData(callBack) {
  _userData = undefined;
  _isUserLogin = false;
  _isUserLoginGuest = false;
  _isUserFirstTime = true;

  AsyncStorage.multiGet(
    [
      Pref.USER_DATA_PREF,
      Pref.IS_USER_LOGIN_PREF,
      Pref.IS_USER_LOGIN_GUEST_PREF,
      Pref.IS_USER_FIRST_TIME_PREF,
    ],
    (errorArr, resultArr) => {
      console.log(JSON.stringify(resultArr));
      for (let counter = 0; counter < resultArr.length; counter++) {
        let value = resultArr[counter][1];

        if (resultArr[counter][0] == Pref.USER_DATA_PREF) {
          _userData = JSON.parse(value);
        } else if (resultArr[counter][0] == Pref.IS_USER_LOGIN_PREF) {
          _isUserLogin = value ? value == 'true' : false;
        } else if (resultArr[counter][0] == Pref.IS_USER_LOGIN_GUEST_PREF) {
          _isUserLoginGuest = value ? value == 'true' : false;
        } else if (resultArr[counter][0] == Pref.IS_USER_FIRST_TIME_PREF) {
          _isUserFirstTime = value ? value == 'true' : true;
        }
      }

      callBack();
    },
  );
}

export function setUserFirstTime() {
  _isUserFirstTime = false;
  return AsyncStorage.setItem(Pref.IS_USER_FIRST_TIME_PREF, 'false');
}

export function getIsUserLogin() {
  return {
    isUserLogin: _isUserLogin,
    isUserGuest: _isUserLoginGuest,
    isUserFirstTime: _isUserFirstTime,
  };
}

export const setLoaderRef = (ref) => {
  loaderRef = ref;
};

export const toggleLoader = (showLoader) => {
  if (loaderRef) {
    loaderRef.toggleLoader(showLoader);
  }
};

export const setUserData = (userData) => {
  _userData = userData
  return AsyncStorage.setItem(
    Pref.USER_DATA_PREF,
    JSON.stringify(userData)
  )
}

export const getUserData = () => {
  return _userData
}