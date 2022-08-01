import {PermissionsAndroid} from 'react-native';

export async function hasAndroidPermission() {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission, {
    title: 'Schat App Camera Permission',
    message: 'Schat cần sự cho phép của bạn để lưu ảnh vào bộ nhớ điện thoại',
    buttonNeutral: 'Hỏi lại sau',
    buttonNegative: 'Thoát',
    buttonPositive: 'Đồng ý',
  });
  return status === 'granted';
}
