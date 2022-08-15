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
import { Alert, View } from 'react-native';

export default function AddTaskChild({ visible, hideModal, dataAccount, setDataAccount, setFieldValue, }) {
  //const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: 'white', padding: 16, borderRadius: 10, margin: 16 };
  const data: any[] = [];

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "#27AAE1", fontSize: 25 }}>Thêm công việc con</Text>
        </View>
        <TextInput
          label="Tìm kiếm công việc"
          style={{ width: '100%', backgroundColor: '#FFFFFF' }}
        />
        <View style={{ alignItems: "center" }}>
          <Text>Danh sách công việc</Text>
          <RenderAssignWork
            dataAccount={dataAccount}
            setDataAccount={setDataAccount}
            setFieldValue={setFieldValue}
          />
        </View>
        <Button
          color={"#FFFFFF"}
          style={{ backgroundColor: "#27AAE1", margin: 10 }}
          onPress={() => {
            hideModal();
            dataAccount.forEach((account) => {
              if (account.check) {
                data.push(account.id)
              }
            })
            setFieldValue("taskChild", data)
          }
          }
        >
          Xong
        </Button>
      </Modal>
    </Portal>
  );
}

function RenderAssignWork({ dataAccount, setDataAccount, setFieldValue }) {
  const assignedPerson: any[] = [];
  const dataTemp = [...dataAccount];
  //console.log("LLLLLL:", dataAccount);
  dataAccount.forEach(person => {
    assignedPerson.push(
      <View style={{ flexDirection: 'row', marginTop: 5 }}>
        <Chip icon="clipboard-file-outline" onPress={() => Alert.alert('Xóa')}>
          {person.name}
        </Chip>
        <Checkbox
          status={person.check ? 'checked' : 'unchecked'}
          onPress={() => {
            dataTemp[person.key] = { ...person, check: !person.check };
            setDataAccount(dataTemp);
            //setDataAccount({ ...person, check: [person.check, !person.check] });
            //setFieldValue("Assignee",dataTemp);
          }}
        />
      </View>,
    );
  });
  return <View>{assignedPerson}</View>;
}