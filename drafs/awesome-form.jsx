import {Box, useBoolean, VStack} from '@react-native-material/core';
import {useHeaderHeight} from '@react-navigation/elements';
import React, {createRef, useEffect, useMemo, useState} from 'react';
import {StatusBar} from 'react-native';
import {FAB, Text, TextInput} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {Auth} from '_constants';
import {Colors} from '_styles';
import {fetchUserToken} from './authSlice';

export default function Login({navigation}) {
  const headerHeight = useHeaderHeight();
  const infoHeight = useMemo(
    () => ((headerHeight - StatusBar.currentHeight) * 85) / 100,
    [],
  );
  const dispatch = useDispatch();
  const emailRef = createRef();
  const pwRef = createRef();

  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [isSecure, setSecurity] = useBoolean(true);

  const [loginRequestStatus, setLoginRequestStatus] = useState('idle');
  const canLogin = [email, pw].every(Boolean) && loginRequestStatus === 'idle';
  const onLoginClicked = async () => {
    if (canLogin) {
      try {
        setLoginRequestStatus('pending');
        await dispatch(fetchUserToken(email, pw)).unwrap();
      } catch (err) {
        Alert('Error', err);
      } finally {
        setLoginRequestStatus('idle');
      }
    }
  };

  return (
    <>
      <VStack spacing={4}>
        <Box
          h={infoHeight}
          ph={16}
          style={{
            backgroundColor: Colors.GRAY_LIGHT,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 16}}>{Auth.INFO_SIGNIN}</Text>
        </Box>
        <Box mt={5} ph={16} style={{backgroundColor: 'transparent'}}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder={Auth.ENTER_EMAIL_PHONE}
            dense={true}
            ref={emailRef}
            autoFocus={true}
            keyboardType="default"
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => pwRef.current.focus()}
            style={{
              backgroundColor: 'transparent',
              height: infoHeight,
              marginBottom: 5,
            }}
            right={
              !email ? null : (
                <TextInput.Icon
                  name="close"
                  color={Colors.GRAY_DARK}
                  onPress={() => setEmail('')}
                />
              )
            }
          />
          <TextInput
            value={pw}
            onChangeText={setPw}
            ref={pwRef}
            placeholder={Auth.ENTER_PWD}
            dense={true}
            secureTextEntry={isSecure}
            keyboardType="default"
            returnKeyType="go"
            style={{backgroundColor: 'transparent'}}
            right={
              <TextInput.Icon
                name={isSecure ? 'eye-off-outline' : 'eye-outline'}
                color={Colors.GRAY_DARK}
                onPress={setSecurity.toggle}
              />
            }
            onSubmitEditing={onLoginClicked}
          />
        </Box>
        <Box
          h={infoHeight}
          ph={16}
          style={{
            backgroundColor: 'transparent',
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}>
          <Text style={{color: Colors.TINT, fontWeight: 'bold'}}>
            {Auth.FORGOT_PWD}
          </Text>
        </Box>
      </VStack>
      <FAB
        icon="arrow-right"
        disabled={!canLogin}
        style={{position: 'absolute', margin: 16, right: 0, bottom: 0}}
        onPress={onLoginClicked}
      />
    </>
  );
}
