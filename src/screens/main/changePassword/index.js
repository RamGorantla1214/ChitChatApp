// This screen allows users to change their password

import React, {Component} from 'react';
import {View, Image} from 'react-native';
import {
  Colors,
  FocusAwareStatusBar,
  showErrorMessage,
  showSuccessMessage,
  toggleLoader,
  CollectionsNames,
  getUserData,
} from '@common';
import {AppTextInput, AppButton} from '@components';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import Touchable from 'react-native-platform-touchable';
import {icShowHidePasswordFilled} from '@images';
import validator from 'validator';
import firestore from '@react-native-firebase/firestore';

export class ChangePassword extends Component {
  constructor(props) {
    super();
    this.state = {
      isOldPasswordSecure: true,
      oldPassword: '',
      isNewPasswordSecure: true,
      newPassword: '',
      isConfirmPasswordSecure: true,
      confirmPassword: '',
    };
  }

  // rendering part of ui starts from here
  render() {
    return (
      <View style={{flex: 1, backgroundColor: Colors.ScreenBG}}>
        <FocusAwareStatusBar
          translucent={false}
          backgroundColor={Colors.PrimaryColor}
          barStyle="light-content"
        />

        <AppTextInput
          secureTextEntry={this.state.isOldPasswordSecure}
          placeholder={'Enter Old Password'}
          containerStyle={{
            marginHorizontal: screenMargin,
            marginTop: heightPercentageToDP('5%'),
          }}
          onChangeText={text => {
            this.setState({oldPassword: text});
          }}
          value={this.state.oldPassword}
          rightComponent={
            <Touchable
              onPress={() => {
                this.setState({
                  isOldPasswordSecure: !this.state.isOldPasswordSecure,
                });
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

        <AppTextInput
          secureTextEntry={this.state.isNewPasswordSecure}
          placeholder={'Enter New Password'}
          containerStyle={{
            marginHorizontal: screenMargin,
            marginTop: heightPercentageToDP('3%'),
          }}
          onChangeText={text => {
            this.setState({newPassword: text});
          }}
          value={this.state.newPassword}
          rightComponent={
            <Touchable
              onPress={() => {
                this.setState({
                  isNewPasswordSecure: !this.state.isNewPasswordSecure,
                });
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

        <AppTextInput
          secureTextEntry={this.state.isConfirmPasswordSecure}
          placeholder={'Enter Confirm Password'}
          containerStyle={{
            marginHorizontal: screenMargin,
            marginTop: heightPercentageToDP('3%'),
          }}
          onChangeText={text => {
            this.setState({confirmPassword: text});
          }}
          value={this.state.confirmPassword}
          rightComponent={
            <Touchable
              onPress={() => {
                this.setState({
                  isConfirmPasswordSecure: !this.state.isConfirmPasswordSecure,
                });
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
              this.callCheckOldPasswordCorrectWS();
            }
          }}
          label={'Change Password'}
          containerStyle={{
            marginTop: heightPercentageToDP('5%'),
            marginHorizontal: screenMargin,
          }}
        />
      </View>
    );
  }

  // validating user data before working on inputs
  validateAll() {
    let oldPassword = this.state.oldPassword.trim();
    let newPassword = this.state.newPassword.trim();
    let confirmPassword = this.state.confirmPassword.trim();

    if (validator.isEmpty(oldPassword, {ignore_whitespace: true})) {
      showErrorMessage('Please enter old password');
      return false;
    }

    if (validator.isEmpty(newPassword, {ignore_whitespace: true})) {
      showErrorMessage('Please enter new password');
      return false;
    }

    if (validator.isEmpty(confirmPassword, {ignore_whitespace: true})) {
      showErrorMessage('Please enter confirm password');
      return false;
    }

    if (newPassword != confirmPassword) {
      showErrorMessage('Password mismatch');
      return false;
    }

    return true;
  }

  // check entered old password is correct or not before updating with new password
  callCheckOldPasswordCorrectWS() {
    toggleLoader(true);

    firestore()
      .collection(CollectionsNames.USERS)
      .doc(getUserData().id)
      .get()
      .then(documentSnapshot => {
        console.log('User exists: ', documentSnapshot.exists);

        if (documentSnapshot.exists) {
          let userdata = documentSnapshot.data();
          console.log('User data: ', userdata);

          if (userdata.password != this.state.oldPassword) {
            toggleLoader(false);
            showErrorMessage('Old password is incorrect');
          } else {
            this.callUpdatePasswordWS();
          }
        }
      })
      .catch(error => {
        toggleLoader(false);
        showErrorMessage('Something went wrong');
      });
  }

  // updating password of user on server
  callUpdatePasswordWS() {
    firestore()
      .collection(CollectionsNames.USERS)
      .doc(getUserData().id)
      .update({
        password: this.state.newPassword,
      })
      .then(() => {
        toggleLoader(false);
        showSuccessMessage('Password updated successfully');
        this.props.navigation.goBack();
      })
      .catch(error => {
        toggleLoader(false);
        showErrorMessage('Something went wrong');
      });
  }
}

const screenMargin = widthPercentageToDP('5%');
