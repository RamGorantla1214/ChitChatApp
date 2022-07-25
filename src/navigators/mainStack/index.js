// This file contains code of stack navigator of main screens that starts after authentication with header configuration

import React from "react"
import {Image} from "react-native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {RecentChat,SearchUser,Settings,ChangePassword,ChatDetail} from "@mainScreens"
import Touchable from 'react-native-platform-touchable';
import {Colors,GStyle} from "@common"
import {icBack,icBackWhite} from "@images"
import { widthPercentageToDP,heightPercentageToDP } from "react-native-responsive-screen";

const MainStack = createNativeStackNavigator();

export const mainStack = () => (
    <MainStack.Navigator>
          <MainStack.Screen name="RecentChat" component={RecentChat} options={{
            headerShown:true,
            headerBackVisible:false,
            headerLeft:()=>null,
            title:"ChitChat",
            headerShadowVisible:false,
            headerStyle:{
              backgroundColor:Colors.PrimaryColor,
            },
            headerTintColor:Colors.White,
            headerTitleAlign:"center",
            headerTitleStyle:GStyle.appNameTitleTextStyle
          }}>

          </MainStack.Screen>

        <MainStack.Screen name="SearchUser" component={SearchUser} options={({navigation,route}) => ({
            headerTransparent:false,
            headerShown:true,
            headerTitle:()=>null,
            headerLeft:()=>(
                <Touchable onPress={()=>{
                  navigation.goBack()
                }} foreground={Touchable.Ripple(Colors.WhiteRippleColor,true)} style={{paddingHorizontal:widthPercentageToDP("2%"),paddingVertical:heightPercentageToDP("1%")}}>
                    <Image source={icBackWhite} resizeMode="contain" style={Platform.OS == "web" && {height:heightPercentageToDP("5%"),aspectRatio:1}} />
                </Touchable>
            ),
            headerShadowVisible:false,
            headerStyle:{
              backgroundColor:Colors.PrimaryColor,
            },
            headerTintColor:Colors.White,
            headerTitleAlign:"center",
            headerTitleStyle:GStyle.headerTitleTextStyle
        })} />

        <MainStack.Screen name="Settings" component={Settings} options={({navigation,route}) => ({
            headerTransparent:false,
            headerShown:true,
            title:"Settings",
            headerLeft:()=>(
                <Touchable onPress={()=>{
                  navigation.goBack()
                }} foreground={Touchable.Ripple(Colors.WhiteRippleColor,true)} style={{paddingHorizontal:widthPercentageToDP("2%"),paddingVertical:heightPercentageToDP("1%")}}>
                    <Image source={icBackWhite} resizeMode="contain" style={Platform.OS == "web" && {height:heightPercentageToDP("5%"),aspectRatio:1}} />
                </Touchable>
            ),
            headerShadowVisible:false,
            headerStyle:{
              backgroundColor:Colors.PrimaryColor,
            },
            headerTintColor:Colors.White,
            headerTitleAlign:"center",
            headerTitleStyle:GStyle.headerTitleTextStyle
        })} />

      <MainStack.Screen name="ChangePassword" component={ChangePassword} options={({navigation,route}) => ({
            headerTransparent:false,
            headerShown:true,
            title:"Change Password",
            headerLeft:()=>(
                <Touchable onPress={()=>{
                  navigation.goBack()
                }} foreground={Touchable.Ripple(Colors.WhiteRippleColor,true)} style={{paddingHorizontal:widthPercentageToDP("2%"),paddingVertical:heightPercentageToDP("1%")}}>
                    <Image source={icBackWhite} resizeMode="contain"/>
                </Touchable>
            ),
            headerShadowVisible:false,
            headerStyle:{
              backgroundColor:Colors.PrimaryColor,
            },
            headerTintColor:Colors.White,
            headerTitleAlign:"center",
            headerTitleStyle:GStyle.headerTitleTextStyle
        })} />

<MainStack.Screen name="ChatDetail" component={ChatDetail} options={({navigation,route}) => ({
            headerTransparent:false,
            headerShown:true,
            
            headerShadowVisible:false,
            headerStyle:{
              backgroundColor:Colors.PrimaryColor,
            },
            headerTintColor:Colors.Transparent,
            headerTitleAlign:"center",
            headerTitleStyle:GStyle.headerTitleTextStyle
        })} />
    </MainStack.Navigator>
)