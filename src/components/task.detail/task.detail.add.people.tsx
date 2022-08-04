import React from 'react';
import {
  Text,
  TextInput,
  Button,
  Chip,
  Modal,
  Portal,
  Checkbox,
} from 'react-native-paper';
import {Alert, View} from 'react-native';
export default function AddPeople({visible, hideModal, people}) {
  //const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}>
        <Text>Giao công việc</Text>
        <TextInput
          label="Tìm kiếm cán bộ chiến sĩ"
          style={{height: 40, width: '100%', backgroundColor: '#FFFFFF'}}
        />
        <Text>Danh sách cán bộ chiến sĩ</Text>
        {RenderAssignWork(people)}
        <Button>Giao việc</Button>
      </Modal>
    </Portal>
  );
}

function RenderAssignWork(people) {
  const assignedPerson: any[] = [];
  const [checked, setChecked] = React.useState(false);
  people.forEach(person => {
    assignedPerson.push(
      <View style={{flexDirection: 'row'}}>
        <Chip icon="delete" onPress={() => Alert.alert('Xóa')}>
          {person.email}
        </Chip>
        <Checkbox
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked(!checked);
          }}></Checkbox>
      </View>,
    );
  });
  return assignedPerson;
}
