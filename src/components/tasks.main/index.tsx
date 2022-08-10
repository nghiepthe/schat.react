import {MainTabScreenProps} from '@components/app.nav/types';
import {Flex} from '@react-native-material/core';
import {useAppDispatch} from '@store/hooks';
import {addTask, fetchTasks} from '@store/task.slice';
import {SocketContext} from '@utils/socket';
import React, {useContext, useEffect} from 'react';
import {FAB} from 'react-native-paper';
import {Tabs, TabScreen} from 'react-native-paper-tabs';
import {TaskTab} from './task-tab';

const stateList = ['Đã giao', 'Đã nhận', 'Hoàn tất', 'Quá hạn'];
type Props = MainTabScreenProps<'MainTask'>;
export const MainTasks = ({navigation}: Props) => {
  const socket = useContext(SocketContext);
  const dispatch = useAppDispatch();

  const onAddTask = () => {
    socket.emit(
      'addTask',
      {
        title: 'Cong viec ',
        description: 'Mieu ta...',
        assignees: [
          '0xBFC41810Ac1e51F8528761d6E20Bfb930Cc87F15',
          '0x5aC68A5a85E25b3270827511DeFB047959428Bbd',
          '0x1873478586c85eBA395830EF3939e56640683Cb2',
        ],
        deadline: new Date().setHours(64),
      },
      (err, res) => {
        if (err) console.log(err);
        else
          dispatch(
            addTask({
              title: 'Cong viec ',
              description: 'Mieu ta...',
              assigner: '0x669ca5770fbDd308b8C5698A0A4486E688a324f4',
              assignees: [
                '0xBFC41810Ac1e51F8528761d6E20Bfb930Cc87F15',
                '0x5aC68A5a85E25b3270827511DeFB047959428Bbd',
                '0x1873478586c85eBA395830EF3939e56640683Cb2',
              ],
              deadline: new Date().setHours(64),
              state: 0,
            }),
          );
      },
    );
  };
  useEffect(() => {
    socket.emit(
      'getByRole',
      {
        userAddress: '0x669ca5770fbDd308b8C5698A0A4486E688a324f4',
        isAssigner: true,
        isAssignees: true,
      },
      res => {
        console.log(res);
        if (res) dispatch(fetchTasks(res));
      },
    );
  }, []);

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
        onPress={onAddTask}
      />
    </Flex>
  );
};
