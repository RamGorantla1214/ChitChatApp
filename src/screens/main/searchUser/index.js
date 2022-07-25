// This screen shows all users of this app so user can start converstation with them 

import React, {Component} from 'react';
import {View,FlatList} from 'react-native';
import {Colors, FocusAwareStatusBar,toggleLoader,CollectionsNames,getUserData} from '@common';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import firestore from '@react-native-firebase/firestore';
import {UserItemComponent} from "@components"

export class SearchUser extends Component {

  constructor(props){
    super()
    this.state = {
      userList:[]
    }
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: Colors.ScreenBG}}>
        <FocusAwareStatusBar
          translucent={false}
          backgroundColor={Colors.PrimaryColor}
          barStyle="light-content"
        />

        <FlatList 
          contentContainerStyle={{paddingHorizontal:screenMargin,paddingVertical:heightPercentageToDP("2%")}}
          renderItem={this.getUserItemComponent}
          data={this.state.userList}
          keyExtractor={(item,index)=>item.id}
        />
      </View>
    );
  }

  componentDidMount(){
    this.fetchUserList()
  }

  fetchUserList(){
    toggleLoader(true)

    firestore()
      .collection(CollectionsNames.USERS)
      .where(firestore.FieldPath.documentId(), '!=', getUserData().id)
      .get()
      .then(querySnapshot => {
        let data = [];

        querySnapshot.forEach(documentSnapshot => {
          console.log(
            'user ID: ',
            documentSnapshot.id,
            documentSnapshot.data(),
          );
            
          data.push({id: documentSnapshot.id, ...documentSnapshot.data()});
        });

        this.setState({userList:data},()=>{
            toggleLoader(false)
        })
      }).catch(error => {
        toggleLoader(false)
      });
  }

  getUserItemComponent = ({item,index}) => {
    return(
      <UserItemComponent data={item} onStartChatPress={()=>{
        this.props.navigation.navigate("ChatDetail",{name:`${item.fname} ${item.lname}`,opponoentUserId:item.id})
      }} />
    )
  }
}

const screenMargin = widthPercentageToDP("5%")