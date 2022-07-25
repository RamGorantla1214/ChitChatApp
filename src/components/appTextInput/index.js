// This file contains code for text input which is used in app to take user input

import React,{Component} from "react";
import {View,TextInput,Text,Platform} from "react-native"
import {isStringThere,Colors,Fonts} from "@common"
import { heightPercentageToDP } from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";

export class AppTextInput extends Component{

    constructor(props){
        super()
        this.state = {
            errorMsg:undefined
        }
    }

    render(){
        return(
            <View style={[this.props.containerStyle]}>
                {this.props.label ? (<Text style={{color:Colors.PrimaryColor,fontSize:RFValue(14),fontFamily:Fonts.Regular,includeFontPadding:false}}>{this.props.label}</Text>) : null}
                <View style={[{flexDirection:"row",borderBottomColor:isStringThere(this.props.value) ? Colors.PrimaryColor : Colors.PrimaryColor,borderBottomWidth:heightPercentageToDP("0.2%"),alignItems:"center"},this.props.subContainerStyle]}>
                    {this.props.leftComponent ? (this.props.leftComponent) : null}
                    <TextInput 
                        autoCapitalize="none"
                        selectionColor={Colors.PrimaryColor}
                        placeholderTextColor={Colors.PrimaryColor}
                        style={[{color:Colors.PrimaryColor,fontSize:RFValue(14),fontFamily:Fonts.Regular,height:heightPercentageToDP("7%"),padding:0,flex:1},this.props.textInputStyle,Platform.OS === "web" && {outlineStyle: "none"}]}
                        {...this.props}
                    />
                    {this.props.rightComponent ? (this.props.rightComponent) : null}
                </View>
                {this.state.errorMsg ? (<Text style={{color:Colors.ErrorTextColor,fontSize:RFValue(12),fontFamily:Fonts.Regular}}>
                    {this.state.errorMsg}
                </Text>) : null}
            </View>
        )
    }

    setError(errorMsg){
        this.setState({errorMsg:errorMsg})
    }
}