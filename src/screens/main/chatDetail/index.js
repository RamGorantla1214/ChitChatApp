// This screens shows converstation between login user and opponent user and allow to send and receive messages of type text and images

import React, {Component} from 'react';
import {View,FlatList,TextInput,Image,Text,Platform} from 'react-native';
import {Colors, FocusAwareStatusBar,CustomKeyboardAvoidingView,Fonts,getInitalLetters,getUserData,CollectionsNames,showErrorMessage,MessageType,FirebaseStorage} from '@common';
import { heightPercentageToDP,widthPercentageToDP } from 'react-native-responsive-screen';
import Touchable from 'react-native-platform-touchable';
import {icImage,icBackWhite} from "@images"
import { RFValue } from 'react-native-responsive-fontsize';
import KeyboardManager from 'react-native-keyboard-manager';
import firestore, {firebase} from '@react-native-firebase/firestore';
import {ChatReceivedTxtMsgItemComponent,ChatSentTxtMsgItemComponent,ChatSentImageItemComponent,ChatReceivedImageItemComponent} from "@components"
import {ImagePickerModal} from "@utils"
import storage from '@react-native-firebase/storage';

export class ChatDetail extends Component {

  constructor(props){
    super()
    this.state = {
      chatMessages:[],
      isImagePickerVisible:false,
      message:""
    }
  }

  // rendering part of ui starts from here
  render() {
    return (
      <View style={{flex: 1, backgroundColor: Colors.ScreenBG}}>
        <FocusAwareStatusBar
          translucent={false}
          backgroundColor={Colors.PrimaryColor}
          barStyle="light-content"
        />

<CustomKeyboardAvoidingView>
            <FlatList
              inverted
              data={[...this.state.chatMessages].reverse()}
              keyExtractor={(item, index) => index.toString()}
              renderItem={this.getChatItemComponent}
              // contentContainerStyle={{paddingBottom: heightPercentageToDP('4%')}}
            />


            <View
              style={{
                flexDirection: 'row',
                paddingVertical: heightPercentageToDP('1%'),
                alignItems: 'center',
              }}>
              <Touchable
                onPress={() => {
                  this.setState({isImagePickerVisible: true});
                }}
                activeOpacity={0.5}
                style={{paddingHorizontal: widthPercentageToDP('3%')}}>
                <Image
                  resizeMode="contain"
                  source={icImage}
                />
              </Touchable>

              <TextInput
                value={this.state.message}
                onChangeText={value => this.setState({message: value})}
                multiline
                textAlign="left"
                textAlignVertical="top"
                selectionColor={Colors.PrimaryColor}
                placeholder="Aa"
                placeholderTextColor={'#8EAECB'}
                style={[
                  {
                    paddingHorizontal: widthPercentageToDP('2%'),
                    fontFamily: Fonts.Regular,
                    fontSize: RFValue(16),
                    minHeight: heightPercentageToDP('5%'),
                    maxHeight: heightPercentageToDP('15%'),
                    flex: 1,
                    backgroundColor: '#EBF5FE',
                    borderRadius: heightPercentageToDP('2%'),
                    color:Colors.PrimaryColor
                  },
                ]}
              />

              <Text
                onPress={() => {
                  if(this.state.message.trim() != ""){
                    this.sendMessage();
                  }
                }}
                style={{
                  paddingHorizontal: widthPercentageToDP('2%'),
                  color: Colors.PrimaryColor,
                  fontFamily: Fonts.SemiBold,
                  fontSize: RFValue(18),
                }}>
                Send
              </Text>
            </View>        
          </CustomKeyboardAvoidingView>

          <ImagePickerModal
                    isVisible={this.state.isImagePickerVisible}
                    onClosePress={() => {
                        this.setState({isImagePickerVisible: false});
                    }}
                    onImageSelected={response => {
                        this.setState({
                          isImagePickerVisible: false,
                        },()=>{
                            setTimeout(()=>{
                                let params = {
                                    selectedImage: response.uri,
                                    selectedImageName: response.fileName,
                                    selectedImageType: response.type,
                                    height:response.height,
                                    width:response.width
                                }
                                this.sendImage(params)
                            },500)
                        });
                    }}
                />
      </View>
    );
  }

  componentDidMount(){
    if(Platform.OS == "ios"){
      KeyboardManager.setEnable(false);
    }
    this.setOptions()

    this.fetchChatRoomDetail(chatRoomDetailCallBack => {
      if (chatRoomDetailCallBack) {
        this.setListenerForChatDetail()
        // this.fetchGroupMessages(messages => {
        //   // all messages of chat room
          
        //   this.setState({chatMessages:messages})
        // });
      }
    });
  }

