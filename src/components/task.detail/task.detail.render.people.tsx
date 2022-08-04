import {Alert} from 'react-native';
import {Chip} from 'react-native-paper';
import React from 'react';

export default function renderPeople(people) {
  const assignedPerson: any[] = [];
  people.forEach(person => {
    assignedPerson.push(
      <Chip
        style={{margin: 3}}
        icon="delete"
        onPress={() => {
          Alert.alert(person.key + '');
        }}>
        {person.email}
      </Chip>,
    );
  });
  return assignedPerson;
}
