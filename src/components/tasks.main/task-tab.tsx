import {RootState} from '@store';
import {Task} from '@store/task.slice';
import React from 'react';
import {FlatList, ListRenderItem} from 'react-native';
import {useSelector} from 'react-redux';
import {TaskItem} from './task-item';

const trailingColor = ['#008A00', '#008A00', '#008A00', '#E51400'];
const trailingIcon = [
  'check-bold',
  'circle-slice-3',
  'check-circle',
  'alert-circle',
];

export const TaskTab = ({navigation, state}) => {
  const data = useSelector((state: RootState) => state.tasks.tasks);

  return (
    <FlatList
      data={data}
      renderItem={({item}) => (
        <TaskItem
          item={item}
          navigation={navigation}
          icon={trailingIcon[state]}
          color={trailingColor[state]}
        />
      )}
      keyExtractor={(item, index) => `${item.id}`}
      initialNumToRender={10}
      refreshing={false}
      onRefresh={() => {}}
    />
  );
};
