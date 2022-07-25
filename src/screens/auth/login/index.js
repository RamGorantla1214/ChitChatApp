// This is login screen where user enter registered email address and password to authenticate and redirected to home screen if credentials are right otherwise will show
// error message

import React, {Component} from 'react';
import {View,Image,Text} from 'react-native';
import {Colors, FocusAwareStatusBar,Fonts,setUserData,setUserLogin,showErrorMessage,toggleLoader,CollectionsNames,EventName} from '@common';
import { AppTextInput,AppButton } from '@components';
import { widthPercentageToDP,heightPercentageToDP } from 'react-native-responsive-screen';
import {icShowHidePasswordFilled} from "@images"
import Touchable from 'react-native-platform-touchable';
import { RFValue } from 'react-native-responsive-fontsize';
import firestore from '@react-native-firebase/firestore';
import validator from 'validator';
import EventEmitter from 'react-native-eventemitter';

export class Login extends Component {

  constructor(props){
    super()
    this.state = {
      email : "",
      isPasswordSecure:true,
      password:""
    }
  }

  // rendering part of ui is starting from here
  render() {
    return (
      <View style={{flex: 1, backgroundColor: Colors.ScreenBG}}>
        <FocusAwareStatusBar
          translucent={false}
          backgroundColor={Colors.PrimaryColor}
          barStyle="light-content"
        />

        <AppTextInput 
        placeholder={'Enter Email'}
        keyboardType="email-address"
        containerStyle={{
          marginHorizontal: screenMargin,
          marginTop: heightPercentageToDP('5%'),
        }}
        onChangeText={text => {
          this.setState({email: text});
        }}
        value={this.state.email} />

<AppTextInput
          secureTextEntry={this.state.isPasswordSecure}
          placeholder={'Enter Password'}
          containerStyle={{
            marginHorizontal: screenMargin,
            marginTop: heightPercentageToDP('3%'),
          }}
          onChangeText={text => {
            this.setState({password: text});
          }}
          value={this.state.password}
          rightComponent={
            <Touchable
              onPress={() => {
                this.setState({isPasswordSecure: !this.state.isPasswordSecure});
              }}
              activeOpacity={0.5}
              foreground={Touchable.Ripple(Colors.PrimaryRippleColor, true)}
              style={{
                paddingHorizontal: widthPercentageToDP('2%'),
                paddingVertical: heightPercentageToDP('1%'),
              }}>
              <Image resizeMode="contain" source={icShowHidePasswordFilled} />
            </Touchable>
          }
        />

<AppButton
          onPress={() => {
            if (this.validateAll()) {
              this.callLoginWS();
            }
          }}
          label={'Sign in'}
          containerStyle={{
            marginTop: heightPercentageToDP('5%'),
            marginHorizontal: screenMargin,
          }}
        />

        <Text
          style={{
            marginTop: heightPercentageToDP('2%'),
            textAlign: 'center',
            color: Colors.PrimaryColor,
            fontFamily: Fonts.Regular,
            fontSize: RFValue(12),
          }}>
          Don't have an account?{' '}
          <Text
            onPress={() => {
              this.props.navigation.navigate('Signup');
            }}
            style={{fontFamily: Fonts.SemiBold}}>
            Sign up
          </Text>
        </Text>
      </View>
    );
  }

  // function that validate user data before checking with server
  validateAll() {
    let email = this.state.email.trim();
    let password = this.state.password.trim();

    if (validator.isEmpty(email, {ignore_whitespace: true})) {
      showErrorMessage('Please enter email');
      return false;
    }

    if (!validator.isEmail(email)) {
      showErrorMessage('Please enter valid email');
      return false;
    }

    if (validator.isEmpty(password, {ignore_whitespace: true})) {
      showErrorMessage('Please enter password');
      return false;
    }

    return true;
  }

  // function that is called to authenticate user by matching inputs with server data
  callLoginWS() {
    toggleLoader(true)
    firestore()
      .collection(CollectionsNames.USERS)
      .where('email', '==', this.state.email)
      .where('password', '==', this.state.password)
      .get()
      .then(querySnapshot => {
        toggleLoader(false);
        if (querySnapshot.empty) {
          showErrorMessage('Invalid credentials');
        } else {
          let obj = querySnapshot.docs[0];
          console.log('id ' + obj.id);
          let userData = {
            id: obj.id,
            email: obj.get('email'),
            fname: obj.get('fname'),
            lname: obj.get('lname'),
            password: obj.get('password'),
          };

          setUserLogin(true, false).then(() => {
            setUserData(userData).then(() => {
              EventEmitter.emit(EventName.USER_DATA_UPDATED, true);
            });
          });
        }
      })
      .catch(error => {
        toggleLoader(false);
        showErrorMessage('Something went wrong');
      });
  }
}

const screenMargin = widthPercentageToDP("5%")