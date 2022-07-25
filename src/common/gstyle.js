// common styles that we have used in whole app

import { StyleSheet } from "react-native";
import {Fonts} from "./fonts"
import { RFValue } from "react-native-responsive-fontsize";

export const GStyle = StyleSheet.create({
    headerTitleTextStyle:{
        fontFamily:Fonts.Bold,
        fontSize:RFValue(20),
    },
    appNameTitleTextStyle:{
        fontFamily:Fonts.TitleText,
        fontSize:RFValue(25),
    }
})