  componentWillUnmount(){
    if(Platform.OS == "ios"){
      KeyboardManager.setEnable(true);
    }

    if(this.snapShotListener){
      this.snapShotListener()
    }
  }

  // set header options
  setOptions(){
    let name = this.props.route.params.name

    this.props.navigation.setOptions({
      headerLeft: () => (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Touchable
            activeOpacity={0.5}
            foreground={Touchable.Ripple(Colors.PrimaryRippleColor, true)}
            style={{paddingHorizontal: widthPercentageToDP('2%')}}
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image
              resizeMode="contain"
              source={icBackWhite}
            />
          </Touchable>

          <View style={{alignItems:"center",justifyContent:"center",backgroundColor:Colors.Disable,borderRadius:heightPercentageToDP("100%"),height:heightPercentageToDP("5%"),aspectRatio:1}}>
              <Text style={{color:Colors.White,fontSize:RFValue(10),fontFamily:Fonts.SemiBold}}>{getInitalLetters(name)}</Text>
            </View>
          <Text
            style={{
              marginStart: widthPercentageToDP('2%'),
              color: Colors.White,
              fontSize: RFValue(18),
              fontFamily: Fonts.Medium,
              marginEnd: widthPercentageToDP('10%'),
            }}>
            {name}
          </Text>
        </View>
      ),
    });
  }

  // fetching converstation between login and opponent user
  fetchChatRoomDetail(callBack) {
    let opponoentUserId = this.props.route.params.opponoentUserId;

    // find chatroom
    let groupRef = firestore().collection('group');
    let userArr = [getUserData().id, opponoentUserId];
    userArr.forEach(userId => {
      groupRef = groupRef.where(`members.${userId}`, '==', true);
    });
    groupRef
      .where('chatType', '==', 0)
      .get()
      .then(querySnapShot => {
        if (!querySnapShot.empty) {
          // chatroom found so let's find messages of chatroom
          this.chatRoomDetail = querySnapShot.docs[0];          
          callBack(querySnapShot.docs[0]);
        } else {
          console.log('no chatroom found');
          this.chatRoomDetail = undefined;
          callBack(undefined);
        }
      });
  }

  // set listeners for new messages
  setListenerForChatDetail() {
    if(this.snapShotListener){
        this.snapShotListener()
    }
    this.snapShotListener = firestore()
      .collection(CollectionsNames.MESSAGE)
      .doc(this.chatRoomDetail.id)
      .collection(CollectionsNames.MESSAGES)
      .orderBy("sentAt")
      .onSnapshot((querySnapshot) => {
        // console.log("message",querySnapshot.docs)
        // console.log("messages",querySnapshot)
        if(!querySnapshot.metadata.hasPendingWrites){
          const recentChats = []
          querySnapshot.docs.forEach((doc) => {
            const data = doc.data()
            recentChats.push(data)
          })
          console.log("messages",JSON.stringify(recentChats))
          // let existingData = Object.assign([],this.state.chatMessages)
          // this.setState({chatMessages:[...existingData,...recentChats]})
          this.setState({chatMessages:recentChats})
        }
      })
  }

  // function to send text message
  sendMessage() {
    this.fetchChatRoomDetail(chatRoomDetailCallBack => {
      if (chatRoomDetailCallBack == undefined) {
        this.createGroup(createdChatRoom => {
          if (createdChatRoom) {
            this.setListenerForChatDetail()
            this.sendTextMessage(data => {
              if (data == undefined) {
                showErrorMessage("Couldn't send message");
              }else{
                // this.setState({message:""})
                this.updateGroupRecentMessage(MessageType.TEXT)
              }
            });
          } else {
            showErrorMessage("Can't create chatroom");
          }
        });
      } else {
        console.log("chatroom is there just send message")
        this.sendTextMessage(data => {
          if (data == undefined) {
            showErrorMessage("Couldn't send message");
          }else{
            this.updateGroupRecentMessage(MessageType.TEXT)
          }
        });
      }
    });
  }

