import {hasAndroidPermission} from '@utils/permission';
import {Platform} from 'react-native';
import {ToastAndroid} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import RNFS from 'react-native-fs';

export async function saveQRCode(data, fileName) {
  if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
    return;
  }
  const filePath = RNFS.CachesDirectoryPath + '/' + fileName + '.png';
  RNFS.writeFile(filePath, data, 'base64')
    .then(success => CameraRoll.save(filePath, {type: 'photo'}))
    .then(() => ToastAndroid.show('Da luu vao thiet bi', ToastAndroid.SHORT));
}
