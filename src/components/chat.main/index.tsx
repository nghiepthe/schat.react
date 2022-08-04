import {FlatList, View, SafeAreaView, StyleSheet, Alert} from 'react-native';
import {Text, List, Avatar} from 'react-native-paper';
import React from 'react';
import {Images} from '@assets';

const DATA = [
  {
    id: '1001',
    userName: 'Tiến',
    Message: 'Xin chào',
  },
  {
    id: '1002',
    userName: 'Tiến',
    Message: 'Xin chào',
  },
  {
    id: '1003',
    userName: 'Tiến',
    Message: 'Xin chào',
  },
  {
    id: '1004',
    userName: 'Tiến',
    Message: 'Xin chào',
  },
];

const Item = ({title}) => (
  <List.Item
    title="First Item"
    description="Item description"
    left={props => <Avatar.Image source={Images.AuthWelcome.MASK_GROUP} />}
  />
);

export function MainChat() {
  const renderItem = ({item}) => (
    <List.Item
      title={item.userName}
      description={item.Message}
      left={props => <Avatar.Image source={Images.AuthWelcome.MASK_GROUP} />}
      onPress={() => Alert.alert('a')}
    />
  );
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
