// this file stores all types of constants that we are using

import { LayoutAnimation } from "react-native"

export const showLog = (message) => {
    console.log(message)
}

// async storage pref name
export const Pref = {
    USER_DATA_PREF:"userDataPref",
    IS_USER_LOGIN_PREF:"isUserLoginPref",
    IS_USER_LOGIN_GUEST_PREF:"isUserLoginGuestPref",
    IS_USER_FIRST_TIME_PREF:"isUserFirstTimePref",
}

// event names
export const EventName = {
    USER_DATA_UPDATED:"userDataUpdated",
}

export const RegEx = {
    MOBILE_NUMBER: /^\d+$/,
    // MOBILE_NUMBER_LIMIT: /^\d{8,11}$/,
    MOBILE_NUMBER_LIMIT: "(^[\\d +]{9,10})+$",
    NAME: "(^[\\p{L} .'-]{2,})+$",
    CARD_NUMBER_LIMIT: /^\d{15,16}$/,
    CVV_LIMIT: /^\d{3,4}$/,
    USER_NAME:"^(\\p{L}|\\p{N}|[!-@]|)+$",
    ONLY_NUMBER : /^\d+$/,
    PASSWORD_REGEX : "(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{6,}).*$",
    ONE_CAPTIAL_LETTER:"(?=.*[A-Z])",
    ONE_DIGIT:"(?=.*[0-9])",
    ONE_SPECIAL_CHAR:"(?=.*[@#$%^&+!=])"
}

export const InputLimits = {
    MOBILE_NUMBER_MAX:11,
    PASSWORD_MINIMUM:6,
    MIN_USERNAME:3,
    MIN_NAME:4,
    PHONE_NUMBER_MAX:10,
    TEXT_POST_MAX:7
}

export const Constants = {
    
}

// types of picker
export const ImagePickOption = {
    CAMERA:"Camera",
    GALLERY:"Gallery"
}

export const ParamName = {
    
}

export const layoutAnimConfig = {
    duration: 300,
    update: {
      type: LayoutAnimation.Types.easeInEaseOut, 
    },
    create:{
        duration: 100,
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
    },
    delete: {
      duration: 100,
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
};

// firestore collection names
export const CollectionsNames = {
    USERS:"users",
    GROUP:"group",
    MESSAGE:"message",
    MESSAGES:"messages"
}

// firebase storage data
export const FirebaseStorage = {
    BUCKET_URL:"gs://chitchat-13b34.appspot.com",
    POST_FOLDER:"/messages/"
}

// types of messages in chat
export const MessageType = {
    TEXT:"text",
    IMAGE:"image"
}