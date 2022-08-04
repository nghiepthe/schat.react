import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import React, {PureComponent, useEffect} from 'react';
import {Alert, FlatList, View} from 'react-native';
import {Avatar, List, Text} from 'react-native-paper';
import {AuthNav} from '@constants';

const DATA: any[] = [];
for (let i = 0; i <= 200; i++) {
  DATA.push({
    key: i,
    title: 'Nguyễn Văn Long ' + i,
    description: 'Xin chào bạn? Bạn khỏe không?',
  });
}

class ListItem extends PureComponent<any> {
  render() {
    const {
      navigation,
      item: {title, description, key},
    } = this.props;

    return (
      <List.Item
        title={title}
        description={description}
        left={props => <Avatar.Icon {...props} icon="account" color="white" />}
        onPress={() => navigation.navigate('DetailedChat', {roomID: key})}
        onLongPress={() => Alert.alert('aaaa')}
      />
    );
  }
}

export function MainChat({navigation}) {
  return (
    <FlatList
      data={DATA}
      renderItem={({item}) => <ListItem item={item} navigation={navigation} />}
      keyExtractor={item => item.key}
      initialNumToRender={50}
      refreshing={false}
      onRefresh={() => {}}
    />
  );
}
