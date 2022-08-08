import {Alert, StyleSheet, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {Formik} from 'formik';
import {SignupSchema} from '@schemas/auth.signup';
import React, {useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {RootStackScreenProps} from '@components/app.nav/types';
import {AuthService} from '@services';

type Props = RootStackScreenProps<'AuthSignup'>;
export const AuthSignup = ({navigation}: Props) => {
  useFocusEffect(() => navigation.setOptions({title: 'Đăng ký'}));
  const [label, setLabel] = useState('Tiến hành đăng ký');
  const [loading, setLoading] = useState(false);

  const onStart = () => {
    console.log('Set loading state');
    setLoading(true);
    setLabel('Đang đăng ký...');
  };
  const onSuccess = info => navigation.navigate('AuthSignupSuccess', info);
  const onError = error => Alert.alert('Thông báo', error);
  const onFinish = () => {
    setLabel('Tiến hành đăng ký');
    setLoading(false);
  };
  const onSubmit = async payload =>
    AuthService.Signup({onStart, onSuccess, onError, onFinish, payload});

  return (
    <Formik
      initialValues={{fullName: ''}}
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
            <Text>{errors.fullName}</Text>
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
});
