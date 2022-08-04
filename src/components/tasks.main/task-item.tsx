import React from 'react';
import {Avatar, List} from 'react-native-paper';
import {Images} from '@assets';
import {FlatListProps} from 'react-native';
import {Task} from '@store/task.slice';

export class TaskItem extends React.PureComponent<any> {
  render() {
    const {
      icon,
      color,
      navigation,
      item: {id, title, description},
    } = this.props;
    return (
      <List.Item
        title={title}
        description={description}
        left={props => (
          <Avatar.Image source={Images.AuthWelcome.LOGO_CHAT} {...props} />
        )}
        right={props => <List.Icon {...props} icon={icon} color={color} />}
        onPress={() => navigation.navigate('DetailedTask', {taskID: id})}
      />
    );
  }
}
