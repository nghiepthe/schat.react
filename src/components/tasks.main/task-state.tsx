import { useFocusEffect } from '@react-navigation/native';
import { RootState } from '@store';
import { selectUserId } from '@store/auth.slice';
import { useAppSelector } from '@store/hooks';
import { selectRole } from '@store/task.slice';
import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { TaskRenderItem } from './task-render-item';

const trailingColor = ['#008A00', '#008A00', '#008A00', '#E51400'];
const trailingIcon = [
  'check-bold',
  'circle-slice-3',
  'check-circle',
  'alert-circle',
];

export const TaskState = ({ navigation, state, role }) => {
  const idUser = useAppSelector(selectUserId)
  const data = useAppSelector(selectRole(state, role, idUser)
  );

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <TaskRenderItem
          item={item}
          navigation={navigation}
          icon={trailingIcon[state]}
          color={trailingColor[state]}
          state={state}
          role={role}
        />
      )}
      keyExtractor={(item, index) => `${item.id}`}
      initialNumToRender={10}
      refreshing={false}
      onRefresh={() => { }}
    />
  );
};
