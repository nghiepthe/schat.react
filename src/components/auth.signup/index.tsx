import { Alert, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { Formik } from "formik";
import { SignupSchema } from "@schemas/auth.signup";
import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import { RootStackScreenProps } from "@components/app.nav/types";
import { AuthService } from "@services";

interface SignupForm {
  fullName: string;
}

type Props = RootStackScreenProps<"AuthSignup">;

export const AuthSignup = ({ navigation }: Props) => {
  useFocusEffect(() => navigation.setOptions({ title: "Đăng ký" }));

  const onSuccess = (result) => {
    navigation.navigate("AuthSignupSuccess", result);
  };
  const onError = (e: string) => Alert.alert("Thông báo", e);

  const onSubmit = (values: SignupForm) => {
    AuthService.signup(onSuccess, onError, values);
  };

  const initialValues: SignupForm = { fullName: "" };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignupSchema}
      onSubmit={onSubmit}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View>
          <TextInput
            value={values.fullName}
            onChangeText={handleChange("fullName")}
            onBlur={handleBlur("fullName")}
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
