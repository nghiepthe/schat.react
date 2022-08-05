import {RootState} from '@store';
import {useAppSelector} from '@store/hooks';
import React from 'react';
import {FlatList} from 'react-native';
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
  const data = useAppSelector((rootState: RootState) =>
    rootState.tasks.tasks.filter(t => t.state === state),
  );

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
