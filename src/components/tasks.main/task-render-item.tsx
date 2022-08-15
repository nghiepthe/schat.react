import React from 'react';
import { Avatar, List } from 'react-native-paper';
import { Images } from '@assets';
import { Alert, FlatListProps, TouchableOpacity } from 'react-native';
import { Task } from '@store/task.slice';
import { TaskRenderAvatar } from './task-icon-avatar';
import { useAppDispatch } from '@store/hooks';
import { onAcc } from '@store/task.slice';
class ClassTaskRenderItem extends React.PureComponent<any> {
  render() {
    const { dispatch } = this.props;
    const {
      icon,
      color,
      navigation,
      role,
      state,
      item: { id, title, description, Assigner, Assignee },
    } = this.props;
    return (
      <List.Item
        title={title}
        description={description}
        left={props => (
          // <Avatar.Image source={Images.AuthWelcome.LOGO_CHAT} {...props} />
          <TaskRenderAvatar data={role === "Được giao" ? Assigner : Assignee} size={50} />
        )}
        right={props => {
          if (role === "Được giao") {
            return (
              <TouchableOpacity
                onPress={() => {
                  if (state === 3) {
                    console.log("hoàn thành trể hạn");
                  }
                  else {
                    if (state !== 2) {
                      dispatch(onAcc({ id: id, ongoingState: state + 1 }))
                    }
                    else {
                      Alert.alert("Đã hoàn thành")
                    }
                  }
                }
                }
              >
                <List.Icon {...props} icon={icon} color={color} />
              </TouchableOpacity>)
          }
          else
            return (<></>)
        }
        }
        onPress={() => navigation.navigate('DetailedTask', { taskID: id })}
      />
    );
  }
}

export function TaskRenderItem(props) {
  const dispatch = useAppDispatch();
  return (<ClassTaskRenderItem dispatch={dispatch} {...props} />)
}