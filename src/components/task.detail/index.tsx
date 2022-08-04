import {View, Dimensions, StyleSheet, Alert} from 'react-native';
import {Tabs, TabScreen} from 'react-native-paper-tabs';
import {DetailRender} from './tasks.detail.render';
import React from 'react';

const stateList = ['Chi tiết công việc', 'Bình luận'];
const people = [
  {key: 1, name: 'Hoang', email: 'huyhoang1@catphcm.vn'},
  {key: 2, name: 'Hoang', email: 'huyhoang2@catphcm.vn'},
  {key: 3, name: 'Hoang', email: 'huyhoang3@catphcm.vn'},
  {key: 4, name: 'Hoang', email: 'huyhoang4@catphcm.vn'},
  {key: 5, name: 'Hoang', email: 'huyhoang5@catphcm.vn'},
  {key: 6, name: 'Hoang', email: 'huyhoang6@catphcm.vn'},
];

export function DetailedTask({route}) {
  return (
    <View style={{flex: 1}}>
      <Tabs style={{backgroundColor: '#fff'}} uppercase={false}>
        {stateList.map((state, index) => (
          <TabScreen label={state} key={index}>
            <DetailRender index={index} people={people}></DetailRender>
          </TabScreen>
        ))}
      </Tabs>
    </View>
  );
}
