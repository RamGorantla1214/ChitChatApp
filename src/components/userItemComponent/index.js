// This file contains code to show user item in members list screen

import React,{PureComponent} from "react";
import { View,Text,Image } from "react-native";
import Touchable from "react-native-platform-touchable";
import { heightPercentageToDP,widthPercentageToDP } from "react-native-responsive-screen";
import {Colors,Fonts,getInitalLetters} from "@common"
import { RFValue } from "react-native-responsive-fontsize";
import {icUnchecked,icChecked} from "@images"
import { AppButton } from "../appButton";

export class UserItemComponent extends PureComponent{
    render(){
        let data = this.props.data
        console.log("isSelected",data.isSelected)
        return(
            <View style={{flexDirection:"row",alignItems:"center",paddingVertical:heightPercentageToDP("1.5%")}}>
                    <View style={{backgroundColor:Colors.PrimaryColor,marginStart:widthPercentageToDP("2%"),borderRadius:heightPercentageToDP("100%"),height:heightPercentageToDP("5%"),aspectRatio:1,justifyContent:"center",alignItems:"center"}}>
                        <Text style={{color:Colors.White,fontSize:RFValue(12),fontFamily:Fonts.SemiBold}}>{getInitalLetters(`${data.fname} ${data.lname}`)}</Text>
                    </View>

                    <Text style={{flex:1,marginHorizontal:widthPercentageToDP("2%"),color:Colors.PrimaryColor,fontSize:RFValue(14),fontFamily:Fonts.Medium}}>
                        {data.fname} {data.lname}
                    </Text>

                    <AppButton subContainerStyle={{minHeight:heightPercentageToDP("5%"),paddingHorizontal:widthPercentageToDP("2%")}} label={"Start Chat"} textStyle={{textSize:RFValue(10)}} onPress={()=>{
                        this.props.onStartChatPress()
                    }} />
                </View>
        )
    }
}