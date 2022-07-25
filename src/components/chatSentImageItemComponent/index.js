// This file contains code for image to show in chat detail screen which is sent by login user

import React, {PureComponent} from 'react';
import {View, Image, Text, Platform} from 'react-native';
import {Colors, Fonts, FirebaseStorage} from '@common';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {icChatReceivedTick} from '@images';
import {AutoScaleImage} from '../autoScaleImage';
import storage from '@react-native-firebase/storage';

export class ChatSentImageItemComponent extends PureComponent {
  constructor(props) {
    super();
    this.state = {
      url: '',
    };
  }

  render() {
    let heightOfImage = Number(this.props.data.height);
    let widthOfImage = Number(this.props.data.width);
    return (
      <View
        style={{
          marginTop: heightPercentageToDP('2%'),
          flexDirection: 'row',
          marginEnd: widthPercentageToDP('2%'),
          marginStart: widthPercentageToDP('2%'),
          justifyContent: 'flex-end',
        }}>
        <View
          style={{
            borderColor: Colors.PrimaryColor,
            borderTopStartRadius: heightPercentageToDP('2%'),
            borderBottomStartRadius: heightPercentageToDP('2%'),
            borderBottomEndRadius: heightPercentageToDP('0.5%'),
            borderTopEndRadius: heightPercentageToDP('2%'),
            borderWidth: heightPercentageToDP('1.5%'),
          }}>
          <AutoScaleImage
            uri={this.state.url}
            width={widthPercentageToDP('40%')}
            widthOfImage={widthOfImage}
            heightOfImage={heightOfImage}
          />
        </View>
      </View>
    );
  }

  componentDidMount() {
    let storageRef = storage().refFromURL(FirebaseStorage.BUCKET_URL);
    storageRef
      .child(this.props.data.message)
      .getDownloadURL()
      .then(url => {
        this.setState({url: url});
      });
  }
}
