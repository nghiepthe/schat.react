import EncryptedStorage from 'react-native-encrypted-storage';
export const StorageService = {
  async store(key: string, data: string) {
    return EncryptedStorage.setItem(key, data);
  },
  async retrieve(key: string) {
    return EncryptedStorage.getItem(key);
  },
  async del(key) {
    EncryptedStorage.removeItem(key);
  },
};
