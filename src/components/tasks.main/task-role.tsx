import React from 'react';
import { Text } from 'react-native-paper';
import { Tabs, TabScreen } from 'react-native-paper-tabs';
import { TaskState } from './task-state';

const stateList = ['Đã giao', 'Đã nhận', 'Hoàn tất', 'Quá hạn'];
export function TaskRole({ navigation, role }) {
        return (
            <Tabs style={{ backgroundColor: '#fff' }} uppercase={false}>
                {stateList.map((state, index) => (
                    <TabScreen label={state} key={index}>
                        <TaskState state={index} navigation={navigation} role={role}/>
                    </TabScreen>
                ))}
            </Tabs>
        )
    }

