import {
  AppLoading,
  AuthWelcome,
  AuthSignup,
  AuthSignupSuccess,
} from "@components";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { AppNavOptions, AuthWelScrnOpts } from "./options";
import { RootStackParamList } from "@components/app.nav/types";
import { useAppSelector } from "@store/hooks";
import { RootState } from "@store";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNav = () => {
  const auth = useAppSelector((state: RootState) => state.auth);

  if (auth.isLoading) return <AppLoading />;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={AppNavOptions}>
        {auth.wallet == null ? (
          <Stack.Group>
            <Stack.Screen
              name="AuthWelcome"
              component={AuthWelcome}
              options={AuthWelScrnOpts}
            />
            <Stack.Screen name="AuthSignup" component={AuthSignup} />
            <Stack.Screen
              name="AuthSignupSuccess"
              component={AuthSignupSuccess}
            />
          </Stack.Group>
        ) : null}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
