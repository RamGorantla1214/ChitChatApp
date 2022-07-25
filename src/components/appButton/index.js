// This file contains code for button which is used in app to allow user to perform click action

import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import {Colors, Fonts} from '@common';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';

export class AppButton extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <Touchable
        onPress={() => {
          if (this.props.onPress) {
            this.props.onPress();
          }
        }}
        style={[
          {borderRadius: heightPercentageToDP('1%'), overflow: 'hidden',backgroundColor:Colors.PrimaryColor},
          this.props.containerStyle,
        ]}
        foreground={Touchable.Ripple(Colors.WhiteRipple)}
        activeOpacity={0.5}>
        <View
          style={[
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: heightPercentageToDP('7%'),
            },
            this.props.subContainerStyle,
          ]}>
          <Text
            style={[
              {
                color: Colors.White,
                fontSize: RFValue(14),
                fontFamily: Fonts.Regular,
                fontWeight: '500',
              },
              this.props.textStyle,
            ]}>
            {this.props.label}
          </Text>
        </View>
      </Touchable>
    );
  }
}
