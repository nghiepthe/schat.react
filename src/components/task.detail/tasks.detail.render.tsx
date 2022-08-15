import React, {useState} from 'react';
import {View, Dimensions, StyleSheet, Alert, ScrollView} from 'react-native';
import {
  Text,
  TextInput,
  Button,
  Chip,
  Modal,
  Portal,
  Checkbox,
} from 'react-native-paper';
import {Tabs, TabScreen} from 'react-native-paper-tabs';
import DatePicker from 'react-native-date-picker';
import SelectDropdown from 'react-native-select-dropdown';
import AddPeople from './task.detail.add.people';
import renderPeople from './task.detail.render.people';

const stateList = ['Chi tiết công việc', 'Bình luận'];
function dateTime({data}: {data: Date}) {
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

const DetailRender = ({index, people}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const countries = ['Đã giao', 'Đã nhận', 'Hoàn thành', 'Quá hạn'];
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  if (index == 0)
    return (
      <View style={{padding: 10, backgroundColor: '#FFFFFF'}}>
        <ScrollView>
          <AddPeople visible={visible} hideModal={hideModal} people={people} />
          <TextInput
            label="Tiêu đề"
            // value="Giao diện"
            // onChangeText={text => setText(text)}
          />
          <TextInput
            label="Nội dung công việc"
            // onChangeText={text => setText(text)}
            numberOfLines={5}
            multiline={true}
          />
          <View style={styles.contentBox}>
            <View style={styles.contentLeft}>
              <Text style={styles.textStyle}>Trạng thái</Text>
            </View>
            <View style={styles.contentRight}>
              <SelectDropdown
                buttonTextAfterSelection={() => 'Đã giao'}
                rowTextForSelection={() => 'Đã giao'}
                data={countries}
                onSelect={text => {
                  Alert.alert(text);
                }}
                defaultButtonText="Trạng thái"
                buttonTextStyle={{color: '#FFFFFF'}}
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
                {dateTime({data: date})}
              </Button>
              <DatePicker
                modal
                open={open}
                date={date}
                onConfirm={date => {
                  setOpen(false);
                  setDate(date);
                }}
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
              <View style={styles.listBox}>{renderPeople(people)}</View>
            </View>
          </View>
          <View style={styles.contentBox}>
            <View style={styles.contentLeft}>
              <Text>Công việc con</Text>
            </View>
            <View style={styles.contentRight}>
              <Button
                onPress={() => Alert.alert('Thêm')}
                icon="sticker-plus-outline"
                color="#FFFFFF"
                style={{
                  backgroundColor: '#27AAE1',
                  borderRadius: 10,
                }}>
                Thêm
              </Button>
              <View style={styles.listBox}>
                <Chip
                  icon="delete"
                  style={{margin: 3}}
                  onPress={() => Alert.alert('Xóa')}>
                  Công việc 1
                </Chip>
                <Chip
                  icon="delete"
                  style={{margin: 3}}
                  onPress={() => Alert.alert('Xóa')}>
                  Công việc 2
                </Chip>
                <Chip
                  icon="delete"
                  style={{margin: 3}}
                  onPress={() => Alert.alert('Xóa')}>
                  Công việc 3
                </Chip>
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
                <Chip
                  icon="file"
                  style={{margin: 3}}
                  onPress={() => Alert.alert('Xóa')}>
                  task1.pdf
                </Chip>
              </View>
            </View>
          </View>
          <Button
            icon={'content-save'}
            color="#FFFFFF"
            onPress={() => Alert.alert('lưu')}
            style={{backgroundColor: '#27AAE1', marginTop: 10}}>
            LƯU
          </Button>
        </ScrollView>
      </View>
    );
  else
    return (
      <View>
        <Text>Comment</Text>
      </View>
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
    padding: 10,
  },
  textStyle: {
    //fontStyle:"normal",
  },
});

export {DetailRender};
