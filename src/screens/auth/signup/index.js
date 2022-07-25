/* 
    This is signup screen where user enter data to create account on this platform 
*/

import React, {Component} from 'react';
import {View,Image,Text} from "react-native"
import {FocusAwareStatusBar,Colors,showErrorMessage,setUserLogin,setUserData,EventName,Fonts,RegEx,CollectionsNames,toggleLoader} from "@common"
import { widthPercentageToDP,heightPercentageToDP } from "react-native-responsive-screen"
import Touchable from "react-native-platform-touchable"
import {icShowHidePasswordFilled} from "@images"
import {AppButton,AppTextInput} from "@components"
import validator from "validator"
import XRegExp from 'xregexp';
import EventEmitter from "react-native-eventemitter";
import { RFValue } from "react-native-responsive-fontsize"
import firestore from '@react-native-firebase/firestore';

export class Signup extends Component {
  constructor(props){
    super()
    this.state = {
        fname:"",
        lname:"",
        email:"",
        password:"",
        isPasswordSecure:true
    }
}

// rendering part of ui starts from here
render(){
    return(
        <View style={{flex:1,backgroundColor:Colors.ScreenBG}}>
            <FocusAwareStatusBar translucent={false} backgroundColor={Colors.PrimaryColor} barStyle="light-content" />

            <AppTextInput placeholder={"Enter First Name"} containerStyle={{marginHorizontal:screenMargin,marginTop:heightPercentageToDP("5%")}} onChangeText={(text)=>{
                    this.setState({fname:text})
                }} value={this.state.fname} />

            <AppTextInput placeholder={"Enter Last Name"} containerStyle={{marginHorizontal:screenMargin,marginTop:heightPercentageToDP("2%")}} onChangeText={(text)=>{
                    this.setState({lname:text})
                }} value={this.state.lname} />

            <AppTextInput placeholder={"Enter Email"} keyboardType="email-address" containerStyle={{marginHorizontal:screenMargin,marginTop:heightPercentageToDP("2%")}} onChangeText={(text)=>{
                    this.setState({email:text})
                }} value={this.state.email} />

            <AppTextInput secureTextEntry={this.state.isPasswordSecure} placeholder={"Enter Password"} containerStyle={{marginHorizontal:screenMargin,marginTop:heightPercentageToDP("2%")}} onChangeText={(text)=>{
                    this.setState({password:text})
                }} value={this.state.password} rightComponent={(
                <Touchable onPress={()=>{
                    this.setState({isPasswordSecure:!this.state.isPasswordSecure})
                }} activeOpacity={0.5} foreground={Touchable.Ripple(Colors.PrimaryRippleColor,true)} style={{paddingHorizontal:widthPercentageToDP("2%"),paddingVertical:heightPercentageToDP("1%")}}>
                    <Image resizeMode="contain" source={icShowHidePasswordFilled} />
                </Touchable>)} />
            
            <AppButton onPress={()=>{
                    if(this.validateAll()){
                        this.callSignUpWS()
                    }
                }} label={"Sign up"} containerStyle={{marginTop:heightPercentageToDP("5%"),marginHorizontal:screenMargin}} />
        </View>
    )
}

// function that validates input before storing data to server
validateAll(){
    let fname = this.state.fname.trim()
    let lname = this.state.lname.trim()
    let email = this.state.email.trim()
    let password = this.state.password.trim()

    if(validator.isEmpty(fname)){
        showErrorMessage("Please enter first name")
        return false
    }

    if (!XRegExp(RegEx.NAME).test(fname)) {
        showErrorMessage("Please enter valid first name")
        return false
    }

    if(validator.isEmpty(lname)){
        showErrorMessage("Please enter last name")
        return false
    }

    if (!XRegExp(RegEx.NAME).test(lname)) {
        showErrorMessage("Please enter valid last name")
        return false
    }

    if(validator.isEmpty(email)){
        showErrorMessage("Please enter email")
        return false
    }

    if(!validator.isEmail(email)){
        showErrorMessage("Please enter valid email")
        return false
    }

    if(validator.isEmpty(password)){
        showErrorMessage("Please enter password")
        return false
    }

    // if(!XRegExp(RegEx.PASSWORD_REGEX).test(password)){
    //     showErrorMessage("Please enter valid password")
    //     return false            
    // }

    return true
}

// function that is responsible to store uset entered data
callSignUpWS(){
    toggleLoader(true)
    firestore()
    .collection(CollectionsNames.USERS)
    .add({
      fname: this.state.fname,
      email:this.state.email,
      password:this.state.password,
      lname:this.state.lname
    })
    .then(() => {
      toggleLoader(false)
      this.props.navigation.goBack()
    })
    .catch(error => {
        toggleLoader(false)
        showErrorMessage("Something went wrong");
    })
}
}

const screenMargin = widthPercentageToDP("5%")