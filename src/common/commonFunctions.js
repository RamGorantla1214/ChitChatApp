// This file contains all global functions and functional components that we can use in whole app instead of writing same code again and again

import React from 'react';
import {StatusBar, Linking, View, Text, Image,KeyboardAvoidingView, Platform} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {useIsFocused} from '@react-navigation/native';
import numeral from 'numeral';
import FlashMessage from 'react-native-flash-message';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { useHeaderHeight } from '@react-navigation/elements';

// get initial letter of name so we can show it instead of profile picture as google shows
export const getInitalLetters = (str) => {
  let initalLetter = ""
  if(isStringThere(str)){
    let strArr = str.split(" ",2)
    initalLetter =  strArr[0].charAt(0).toUpperCase()
    if(strArr.length > 1){
      initalLetter += strArr[1].charAt(0).toUpperCase()
    }
  }

  return initalLetter
}

// to show error message
export const showErrorMessage = messageStr => {
  showMessage({
    message: messageStr,
    type: 'danger',
  });
};

// to show success message
export const showSuccessMessage = messageStr => {
  showMessage({
    message: messageStr,
    type: 'success',
  });
};

// check provided url is from local or not
export const isUrlLocal = uri => {
  return (
    uri != undefined &&
    uri != '' &&
    !(uri.startsWith('https') || uri.startsWith('http'))
  );
};

// open provided url
export const openUrl = url => {
  console.log('url ' + url);
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url);
    } else {
      showErrorMessage('Not able to open this link');
    }
  });
};

// to format numbers for ex 1000 to 1K
export const formatNumber = number => {
  if (number != '' && number != undefined && number != null) {
    //return new Intl.NumberFormat( 'en-US', { maximumFractionDigits: 1,notation: "compact" , compactDisplay: "short" }).format(number)
    let formatted = numeral(number).format('0.0a');
    return formatted.split('.')[1].indexOf('0') != -1
      ? `${formatted[0]}${formatted.split('.')[1].substring(1)}`
      : formatted;
    // return numeral(number).format("0.0a")
  }
  return '0';
};

// to check input data have any kind of string or not
export const isStringThere = inputStr => {
  return inputStr != undefined && inputStr != null && inputStr.trim() != '';
};

// on backpress , previous screen takes statusbar color of next page so to fix that we use focus aware status bar so each screen can contain and resume with own statusbar config
export const FocusAwareStatusBar = props => {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} hidden={false} /> : null;
};

// component which we are using to show error and success message and maintaing notch devices
export const FlashMsgComponent = props => {
  const insets = useSafeAreaInsets();
  return <FlashMessage position="top" statusBarHeight={insets.top} />;
};

// to manage header in chat detail screen
export const CustomKeyboardAvoidingView = (props) => {
  const headerHeight = useHeaderHeight();
  const statusBarHeight = 50
  return(
    <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS == "ios" ? "padding" : undefined} keyboardVerticalOffset={headerHeight + statusBarHeight}>
      {props.children}
    </KeyboardAvoidingView>
  )
}