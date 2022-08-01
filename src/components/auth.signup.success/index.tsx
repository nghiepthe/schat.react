import { RootStackScreenProps } from "@components/app.nav/types";
import React from "react";
import { Image, View } from "react-native";
import { Button, Text } from "react-native-paper";
import QRCode from "react-native-qrcode-svg";
import { ToastAndroid } from "react-native";
import RNFS from "react-native-fs";
import CameraRoll from "@react-native-community/cameraroll";
import { PermissionsAndroid, Platform } from "react-native";

async function hasAndroidPermission() {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission, {
    title: "Cool Photo App Camera Permission",
    message:
      "Cool Photo App needs access to your camera " +
      "so you can take awesome pictures.",
    buttonNeutral: "Ask Me Later",
    buttonNegative: "Cancel",
    buttonPositive: "OK",
  });
  return status === "granted";
}

type Props = RootStackScreenProps<"AuthSignupSuccess">;
export const AuthSignupSuccess = ({ navigation, route }: Props) => {
  const { fullName, address, mnemonic, privateKey } = route.params;

  const onSaveBtnClick = () => {
    svg.toDataURL(onSaveQRCode);
  };

  const onSaveQRCode = async (data) => {
    if (Platform.OS === "android" && !(await hasAndroidPermission())) {
      return;
    }

    RNFS.writeFile(RNFS.CachesDirectoryPath + "/qrcode.png", data, "base64")
      .then((success) => {
        return CameraRoll.save(RNFS.CachesDirectoryPath + "/qrcode.png", {
          type: "photo",
        });
      })
      .then(() => {
        ToastAndroid.show("Saved to gallery !!", ToastAndroid.SHORT);
      });
  };

  let svg;
  return (
    <View>
      <Text>{"Dang ky thanh cong"}</Text>
      <Text>{fullName}</Text>
      <Text>{address}</Text>
      <Text>{mnemonic}</Text>
      <QRCode value={privateKey} getRef={(c) => (svg = c)} />
      <Button onPress={onSaveBtnClick}>
        <Text>Save QR Code</Text>
      </Button>
    </View>
  );
};
