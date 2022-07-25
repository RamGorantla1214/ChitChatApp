// loader screen that is shown when we are performing some kind of operation like storing data to server

import React, {Component} from 'react';
import {View, StyleSheet, StatusBar,Image} from 'react-native';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import {Colors} from './colors';
import Modal from 'react-native-modal';
import {heightPercentageToDP} from 'react-native-responsive-screen';

export class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    this.randomNumber = -1;
  }

  render() {
    return (
      <Modal
        backdropOpacity={0}
        style={{margin: 0}}
        animationIn={'fadeIn'}
        animationInTiming={100}
        animationOutTiming={100}
        animationOut={'fadeOut'}
        isVisible={this.state.loading}>
        <View style={styles.container}>
          {this.randomNumber != -1 ? (this.getLoaderComponent()) : null}
        </View>
      </Modal>
    );
  }

  getLoaderComponent() {
    let component = loaderComponentsArr[this.randomNumber];
    return component;
  }

  toggleLoader(shouldShow) {
    console.log("shoudshow",shouldShow)
    this.randomNumber = shouldShow ? this.generateRandom() : -1;
    this.setState({loading: shouldShow});
  }

  generateRandom() {
    let maxLimit = loaderComponentsArr.length - 1;
    let min = 0;
    let rand = Math.abs(Math.floor(Math.random() * (maxLimit - min) + min));
    return rand;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    // backgroundColor: '#00000070',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
});

const size = heightPercentageToDP('10%');
const color = Colors.PrimaryColor;

const loaderComponentsArr = [
  <SkypeIndicator size={size} color={color} />,
  <BallIndicator size={size} color={color} />,
  <BarIndicator size={size} color={color} />,
  <DotIndicator size={heightPercentageToDP('3%')} color={color} />,
  <MaterialIndicator size={size} color={color} />,
  <PacmanIndicator size={size} color={color} />,
  <PulseIndicator size={heightPercentageToDP('5%')} color={color} />,
  <UIActivityIndicator size={size} color={color} />,
  <WaveIndicator size={size} color={color} />,
];
