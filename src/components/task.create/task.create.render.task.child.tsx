import { Alert, View } from 'react-native';
import { Chip } from 'react-native-paper';
import React from 'react';

export default function RenderTaskChild({ dataTask }) {
  const assignedPerson: any[] = [];
  dataTask.forEach(person => {
    if (person.check === true) {
      assignedPerson.push(
        <Chip
          style={{ marginTop: 10 }}
          icon="clipboard-file-outline"
          onPress={() => {
            Alert.alert(person.key + '');
          }}>
          {person.name}
        </Chip>,
      );
    }
  });
  return (
    <View>
      {assignedPerson}
    </View>
  );
}
