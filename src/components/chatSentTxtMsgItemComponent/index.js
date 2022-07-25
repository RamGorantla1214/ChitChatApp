// This file contains code for text to show in chatdetail screen which is sent by login user

import React,{PureComponent} from "react"
import {View,Image,Text, Platform} from "react-native"
import {Colors,Fonts} from "@common"
import { RFValue } from "react-native-responsive-fontsize"
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen"
import {icChatReceivedTick} from "@images"

export class ChatSentTxtMsgItemComponent extends PureComponent{
    render(){
        return(
            <View style={{marginTop:heightPercentageToDP("2%"),flexDirection:"row",marginEnd:widthPercentageToDP("2%"),marginStart:widthPercentageToDP("2%"),alignItems:"flex-end"}}>
                <View style={{marginStart:widthPercentageToDP("20%"),flex:1,backgroundColor:Colors.PrimaryColor,borderTopStartRadius:heightPercentageToDP("2%"),borderBottomStartRadius:heightPercentageToDP("2%"),borderBottomEndRadius:heightPercentageToDP("0.5%"),borderTopEndRadius:heightPercentageToDP("2%"),paddingVertical:heightPercentageToDP("2%"),paddingHorizontal:widthPercentageToDP("5%")}}>
                    <Text style={{color:Colors.White,fontSize:RFValue(16),fontFamily:Fonts.Regular}}>
                        {this.props.text}
                    </Text>
                </View>
            </View>
        )
    }
}