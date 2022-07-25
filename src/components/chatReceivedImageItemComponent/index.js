// This file contains code for image to show in chat detail screen for received side

import React,{PureComponent} from "react"
import {View,Image,Text} from "react-native"
import {Constants,Fonts,Colors,getInitalLetters,FirebaseStorage} from "@common"
import {heightPercentageToDP,widthPercentageToDP} from "react-native-responsive-screen"
import { RFValue } from "react-native-responsive-fontsize"
import {AutoScaleImage} from "../autoScaleImage"
import storage from '@react-native-firebase/storage';

export class ChatReceivedImageItemComponent extends PureComponent{

    constructor(props){
        super()
        this.state = {
            url:"",
        }
    }

    render(){
        let name = this.props.name
        let heightOfImage = Number(this.props.data.height)
        let widthOfImage = Number(this.props.data.width)
        return(
            <View style={{marginTop:heightPercentageToDP("2%"),flexDirection:"row",marginStart:widthPercentageToDP("2%"),marginEnd:widthPercentageToDP("2%"),alignItems:"flex-end"}}>
                {/* <Image resizeMode="cover" style={{marginEnd:widthPercentageToDP("2%"),height:heightPercentageToDP("5%"),aspectRatio:1,borderRadius:heightPercentageToDP("100%")}} source={{uri:Constants.DUMMY_PROFILE_IMAGE}} /> */}
                <View style={{backgroundColor:Colors.PrimaryColor,justifyContent:"center",alignItems:"center",height:heightPercentageToDP("5%"),aspectRatio:1,borderRadius:heightPercentageToDP("100%")}}>
                    <Text style={{color:Colors.White,fontFamily:Fonts.SemiBold,fontSize:RFValue(10)}}>{getInitalLetters(name)}</Text>
                </View>
                <View style={{borderWidth:heightPercentageToDP("1.5%"),borderTopStartRadius:heightPercentageToDP("2%"),borderBottomEndRadius:heightPercentageToDP("2%"),borderBottomStartRadius:heightPercentageToDP("0.5%"),borderColor:Colors.PrimaryColor}}>
                    <AutoScaleImage uri={this.state.url} width={widthPercentageToDP("40%")} widthOfImage={widthOfImage} heightOfImage={heightOfImage} />
                </View>

            </View>
        )
    }

    componentDidMount(){
        let storageRef = storage().refFromURL(FirebaseStorage.BUCKET_URL);
        storageRef
            .child(this.props.data.message).getDownloadURL().then((url)=>{
                this.setState({url:url})
            })
    }
}