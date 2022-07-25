// This file contains code for item to show in recent chat list screen

import React, {PureComponent} from 'react';
import {View, Text, Image} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Colors, Fonts, Constants,isStringThere,getInitalLetters,MessageType} from '@common';
import {RFValue} from 'react-native-responsive-fontsize';
import moment from 'moment';

export class RecentChatComponent extends PureComponent {
  render() {
    let data = this.props.data
    let userData = data.userData;
    return (
      <Touchable
        onPress={this.props.onPress}
        activeOpacity={0.5}
        foreground={Touchable.Ripple(Colors.PrimaryRippleColor)}
        style={{
          borderBottomColor: 'rgba(142, 174, 203, 0.2)',
          borderBottomWidth: heightPercentageToDP('0.1%'),
        }}>
        <View
          style={{
            paddingVertical: heightPercentageToDP('1%'),
            paddingHorizontal: widthPercentageToDP('5%'),
            flexDirection: 'row',
            alignItems:"center"
          }}>
          <View
                style={{
                  height: heightPercentageToDP('7%'),
                  aspectRatio: 1,
                  borderRadius: heightPercentageToDP('100%'),
                  backgroundColor: Colors.Disable,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: Colors.White,
                    fontSize: RFValue(12),
                    fontFamily: Fonts.SemiBold,
                  }}>
                  {getInitalLetters(`${userData.fname} ${userData.lname}`)}
                </Text>
              </View>
          <View style={{flex: 1, marginHorizontal: widthPercentageToDP('5%')}}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                marginTop: heightPercentageToDP('1%'),
                color: Colors.PrimaryColor,
                fontSize: RFValue(16),
                fontFamily: Fonts.Medium,
              }}>
              {userData != undefined ? `${userData.fname} ${userData.lname}` : "Julia jordan"}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                color: Colors.Disable,
                fontSize: RFValue(13),
                fontFamily: Fonts.Regular,
              }}>
              {data.recentMessage.type == MessageType.TEXT ? data.recentMessage.message : "Image"}
            </Text>
          </View>
          <Text
            style={{
              color: Colors.Disable,
              fontSize: RFValue(12),
              fontFamily: Fonts.Regular,
            }}>
            {moment.unix(data.modifiedAt.seconds).fromNow()}
          </Text>
        </View>
      </Touchable>
    );
  }
}