  // function to send image to opponent user
  sendImage(params){
    this.fetchChatRoomDetail(chatRoomDetailCallBack => {
      if (chatRoomDetailCallBack == undefined) {
        this.createGroup(createdChatRoom => {
          if (createdChatRoom) {
            this.setListenerForChatDetail()
            this.sendImageMessage(params,imageRef => {
              if (imageRef == undefined) {
                showErrorMessage("Couldn't send message");
              }else{
                // this.setState({message:""})
                this.updateGroupRecentMessage(MessageType.IMAGE)
              }
            });
          } else {
            showErrorMessage("Can't create chatroom");
          }
        });
      } else {
        console.log("chatroom is there just send message")
        this.sendImageMessage(params,imageRef => {
          if (imageRef == undefined) {
            showErrorMessage("Couldn't send message");
          }else{
            this.updateGroupRecentMessage(MessageType.IMAGE)
          }
        });
      }
    });
  }

  sendImageMessage(params,callBack){
    let imageName = `${new Date().getTime()}_imagepost.jpg`;
    let storageRef = storage().refFromURL(FirebaseStorage.BUCKET_URL);
    let photo = params.selectedImage
    storageRef
      .child(`${FirebaseStorage.POST_FOLDER}${imageName}`)
      .putFile(photo)
      .then(taskSnapShot => {
        let fullPath = taskSnapShot.metadata.fullPath;
        console.log('fullpath', fullPath);


        let timeStamp = firestore.FieldValue.serverTimestamp();
    firestore()
      .collection(CollectionsNames.MESSAGE)
      .doc(this.chatRoomDetail.id)
      .collection(CollectionsNames.MESSAGES)
      .add({
        message: fullPath,
        readBy: [getUserData().id],
        sentAt: timeStamp,
        sentBy: getUserData().id,
        type: MessageType.IMAGE,
        height:params.height,
        width:params.width
      })
      .then(value => {
        callBack(imageName);
      })
      .catch(error => {
        callBack(undefined);
      });
      })
  }

  // creating chatroom between login and opponent user to store messages
  createGroup(callBack) {
    let timeStamp = firestore.FieldValue.serverTimestamp();
    firestore()
      .collection(CollectionsNames.GROUP)
      .add({
        chatType: 0,
        createdAt: timeStamp,
        createdBy: getUserData().id,
        members: {
          [getUserData().id]: true,
          [this.props.route.params.opponoentUserId]: true,
        },
        modifiedAt: timeStamp,
        name: '',
        recentMessage: {
          message: this.state.message,
          readBy: [getUserData().id],
          sentAt: timeStamp,
          sentBy: getUserData().id,
          type: MessageType.TEXT,
        },
      })
      .then(value => {
        //console.log("group",JSON.stringify(value))
        console.log('id ' + value.id);
        //console.log("recentMessage",value.get("recentMessage"))

        this.chatRoomDetail = value;

        callBack(value);
      })
      .catch(error => {
        callBack(undefined);
      });
  }

  sendTextMessage(callBack) {
    let timeStamp = firestore.FieldValue.serverTimestamp();
    firestore()
      .collection(CollectionsNames.MESSAGE)
      .doc(this.chatRoomDetail.id)
      .collection(CollectionsNames.MESSAGES)
      .add({
        message: this.state.message,
        readBy: [getUserData().id],
        sentAt: timeStamp,
        sentBy: getUserData().id,
        type: 'text',
      })
      .then(value => {
        callBack(value);
      })
      .catch(error => {
        callBack(undefined);
      });
    // console.log("get "+value.get("recentMessage").message)
    // console.log("get "+value.get("name"))
    // console.log("get "+value.get("chatType"))
  }

  // update recent message
  updateGroupRecentMessage(type){

    firestore().collection(CollectionsNames.GROUP).doc(this.chatRoomDetail.id).update({
      recentMessage:{
        message:type == MessageType.TEXT ? this.state.message : "",
        readBy:[getUserData().id],
        sentAt:firestore.FieldValue.serverTimestamp(),
        sentBy:getUserData().id,
        type:type
      }
    }).then(()=>{
      this.setState({message:""})
    })
  }

  // get component for chat message
  getChatItemComponent = ({item, index}) => {
    switch(item.type){
      case MessageType.TEXT:
        if(item.sentBy == getUserData().id) {
          return (<ChatSentTxtMsgItemComponent text={item.message} />)
        }else{
          return (<ChatReceivedTxtMsgItemComponent name={this.props.route.params.name} text={item.message} />)
        }

      case MessageType.IMAGE:
        if(item.sentBy == getUserData().id) {
          return (<ChatSentImageItemComponent data={item} text={item.message} />)
        }else{
          return (<ChatReceivedImageItemComponent data={item} name={this.props.route.params.name} text={item.message} />)
        }
    }
  };
}
