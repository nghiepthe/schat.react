import {Alert, StyleSheet, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {Formik} from 'formik';
import {SignupSchema} from '@schemas/auth.signup';
import React, {createRef, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {RootStackScreenProps} from '@components/app.nav/types';
import {AuthService} from '@services';

interface SignupForm {
  fullName: string;
}

type Props = RootStackScreenProps<'AuthSignup'>;

export const AuthSignup = ({navigation}: Props) => {
  const [loading, setLoading] = useState(false);
  const [label, setLabel] = useState('Tiến hành đăng ký');
  useFocusEffect(() => navigation.setOptions({title: 'Đăng ký'}));

  const onSuccess = result => {
    navigation.navigate('AuthSignupSuccess', result);
  };
  const onError = (e: string) => Alert.alert('Thông báo', e);

  const onSubmit = async (values: SignupForm) => {
    setLoading(true);
    setLabel('Đang đăng ký...');
    setTimeout(async () => {
      await AuthService.signup(onSuccess, onError, values);
      setLabel('Tiến hành đăng ký');
      setLoading(false);
    }, 0);
  };

  const initialValues: SignupForm = {fullName: ''};

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignupSchema}
      onSubmit={onSubmit}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <View style={style.container} pointerEvents={loading ? 'none' : 'auto'}>
          <TextInput
            label={'Nhập họ tên của bạn'}
            value={values.fullName}
            onChangeText={handleChange('fullName')}
            onBlur={handleBlur('fullName')}
            style={style.textInput}
          />
          {errors.fullName && touched.fullName ? (
            <Text style={style.textErr}>{errors.fullName}</Text>
          ) : null}
          <Button
            mode="contained"
            onPress={handleSubmit}
            style={style.btn}
            icon={'arrow-right'}
            loading={loading}
            disabled={loading}>
            {label}
          </Button>
        </View>
      )}
    </Formik>
  );
};

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 30,
  },
  btn: {
    marginVertical: 30,
  },
  textInput: {},
  textErr: {
    //marginVertical: 10,
  },
});
