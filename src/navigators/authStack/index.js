// This file contains code of stack navigator for authentication module with header configuration

import React,{Component} from "react"
import {Image} from "react-native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Login,Signup} from "@authScreens"
import Touchable from 'react-native-platform-touchable';
import {Colors,GStyle} from "@common"
import {widthPercentageToDP,heightPercentageToDP} from "react-native-responsive-screen"
import {icBack} from "@images"

const AuthStack = createNativeStackNavigator();

export const authStack = () => (
    <AuthStack.Navigator>
          <AuthStack.Screen name="Login" component={Login} options={{
            headerShown:true,
            headerBackVisible:false,
            headerLeft:()=>null,
            title:"Login",
            headerShadowVisible:false,
            headerStyle:{
              backgroundColor:Colors.PrimaryColor,
            },
            headerTintColor:Colors.White,
            headerTitleAlign:"center",
            headerTitleStyle:GStyle.headerTitleTextStyle
          }}>

          </AuthStack.Screen>

          <AuthStack.Screen name="Signup" component={Signup} options={({navigation,route}) => ({
            headerShown:true,
            headerBackVisible:false,
            headerLeft:()=>(
              <Touchable onPress={()=>{
                navigation.goBack()
              }} foreground={Touchable.Ripple(Colors.WhiteRippleColor,true)} style={{paddingHorizontal:widthPercentageToDP("2%"),paddingVertical:heightPercentageToDP("1%")}}>
                  <Image source={icBack} resizeMode="contain" />
              </Touchable>
            ),
            title:"Sign Up",
            headerShadowVisible:false,
            headerStyle:{
              backgroundColor:Colors.PrimaryColor,
            },
            headerTintColor:Colors.White,
            headerTitleAlign:"center",
            headerTitleStyle:GStyle.headerTitleTextStyle
          })}>

          </AuthStack.Screen>
    </AuthStack.Navigator>
)