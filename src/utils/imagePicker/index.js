// This file contains code to pick image in app

import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, StatusBar, Platform} from 'react-native';
import Modal from 'react-native-modal';
import Touchable from 'react-native-platform-touchable';
import {strings, Colors, Fonts, Constants, ImagePickOption} from '@common';
import PropTypes from 'prop-types';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {icClose} from '@images';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export class ImagePickerModal extends Component {
  static propTypes = {
    isVisible: PropTypes.bool,
    onClosePress: PropTypes.func,
    onImageSelected: PropTypes.func,
  };

  render() {
    return (
      <Modal
        style={{margin: 0}}
        isVisible={this.props.isVisible}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}>
        <View style={style.containerStyle}>
          <View
            style={{
              alignSelf: 'stretch',
              marginHorizontal: widthPercentageToDP('2%'),
            }}>
            <View style={style.optionContainerStyle}>
              <Text style={style.selectOpTextStyle}>Select Option</Text>
              <Touchable
                activeOpacity={0.5}
                foreground={Touchable.Ripple(Colors.Purple, false)}
                style={style.opContainerStyle}
                onPress={() => {
                  this.showImagePicker(ImagePickOption.CAMERA);
                }}>
                <Text style={style.opTextStyle}>Camera</Text>
              </Touchable>

              <Touchable
                activeOpacity={0.5}
                foreground={Touchable.Ripple(Colors.Purple, false)}
                style={style.opContainerStyle}
                onPress={() => {
                  this.showImagePicker(ImagePickOption.GALLERY);
                }}>
                <Text style={style.opTextStyle}>Gallery</Text>
              </Touchable>
            </View>
            <Touchable
              foreground={Touchable.Ripple(Colors.Purple, true)}
              style={{alignSelf: 'flex-end', position: 'absolute',end:widthPercentageToDP("8%"),top:heightPercentageToDP("4%")}}
              activeOpacity={0.5}
              onPress={() => {
                this.props.onClosePress();
              }}>
              <Image source={icClose} resizeMode="contain" />
            </Touchable>
          </View>
        </View>
      </Modal>
    );
  }

  showImagePicker(selectedOp) {
    const options = {
      title: 'Select Avatar',
      mediaType: 'photo',
      privateDirectory: true,
      skipBackup: true,
      path: 'images',
      includeBase64: false,
      quality: 0.5,
    };

    if (selectedOp == ImagePickOption.CAMERA) {
      launchCamera(options, this.handleResponseOfImageSelection);
    }

    if (selectedOp == ImagePickOption.GALLERY) {
      launchImageLibrary(options, this.handleResponseOfImageSelection);
    }
  }

  handleResponseOfImageSelection = response => {
    //showLog("response "+JSON.stringify(response))
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorCode) {
      console.log('ImagePicker Error: ', response.errorCode);
    } else {
      const source = {uri: response.uri};

      // You can also display the image using data:
      // const source = { uri: 'data:image/jpeg;base64,' + response.data };

      //showLog("base64"+response.base64)
      console.log('image selected ' + JSON.stringify(response));
      this.props.onImageSelected(response.assets[0]);
    }
  };
}

const style = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionContainerStyle: {
    backgroundColor: Colors.White,
    borderRadius: heightPercentageToDP('2%'),
    marginHorizontal: widthPercentageToDP('4%'),
    paddingVertical: heightPercentageToDP('2%'),
    marginTop: heightPercentageToDP('2%'),
  },
  selectOpTextStyle: {
    color: Colors.Black,
    fontSize: RFValue(18),
    fontFamily: Fonts.OPENSANS_REGULAR,
    marginHorizontal: widthPercentageToDP('3%'),
  },
  opContainerStyle: {
    paddingHorizontal: widthPercentageToDP('5%'),
    minHeight: heightPercentageToDP('9%'),
    justifyContent: 'center',
  },
  opTextStyle: {
    color: Colors.Black,
    fontSize: RFValue(14),
    fontFamily: Fonts.OPENSANS_REGULAR,
  },
});
