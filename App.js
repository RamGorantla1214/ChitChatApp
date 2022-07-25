// This is first file or entry file  we can say

import React,{Component} from "react"
import {View,Platform} from "react-native"
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {initData,EventName,Loader,setLoaderRef,setTopLevelNavigator,FlashMsgComponent,Colors,Fonts,navigate,getIsUserLogin} from "@common"
import { NavigationContainer } from '@react-navigation/native';
import {authStack,mainStack} from "@stacks"
import KeyboardManager from 'react-native-keyboard-manager';
import SplashScreen from 'react-native-splash-screen';
import EventEmitter from "react-native-eventemitter";

export default class App extends Component{

  constructor(props){
    super()
    console.log("app","constructor")
    this.state = {
      isLogin:getIsUserLogin().isUserLogin
    }
  }

  // rendering container
  render(){
    return(
      <SafeAreaProvider style={{flex:1}}>
        <View style={{flex:1}}>
            <Loader ref={ref => {
                setLoaderRef(ref)
              }} />
              <NavigationContainer ref={refs => {
                setTopLevelNavigator(refs)
              }}>
                  {this.state.isLogin ? mainStack() : authStack()}
              </NavigationContainer>
              <FlashMsgComponent />
        </View>
      </SafeAreaProvider>
    )
  }

  componentDidMount(){
    if(Platform.OS == "ios"){
      KeyboardManager.setEnable(true);
    }

    initData(()=>{
      this.setState({
        isLogin:getIsUserLogin().isUserLogin
      },()=>{
        setTimeout(()=>{
          SplashScreen.hide()
        },2500)
      })
    })
  
    
    EventEmitter.on(EventName.USER_DATA_UPDATED,(value)=>{
      this.setState({isLogin:value})
    })
  }
}