// This screen shows option to login user so user can manage its account

import React,{Component} from "react"
import {Alert, View,Text,Image} from "react-native"
import { Colors,FocusAwareStatusBar,Fonts,removeAll,EventName } from "@common"
import Touchable from "react-native-platform-touchable"
import {icRightSettingArrow} from "@images"
import { RFValue } from "react-native-responsive-fontsize"
import EventEmitter from 'react-native-eventemitter';
import { heightPercentageToDP,widthPercentageToDP } from "react-native-responsive-screen"

export class Settings extends Component{
    render(){
        return(
            <View style={{flex:1,backgroundColor:Colors.ScreenBG}}>
                <FocusAwareStatusBar translucent={false} backgroundColor={Colors.PrimaryColor} barStyle="light-content" />

                <OptionComponent label={"Change Password"} onPress={()=>{
                    this.props.navigation.navigate("ChangePassword")
                }} />
                <OptionComponent label={"Logout"} onPress={()=>{
                    Alert.alert("Logout","Are you sure you want to logout?",[{text:"Logout",onPress:()=>{
                        removeAll().then(()=>{
                            EventEmitter.emit(EventName.USER_DATA_UPDATED, false);
                        })
                    }},{text:"Cancel"}])
                }} />
            </View>
        )
    }
}

const screenMargin = widthPercentageToDP("5%")

const OptionComponent = (props) => {
    return(
        <Touchable activeOpacity={0.5} foreground={Touchable.Ripple(Colors.PrimaryRippleColor)} onPress={()=>{
            if(props.onPress){
                props.onPress()
            }
        }} style={{marginHorizontal:screenMargin}}>
            <View style={{flexDirection:"row",alignItems:"center"}}>
                <View style={{flex:1,flexDirection:"row",alignItems:"center",paddingVertical:heightPercentageToDP("2%"),borderBottomColor:"#014C92",borderBottomWidth:Platform.OS == "web" ? heightPercentageToDP("0.1%") : heightPercentageToDP("0.05%")}}>
                    <Text style={{flex:1,color:Colors.PrimaryColor,fontFamily:Fonts.Regular,fontSize:RFValue(12),includeFontPadding:false}}>{props.label}</Text>
                    <Image resizeMode="contain" source={icRightSettingArrow} style={[{marginEnd:widthPercentageToDP("5%")}]}  />
                </View>
            </View>
        </Touchable>
    )
}

