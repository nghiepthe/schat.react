import {RootStackScreenProps} from '@components/app.nav/types';
import {Flex} from '@react-native-material/core';
import React from 'react';
import {FAB} from 'react-native-paper';
import {Tabs, TabScreen} from 'react-native-paper-tabs';
import {TaskTab} from './task-tab';

const stateList = ['Đã giao', 'Đã nhận', 'Hoàn tất', 'Quá hạn'];
type Props = RootStackScreenProps<'MainTab'>;
export const MainTasks = ({navigation}: Props) => {
  return (
    <Flex fill>
      <Tabs style={{backgroundColor: '#fff'}} uppercase={false}>
        {stateList.map((state, index) => (
          <TabScreen label={state} key={index}>
            <TaskTab state={index} navigation={navigation} />
          </TabScreen>
        ))}
      </Tabs>
      <FAB
        icon={'plus'}
        style={{position: 'absolute', margin: 16, right: 0, bottom: 0}}
      />
    </Flex>
  );
};
