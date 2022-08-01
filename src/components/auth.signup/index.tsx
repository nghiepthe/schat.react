import {Alert, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {Formik} from 'formik';
import {SignupSchema} from '@schemas/auth.signup';
import React from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {RootStackScreenProps} from '@components/app.nav/types';
import {AuthService} from '@services';

interface MyFormValues {
  fullName: string;
}

type Props = RootStackScreenProps<'AuthSignup'>;

export const AuthSignup = ({navigation}: Props) => {
  const initialValues: MyFormValues = {fullName: ''};
  const onSuccess = result => {
    navigation.navigate('AuthSignupSuccess', result);
  };
  const onError = console.log;
  const onSubmit = values => {
    AuthService.signup(onSuccess, onError, values);
  };
  useFocusEffect(() => navigation.setOptions({title: 'Dang ky'}));
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignupSchema}
      onSubmit={onSubmit}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <View>
          <TextInput
            value={values.fullName}
            onChangeText={handleChange('fullName')}
            onBlur={handleBlur('fullName')}
          />
          {errors.fullName && touched.fullName ? (
            <Text>{errors.fullName}</Text>
          ) : null}
          <Button mode="contained" onPress={handleSubmit}>
            Signup
          </Button>
        </View>
      )}
    </Formik>
  );
};
