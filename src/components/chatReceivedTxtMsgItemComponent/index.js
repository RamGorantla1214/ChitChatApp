// This file contains code for text message to show from receiver side in chat detail screen

import React,{PureComponent} from "react"
import {View,Image,Text} from "react-native"
import {Constants,Fonts,Colors,getInitalLetters} from "@common"
import {heightPercentageToDP,widthPercentageToDP} from "react-native-responsive-screen"
import { RFValue } from "react-native-responsive-fontsize"

export class ChatReceivedTxtMsgItemComponent extends PureComponent{
    render(){
        let name = this.props.name
        return(
            <View style={{marginTop:heightPercentageToDP("2%"),flexDirection:"row",marginStart:widthPercentageToDP("2%"),marginEnd:widthPercentageToDP("2%"),alignItems:"flex-end"}}>
                {/* <Image resizeMode="cover" style={{marginEnd:widthPercentageToDP("2%"),height:heightPercentageToDP("5%"),aspectRatio:1,borderRadius:heightPercentageToDP("100%")}} source={{uri:Constants.DUMMY_PROFILE_IMAGE}} /> */}
                <View style={{backgroundColor:Colors.PrimaryColor,justifyContent:"center",alignItems:"center",height:heightPercentageToDP("5%"),aspectRatio:1,borderRadius:heightPercentageToDP("100%")}}>
                    <Text style={{color:Colors.White,fontFamily:Fonts.SemiBold,fontSize:RFValue(10)}}>{getInitalLetters(name)}</Text>
                </View>
                <View style={{marginEnd:widthPercentageToDP("20%"),backgroundColor:"rgba(142, 174, 203, 0.2)",borderTopStartRadius:heightPercentageToDP("2%"),borderBottomEndRadius:heightPercentageToDP("2%"),borderBottomStartRadius:heightPercentageToDP("0.5%"),borderTopEndRadius:heightPercentageToDP("2%"),paddingVertical:heightPercentageToDP("2%"),paddingHorizontal:widthPercentageToDP("5%")}}>
                    <Text style={{color:Colors.PrimaryColor,fontSize:RFValue(16),fontFamily:Fonts.Regular}}>{this.props.text}</Text>
                </View>                
            </View>
        )
    }
}