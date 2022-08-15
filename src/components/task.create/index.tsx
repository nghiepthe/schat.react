import { View, Dimensions, StyleSheet, Alert } from 'react-native';
import { Tabs, TabScreen } from 'react-native-paper-tabs';
import { TaskCreateRender } from './task.render';
import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

const people = [
  { id: "000", key: 0, name: 'Hoang', email: 'huyhoang0@catphcm.vn', check: false },
  { id: "001", key: 1, name: 'Hoang', email: 'huyhoang1@catphcm.vn', check: false },
  { id: "002", key: 2, name: 'Hoang', email: 'huyhoang2@catphcm.vn', check: false },
  { id: "003", key: 3, name: 'Hoang', email: 'huyhoang3@catphcm.vn', check: false },
  { id: "004", key: 4, name: 'Hoang', email: 'huyhoang4@catphcm.vn', check: false },
  { id: "005", key: 5, name: 'Hoang', email: 'huyhoang5@catphcm.vn', check: false },
  { id: "006", key: 6, name: 'Hoang', email: 'huyhoang6@catphcm.vn', check: false },
];

const dataTask = [
  { id: "001", key: 0, name: 'Công viêc 1', check: false },
  { id: "002", key: 1, name: 'Công viêc 2', check: false },
  { id: "003", key: 2, name: 'Công viêc 3', check: false },

]
// const people = []
export function TaskCreate({ navigation }) {
  const [dataAccount, setDataAccount] = useState(people)
  const [dataTaskChild, setDataTaskChild] = useState(dataTask)

  useFocusEffect(() => navigation.setOptions({ title: 'Tạo công việc' }));

  return (
    <View style={{ flex: 1 }}>
      <TaskCreateRender
        dataAccount={dataAccount}
        setDataAccount={setDataAccount}
        dataTaskChild={dataTaskChild}
        setDataTaskChild={setDataTaskChild}
      />
    </View>
  );
}
