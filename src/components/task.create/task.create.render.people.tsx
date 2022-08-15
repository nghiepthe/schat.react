import {Alert, View} from 'react-native';
import {Chip} from 'react-native-paper';
import React from 'react';

export default function RenderPeople({dataAccount}) {
  const assignedPerson: any[] = [];
  dataAccount.forEach(person => {
    if(person.check===true){
      assignedPerson.push(
        <Chip
          style={{marginTop: 10}}
          icon="delete"
          onPress={() => {
            Alert.alert(person.key + '');
          }}>
          {person.email}
        </Chip>,
      );
    }
  });
  return(
    <View>
      {assignedPerson}
    </View>
  );
}
