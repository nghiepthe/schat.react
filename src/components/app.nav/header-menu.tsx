import {AuthService} from '@services';
import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import {IconButton, Menu} from 'react-native-paper';

export const HeaderMenu = props => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const onBtnSignoutClick = () => AuthService.Signout();

  return (
    <Menu
      {...props}
      statusBarHeight={StatusBar.currentHeight}
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <IconButton icon="dots-vertical" color="white" onPress={openMenu} />
      }>
      <Menu.Item onPress={onBtnSignoutClick} title="Đăng xuất" />
      <Menu.Item onPress={() => {}} title="Lọc" />
    </Menu>
  );
};
