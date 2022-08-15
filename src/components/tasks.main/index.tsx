import {MainTabScreenProps} from '@components/app.nav/types';
import {Flex} from '@react-native-material/core';
import React from 'react';
import {FAB} from 'react-native-paper';
import {Tabs, TabScreen} from 'react-native-paper-tabs';
import {TaskRole} from './task-role';

const state = ['Tôi giao', 'Được giao'];
type Props = MainTabScreenProps<'MainTask'>;
export const MainTasks = ({navigation}: Props) => {
  return (
    <Flex fill>
      <Tabs style={{backgroundColor: '#fff'}} uppercase={false}>
        {state.map((state, index) => (
          <TabScreen label={state} key={index}>
            <TaskRole navigation={navigation} role={state} />
          </TabScreen>
        ))}
      </Tabs>
      <FAB
        icon={'plus'}
        style={{position: 'absolute', margin: 16, right: 0, bottom: 0}}
        onPress={() => navigation.navigate('TaskCreate')}
      />
    </Flex>
  );
};
