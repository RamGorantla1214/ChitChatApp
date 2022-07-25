// This screen is responsible to show list of chats 

import React, {Component} from 'react';
import {View, FlatList, Image} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {
  Colors,
  FocusAwareStatusBar,
  CollectionsNames,
  Fonts,
  getUserData,
} from '@common';
import {RecentChatComponent} from '@components';
import firestore from '@react-native-firebase/firestore';
import {icEdit,icSettings} from '@images';
import Touchable from 'react-native-platform-touchable';

export class RecentChat extends Component {
  constructor(props) {
    super();
    this.state = {
      filterRecentChat: [],
    };
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
          renderItem={this.getRecentChatItemComponent}
          data={this.state.filterRecentChat}
          contentContainerStyle={{paddingVertical: heightPercentageToDP('2%')}}
          keyExtractor={(item, index) => item.id}
        />
      </View>
    );
  }

  getRecentChatItemComponent = ({item, index}) => {
    return (
      <RecentChatComponent
        data={item}
        onPress={() => {
          if (item.userData != undefined) {
            this.props.navigation.navigate('ChatDetail', {
              opponoentUserId: item.userData.id,
              name: `${item.userData.fname} ${item.userData.lname}`,
            });
          }
        }}
      />
    );
  };

  componentDidMount() {
    this.setHeaderOption();
    this.props.navigation.addListener('focus', () => {
      this.fetchRecentChatList();
    });
    this.props.navigation.addListener('blur', () => {
      if (this.recentListener) {
        this.recentListener();
      }
    });
  }

  // function that fetches all chats of login user with other users
  fetchRecentChatList() {
    this.recentListener = firestore()
      .collection(CollectionsNames.GROUP)
      .where(`members.${getUserData().id}`, '==', true)
      .onSnapshot(querySnapshot => {
        const allGroups = [];
        querySnapshot.forEach(doc => {
          const data = doc.data();
          data['id'] = doc.id;
          if (data.recentMessage) allGroups.push(data);
        });
        console.log('all groups', JSON.stringify(allGroups));
        // vm.groups = allGroups

        let userIdsToFetchInfo = allGroups.map(item => {
          let userIds = Object.keys(item.members);
          let filteredUserIds = userIds.filter(
            userId => userId != getUserData().id,
          );
          return filteredUserIds[0];
        });

        if (userIdsToFetchInfo.length > 0) {
          firestore()
            .collection(CollectionsNames.USERS)
            .where(firestore.FieldPath.documentId(), 'in', userIdsToFetchInfo)
            .get()
            .then(users => {
              const usersData = [];
              users.forEach(doc => {
                const data = doc.data();
                usersData.push({id: doc.id, ...data});
              });
              console.log('users', JSON.stringify(usersData));

              const groupsListWithNewData = allGroups.map(groupItem => {
                let userIds = Object.keys(groupItem.members);
                let filteredUserIds = userIds.filter(
                  userId => userId != getUserData().id,
                );
                let userData = usersData.find(
                  userData => userData.id == filteredUserIds[0],
                );
                groupItem['userData'] = userData;
                return groupItem;
              });

              console.log('groups', JSON.stringify(groupsListWithNewData));
              this.setState({
                recentChat: groupsListWithNewData,
                filterRecentChat: groupsListWithNewData,
              });
            });
        }
      });
  }


  // set header buttons
  setHeaderOption() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <View style={{flexDirection: 'row'}}>
          <Touchable
            onPress={() => {
              this.props.navigation.navigate('SearchUser');
            }}
            activeOpacity={0.5}
            foreground={Touchable.Ripple(Colors.WhiteRippleColor, true)}
            style={{paddingHorizontal: widthPercentageToDP('2%')}}>
            <Image source={icEdit} resizeMode="contain" />
          </Touchable>

          <Touchable
            onPress={() => {
              this.props.navigation.navigate('Settings');
            }}
            activeOpacity={0.5}
            foreground={Touchable.Ripple(Colors.PrimaryRippleColor, true)}
            style={{paddingHorizontal: widthPercentageToDP('2%')}}>
            <Image source={icSettings} resizeMode="contain" />
          </Touchable>
        </View>
      ),
    });
  }
}
