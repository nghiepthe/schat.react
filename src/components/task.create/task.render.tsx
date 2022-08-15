import React, { useState } from 'react';
import { View, Dimensions, StyleSheet, Alert, ScrollView, SafeAreaView } from 'react-native';
import {
  Text,
  TextInput,
  Button,
  Chip,
  Modal,
  Portal,
  Checkbox,
} from 'react-native-paper';
import { Tabs, TabScreen } from 'react-native-paper-tabs';
import DatePicker from 'react-native-date-picker';
import SelectDropdown from 'react-native-select-dropdown';
import AddPeople from './task.create.add.people';
import RenderPeople from './task.create.render.people';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { createTask } from '@store/task.slice';
import { Formik } from 'formik';
import { selectUserId } from '@store/auth.slice';
import AddTaskChild from './task.create.child';
import RenderTaskChild from './task.create.render.task.child';

function dateTime({ data }: { data: Date }) {
  return (
    data.getHours() +
    ':' +
    data.getMinutes() +
    ' ' +
    data.getDay() +
    '-' +
    data.getMonth() +
    '-' +
    data.getFullYear()
  );
}

const TaskCreateRender = ({ dataAccount, setDataAccount, dataTaskChild, setDataTaskChild }) => {
  // const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const countries = ['Đã giao', 'Đã nhận', 'Hoàn thành', 'Quá hạn'];
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [modalTaskChild, setModalTaskChild] = React.useState(false);
  const showModalTaskChild = () => setModalTaskChild(true);
  const hideModalTaskChild = () => setModalTaskChild(false);

  const dispatch = useAppDispatch();
  const idUser = useAppSelector(selectUserId)

  return (
    <SafeAreaView style={{}}>
      <ScrollView style={{ padding: 16, backgroundColor: '#FFFFFF' }}>
        <Formik
          initialValues={{
            title: '',
            description: "",
            time: new Date(),
            state: 0,
            Assigner: "",
            Assignee: [],
            taskChild: [],
            files: [],
          }}
          onSubmit={values => {
            if (values.title) {
              dispatch(createTask({
                id: Math.floor(Math.random()),
                title: values.title,
                description: values.description,
                time: values.time,
                state: values.state,
                Assigner: idUser,
                Assignee: values.Assignee,
                taskChild: [],
                files: []
              }))
              //Alert.alert("value: " + values.time)
            }
            else {
              //Alert.alert("Vui long nhập tiêu đề")

            }
          }}
        >
          {({ handleChange, setFieldValue, handleBlur, handleSubmit, values }) => (
            <View>
              <AddPeople
                visible={visible}
                hideModal={hideModal}
                dataAccount={dataAccount}
                setDataAccount={setDataAccount}
                setFieldValue={setFieldValue}
              />
              <AddTaskChild
                visible={modalTaskChild}
                hideModal={hideModalTaskChild}
                dataAccount={dataTaskChild}
                setDataAccount={setDataTaskChild}
                setFieldValue={setFieldValue}
              />
              <TextInput
                label="Tiêu đề"
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                value={values.title}
              />
              <TextInput
                label="Nội dung công việc"
                numberOfLines={5}
                multiline={true}
                style={{ marginTop: 10 }}
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                value={values.description}
              // onChangeText={text => setText(text)}
              />

              <View style={styles.contentBox}>
                <View style={styles.contentLeft}>
                  <Text style={styles.textStyle}>Trạng thái</Text>
                </View>
                <View style={styles.contentRight}>
                  <SelectDropdown
                    buttonTextAfterSelection={(selectedItem, index) => selectedItem}
                    rowTextForSelection={(item, index) => item}
                    data={countries}
                    onSelect={handleChange('state')}
                    //defaultValue={handleBlur('state')}
                    defaultButtonText="Trạng thái"
                    buttonTextStyle={{ color: '#FFFFFF' }}
                    buttonStyle={{
                      backgroundColor: '#27AAE1',
                      borderRadius: 10,
                      height: 40,
                      width: '100%',
                    }}
                  />
                </View>
              </View>
              <View style={styles.contentBox}>
                <View style={styles.contentLeft}>
                  <Text>Thời hạn</Text>
                </View>
                <View style={styles.contentRight}>
                  <Button
                    onPress={() => setOpen(true)}
                    color="#FFFFFF"
                    icon="calendar"
                    style={{
                      backgroundColor: '#27AAE1',
                      borderRadius: 10,
                    }}>
                    {dateTime({ data: values.time })}
                  </Button>
                  <DatePicker
                    modal
                    open={open}
                    date={values.time}
                    onConfirm={
                      (date: any) => {
                        setFieldValue("time", date);
                        setOpen(false);
                        //setDate(date);
                      }
                    }
                    onCancel={() => {
                      setOpen(false);
                    }}
                  />
                </View>
              </View>
              <View style={styles.contentBox}>
                <View style={styles.contentLeft}>
                  <Text>Giao việc cho cán bộ chiến sĩ</Text>
                </View>
                <View style={styles.contentRight}>
                  <Button
                    onPress={showModal}
                    icon="account-plus"
                    color="#FFFFFF"
                    style={{
                      backgroundColor: '#27AAE1',
                      borderRadius: 10,
                    }}>
                    Thêm
                  </Button>
                  <View style={styles.listBox}>
                    <RenderPeople dataAccount={dataAccount} />
                  </View>
                </View>
              </View>
              <View style={styles.contentBox}>
                <View style={styles.contentLeft}>
                  <Text>Công việc con</Text>
                </View>
                <View style={styles.contentRight}>
                  <Button
                    onPress={showModalTaskChild}
                    icon="sticker-plus-outline"
                    color="#FFFFFF"
                    style={{
                      backgroundColor: '#27AAE1',
                      borderRadius: 10,
                    }}>
                    Thêm
                  </Button>
                  <View style={styles.listBox}>
                    <RenderTaskChild dataTask={dataTaskChild}></RenderTaskChild>
                    {/* <Chip
                icon="delete"
                style={{ margin: 3 }}
                onPress={() => Alert.alert('Xóa')}>
                Công việc 1
              </Chip> */}
                  </View>
                </View>
              </View>
              <View style={styles.contentBox}>
                <View style={styles.contentLeft}>
                  <Text>File đính kèm</Text>
                </View>
                <View style={styles.contentRight}>
                  <Button
                    onPress={() => Alert.alert('Thêm')}
                    icon="file-image-plus"
                    color="#FFFFFF"
                    style={{
                      backgroundColor: '#27AAE1',
                      borderRadius: 10,
                    }}>
                    Thêm
                  </Button>
                  <View style={styles.listBox}>
                    {/* <Chip
                icon="file"
                style={{ margin: 3 }}
                onPress={() => Alert.alert('Xóa')}>
                task1.pdf
              </Chip> */}
                  </View>
                </View>
              </View>
              <Button
                icon={'content-save'}
                color="#FFFFFF"

                onPress={handleSubmit}
                // if (2) {
                //   dispatch(createTask({
                //     id: 1,
                //     title: "Test",
                //     description: "Creat task",
                //     time: null,
                //     state: 0,
                //     Assigner: "001",
                //     Assignee: ["002", "003", "006", "005"],
                //     taskChild: [],
                //     files: []
                //   }))
                //   Alert.alert("Thanh cong")
                // }

                style={{ backgroundColor: '#27AAE1', marginTop: 10 }}>
                LƯU
              </Button>
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView >
  );

};

const styles = StyleSheet.create({
  contentLeft: {
    width: '40%',
  },
  contentRight: {
    width: '60%',
  },
  contentBox: {
    flexDirection: 'row',
    borderRadius: 5,
    marginTop: 10,
  },
  listBox: {
    //padding: 10,
  },
  textStyle: {
    //fontStyle:"normal",
  },
});

export { TaskCreateRender };
